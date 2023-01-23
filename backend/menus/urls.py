from django.urls import path
from .views import MenuList, MenuDetail

urlpatterns = [
    path('', MenuList.as_view(), name='menu_list'),
    path('<str:pk>/', MenuDetail.as_view(), name='menu_detail'),
]
