# from django.views.generic import ListView
from rest_framework import generics
from .models import OrderItem
from .serializer import OrderSerializer


class OrderView(generics.ListCreateAPIView):
    queryset = OrderItem.objects.all()
    serializer_class = OrderSerializer
