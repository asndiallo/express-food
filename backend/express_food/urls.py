from django.urls import path
from .views import CustomerList, CustomerDetail

urlpatterns = [
    # other routes
    #path('create_customer/', views.create_customer, name='create_customer'),
    path('', CustomerList.as_view(), name='customer_list'),
    path('customer/<str:pk>/', CustomerDetail.as_view(), name='customer_detail'),
]
