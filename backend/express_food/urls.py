from django.urls import path
from . import views

urlpatterns = [
    # other routes
    #path('create_customer/', views.create_customer, name='create_customer'),
    path('', views.CustomerListView.as_view(), name='customer_list'),
    path('customer/<str:pk>/', views.customer_detail, name='customer_detail'),
]
