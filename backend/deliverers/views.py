from bson import ObjectId
from rest_framework import generics
from .models import Deliverer
from .serializers import DelivererSerializer


class DelivererList(generics.ListCreateAPIView):
    queryset = Deliverer.objects.all()
    serializer_class = DelivererSerializer


class DelivererDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Deliverer.objects.all()
    serializer_class = DelivererSerializer
    lookup_field = 'pk'

    def get_object(self):
        return Deliverer.objects.get(_id=ObjectId(self.kwargs[self.lookup_field]))
