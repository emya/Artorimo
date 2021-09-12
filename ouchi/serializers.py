from rest_framework import serializers
from rest_framework.exceptions import ErrorDetail, ValidationError
from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework.serializers import as_serializer_error
from rest_framework.fields import empty
from rest_framework.utils import html
from .models import (
    User, Profile, Portfolio,
    CommunityPost, CommunityReply,
    IconOrder
)
from django.conf import settings

from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'is_staff')


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'first_name', 'last_name', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['first_name'],
            validated_data['last_name'],
            validated_data['email'],
            validated_data['password']
        )
        return user


class LoginUserSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        print(f"data: {data}")
        user = authenticate(**data)
        if user and user.is_activated:
            return user

        print(f"user: {user}")
        if user and not user.is_activated:
            raise serializers.ValidationError("This user is not activated yet.")

        raise serializers.ValidationError("Unable to log in with provided credentials.")


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    def clear_val_to_list(self, val):
        if isinstance(val, str):
            val = val.split(",")
        if "" in val:
            val.remove("")

        val.sort()
        return val

    def to_internal_value(self, data):
        tools_val = data.get('tools')
        style_val = data.get('style')
        payment_val = data.get('payment_method')

        if tools_val:
            tools_val = self.clear_val_to_list(tools_val)
        if style_val:
            style_val = self.clear_val_to_list(style_val)
        if payment_val:
            payment_val = self.clear_val_to_list(payment_val)

        output = super(ProfileSerializer, self).to_internal_value(data)
        if tools_val:
            output['tools'] = ','.join(tools_val)
        if style_val:
            output['style'] = ','.join(style_val)
        if payment_val:
            output['payment_method'] = ','.join(payment_val)
        return output

    def to_representation(self, instance):
        tools_val = instance.tools.split(',')
        style_val = instance.style.split(',')
        payment_val = instance.payment_method.split(',')
        output = super(ProfileSerializer, self).to_representation(instance)
        output['tools'] = tools_val
        output['style'] = style_val
        output['payment_method'] = payment_val
        return output

    class Meta:
        model = Profile
        fields = '__all__'

class PortfolioSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    profile = serializers.SerializerMethodField()

    class Meta:
        model = Portfolio
        fields = '__all__'
        extra_fields = ['profile']

    def get_profile(self, instance):
        profile = Profile.objects.get(user=instance.user)
        return ProfileSerializer(profile, read_only=True).data

class CommunityPostSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = CommunityPost
        fields = '__all__'

class CommunityReplySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = CommunityReply
        fields = '__all__'

class IconOrderSerializer(serializers.ModelSerializer):
    artist = UserSerializer(read_only=True)

    class Meta:
        model = IconOrder
        fields = '__all__'