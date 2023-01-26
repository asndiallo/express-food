from djongo import models
from menus.models import Menu
from deliverers.models import Deliverer


class Customer(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    last_name = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    birthday = models.DateTimeField()
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    phone = models.CharField(max_length=15)
    address = models.CharField(max_length=255)
    zip = models.IntegerField()
    country = models.CharField(max_length=255)

    def __str__(self):
        return self.first_name + " " + self.last_name


class Cart(models.Model):
    _id = models.ObjectIdField()
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)
    quantity = models.IntegerField()


class Order(models.Model):
    _id = models.ObjectIdField(primary_key=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    menus = models.ManyToManyField(Menu)
    deliverer = models.ForeignKey(
        Deliverer, on_delete=models.CASCADE, null=True, blank=True)
    order_time = models.DateTimeField(auto_now_add=True)
    delivery_time = models.DateTimeField(
        auto_now_add=True, null=True, blank=True)
    delivered = models.BooleanField(default=False)
    total_cost = models.DecimalField(max_digits=5, decimal_places=2)
