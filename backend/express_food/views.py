from bson import ObjectId
from rest_framework import generics
from .models import Customer
from .serializers import CustomerSerializer


class CustomerList(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer


class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    lookup_field = 'pk'

    def get_object(self):
        return Customer.objects.get(_id=ObjectId(self.kwargs[self.lookup_field]))
