from rest_framework import serializers
from .models import Customer


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("_id", "last_name", "first_name", "birthday",
                  "email", "phone", "adresse", "zip", "country",)
        model = Customer
