from rest_framework import serializers
from .models import Modalidade, CT_Modalidade

class ModalidadeSerializer(serializers.ModelSerializer):
    """Serializer para Modalidades (Futebol, Vôlei, etc.)"""
    class Meta:
        model = Modalidade
        fields = '__all__'
        read_only_fields = ['id_modalidade']


class CTModalidadeSerializer(serializers.ModelSerializer):
    """
    Serializer para CT_Modalidade (vínculo entre CT e Modalidade)
    Mostra informações completas do CT e da Modalidade
    """
    # Campos extras para mostrar nome do CT e da Modalidade
    ct_nome = serializers.CharField(source='ct.nome_ct', read_only=True)
    modalidade_nome = serializers.CharField(source='modalidade.nome_modalidade', read_only=True)
    
    class Meta:
        model = CT_Modalidade
        fields = [
            'id',
            'ct',
            'ct_nome',  # Nome do CT (ex: "Ginásio Municipal")
            'modalidade',
            'modalidade_nome',  # Nome da Modalidade (ex: "Futebol")
            'vagas_disponiveisMod',
            'horarios_oferecidos',
            'dias_na_semana'
        ]


class CTModalidadeListSerializer(serializers.ModelSerializer):
    """
    Serializer SIMPLIFICADO para listar modalidades de um CT específico
    Usado quando cidadão quer ver quais modalidades estão disponíveis em um CT
    """
    modalidade_id = serializers.IntegerField(source='modalidade.id_modalidade', read_only=True)
    modalidade_nome = serializers.CharField(source='modalidade.nome_modalidade', read_only=True)
    
    class Meta:
        model = CT_Modalidade
        fields = [
            'modalidade_id',
            'modalidade_nome',
            'vagas_disponiveisMod',
            'horarios_oferecidos',
            'dias_na_semana'
        ]


        
