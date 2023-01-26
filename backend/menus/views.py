from bson import ObjectId
from random import sample
from rest_framework import generics, views
from rest_framework.response import Response
from .models import Menu
from .serializers import MenuSerializer, TodayMenuSerializer


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


class TodayMenuView(views.APIView):
    def get(self, request):
        dishes = Menu.objects.filter(type='dish')
        desserts = Menu.objects.filter(type='dessert')
        today_dishes = sample(list(dishes), 2)
        today_desserts = sample(list(desserts), 2)
        today_menu = {'today_dishes': today_dishes,
                      'today_desserts': today_desserts}
        serializer = TodayMenuSerializer(today_menu)
        return Response(serializer.data)

class DetailsMenuView(generics.RetrieveAPIView):
    queryset = Menu.objects.all()
    serializer_class = MenuSerializer
    lookup_field = 'menu_name'

    def get_object(self):
        return Menu.objects.get(name=self.kwargs[self.lookup_field])
