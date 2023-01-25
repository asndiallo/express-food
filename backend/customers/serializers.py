from rest_framework import serializers
from bson import ObjectId
from .models import Customer, Cart
from menus.models import Menu


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


class LoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()


class CartSerializer(serializers.ModelSerializer):
    customer = serializers.CharField()
    menu = serializers.CharField()

    def validate(self, data):
        data['customer'] = ObjectId(data['customer'])
        data['menu'] = ObjectId(data['menu'])
        return data

    def save(self, **kwargs):
        customer = Customer.objects.get(
            _id=ObjectId(self.validated_data.get('customer')))
        menu = Menu.objects.get(_id=ObjectId(self.validated_data.get('menu')))
        self.validated_data.update({'customer': customer, 'menu': menu})
        return super().save(**kwargs)

    class Meta:
        model = Cart
        fields = ('_id', 'customer', 'menu', 'quantity')
