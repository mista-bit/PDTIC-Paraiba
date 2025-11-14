from rest_framework import serializers
from .models import Instrutor
from modalidades.models import CT_Modalidade

class InstrutorSerializer(serializers.ModelSerializer):
    # Campos extras para criar o evento automaticamente
    ct_id = serializers.IntegerField(write_only=True, required=False, help_text="ID do CT para criar evento")
    modalidade_id = serializers.IntegerField(write_only=True, required=False, help_text="ID da Modalidade para criar evento")
    vagas_disponiveis = serializers.IntegerField(write_only=True, required=False, default=35, help_text="Número de vagas do evento")
    horarios = serializers.CharField(write_only=True, required=False, default="", help_text="Horários do evento")
    dias_semana = serializers.CharField(write_only=True, required=False, default="", help_text="Dias da semana do evento")
    
    class Meta:
        model = Instrutor
        fields = '__all__'
        read_only_fields = ['id_instrutor']
    
    def create(self, validated_data):
        # Extrai os dados do evento (se fornecidos)
        ct_id = validated_data.pop('ct_id', None)
        modalidade_id = validated_data.pop('modalidade_id', None)
        vagas_disponiveis = validated_data.pop('vagas_disponiveis', 35)
        horarios = validated_data.pop('horarios', '')
        dias_semana = validated_data.pop('dias_semana', '')
        
        # Cria o instrutor
        instrutor = Instrutor.objects.create(**validated_data)
        
        # Se CT e Modalidade foram fornecidos, cria o evento automaticamente
        if ct_id and modalidade_id:
            CT_Modalidade.objects.create(
                ct_id=ct_id,
                modalidade_id=modalidade_id,
                vagas_disponiveisMod=vagas_disponiveis,
                horarios_oferecidos=horarios,
                dias_na_semana=dias_semana
            )
        
        return instrutor

