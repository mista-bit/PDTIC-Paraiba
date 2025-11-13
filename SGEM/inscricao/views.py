from rest_framework import viewsets, status
from rest_framework.decorators import action  # NOVO: Para criar endpoint customizado
from rest_framework.response import Response
from .models import Inscricao
from .serializers import InscricaoSerializer, InscricaoPorCPFSerializer  # NOVO: Importar serializer por CPF


class InscricaoViewSet(viewsets.ModelViewSet):
    queryset = Inscricao.objects.all()
    serializer_class = InscricaoSerializer
    
    # NOVO: Endpoint customizado para AGENDAR (inscrever usando CPF)
    @action(detail=False, methods=['post'], url_path='agendar')
    def agendar(self, request):
        """
        Endpoint: POST /api/inscricoes/agendar/
        
        Permite cidadão se inscrever usando apenas CPF (não precisa saber o ID)
        
        Envia:
        {
          "cpf_cidadao": "13553945432",
          "ct": 1,
          "modalidade": 2
        }
        
        Retorna:
        {
          "message": "Inscrição realizada com sucesso!",
          "protocolo": "INS202511110001",
          "cidadao": "João Silva",
          "modalidade": "Futebol",
          "ct": "Ginásio Municipal",
          "status": "Pendente"
        }
        """
        # Usa o serializer que busca por CPF
        serializer = InscricaoPorCPFSerializer(data=request.data)
        
        # Valida os dados
        if serializer.is_valid():
            # Cria a inscrição
            inscricao = serializer.save()
            
            # Retorna resposta customizada com todas as informações
            return Response({
                'message': 'Inscrição realizada com sucesso!',
                'protocolo': inscricao.numero_protocolo,
                'cidadao': inscricao.cidadao.nome_cidadao,
                'cpf': inscricao.cidadao.cpf_cidadao,
                'modalidade': inscricao.modalidade.nome_modalidade,
                'ct': inscricao.ct.nome_ct,
                'status': inscricao.get_status_display(),
                'data_inscricao': inscricao.data_incricao,
            }, status=status.HTTP_201_CREATED)
        
        # Se não for válido, retorna os erros
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
