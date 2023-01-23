from django.urls import path
from .views import DelivererList, DelivererDetail

urlpatterns = [
    path('', DelivererList.as_view(), name='deliverer_list'),
    path('<str:pk>/', DelivererDetail.as_view(), name='deliverer_detail'),
]
