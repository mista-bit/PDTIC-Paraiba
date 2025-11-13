from django.contrib import admin  # Importa o módulo admin
from .models import Cidadao  # Importa o model Cidadao

# Register your models here.

@admin.register(Cidadao)  # Registra CidadaoAdmin para o model Cidadao
class CidadaoAdmin(admin.ModelAdmin):
    """
    Configuração do painel admin para Cidadãos
    ADMIN APENAS VISUALIZA - Cidadãos se cadastram pelo formulário web
    """
    
    # list_display: Colunas na lista de cidadãos
    # Mostra: Nome | CPF | Email | Telefone | Data de Cadastro
    list_display = ['nome_cidadao', 'cpf_cidadao', 'email_cidadao', 'telefone_cidadao', 'data_cadastro']
    
    # search_fields: Permite buscar cidadão por nome, CPF ou email
    # Útil quando tem muitos cidadãos cadastrados
    search_fields = ['nome_cidadao', 'cpf_cidadao', 'email_cidadao']
    
    # list_filter: Filtros na barra lateral
    # Permite filtrar cidadãos por data de cadastro ou bairro
    # Exemplo: ver só cidadãos cadastrados hoje, ou só do bairro "Centro"
    list_filter = ['data_cadastro', 'bairro_cidadao']
    
    # readonly_fields: Campos que NÃO podem ser editados no formulário
    # data_cadastro é gerado automaticamente (auto_now_add=True), então não deve ser editável
    # O campo aparece no formulário mas fica desabilitado (cinza)
    readonly_fields = ['data_cadastro']
    
    # has_add_permission: Remove botão "Adicionar Cidadão"
    # Admin NÃO pode criar cidadãos - só os próprios cidadãos se cadastram
    def has_add_permission(self, request):
        return False  # Desabilita criação pelo admin
