from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser 
from .models import Instrutor
from .serializers import InstrutorSerializer

class InstrutorViewSet(viewsets.ModelViewSet):
    queryset = Instrutor.objects.all()
    serializer_class = InstrutorSerializer
    permission_classes = [IsAdminUser]