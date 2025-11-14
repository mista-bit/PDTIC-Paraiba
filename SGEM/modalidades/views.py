from rest_framework import viewsets
from .models import Modalidade, CT_Modalidade
from .serializers import ModalidadeSerializer, CTModalidadeSerializer, CTModalidadeListSerializer

class ModalidadeViewSet(viewsets.ModelViewSet):
    queryset = Modalidade.objects.all()
    serializer_class = ModalidadeSerializer

class CTModalidadeViewSet(viewsets.ModelViewSet):
    queryset = CT_Modalidade.objects.all()
    serializer_class = CTModalidadeSerializer

class CTModalidadeListViewSet(viewsets.ModelViewSet):
    queryset = CT_Modalidade.objects.all()
    serializer_class = CTModalidadeListSerializer