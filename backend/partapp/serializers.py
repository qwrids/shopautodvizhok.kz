from .models import *
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2',
            'email')


    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Пароли не совпадают."})
        return attrs
    
    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        return user


class GoodSerializer(serializers.ModelSerializer):
    class Meta:
        fields = "__all__"
        model = GoodModel


class CartSerializer(serializers.ModelSerializer):
    good = serializers.SerializerMethodField()

    def get_good(self, obj):
        ser = GoodSerializer(obj.good_id)
        return ser.data
    class Meta:
        fields = "__all__"
        model = CartModel


class OrderSerializer(serializers.ModelSerializer):
    good = serializers.SerializerMethodField()

    def get_good(self, obj):
        ser = GoodSerializer(obj.good_id)
        return ser.data
    class Meta:
        fields = "__all__"
        model = OrderModel