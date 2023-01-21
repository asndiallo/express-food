from django.urls import path
from .views import CustomerList, CustomerDetail, SignupView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('', CustomerList.as_view(), name='customer_list'),
    path('customer/<str:pk>/', CustomerDetail.as_view(), name='customer_detail'),
]