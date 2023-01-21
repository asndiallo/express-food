from bson import ObjectId
from rest_framework import generics, status
from rest_framework.response import Response
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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
            headers=headers
        )

    def perform_create(self, serializer):
        # Hash the user's password before saving it to the database
        password = serializer.validated_data.pop('password')
        hashed_password = make_password(password)
        serializer.validated_data['password'] = hashed_password
        # Create a new customer object and save it to the database
        customer = Customer.objects.create(**serializer.validated_data)
        customer.save()
