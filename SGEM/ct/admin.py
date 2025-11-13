from django.contrib import admin  # Importa o módulo admin do Django
from .models import ct  # Importa o modelo ct deste app (o ponto significa "deste diretório")

# Register your models here.

@admin.register(ct)  # Decorador que registra a classe CTAdmin como configuração do admin para o model ct
class CTAdmin(admin.ModelAdmin):  # Herda de ModelAdmin para customizar o painel admin
    """
    Configuração do painel administrativo para CTs (Centros de Treinamento)
    """
    
    # list_display: Define quais campos aparecem na LISTA de CTs no admin
    # Em vez de mostrar só "<ct object (1)>", mostra nome, capacidade e bairro em colunas
    list_display = ['nome_ct', 'capacidade_ct', 'bairro']
    
    # search_fields: Adiciona uma BARRA DE BUSCA no topo da lista
    # Permite buscar por nome do CT ou bairro
    # Exemplo: digitar "Ginásio" busca em nome_ct e bairro
    search_fields = ['nome_ct', 'bairro']
    
    # list_filter: Adiciona FILTROS na barra lateral direita
    # Permite filtrar CTs por bairro (vai listar todos os bairros únicos)
    list_filter = ['bairro']

#Isso será somente para o arquivo SGEM/ct/admin.py
#Apenas admin terá acesso a esse arquivo