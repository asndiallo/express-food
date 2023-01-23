from rest_framework import serializers
from .models import Deliverer


class DelivererSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ("_id", "last_name", "first_name", "status",
                  "position", "command_count", "rating")
        model = Deliverer
