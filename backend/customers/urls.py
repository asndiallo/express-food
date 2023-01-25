from django.urls import path, include
from .views import SignupView, LoginView, CartViewSet, CustomerViewSet
from rest_framework import routers

router = routers.SimpleRouter()
router.register('', CustomerViewSet)
router.register('<str:customer_id>/cart/', CartViewSet)

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('', include(router.urls)),
]
