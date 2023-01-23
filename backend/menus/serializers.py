from rest_framework import serializers
from .models import Menu


class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("_id", "name", "description", "price", "type")
        model = Menu
