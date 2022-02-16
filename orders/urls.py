from .views import OrderView, OrderDetailView
from django.urls import path 

app_name = 'orders'

urlpatterns=[
    path('', OrderView.as_view(), name='orders'),
    path('<int:pk>/', OrderDetailView.as_view(), name='order_details' ),
    ]