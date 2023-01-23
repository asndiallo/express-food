from django.urls import path
from .views import MenuList, MenuDetail, DishList, DishDetail, DessertList, DessertDetail

urlpatterns = [
    path('', MenuList.as_view(), name='menu_list'),
    path('menu/<str:pk>/', MenuDetail.as_view(), name='menu_detail'),
    path('dishes/', DishList.as_view(), name='dish_list'),
    path('dishes/<str:pk>/', DishDetail.as_view(), name='dish_detail'),
    path('desserts/', DessertList.as_view(), name='dessert_list'),
    path('desserts/<str:pk>/', DessertDetail.as_view(), name='dessert_detail'),
]
