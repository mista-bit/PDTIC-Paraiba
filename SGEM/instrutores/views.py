from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser 
from .models import Instrutor

class InstrutorViewSet(viewsets.ModelViewSet):
    queryset = Instrutor.objects.all()
    permission_classes = [IsAdminUser]