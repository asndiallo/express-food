from django.urls import path, include
from .views import SignupView, LoginView, CartViewSet, CustomerViewSet
from rest_framework import routers

router = routers.SimpleRouter()
router.register('', CustomerViewSet)
#router.register('<str:customer_id>/cart/', CartViewSet)

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('', include(router.urls)),
    path('<str:customer_id>/add-to-cart/', CartViewSet.as_view({'post': 'add_to_cart'}), name='add-to-cart'),
    path('<str:customer_id>/cart/', CartViewSet.as_view({'get': 'list'}), name='list-cart'),
    path('<str:customer_id>/cart/update/<str:_id>', CartViewSet.as_view({'put': 'update'}), name='update-cart'),
    path('<str:customer_id>/cart/delete', CartViewSet.as_view({'delete': 'destroy'}), name='empty-cart'),
]