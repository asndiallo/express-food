from rest_framework import serializers
from .models import Menu


class MenuSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("_id", "name", "description", "price", "type", "image")
        model = Menu

class TodayMenuSerializer(serializers.Serializer):
    today_dishes = MenuSerializer(many=True)
    today_desserts = MenuSerializer(many=True)