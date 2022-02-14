from .views import MenuView
from django.urls import path 

app_name = 'menu_list'

urlpatterns=[path('', MenuView.as_view(), name='menu_list')]