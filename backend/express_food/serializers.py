from rest_framework import serializers
from .models import Customer


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("_id", "last_name", "first_name", "birthday",
                  "email", "phone", "address", "zip", "country",)
        model = Customer


class SignupSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    birthday = serializers.DateField()
    phone = serializers.CharField()
    address = serializers.CharField()
    zip = serializers.CharField()
    country = serializers.CharField()
