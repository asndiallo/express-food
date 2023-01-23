from django.urls import path, include

urlpatterns = [
    path('customers/', include('customers.urls')),
    path('menus/', include('menus.urls')),
    path('deliverers/', include('deliverers.urls')),
]
