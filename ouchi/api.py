import json
import sys
from rest_framework import (
    status, viewsets, permissions, generics,
    parsers, renderers, views
)
from rest_framework.response import Response
from rest_framework.parsers import (
    MultiPartParser, FormParser, FileUploadParser, FormParser
)

from django.http import HttpResponse, HttpResponseBadRequest
from django_rest_passwordreset.signals import reset_password_token_created
from django.template.loader import render_to_string
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.core.files.uploadedfile import InMemoryUploadedFile, TemporaryUploadedFile
from django.conf import settings
from django.dispatch import receiver
from django.shortcuts import get_object_or_404
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode


from knox.models import AuthToken

import boto3
from decimal import Decimal

from .models import (
    User, Profile, Portfolio,
    CommunityPost, CommunityReply,
    IconOrder, PayPalWebhook
)
from .serializers import (
    UserSerializer,
    CreateUserSerializer,
    LoginUserSerializer,
    ProfileSerializer,
    PortfolioSerializer,
    IconOrderSerializer,
    CommunityPostSerializer,
    CommunityReplySerializer,
    PayPalWebhookSerializer,
)
from .permissions import BaseUserPermissions, BaseTransactionPermissions
from .tasks import send_email, send_bcc_email
from .tokens import account_activation_token

import logging

logger = logging.getLogger("analyzer")
logger.info("api: Started")

s3_client = boto3.client(
    "s3",
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    region_name=settings.AWS_REGION
)
line_only_elements = ["nose", "accessories", "glasses"]

class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        logger.info("Logger: Register")
        data = request.data
        is_registration_completed = data.get('is_registration_completed')
        if is_registration_completed:
            try:
                user = User.objects.get(email=data['email'])
            except User.DoesNotExist:
                user = None

            if not user:
                return Response("No user is registered with the email", status=status.HTTP_400_BAD_REQUEST)

            if user and not user.is_active:
                return Response("The user is inactive", status=status.HTTP_400_BAD_REQUEST)

            if user and user.is_activated:
                # Please log in
                return Response("The user is already activated", status=status.HTTP_400_BAD_REQUEST)

        else:
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            user = serializer.save()
            Profile.objects.create(user=user)
            Portfolio.objects.create(user=user)

        _, token = AuthToken.objects.create(user)

        site_url = settings.SITE_URL
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = account_activation_token.make_token(user)
        activate_url = f"{site_url}/activate/account/{uid}/{token}"

        html_message = render_to_string('email-signup-confirmation.html', {'activate_url': activate_url})
        send_email.delay("Welcome to OhcheeStudio!", "Thank you for joining us!", html_message, [user.email])

        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": token
        })



class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        logger.info("Login Post")
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

class ArtistAPI(generics.RetrieveAPIView):
    serializer_class = PortfolioSerializer

    def get(self, request):
        styles = request.GET.get("styles")

        queryset = Portfolio.objects.all()
        queryset = queryset.filter(user__is_staff=False, user__is_activated=True, user__is_active=True)
        portfolios = self.serializer_class(queryset, many=True).data

        if styles:
            styles = styles.split(",")
            portfolios_to_removed = []
            for p in portfolios:
                p_styles = p['profile']['style']
                intersections = list(set(styles) & set(p_styles))

                if len(intersections) == 0:
                    portfolios_to_removed.append(p)

            for p in portfolios_to_removed:
                portfolios.remove(p)

        return Response({"artists": portfolios})

class PortfolioViewSet(viewsets.ModelViewSet):
    permission_classes = [BaseUserPermissions, ]
    parser_classes = [MultiPartParser, FormParser, ]
    serializer_class = PortfolioSerializer

    def partial_update(self, request, *args, **kwargs):
        logger.info(f"PortfolioViewSet: partial_update {request.data}")
        instance = self.get_object()

        request.data._mutable = True
        img0 = request.data.pop('image0')
        img1 = request.data.pop('image1')
        img2 = request.data.pop('image2')
        img3 = request.data.pop('image3')
        img4 = request.data.pop('image4')
        img5 = request.data.pop('image5')
        img6 = request.data.pop('image6')
        img7 = request.data.pop('image7')
        img8 = request.data.pop('image8')
        request.data._mutable = False

        data = request.data.copy()

        is_upload_images = {}

        if img0:
            image = img0[0]
            logger.info(f"image type {type(image)}")
            if isinstance(image, InMemoryUploadedFile) or isinstance(image, TemporaryUploadedFile):
                data['image0'] = image.name
                is_upload_images['image0'] = image
        if img1:
            image = img1[0]
            if isinstance(image, InMemoryUploadedFile) or isinstance(image, TemporaryUploadedFile):
                data['image1'] = image.name
                is_upload_images['image1'] = image
        if img2:
            image = img2[0]
            if isinstance(image, InMemoryUploadedFile) or isinstance(image, TemporaryUploadedFile):
                data['image2'] = image.name
                is_upload_images['image2'] = image

        if img3:
            image = img3[0]
            if isinstance(image, InMemoryUploadedFile) or isinstance(image, TemporaryUploadedFile):
                data['image3'] = image.name
                is_upload_images['image3'] = image

        if img4:
            image = img4[0]
            if isinstance(image, InMemoryUploadedFile) or isinstance(image, TemporaryUploadedFile):
                data['image4'] = image.name
                is_upload_images['image4'] = image

        if img5:
            image = img5[0]
            if isinstance(image, InMemoryUploadedFile) or isinstance(image, TemporaryUploadedFile):
                data['image5'] = image.name
                is_upload_images['image5'] = image

        if img6:
            image = img6[0]
            if isinstance(image, InMemoryUploadedFile) or isinstance(image, TemporaryUploadedFile):
                data['image6'] = image.name
                is_upload_images['image6'] = image

        if img7:
            image = img7[0]
            if isinstance(image, InMemoryUploadedFile) or isinstance(image, TemporaryUploadedFile):
                data['image7'] = image.name
                is_upload_images['image7'] = image

        if img8:
            image = img8[0]
            if isinstance(image, InMemoryUploadedFile) or isinstance(image, TemporaryUploadedFile):
                data['image8'] = image.name
                is_upload_images['image8'] = image

        serializer = self.serializer_class(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        if is_upload_images:
            for k, v in is_upload_images.items():
                logger.info(f"Uploading {k}, {v}")
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

            # TODO: Remove
            logger.info(f"Portfolio queryset {queryset[0].image0}")
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

class EmailMagazinesAPI(generics.GenericAPIView):

    def get(self, request):
        from os import listdir
        from os.path import isfile, join
        files = [f for f in listdir('templates') if isfile(join('templates', f)) and f.startswith("email-magazine-")]
        return Response({"emagazines": files})

    def post(self, request):
        data = request.data
        email = data['email']
        subject = data['subject']
        template = data['template']

        # Notify User
        html_message = render_to_string(template)

        to_email = []
        if email.capitalize() == "All":
            users = User.objects.all()
            users = users.filter(is_active=True, is_activated=True)
            for u in users:
                to_email.append(u.email)
        else:
            to_email = email.strip(" ").replace(" ", "").split(",")

        send_bcc_email.delay(subject, subject, html_message, to_email)

        return Response({})

class NotifyUsersAPI(generics.GenericAPIView):

    def post(self, request):
        data = request.data
        email = data['email']
        subject = data['subject']
        message = data['message']

        # Notify User
        html_message = render_to_string('email-general-notification.html',
                                        {'message': message})

        to_email = []
        if email.capitalize() == "All":
            users = User.objects.all()
            users = users.filter(is_active=True, is_activated=True)
            for u in users:
                to_email.append(u.email)
        else:
            to_email = email.strip(" ").replace(" ", "").split(",")

        send_bcc_email.delay(subject, subject, html_message, to_email)

        return Response({})

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

class AskGoodsAPI(generics.GenericAPIView):

    def post(self, request):
        user = request.user
        email = user.email

        # Notify Ohchee Team
        html_message = render_to_string('email-goods-yes.html',
                                        {'user': user, 'email': email})

        send_email.delay("[Action Required] Sale of Goods", "Sale of Goods", html_message, [settings.EMAIL_HOST_USER])
        return Response({})


class IconOrderViewSet(viewsets.ModelViewSet):
    #permission_classes = [BaseUserPermissions, ]
    #parser_classes = [MultiPartParser, FormParser, ]
    serializer_class = IconOrderSerializer
    queryset = IconOrder.objects.all()

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()

        serializer = self.serializer_class(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def retrieve(self, request, pk):
        print("retrive", pk)
        paypal_status = request.GET.get('paypal_status')
        queryset = IconOrder.objects.all()
        order = get_object_or_404(queryset, pk=pk)
        if paypal_status:
            print(order.paypal_status)
            print(paypal_status)
            if int(order.paypal_status) != int(paypal_status):
                return Response("The order is not approved yet", status=status.HTTP_400_BAD_REQUEST)
        serializer = self.serializer_class(order)
        return Response(serializer.data)

    def create(self, request):
        data = request.data
        artist_id = data.pop('artist_id')
        # For testing
        # TODO: Remove later
        # artist_id = settings.TEST_ARTIST_ID
        artist = User.objects.get(pk=artist_id)

        icon_order = IconOrder.objects.create(artist=artist, price=8.0, status="created", **data)
        serializer = self.serializer_class(icon_order)

        return Response(serializer.data)


class IconMakerAPI(generics.GenericAPIView):
    permission_classes = [BaseUserPermissions, ]

    def get(self, request):
        # For now, use fixed user id
        #artist_id = request.GET.get("artist_id", "d9d5c4f7-8977-4181-a94a-cc811c15b4be")
        artist_id = request.GET.get("artist_id")
        is_setup = request.GET.get("is_setup")

        if is_setup == "true":
            prefix = f"uploaded_icons/{artist_id}"
        else:
            prefix = f"icons/{artist_id}"

        response = s3_client.list_objects(
            Bucket=settings.AWS_BUCKET_NAME,
            Prefix=prefix,
        )

        icon_parts = {
            "hair": 0,
            "bang": 0,
            "side": 0,
            "eyes": 0,
            "eyebrows": 0,
            "nose": 0,
            "mouth": 0,
            "cloth": 0,
            "face": 0,
            "accessories": 0,
            "glasses": 0,
        }
        if "Contents" in response:
            for content in response["Contents"]:
                key = content['Key']
                for part in icon_parts.keys():
                    file_name = key.split("/")[-1]
                    if file_name.startswith(part) and "_line" not in file_name:
                        icon_parts[part] += 1

        return Response(icon_parts)

class IconioAPI(generics.GenericAPIView):
    permission_classes = [BaseUserPermissions, ]

    def get(self, request, token):
        # For now, use fixed user id
        #artist_id = request.GET.get("artist_id", "d9d5c4f7-8977-4181-a94a-cc811c15b4be")
        artist_id = request.GET.get("artist_id")

        prefix = f"icons/{artist_id}"

        response = s3_client.list_objects(
            Bucket=settings.AWS_BUCKET_NAME,
            Prefix=prefix,
        )

        icon_parts = {
            "hair": 0,
            "bang": 0,
            "side": 0,
            "eyes": 0,
            "eyebrows": 0,
            "nose": 0,
            "mouth": 0,
            "cloth": 0,
            "face": 0,
            "accessories": 0,
            "glasses": 0,
        }
        if "Contents" in response:
            for content in response["Contents"]:
                key = content['Key']
                for part in icon_parts.keys():
                    file_name = key.split("/")[-1]
                    if file_name.startswith(part) and "_line" not in file_name:
                        icon_parts[part] += 1

        return Response(icon_parts)

class IconioDownloadAPI(generics.GenericAPIView):
    serializer_class = IconOrderSerializer
    permission_classes = [BaseUserPermissions, ]

    def get(self, request):
        print("get")
        oidb64 = request.GET.get('token')
        order_id = force_text(urlsafe_base64_decode(oidb64))
        print("order_id", order_id)
        try:
            icon_order = IconOrder.objects.get(id=order_id)
        except(IconOrder.DoesNotExist):
            return Response({"token": "The token is invalid."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(icon_order)
        return Response(serializer.data)


class IconMakerCleanupAPI(generics.GenericAPIView):
    permission_classes = [BaseUserPermissions, ]

    def post(self, request):
        # For now, use fixed user id
        #artist_id = request.GET.get("artist_id", "d9d5c4f7-8977-4181-a94a-cc811c15b4be")
        artist_id = request.data.get("artist_id")

        prefix = f"uploaded_icons/{artist_id}"

        response = s3_client.list_objects(
            Bucket=settings.AWS_BUCKET_NAME,
            Prefix=prefix,
        )

        cleaned_icon_parts = {
            "hair": [],
            "bang": [],
            "side": [],
            "eyes": [],
            "eyebrows": [],
            "nose": [],
            "mouth": [],
            "cloth": [],
            "face": [],
            "accessories": [],
            "glasses": [],
        }
        if "Contents" in response:
            for content in response["Contents"]:
                key = content['Key']
                for part in cleaned_icon_parts.keys():
                    file_name = key.split("/")[-1]
                    if file_name.startswith(part) and "_line" not in file_name:
                        n_key = file_name.split(".")[0].replace(part, "")
                        n_key = int(n_key)
                        cleaned_icon_parts[part].append(n_key)

        icon_parts = {
        }
        for icon_part, keys in cleaned_icon_parts.items():
            is_filling_file = True if icon_part not in line_only_elements else False
            self.clean_up_files(artist_id, icon_part, keys, is_filling_file)
            icon_parts[icon_part] = len(keys)

        return Response(icon_parts)

    def clean_up_files(self, artist_id, icon_part, n_keys, is_filling_file):
        n_keys.sort()

        outrange_file_numbers = []
        unmatched_file_numbers = []

        for num in range(1, len(n_keys)+1):
            if num not in n_keys:
                unmatched_file_numbers.append(num)

        for n_key in n_keys:
            if n_key < 1 or n_key > len(n_keys):
                outrange_file_numbers.append(n_key)

        # outrange_file_numbers and unmatched_file_numbers should have the same length
        if len(outrange_file_numbers) == len(unmatched_file_numbers):
            for i in range(len(unmatched_file_numbers)):
                from_num = outrange_file_numbers[i]
                to_num = unmatched_file_numbers[i]
                key = f"uploaded_icons/{artist_id}/{icon_part}{from_num}.png"
                copy_source = {'Bucket': settings.AWS_BUCKET_NAME, 'Key': key}
                s3_client.copy_object(
                    CopySource=copy_source, Bucket=settings.AWS_BUCKET_NAME,
                    Key=f"uploaded_icons/{artist_id}/{icon_part}{to_num}.png"
                )
                s3_client.delete_object(Bucket=settings.AWS_BUCKET_NAME, Key=key)

                if is_filling_file:
                    copy_source = {'Bucket': settings.AWS_BUCKET_NAME,
                                   'Key': f"uploaded_icons/{artist_id}/{icon_part}_line{from_num}.png"}
                    s3_client.copy_object(
                        CopySource=copy_source, Bucket=settings.AWS_BUCKET_NAME,
                        Key=f"uploaded_icons/{artist_id}/{icon_part}_line{to_num}.png"
                    )
                    s3_client.delete_object(Bucket=settings.AWS_BUCKET_NAME,
                                            Key=f"uploaded_icons/{artist_id}/{icon_part}_line{from_num}.png")


class IconMakerSetupAPI(generics.GenericAPIView):
    permission_classes = [BaseUserPermissions, ]
    parser_classes = [MultiPartParser, FormParser, ]

    def post(self, request):
        # Upload new images
        line_only_elements = ["nose", "accessories", "glasses"]
        data = request.data
        artist_id = data['artist_id']
        icon_part = data['icon_part']

        if icon_part in line_only_elements:
            icon_part_prefix = f"{icon_part}"
        else:
            icon_part_prefix = f"{icon_part}_line"

        is_deleted = data.get('is_deleted', False)

        response = s3_client.list_objects(
            Bucket=settings.AWS_BUCKET_NAME,
            Prefix=f"uploaded_icons/{artist_id}/{icon_part_prefix}"
        )

        keys = []
        num_keys = []
        if "Contents" in response:
            for content in response["Contents"]:
                key = content['Key']
                if key.endswith(".png"):
                    keys.append(key)
                    file_name = key.split("/")[-1]
                    n_key = file_name.split(".")[0].replace(icon_part_prefix, "")
                    num_keys.append(int(n_key))

        num_keys.sort()
        n_keys = len(keys)

        if is_deleted:
            file_numbers_str = data['file_numbers']
            file_numbers = [int(file_number) for file_number in file_numbers_str.split(",")]
            file_numbers.sort()
            n_removed = 0

            for num_key in num_keys:
                if num_key in file_numbers:
                    key = f"uploaded_icons/{artist_id}/{icon_part_prefix}{num_key}.png"
                    s3_client.delete_object(
                        Bucket=settings.AWS_BUCKET_NAME,
                        Key=key,
                    )
                    if icon_part not in line_only_elements:
                        s3_client.delete_object(
                            Bucket=settings.AWS_BUCKET_NAME,
                            Key=f"uploaded_icons/{artist_id}/{icon_part}{num_key}.png",
                        )
                    n_removed += 1
                else:
                    if n_removed > 0:
                        key = f"uploaded_icons/{artist_id}/{icon_part_prefix}{num_key}.png"
                        copy_source = {'Bucket': settings.AWS_BUCKET_NAME, 'Key': key}
                        s3_client.copy_object(
                            CopySource=copy_source, Bucket=settings.AWS_BUCKET_NAME, Key=f"uploaded_icons/{artist_id}/{icon_part_prefix}{num_key-n_removed}.png"
                        )
                        s3_client.delete_object(Bucket=settings.AWS_BUCKET_NAME, Key=key)
                        if icon_part not in line_only_elements:
                            copy_source = {'Bucket': settings.AWS_BUCKET_NAME, 'Key': f"uploaded_icons/{artist_id}/{icon_part}{num_key}.png"}
                            s3_client.copy_object(
                                CopySource=copy_source, Bucket=settings.AWS_BUCKET_NAME, Key=f"uploaded_icons/{artist_id}/{icon_part}{num_key-n_removed}.png"
                            )
                            s3_client.delete_object(Bucket=settings.AWS_BUCKET_NAME, Key=f"uploaded_icons/{artist_id}/{icon_part}{num_key}.png")

            icon_parts = {"updated_key": icon_part,
                          "updated_value": n_keys - n_removed}
            return Response(icon_parts)

        if icon_part not in line_only_elements:
            request.data._mutable = True
            line_image_ls = request.data.pop('line_image')
            filling_image_ls = request.data.pop('filling_image')
            request.data._mutable = False

            line_image = line_image_ls[0]
            filling_image = filling_image_ls[0]

            is_upload_images = {}
            if isinstance(line_image, InMemoryUploadedFile) or isinstance(line_image, TemporaryUploadedFile):
                image_name = f"{icon_part}_line{n_keys+1}.png"
                #data['eyes_image'] = image_name
                line_image.name = image_name
                is_upload_images['line_image'] = line_image

            if isinstance(filling_image, InMemoryUploadedFile) or isinstance(filling_image, TemporaryUploadedFile):
                image_name = f"{icon_part}{n_keys+1}.png"
                #data['eyeballs_image'] = image_name
                filling_image.name = image_name
                is_upload_images['filling_image'] = filling_image

            icon_parts = {"updated_key": icon_part,
                          "updated_value": n_keys}

            if is_upload_images:
                added_flag = False
                if "line_image" in is_upload_images.keys() and "filling_image" in is_upload_images.keys():
                    v_line = is_upload_images["line_image"]
                    upload_to_s3(v_line, f'uploaded_icons/{artist_id}/{v_line.name}')
                    v_filling = is_upload_images["filling_image"]
                    upload_to_s3(v_filling, f'uploaded_icons/{artist_id}/{v_filling.name}')
                    added_flag = True

                if added_flag:
                    icon_parts["updated_value"] += 1
                #else:
                    # TODO: Return Error


            return Response(icon_parts)

        # This is for non-paired parts
        request.data._mutable = True
        img0 = request.data.pop('image0') if 'image0' in request.data else None
        img1 = request.data.pop('image1') if 'image1' in request.data else None
        img2 = request.data.pop('image2') if 'image2' in request.data else None
        img3 = request.data.pop('image3') if 'image3' in request.data else None
        img4 = request.data.pop('image4') if 'image4' in request.data else None

        is_upload_images = {}
        n_uploaded_images = 0

        if img0:
            image = img0[0]
            if isinstance(image, InMemoryUploadedFile) or isinstance(image, TemporaryUploadedFile):
                n_uploaded_images += 1
                image_name = f"{icon_part}{n_keys+n_uploaded_images}.png"
                #data['image0'] = image_name
                image.name = image_name
                is_upload_images['image0'] = image
        if img1:
            image = img1[0]
            if isinstance(image, InMemoryUploadedFile) or isinstance(image, TemporaryUploadedFile):
                n_uploaded_images += 1
                image_name = f"{icon_part}{n_keys+n_uploaded_images}.png"
                #data['image1'] = image_name
                image.name = image_name
                is_upload_images['image1'] = image
        if img2:
            image = img2[0]
            if isinstance(image, InMemoryUploadedFile) or isinstance(image, TemporaryUploadedFile):
                n_uploaded_images += 1
                image_name = f"{icon_part}{n_keys+n_uploaded_images}.png"
                #data['image2'] = image_name
                image.name = image_name
                is_upload_images['image2'] = image

        if img3:
            image = img3[0]
            if isinstance(image, InMemoryUploadedFile) or isinstance(image, TemporaryUploadedFile):
                n_uploaded_images += 1
                image_name = f"{icon_part}{n_keys+n_uploaded_images}.png"
                #data['image3'] = image_name
                image.name = image_name
                is_upload_images['image3'] = image

        if img4:
            image = img4[0]
            if isinstance(image, InMemoryUploadedFile) or isinstance(image, TemporaryUploadedFile):
                n_uploaded_images += 1
                image_name = f"{icon_part}{n_keys+n_uploaded_images}.png"
                #data['image4'] = image_name
                image.name = image_name
                is_upload_images['image4'] = image

        icon_parts = {"updated_key": icon_part,
                      "updated_value": n_keys}
        if is_upload_images:
            for k, v in is_upload_images.items():
                upload_to_s3(v, f'uploaded_icons/{artist_id}/{v.name}')
                icon_parts["updated_value"] += 1

        return Response(icon_parts)


from paypal.standard.forms import PayPalPaymentsForm

class PayPalAPI(generics.GenericAPIView):
    permission_classes = [BaseUserPermissions, ]

    def get(self, request):
        #order_id = "f66bdb6f83b04b02b70c56d84f9e5b43"
        order_id = request.GET.get("order_id")
        order = get_object_or_404(IconOrder, id=order_id)
        #order = IconOrder.objects.create(artist=user, price=50.0)
        host = settings.SITE_URL

        paypal_dict = {
            'business': settings.PAYPAL_RECEIVER_EMAIL,
            'amount': '%.2f' % order.price,
            'item_name': f"Order {order.id}",
            'invoice': str(order.id),
            'currency_code': 'USD',
            'notify_url': "https://ec2b-73-53-58-51.ngrok.io/api/webhooks/paypal/",
            'return_url': f"{host}/iconio/payment/paypal/done",
            #'cancel_return': f"http://{host}{reverse('payment_cancelled')}",
        }

        form = PayPalPaymentsForm(initial=paypal_dict)
        return Response({"form": form.render()})
        """
        r = HttpResponse(form.render())
        print(r.content)
        print(r.__dir__())
        return HttpResponse(form.render())
        """

from paypalrestsdk import notifications

@method_decorator(csrf_exempt, name="dispatch")
class ProcessWebhookView(generics.GenericAPIView):
    serializer_class = PayPalWebhookSerializer

    def post(self, request):

        if "HTTP_PAYPAL_TRANSMISSION_ID" not in request.META:
            return HttpResponseBadRequest()

        auth_algo = request.META['HTTP_PAYPAL_AUTH_ALGO']
        cert_url = request.META['HTTP_PAYPAL_CERT_URL']
        transmission_id = request.META['HTTP_PAYPAL_TRANSMISSION_ID']
        transmission_sig = request.META['HTTP_PAYPAL_TRANSMISSION_SIG']
        transmission_time = request.META['HTTP_PAYPAL_TRANSMISSION_TIME']
        webhook_id = settings.PAYPAL_WEBHOOK_ID
        event_body = request.body.decode(request.encoding or "utf-8")

        valid = notifications.WebhookEvent.verify(
            transmission_id=transmission_id,
            timestamp=transmission_time,
            webhook_id=webhook_id,
            event_body=event_body,
            cert_url=cert_url,
            actual_sig=transmission_sig,
            auth_algo=auth_algo,
        )

        if not valid:
            return HttpResponseBadRequest()

        webhook_event = json.loads(event_body)

        webhook_id = webhook_event["id"]
        event_type = webhook_event["event_type"]
        resource = webhook_event["resource"]

        PAYMENT_CAPTURE_COMPLETED = "PAYMENT.CAPTURE.COMPLETED"
        CHECKOUT_ORDER_APPROVED = "CHECKOUT.ORDER.APPROVED"

        if event_type == PAYMENT_CAPTURE_COMPLETED:
            order_id = resource.get("supplementary_data", {}).get("related_ids", {}).get("order_id", "")
            paypal_webhook = PayPalWebhook.objects.create(
                event_type=event_type,
                webhook_id = webhook_id,
                paypal_order_id = order_id,
                resource = resource
            )
            serializer = self.serializer_class(paypal_webhook)

        elif event_type == CHECKOUT_ORDER_APPROVED:
            order_id = resource["id"]
            paypal_webhook = PayPalWebhook.objects.create(
                event_type=event_type,
                webhook_id=webhook_id,
                paypal_order_id=order_id,
                resource=resource
            )
            serializer = self.serializer_class(paypal_webhook)
            """
            # TODO: Send receipt email with download link
            product_link = "https://learn.justdjango.com"
            send_mail(
                subject="Your access",
                message=f"Thank you for purchasing my product. Here is the link: {product_link}",
                from_email="your@email.com",
                recipient_list=[customer_email]
            )
            """
        else:
            order_id = ""
            paypal_webhook = PayPalWebhook.objects.create(
                event_type=event_type,
                webhook_id=webhook_id,
                paypal_order_id=order_id,
                resource=resource
            )
            serializer = self.serializer_class(paypal_webhook)


        return HttpResponse()

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

class CommunityPostViewSet(viewsets.ModelViewSet):
    permission_classes = [BaseUserPermissions, ]
    #parser_classes = [FormParser, ]
    parser_classes = [MultiPartParser, FormParser, ]
    serializer_class = CommunityPostSerializer
    queryset = CommunityPost.objects.all()

    def list(self, request):
        post_id = request.GET.get("postId")
        if post_id:
            community_post = CommunityPost.objects.get(pk=post_id)
            community_replies = CommunityReply.objects.filter(community_post=post_id).order_by('posted_time')

            custom_data = {
                'community_post': self.serializer_class(community_post).data,
                'replies': CommunityReplySerializer(community_replies, many=True).data,
            }
            return Response(custom_data)

        category = request.GET.get("category")
        if category:
            queryset = CommunityPost.objects.filter(category=category).order_by('-posted_time')
        else:
            queryset = CommunityPost.objects.order_by('-posted_time')

        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        is_upload_image = False
        image = request.data.get('image')
        image_name = None
        if image:
            if isinstance(image, InMemoryUploadedFile):
                image_name = image.name
                is_upload_image = True

        category = request.data.get("category")[0]
        title = request.data["title"]
        body = request.data["body"]

        community_post = CommunityPost.objects.create(
            user=request.user, category=category, image=image_name, title=title, body=body)
        serializer = self.serializer_class(community_post)

        if is_upload_image:
            upload_to_s3(image, f'communities/{community_post.id}/{image_name}')

        return Response(serializer.data)

class CommunityReplyViewSet(viewsets.ModelViewSet):
    permission_classes = [BaseUserPermissions, ]
    #parser_classes = [FormParser, ]
    serializer_class = CommunityReplySerializer

    def create(self, request):
        post_id = request.data.pop("post_id")
        community_post = CommunityPost.objects.get(pk=post_id)
        body = request.data.pop("msg")
        request.data["body"] = body
        community_reply = CommunityReply.objects.create(user=request.user, community_post=community_post, **request.data)
        serializer = self.serializer_class(community_reply)
        return Response(serializer.data)

def upload_to_s3(image, key):
    client = boto3.client(
        "s3",
        aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
        aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
        region_name=settings.AWS_REGION
    )

    client.put_object(Bucket=settings.AWS_BUCKET_NAME, Key=key, Body=image)

class AccountActivateAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, uidb64, token):
        logger.info("Logger: AccountActivateAPI")
        try:
            uid = force_text(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            user = None

        if user is not None and user.is_active and user.is_activated:
            _, token = AuthToken.objects.create(user)
            return Response({
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "token": token
            })

        if user is not None and not account_activation_token.check_token(user, token):
            return Response({"token": "The token is invalid."}, status=status.HTTP_400_BAD_REQUEST)

        elif user is not None and user.is_active and account_activation_token.check_token(user, token):
            user.is_activated = True
            user.save()
            # login(request, user)
            # return redirect('home')
            _, token = AuthToken.objects.create(user)

            return Response({
                "user": UserSerializer(user, context=self.get_serializer_context()).data,
                "token": token
            })
        elif user is not None and not user.is_active:
            # TODO: error message like please reach out to OS
            return Response({"token": "The user is not active."}, status=status.HTTP_400_BAD_REQUEST)

        return Response({"token": "The link is invalid."}, status=status.HTTP_400_BAD_REQUEST)


