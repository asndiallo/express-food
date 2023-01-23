from django.urls import path
from .views import MenuTypeView, MenuTypeDetailView, MenuCreateView

urlpatterns = [
    path('<str:menu_type>/', MenuTypeView.as_view(), name='menu_type'),
    path('<str:menu_type>/<str:pk>/',
         MenuTypeDetailView.as_view(), name='menu_type_detail'),
    path('', MenuCreateView.as_view(), name='menu_create')
]
