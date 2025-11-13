from django.contrib import admin  # Importa o módulo admin
from .models import Modalidade, CT_Modalidade  # Importa os dois models deste app

# Register your models here.

@admin.register(Modalidade)  # Registra ModalidadeAdmin para o model Modalidade
class ModalidadeAdmin(admin.ModelAdmin):
    """
    Configuração do painel admin para Modalidades (Futebol, Vôlei, etc.)
    """
    
    # list_display: Colunas na lista (só tem nome mesmo)
    list_display = ['nome_modalidade']
    
    # search_fields: Permite buscar modalidade pelo nome
    # Exemplo: digitar "Futebol" encontra a modalidade
    search_fields = ['nome_modalidade']


@admin.register(CT_Modalidade)  # Registra CTModalidadeAdmin para o model CT_Modalidade
class CTModalidadeAdmin(admin.ModelAdmin):
    """
    Configuração do painel admin para CT_Modalidade (Vínculo entre CT e Modalidade)
    AQUI é onde o admin vincula uma modalidade a um CT específico
    """
    
    # list_display: Colunas exibidas na lista de vínculos
    # Mostra: CT | Modalidade | Vagas | Horários | Dias
    # Exemplo: "Ginásio Municipal | Futebol | 30 | 14h-16h | Seg/Qua/Sex"
    list_display = ['ct', 'modalidade', 'vagas_disponiveisMod', 'horarios_oferecidos', 'dias_na_semana']
    
    # list_filter: Filtros na barra lateral
    # Permite filtrar por CT ou por Modalidade
    # Exemplo: ver só vínculos do "Ginásio Municipal"
    list_filter = ['ct', 'modalidade']
    
    # search_fields: Busca nos campos relacionados usando "__" (double underscore)
    # ct__nome_ct: busca no campo "nome_ct" do model "ct" relacionado
    # modalidade__nome_modalidade: busca no campo "nome_modalidade" do model "Modalidade"
    # Exemplo: digitar "Ginásio Futebol" encontra o vínculo entre eles
    search_fields = ['ct__nome_ct', 'modalidade__nome_modalidade']
