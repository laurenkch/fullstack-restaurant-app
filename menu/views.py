# from django.shortcuts import render
# Create your views here.

# from django.views.generic import ListView
from rest_framework import generics
from .models import MenuItem
from .serializer import MenuSerializer

class MenuView(generics.ListAPIView):
    queryset = MenuItem.objects.all()
    serializer_class = MenuSerializer