import json
from rest_framework import (
    status, viewsets, permissions, generics,
    parsers, renderers, views
)
from rest_framework.response import Response
from rest_framework.parsers import (
    MultiPartParser, FormParser, FileUploadParser, FormParser
)

from django.http import HttpResponse
from django_rest_passwordreset.signals import reset_password_token_created
from django.template.loader import render_to_string
from django.core.files.uploadedfile import InMemoryUploadedFile, TemporaryUploadedFile
from django.conf import settings
from django.dispatch import receiver
from django.shortcuts import get_object_or_404
from django.urls import reverse

from knox.models import AuthToken

import boto3
from decimal import Decimal

from .models import (
    User, Profile, Portfolio,
    CommunityPost, CommunityReply,
    IconOrder
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
)
from .permissions import BaseUserPermissions, BaseTransactionPermissions

from .tasks import send_email, send_bcc_email

s3_client = boto3.client(
    "s3",
    aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
    aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
    region_name=settings.AWS_REGION
)

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

class ArtistAPI(generics.RetrieveAPIView):
    serializer_class = PortfolioSerializer

    def get(self, request):
        styles = request.GET.get("styles")

        queryset = Portfolio.objects.all()
        queryset = queryset.filter(user__is_staff=False)
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
    permission_classes = [BaseUserPermissions, ]
    #parser_classes = [MultiPartParser, FormParser, ]
    serializer_class = IconOrderSerializer
    queryset = IconOrder.objects.all()

    def create(self, request):
        data = request.data
        artist_id = data.pop('artist_id')
        # For testing
        artist_id = settings.TEST_ARTIST_ID

        artist = User.objects.get(pk=artist_id)
        icon_order = IconOrder.objects.create(artist=artist, price=8.0, status="created", **data)
        serializer = self.serializer_class(icon_order)

        return Response(serializer.data)

class IconMakerAPI(generics.GenericAPIView):
    permission_classes = [BaseUserPermissions, ]

    def get(self, request):
        # For now, use fixed user id
        artist_id = request.GET.get("artist_id", "d9d5c4f7-8977-4181-a94a-cc811c15b4be")
        response = s3_client.list_objects(
            Bucket=settings.AWS_BUCKET_NAME,
            Prefix=f"icons/{artist_id}",
        )
        #print(response)

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
        }
        if "Contents" in response:
            for content in response["Contents"]:
                key = content['Key']
                for part in icon_parts.keys():
                    file_name = key.split("/")[-1]
                    if file_name.startswith(part) and "_line" not in file_name:
                        icon_parts[part] += 1

        #print(f"Icon Parts {icon_parts}")
        return Response(icon_parts)

class IconMakerSetupAPI(generics.GenericAPIView):
    permission_classes = [BaseUserPermissions, ]
    parser_classes = [MultiPartParser, FormParser, ]

    def post(self, request):
        # Upload new images
        data = request.data
        artist_id = data['artist_id']
        icon_part = data['icon_part']

        is_deleted = data.get('is_deleted', False)

        response = s3_client.list_objects(
            Bucket=settings.AWS_BUCKET_NAME,
            Prefix=f"icons/{artist_id}/{icon_part}",
        )

        keys = []
        if "Contents" in response:
            for content in response["Contents"]:
                key = content['Key']
                if key.endswith(".png"):
                    keys.append(key)

        keys.sort()
        n_keys = len(keys)

        if is_deleted:
            file_numbers_str = data['file_numbers']
            file_numbers = [int(file_number) for file_number in file_numbers_str.split(",")]
            file_numbers.sort()
            full_files = []
            n_removed = 0

            for key in keys:
                n_key = key.split("/")[-1].split(".")[0].replace(icon_part, "")
                n_key = int(n_key)
                if n_key in file_numbers:
                    s3_client.delete_object(
                        Bucket=settings.AWS_BUCKET_NAME,
                        Key=key,
                    )
                    if icon_part == "eyes":
                        s3_client.delete_object(
                            Bucket=settings.AWS_BUCKET_NAME,
                            Key=f"icons/{artist_id}/eyeballs{n_key}.png",
                        )
                    n_removed += 1
                else:
                    if n_removed > 0:
                        copy_source = {'Bucket': settings.AWS_BUCKET_NAME, 'Key': key}
                        s3_client.copy_object(
                            CopySource=copy_source, Bucket=settings.AWS_BUCKET_NAME, Key=f"icons/{artist_id}/{icon_part}{n_key-n_removed}.png"
                        )
                        s3_client.delete_object(Bucket=settings.AWS_BUCKET_NAME, Key=key)
                        if icon_part == "eyes":
                            s3_client.copy_object(
                                CopySource=copy_source, Bucket=settings.AWS_BUCKET_NAME, Key=f"icons/{artist_id}/eyeballs{n_key-n_removed}.png"
                            )
                            s3_client.delete_object(Bucket=settings.AWS_BUCKET_NAME, Key=f"icons/{artist_id}/eyeballs{n_key}.png")

            icon_parts = {"updated_key": icon_part,
                          "updated_value": n_keys - n_removed}
            return Response(icon_parts)

        if icon_part == "eyes":
            request.data._mutable = True
            eyes_image_ls = request.data.pop('eyes_image')
            eyeballs_image_ls = request.data.pop('eyeballs_image')
            request.data._mutable = False

            eyes_image = eyes_image_ls[0]
            eyeballs_image = eyeballs_image_ls[0]

            is_upload_images = {}
            if isinstance(eyes_image, InMemoryUploadedFile) or isinstance(eyes_image, TemporaryUploadedFile):
                image_name = f"{icon_part}{n_keys+1}.png"
                #data['eyes_image'] = image_name
                eyes_image.name = image_name
                is_upload_images['eyes_image'] = eyes_image

            if isinstance(eyeballs_image, InMemoryUploadedFile) or isinstance(eyeballs_image, TemporaryUploadedFile):
                image_name = f"eyeballs{n_keys+1}.png"
                #data['eyeballs_image'] = image_name
                eyeballs_image.name = image_name
                is_upload_images['eyeballs_image'] = eyeballs_image

            icon_parts = {"updated_key": icon_part,
                          "updated_value": n_keys}

            if is_upload_images:
                if "eyes_image" in is_upload_images.keys() and "eyeballs_image" in is_upload_images.keys():
                    v_eyes = is_upload_images["eyes_image"]
                    upload_to_s3(v_eyes, f'icons/{artist_id}/{v_eyes.name}')
                    v_eyeballs = is_upload_images["eyeballs_image"]
                    upload_to_s3(v_eyeballs, f'icons/{artist_id}/{v_eyeballs.name}')

                    icon_parts["updated_value"] += 1

            return Response(icon_parts)


        request.data._mutable = True
        img0 = request.data.pop('image0') if 'image0' in request.data else None
        img1 = request.data.pop('image1') if 'image1' in request.data else None
        img2 = request.data.pop('image2') if 'image2' in request.data else None
        img3 = request.data.pop('image3') if 'image3' in request.data else None
        img4 = request.data.pop('image4') if 'image4' in request.data else None
        img5 = request.data.pop('image5') if 'image5' in request.data else None

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

        if img5:
            image = img5[0]
            if isinstance(image, InMemoryUploadedFile) or isinstance(image, TemporaryUploadedFile):
                n_uploaded_images += 1
                image_name = f"{icon_part}{n_keys+n_uploaded_images}.png"
                #data['image5'] = image_name
                image.name = image_name
                is_upload_images['image5'] = image

        icon_parts = {"updated_key": icon_part,
                      "updated_value": n_keys}
        if is_upload_images:
            for k, v in is_upload_images.items():
                upload_to_s3(v, f'icons/{artist_id}/{v.name}')
                icon_parts["updated_value"] += 1

        return Response(icon_parts)


from paypal.standard.forms import PayPalPaymentsForm

class PayPalAPI(generics.GenericAPIView):
    permission_classes = [BaseUserPermissions, ]

    def get(self, request):
        #order_id = "f66bdb6f83b04b02b70c56d84f9e5b43"
        order_id = request.GET.get("order_id")
        print("order_id", order_id)
        order = get_object_or_404(IconOrder, id=order_id)
        #order = IconOrder.objects.create(artist=user, price=50.0)
        host = settings.SITE_URL

        paypal_dict = {
            'business': settings.PAYPAL_RECEIVER_EMAIL,
            'amount': '%.2f' % order.price,
            'item_name': f"Order {order.id}",
            'invoice': str(order.id),
            'currency_code': 'USD',
            #'notify_url': f"http://{host}{reverse('paypal-ipn')}",
            'return_url': f"{host}/payment/paypal/done",
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