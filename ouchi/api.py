import json
from rest_framework import (
    status, viewsets, permissions, generics,
    parsers, renderers, views
)
from rest_framework.response import Response
from rest_framework.parsers import (
    MultiPartParser, FormParser, FileUploadParser, FormParser
)
from django.template.loader import render_to_string
from knox.models import AuthToken

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
        print("partial update", request.user)

        instance = self.get_object()
        data = request.data.copy()
        img = data.pop('image')
        is_upload_image = False

        """
        if img:
            image = img[0]
            if isinstance(image, InMemoryUploadedFile):
                data['image'] = image.name
                is_upload_image = True
        """

        serializer = self.serializer_class(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        """
        if is_upload_image:
            upload_to_s3(image, f'profiles/{request.user.id}/{image.name}')
        """
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
