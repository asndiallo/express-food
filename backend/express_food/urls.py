from django.urls import path
from . import views

urlpatterns = [
    # other routes
    path('create_customer/', views.create_customer, name='create_customer'),
    path('customers/', views.CustomerListView.as_view(), name='customer_list'),
    path('customer/<int:pk>/', views.CustomerDetailView.as_view(), name='customer_detail'),
]
