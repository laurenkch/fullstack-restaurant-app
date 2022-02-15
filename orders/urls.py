from .views import OrderView
from django.urls import path 

app_name = 'orders'

urlpatterns=[path('', OrderView.as_view(), name='orders')]