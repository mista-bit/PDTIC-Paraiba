from django.contrib import admin  # Importa o módulo admin
from .models import Inscricao  # Importa o model Inscricao

# Register your models here.

@admin.register(Inscricao)  # Registra InscricaoAdmin para o model Inscricao
class InscricaoAdmin(admin.ModelAdmin):
    """
    Configuração AVANÇADA do painel admin para Inscrições
    Este é o painel PRINCIPAL onde a prefeitura gerencia as inscrições dos cidadãos
    """
    
    # ===== VISUALIZAÇÃO DA LISTA =====
    
    # list_display: Colunas exibidas na lista de inscrições
    # Mostra: Protocolo | Cidadão | CT | Modalidade | Status | Data
    # Exemplo: "INS202511100001 | João Silva | Ginásio Municipal | Futebol | Pendente | 10/11/2025"
    list_display = ['numero_protocolo', 'cidadao', 'ct', 'modalidade', 'status', 'data_incricao']
    
    # list_filter: Filtros na barra lateral direita
    # Permite filtrar inscrições por:
    # - Status (pendente, confirmada, cancelada)
    # - CT (ver só inscrições de um CT específico)
    # - Modalidade (ver só inscrições de Futebol, por exemplo)
    # - Data da inscrição (hoje, esta semana, este mês, etc.)
    list_filter = ['status', 'ct', 'modalidade', 'data_incricao']
    
    # search_fields: Barra de busca no topo
    # Permite buscar por:
    # - numero_protocolo: "INS202511100001"
    # - cidadao__nome_cidadao: nome do cidadão (usa __ para acessar campo do model relacionado)
    # - cidadao__cpf_cidadao: CPF do cidadão
    # Exemplo: digitar "João" ou "INS20251110" encontra a inscrição
    search_fields = ['numero_protocolo', 'cidadao__nome_cidadao', 'cidadao__cpf_cidadao']
    
    # readonly_fields: Campos que NÃO podem ser editados manualmente
    # Estes campos são gerados automaticamente pelo sistema:
    # - numero_protocolo: gerado pelo método save()
    # - data_incricao: gerado automaticamente quando cria (auto_now_add=True)
    # - data_confirmacao: preenchido pelo método confirmar()
    # - data_cancelamento: preenchido pelo método cancelar()
    readonly_fields = ['numero_protocolo', 'data_incricao', 'data_confirmacao', 'data_cancelamento']
    
    
    # ===== ORGANIZAÇÃO DO FORMULÁRIO =====
    
    # fieldsets: Organiza o formulário de edição em SEÇÕES (grupos)
    # Em vez de mostrar todos os campos soltos, divide em seções com títulos
    fieldsets = (
        # Primeira seção: Informações da Inscrição
        ('Informações da Inscrição', {
            'fields': ('cidadao', 'ct', 'modalidade', 'numero_protocolo')
            # Mostra: dropdown pra escolher cidadão, CT, modalidade + protocolo (desabilitado)
        }),
        
        # Segunda seção: Status e Controle
        ('Status e Controle', {
            'fields': ('status',)
            # Mostra: dropdown pra mudar status (pendente/confirmada/cancelada)
        }),
        
        # Terceira seção: Datas
        ('Datas', {
            'fields': ('data_incricao', 'data_confirmacao', 'data_cancelamento'),
            # Mostra as 3 datas (todas desabilitadas pois estão em readonly_fields)
        }),
        
        # Quarta seção: Observações
        ('Observações', {
            'fields': ('motivo_cancelamento',),
            # Mostra: campo de texto grande para escrever motivo do cancelamento
        }),
    )
    
    
    # ===== AÇÕES EM MASSA =====
    
    # actions: Lista de AÇÕES que podem ser aplicadas a múltiplas inscrições de uma vez
    # Aparecem em um dropdown acima da lista
    # Exemplo: admin seleciona 10 inscrições pendentes → escolhe "Confirmar" → todas confirmadas de uma vez
    actions = ['confirmar_inscricoes', 'cancelar_inscricoes']
    
    # Método 1: Ação de confirmar múltiplas inscrições
    def confirmar_inscricoes(self, request, queryset):
        """
        Confirma todas as inscrições selecionadas que estão com status 'pendente'
        
        Parâmetros:
        - self: a própria instância de InscricaoAdmin
        - request: informações da requisição HTTP (quem está logado, etc.)
        - queryset: conjunto de inscrições que foram selecionadas na lista
        """
        # Filtra só as pendentes (ignora as que já estão confirmadas/canceladas)
        # Para cada uma, chama o método confirmar() que criamos no model
        for inscricao in queryset.filter(status='pendente'):
            inscricao.confirmar()  # Chama o método que muda status e preenche data_confirmacao
        
        # Mostra mensagem de sucesso no topo da tela
        # queryset.count() = quantas inscrições foram selecionadas
        self.message_user(request, f'{queryset.count()} inscrição(ões) confirmada(s)!')
    
    # short_description: Texto que aparece no dropdown de ações
    confirmar_inscricoes.short_description = "✓ Confirmar inscrições selecionadas"
    
    
    # Método 2: Ação de cancelar múltiplas inscrições
    def cancelar_inscricoes(self, request, queryset):
        """
        Cancela todas as inscrições selecionadas (exceto as já canceladas)
        
        Parâmetros: mesmos do método anterior
        """
        # .exclude(status='cancelada'): pega todas MENOS as já canceladas
        # Para cada uma, chama o método cancelar() passando um motivo padrão
        for inscricao in queryset.exclude(status='cancelada'):
            inscricao.cancelar(motivo="Cancelamento em massa pelo administrador")
        
        # Mostra mensagem de sucesso
        self.message_user(request, f'{queryset.count()} inscrição(ões) cancelada(s)!')
    
    # short_description: Texto que aparece no dropdown
    cancelar_inscricoes.short_description = "✕ Cancelar inscrições selecionadas"
