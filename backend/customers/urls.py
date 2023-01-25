from django.urls import path
from .views import CustomerList, CustomerDetail, SignupView, LoginView, CartViewSet, CartDetail

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('', CustomerList.as_view(), name='customer_list'),
    path('<str:pk>/', CustomerDetail.as_view(), name='customer_detail'),
    path('<str:pk>/cart/', CartDetail.as_view(), name='customer_cart_detail'),
    path('<str:pk>/cart/add_to_cart/',
         CartViewSet.as_view({'post': 'add_to_cart'}), name='add_to_customer_cart'),
]
