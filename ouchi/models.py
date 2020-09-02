from django.db import models
from django.utils.translation import gettext as _
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

from django.utils import timezone

import uuid

# Create your models here.
class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, first_name, last_name, email, password, **extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        if not email:
            raise ValueError('The given email must be set')
        now = timezone.now()
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            first_name=first_name,
            last_name=last_name,
            is_active=True,
            last_login=now,
            date_joined=now,
            **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, first_name, last_name, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(first_name, last_name, email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(max_length=254, null=True, blank=True)
    last_name = models.CharField(max_length=254, null=True, blank=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    last_login = models.DateTimeField(null=True, blank=True)
    date_joined = models.DateTimeField(auto_now_add=True)
    terms_version = models.IntegerField(default=0)

    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):  # __unicode__ on Python 2
        return self.email

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    user_name = models.CharField(max_length=100, blank=True)
    residence = models.CharField(max_length=100, blank=True)
    # style
    # 0: character, 1: fashion, 2: books, 3: real, 4: comic, 5: games, 6: pop
    # 7: japanese, 8: watercolor, 9: sumie, 10: line drawing, 11: arts, 12: 3D
    style = models.CharField(max_length=100, blank=True)
    work_process = models.CharField(max_length=100, blank=True)
    # employment_type
    # 0: full-time
    # 1: part-time
    employment_type = models.IntegerField(default=-1)
    availability = models.CharField(max_length=100, blank=True)
    achievement = models.CharField(max_length=200, blank=True)
    # tools
    # 0: Adobe illustrator, 1: Adobe photoshop, 2: Adobe indesign, 3: Clip studio
    tools = models.CharField(max_length=100, blank=True)
    skills = models.CharField(max_length=100, blank=True)
    # payment_method
    # 0: Line pay 1: PayPay 2: Pay-easy 3: Paypal 4: Bank
    payment_method = models.CharField(max_length=100, blank=True)
    image = models.CharField(max_length=200, null=True)

class Portfolio(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="portfolio")
    ig = models.CharField(max_length=100, blank=True)
    twitter = models.CharField(max_length=100, blank=True)
    image0 = models.CharField(max_length=200, null=True)
    image1 = models.CharField(max_length=200, null=True)
    image2 = models.CharField(max_length=200, null=True)
    image3 = models.CharField(max_length=200, null=True)
    image4 = models.CharField(max_length=200, null=True)
    image5 = models.CharField(max_length=200, null=True)
    image6 = models.CharField(max_length=200, null=True)
    image7 = models.CharField(max_length=200, null=True)
    image8 = models.CharField(max_length=200, null=True)

class CommunityPost(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    # 0: worry as an illustrator, 1: opinion on illustration
    category = models.IntegerField()
    title = models.CharField(max_length=200)
    body = models.CharField(max_length=700)
    image = models.CharField(max_length=200, null=True, blank=True)
    posted_time = models.DateTimeField(auto_now_add=True)

class CommunityReply(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    community_post = models.ForeignKey(CommunityPost, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.CharField(max_length=350, blank=True)
    posted_time = models.DateTimeField(auto_now_add=True)
