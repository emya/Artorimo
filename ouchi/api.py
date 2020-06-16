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
    User, Profile, Portfolio
)
from .serializers import (
    UserSerializer,
    CreateUserSerializer,
    LoginUserSerializer,
    ProfileSerializer,
    PortfolioSerializer
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
        Portfolio.objects.create(user=user)
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

class PortfolioViewSet(viewsets.ModelViewSet):
    permission_classes = [BaseUserPermissions, ]
    parser_classes = [MultiPartParser, FormParser, ]
    serializer_class = PortfolioSerializer

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = request.data.copy()
        img0 = data.pop('image0')
        img1 = data.pop('image1')
        img2 = data.pop('image2')
        img3 = data.pop('image3')
        img4 = data.pop('image4')
        img5 = data.pop('image5')
        img6 = data.pop('image6')
        img7 = data.pop('image7')
        img8 = data.pop('image8')

        is_upload_images = {}

        if img0:
            image = img0[0]
            if isinstance(image, InMemoryUploadedFile):
                data['image0'] = image.name
                is_upload_images['image0'] = image
        if img1:
            image = img1[0]
            if isinstance(image, InMemoryUploadedFile):
                data['image1'] = image.name
                is_upload_images['image1'] = image
        if img2:
            image = img2[0]
            if isinstance(image, InMemoryUploadedFile):
                data['image2'] = image.name
                is_upload_images['image2'] = image

        if img3:
            image = img3[0]
            if isinstance(image, InMemoryUploadedFile):
                data['image3'] = image.name
                is_upload_images['image3'] = image

        if img4:
            image = img4[0]
            if isinstance(image, InMemoryUploadedFile):
                data['image4'] = image.name
                is_upload_images['image4'] = image

        if img5:
            image = img5[0]
            if isinstance(image, InMemoryUploadedFile):
                data['image5'] = image.name
                is_upload_images['image5'] = image

        if img6:
            image = img6[0]
            if isinstance(image, InMemoryUploadedFile):
                data['image6'] = image.name
                is_upload_images['image6'] = image

        if img7:
            image = img7[0]
            if isinstance(image, InMemoryUploadedFile):
                data['image7'] = image.name
                is_upload_images['image7'] = image

        if img8:
            image = img8[0]
            if isinstance(image, InMemoryUploadedFile):
                data['image8'] = image.name
                is_upload_images['image8'] = image

        serializer = self.serializer_class(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        if is_upload_images:
            for k, v in is_upload_images.items():
                upload_to_s3(v, f'portfolios/{request.user.id}/{v.name}')

        return Response(serializer.data)

    def get_queryset(self):
        all = self.request.GET.get('all')
        others = self.request.GET.get('others')
        user_id = self.request.GET.get('userId')

        queryset = Portfolio.objects.all()

        if user_id:
            user = User.objects.get(pk=user_id)
            queryset = queryset.filter(user=user)

            if user and queryset.count() == 0:
                p = Portfolio.objects.create(user=user)
                return [p]
            return queryset
        if all:
            return queryset
        if others:
            queryset = queryset.exclude(user=self.request.user)
            return queryset

        # TODO: handle exception
        queryset = queryset.filter(user=self.request.user)
        return queryset


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

class AskHelpAPI(generics.GenericAPIView):

    def post(self, request):
        data = request.data
        user = request.user

        # Notify User
        html_message = render_to_string('email-askhelp-confirmed.html',
                                        {'user': user, 'message': data['message']})

        send_email.delay("仲介相談受付のお知らせ", "仲介相談受付のお知らせ", html_message, [data['email']])


        # Notify Ohchee Team
        html_message = render_to_string('email-askhelp-received.html',
                                        {'user': user, 'email': data['email'], 'message': data['message']})

        send_email.delay("[Action Required] 仲介の相談", "仲介の相談", html_message, [settings.EMAIL_HOST_USER])

        return Response({})


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