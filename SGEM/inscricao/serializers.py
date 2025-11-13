from rest_framework import serializers
from .models import Inscricao
from cidadaos.models import Cidadao  # NOVO: Importar Cidadao para buscar por CPF


class InscricaoSerializer(serializers.ModelSerializer):
    """
    Serializer para Inscrições
    Usado para LISTAR e VER DETALHES das inscrições
    """
    # Campos extras para mostrar informações legíveis
    cidadao_nome = serializers.CharField(source='cidadao.nome_cidadao', read_only=True)
    ct_nome = serializers.CharField(source='ct.nome_ct', read_only=True)
    modalidade_nome = serializers.CharField(source='modalidade.nome_modalidade', read_only=True)
    status_display = serializers.CharField(source='get_status_display', read_only=True)
    
    class Meta:
        model = Inscricao
        fields = [
            'id',
            'cidadao',
            'cidadao_nome',  # Ex: "João Silva"
            'ct',
            'ct_nome',  # Ex: "Ginásio Municipal"
            'modalidade',
            'modalidade_nome',  # Ex: "Futebol"
            'status',
            'status_display',  # Ex: "Pendente"
            'numero_protocolo',  # Ex: "INS202511100001"
            'data_incricao',
            'data_confirmacao',
            'data_cancelamento',
            'motivo_cancelamento',
        ]
        read_only_fields = [
            'numero_protocolo',
            'data_incricao',
            'data_confirmacao',
            'data_cancelamento'
        ]
    
    def to_representation(self, instance):
        """
        Customiza a resposta: só mostra campos de cancelamento se estiver cancelada
        """
        data = super().to_representation(instance)
        
        # Se NÃO estiver cancelada, remove campos de cancelamento
        if instance.status != 'cancelada':
            data.pop('motivo_cancelamento', None)
            data.pop('data_cancelamento', None)
        
        # Se NÃO estiver confirmada, remove data_confirmacao
        if instance.status != 'confirmada':
            data.pop('data_confirmacao', None)
            
        return data


class InscricaoCreateSerializer(serializers.ModelSerializer):
    """
    Serializer SIMPLIFICADO para CRIAR inscrição
    Cidadão envia apenas: cidadao_id, ct_id, modalidade_id
    """
    class Meta:
        model = Inscricao
        fields = ['cidadao', 'ct', 'modalidade']
    
    def validate(self, data):
        """
        Validações customizadas antes de criar inscrição
        """
        # Verifica se o cidadão já está inscrito nesta modalidade
        if Inscricao.objects.filter( 
            cidadao=data['cidadao'],
            modalidade=data['modalidade']
        ).exists():
            raise serializers.ValidationError(
                "Você já está inscrito nesta modalidade!"
            )
        
        return data


# NOVO: Serializer para inscrição usando CPF (sem precisar saber o ID do cidadão)
class InscricaoPorCPFSerializer(serializers.Serializer):
    """
    Serializer SUPER SIMPLES para cidadão se inscrever usando apenas CPF
    
    Front-end envia:
    {
      "cpf_cidadao": "13553945432",
      "ct": 1,
      "modalidade": 2
    }
    
    Backend:
    1. Busca cidadão pelo CPF
    2. Valida se já não está inscrito
    3. Cria inscrição
    4. Retorna protocolo
    """
    # Campos que o front-end envia
    cpf_cidadao = serializers.CharField(
        max_length=14,
        help_text='CPF do cidadão (com ou sem pontuação)',
        error_messages={
            'required': 'CPF é obrigatório',
            'blank': 'CPF não pode estar vazio'
        }
    )
    ct = serializers.IntegerField(
        help_text='ID do Centro de Treinamento'
    )
    modalidade = serializers.IntegerField(
        help_text='ID da Modalidade (Futebol, Vôlei, etc)'
    )
    
    def validate_cpf_cidadao(self, value):
        """
        Valida se o CPF existe no sistema
        """
        # Remove pontuação do CPF (se tiver)
        cpf_limpo = value.replace('.', '').replace('-', '').replace(' ', '')
        
        # Busca cidadão pelo CPF
        try:
            cidadao = Cidadao.objects.get(cpf_cidadao=cpf_limpo)
            # Guarda o cidadão para usar depois no create()
            self.cidadao_encontrado = cidadao
            return cpf_limpo
        except Cidadao.DoesNotExist:
            raise serializers.ValidationError(
                f'CPF {value} não encontrado. Você precisa se cadastrar primeiro!'
            )
    
    def validate(self, data):
        """
        Validação final: verifica se cidadão já está inscrito nesta modalidade
        """
        # Pega o cidadão que foi encontrado no validate_cpf_cidadao
        cidadao = self.cidadao_encontrado
        modalidade_id = data['modalidade']
        
        # Verifica se já existe inscrição
        if Inscricao.objects.filter(
            cidadao=cidadao,
            modalidade_id=modalidade_id
        ).exists():
            raise serializers.ValidationError(
                f'{cidadao.nome_cidadao}, você já está inscrito nesta modalidade!'
            )
        
        return data
    
    def create(self, validated_data):
        """
        Cria a inscrição usando o cidadão encontrado pelo CPF
        """
        # Remove cpf_cidadao (não é campo do model Inscricao)
        validated_data.pop('cpf_cidadao')
        
        # Cria inscrição com o cidadão encontrado
        inscricao = Inscricao.objects.create(
            cidadao=self.cidadao_encontrado,  # Usa o cidadão que buscamos pelo CPF
            ct_id=validated_data['ct'],
            modalidade_id=validated_data['modalidade']
        )
        
        return inscricao


'''
SERIALIZER = GARÇOM DE RESTAURANTE

Cliente (Front-end):
"Quero um prato de macarrão!"
        ↓
Garçom (Serializer):
- Entende pedido
- Valida: "Temos macarrão? ✅"
- Traduz para cozinha: "1 macarrão ao molho branco"
        ↓
Cozinha (Banco de Dados):
- Prepara o prato
        ↓
Garçom (Serializer):
- Pega o prato pronto
- Arruma bonito no prato
- Leva para o cliente
        ↓
Cliente (Front-end):
- Recebe prato arrumado e bonito! 🍝

Exemplo dado pelo copilot

'''