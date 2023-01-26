from django.urls import path, include
from .views import SignupView, LoginView, CartViewSet, CustomerViewSet, OrderViewSet
from rest_framework import routers

router = routers.SimpleRouter()
router.register('', CustomerViewSet)

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('', include(router.urls)),
    path('<str:customer_id>/add-to-cart/',
         CartViewSet.as_view({'post': 'add_to_cart'}), name='add-to-cart'),
    path('<str:customer_id>/cart/',
         CartViewSet.as_view({'get': 'list'}), name='list-cart'),
    path('<str:customer_id>/cart/update/<str:cart_id>',
         CartViewSet.as_view({'put': 'update'}), name='update-cart'),
    path('<str:customer_id>/cart/delete/<str:cart_id>',
         CartViewSet.as_view({'delete': 'destroy'}), name='empty-cart'),
    path('<str:customer_id>/create-order/',
         OrderViewSet.as_view({'post': 'create'}), name='create-order'),
    path('<str:customer_id>/order/',
         OrderViewSet.as_view({'get': 'list'}), name='list-order'),
    path('<str:customer_id>/order/update/<str:order_id>',
         OrderViewSet.as_view({'put': 'update'}), name='update-order'),
    path('<str:customer_id>/order/delete/<str:order_id>',
         OrderViewSet.as_view({'delete': 'destroy'}), name='delete-order'),
]
