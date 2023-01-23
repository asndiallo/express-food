from bson import ObjectId
from rest_framework import generics
from .models import Menu
from .serializers import MenuSerializer


class MenuList(generics.ListCreateAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer


class MenuDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    lookup_field = 'pk'

    def get_object(self):
        return Menu.objects.get(_id=ObjectId(self.kwargs[self.lookup_field]))


class DishList(generics.ListCreateAPIView):
    queryset = Menu.objects.filter(type='dish')
    serializer_class = MenuSerializer


class DishDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Menu.objects.filter(type='dish')
    serializer_class = MenuSerializer
    lookup_field = 'pk'

    def get_object(self):
        return Menu.objects.get(_id=ObjectId(self.kwargs[self.lookup_field]))


class DessertList(generics.ListCreateAPIView):
    queryset = Menu.objects.filter(type='dessert')
    serializer_class = MenuSerializer


class DessertDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Menu.objects.filter(type='dessert')
    serializer_class = MenuSerializer
    lookup_field = 'pk'

    def get_object(self):
        return Menu.objects.get(_id=ObjectId(self.kwargs[self.lookup_field]))
