from rest_framework import viewsets
from rest_framework.permissions import IsAdminUser 
from .models import Modalidade, CT_Modalidade
from .serializers import ModalidadeSerializer, CTModalidadeSerializer, CTModalidadeListSerializer

class ModalidadeViewSet(viewsets.ModelViewSet):
    queryset = Modalidade.objects.all()
    serializer_class = ModalidadeSerializer
    permission_classes = [IsAdminUser]

class CTModalidadeViewSet(viewsets.ModelViewSet):
    queryset = CT_Modalidade.objects.all()
    serializer_class = CTModalidadeSerializer
    permission_classes = [IsAdminUser]

class CTModalidadeListViewSet(viewsets.ModelViewSet):
    queryset = CT_Modalidade.objects.all()
    serializer_class = CTModalidadeListSerializer
    permission_classes = [IsAdminUser]