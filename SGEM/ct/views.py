from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser  # ← Importa
from .models import ct
from .serializers import CTSerializer

class CtViewSet(viewsets.ModelViewSet):
    queryset = ct.objects.all()
    serializer_class = CTSerializer
    permission_classes = [IsAdminUser]  # ← Adiciona esta linha!
