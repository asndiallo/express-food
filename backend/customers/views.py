from bson import ObjectId
from rest_framework import generics
from django.contrib.auth.hashers import make_password
from .models import Customer
from .serializers import CustomerSerializer, SignupSerializer


class CustomerList(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    lookup_field = 'pk'

    def get_object(self):
        return Customer.objects.get(_id=ObjectId(self.kwargs[self.lookup_field]))


class SignupView(generics.CreateAPIView):
    serializer_class = SignupSerializer

    def perform_create(self, serializer):
        # Hash the user's password before saving it to the database
        password = serializer.validated_data.pop('password')
        hashed_password = make_password(password)
        serializer.validated_data['password'] = hashed_password
        # Create a new customer object and save it to the database
        customer = Customer(**serializer.validated_data)
        customer.save()