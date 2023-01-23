from django.urls import path
from .views import CustomerList, CustomerDetail, SignupView, LoginView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('', CustomerList.as_view(), name='customer_list'),
    path('<str:pk>/', CustomerDetail.as_view(), name='customer_detail'),
]
