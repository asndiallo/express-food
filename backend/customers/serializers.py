from rest_framework import serializers
from bson import ObjectId

from deliverers.models import Deliverer
from .models import Customer, Cart, Order
from menus.models import Menu
from menus.serializers import MenuSerializer


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


class OrderSerializer(serializers.ModelSerializer):
    customer = serializers.CharField()
    deliverer = serializers.CharField()
    menus = serializers.ListField(
        child=serializers.CharField(), write_only=True)
    total_cost = serializers.SerializerMethodField()

    def validate(self, data):
        data['customer'] = ObjectId(data['customer'])
        data['deliverer'] = ObjectId(data['deliverer'])
        data['menus'] = [ObjectId(menu) for menu in data['menus']]
        return data

    def save(self, **kwargs):
        customer = Customer.objects.get(
            _id=ObjectId(self.validated_data.get('customer')))
        deliverer = Deliverer.objects.get(
            _id=ObjectId(self.validated_data.get('deliverer')))
        menus = list(Menu.objects.filter(
            _id__in=[ObjectId(menu) for menu in self.validated_data.get('menus')]))
        total_cost = sum([menu.price for menu in menus])

        print('\n\tCOSTUMER', customer)
        print('\n\tDELIVERER', deliverer)
        print('\n\tMENUS', menus)
        print('\n\tTOTAL_COST', total_cost)
        print('\n\SELF', self, '\n')

        self.validated_data.update({'customer': customer, 'menus': menus,
                                   'deliverer': deliverer})

        return super().save(**kwargs)

    class Meta:
        model = Order
        fields = ('_id', 'customer', 'menus', 'deliverer',
                  'order_time', 'delivery_time', 'delivered', 'total_cost')

    def get_menus(self, obj):
        return obj.menu.all()

    def to_representation(self, instance):
        if isinstance(instance, Order):
            return super(OrderSerializer, self).to_representation(instance)
        self.fields.pop('menus')
        ret = super(OrderSerializer, self).to_representation(instance)
        ret.update({'menus': self.get_menus(instance)})
        return ret
