import json
from rest_framework import (
    status, viewsets, permissions, generics,
    parsers, renderers, views
)
from rest_framework.response import Response
from rest_framework.parsers import (
    MultiPartParser, FormParser, FileUploadParser, FormParser
)
from django_rest_passwordreset.signals import reset_password_token_created
from django.template.loader import render_to_string
from django.core.files.uploadedfile import InMemoryUploadedFile
from django.conf import settings
from django.dispatch import receiver

from knox.models import AuthToken

import boto3

from .models import (
    User, Profile
)
from .serializers import (
    UserSerializer,
    CreateUserSerializer,
    LoginUserSerializer,
    ProfileSerializer
)
from .permissions import BaseUserPermissions, BaseTransactionPermissions

from .tasks import send_email

class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        Profile.objects.create(user=user)
        _, token = AuthToken.objects.create(user)

        html_message = render_to_string('email-signup.html', {'user': user})
        send_email.delay("Welcome to OhcheeStudio!", "Thank you for joining us!", html_message, [user.email])

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        _, token = AuthToken.objects.create(user)

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })

class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class ProfileViewSet(viewsets.ModelViewSet):
    permission_classes = [BaseUserPermissions, ]
    parser_classes = [MultiPartParser, FormParser, ]
    serializer_class = ProfileSerializer

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data.copy()
        img = data.pop('image')
        is_upload_image = False

        if img:
            image = img[0]
            if isinstance(image, InMemoryUploadedFile):
                data['image'] = image.name
                is_upload_image = True

        serializer = self.serializer_class(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        if is_upload_image:
            upload_to_s3(image, f'profiles/{request.user.id}/{image.name}')

        return Response(serializer.data)

    def get_queryset(self):
        all = self.request.GET.get('all')
        others = self.request.GET.get('others')
        user_id = self.request.GET.get('userId')

        queryset = Profile.objects.all()

        if user_id:
            user = User.objects.get(pk=user_id)
            queryset = queryset.filter(user=user)
            return queryset
        if all:
            return queryset
        if others:
            queryset = queryset.exclude(user=self.request.user)
            return queryset

        # TODO: handle exception
        queryset = queryset.filter(user=self.request.user)
        return queryset

class CustomPasswordResetView:
    @receiver(reset_password_token_created)
    def password_reset_token_created(sender, reset_password_token, *args, **kwargs):
        """
          Handles password reset tokens
          When a token is created, an e-mail needs to be sent to the user
        """
        site_name = "OhcheeStudio"
        site_url = settings.SITE_URL

        # send an e-mail to the user
        context = {
            'current_user': reset_password_token.user,
            'email': reset_password_token.user.email,
            'reset_password_url': f"{site_url}/reset/password/{reset_password_token.key}",
            'site_name': site_name,
            'site_domain': site_url
        }

        # render email text
        html_message = render_to_string('email-forgotpswd.html', context)
        #email_plaintext_message = render_to_string('email/user_reset_password.txt', context)

        send_email.delay("Forgot Password?", "Forgot Password?", html_message, [reset_password_token.user.email])


def upload_to_s3(image, key):
    client = boto3.client(
        "s3",
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_REGION
    )

    client.put_object(Bucket=settings.AWS_BUCKET_NAME, Key=key, Body=image)