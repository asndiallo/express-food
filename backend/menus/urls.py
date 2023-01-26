from django.urls import path
from .views import MenuTypeView, MenuTypeDetailView, MenuCreateView, TodayMenuView, DetailsMenuView

urlpatterns = [
    path('<str:menu_type>/', MenuTypeView.as_view(), name='menu_type'),
    path('<str:menu_name>/details/', DetailsMenuView.as_view(), name='menu_details'),
    path('<str:menu_type>/<str:pk>/',
         MenuTypeDetailView.as_view(), name='menu_type_detail'),
    path('create/', MenuCreateView.as_view(), name='menu_create'),
    path('', TodayMenuView.as_view(), name='today_menu')
]
