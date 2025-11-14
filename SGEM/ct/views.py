from rest_framework import viewsets
from .models import ct
from .serializers import CTSerializer

class CtViewSet(viewsets.ModelViewSet):
    queryset = ct.objects.all()
    serializer_class = CTSerializer
