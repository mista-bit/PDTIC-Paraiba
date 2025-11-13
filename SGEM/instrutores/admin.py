from django.contrib import admin  # Importa o módulo admin do Django
from .models import Instrutor  # Importa o modelo Instrutor

# Register your models here.

@admin.register(Instrutor)  # Registra InstructorAdmin como painel admin para Instrutor
class InstrutorAdmin(admin.ModelAdmin):
    """
    Configuração do painel administrativo para Instrutores
    """
    
    # list_display: Colunas exibidas na lista de instrutores
    # Mostra: Nome | CPF | Email | Telefone
    list_display = ['nome_instrutor', 'cpf_instrutor', 'email_instrutor', 'telefone_instrutor']
    
    # search_fields: Permite buscar instrutores por nome, CPF ou email
    # Exemplo: digitar "Carlos" ou "123.456" encontra o instrutor
    search_fields = ['nome_instrutor', 'cpf_instrutor', 'email_instrutor']
