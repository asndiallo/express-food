from bson import ObjectId
from rest_framework import generics
from .models import Menu
from .serializers import MenuSerializer


class MenuTypeView(generics.ListAPIView):
    serializer_class = MenuSerializer

    def get_queryset(self):
        menu_type = self.kwargs['menu_type']
        return Menu.objects.filter(type=menu_type)


class MenuTypeDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    lookup_field = 'pk'

    def get_object(self):
        return Menu.objects.get(_id=ObjectId(self.kwargs[self.lookup_field]))


class MenuCreateView(generics.CreateAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
