from rest_framework import viewsets
from .models import Instrutor
from .serializers import InstrutorSerializer

class InstrutorViewSet(viewsets.ModelViewSet):
    queryset = Instrutor.objects.all()
    serializer_class = InstrutorSerializer