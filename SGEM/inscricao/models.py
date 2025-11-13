from django.db import models
from django.utils import timezone
# Create your models here.


STATUS_CHOICES = [
    ('pendente', 'Pendente'),
    ('confirmada', 'Confirmada'),
    ('cancelada', 'Cancelada'),
    ('lista_espera', 'Lista de Espera'),
]


# Modelo para registrar a inscrição de um cidadão em uma modalidade de um CT
class Inscricao(models.Model):
    # Relacionamento com o cidadão que está se inscrevendo
    # CASCADE: Se o cidadão for deletado, todas as suas inscrições também serão deletadas
    cidadao = models.ForeignKey('cidadaos.Cidadao', 
                                on_delete=models.CASCADE,
                                related_name='inscricoes'
                                ) 
    
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pendente',
        verbose_name='Status da Inscrição'
    )
    
    # Relacionamento com o CT onde a inscrição está sendo feita
    # CASCADE: Se o CT for deletado, todas as inscrições nele também serão deletadas
    ct = models.ForeignKey('ct.ct', 
                           on_delete=models.CASCADE,
                           related_name='inscricoes',
                           verbose_name='Centro de Treinamento'
                           )
    
    # Relacionamento com a modalidade na qual o cidadão está se inscrevendo
    # PROTECT: Impede que a modalidade seja deletada se houver inscrições vinculadas a ela
    # Isso garante a integridade dos dados - não podemos deletar uma modalidade com inscrições ativas
    modalidade = models.ForeignKey('modalidades.Modalidade', 
                                   on_delete=models.PROTECT,
                                   related_name='inscricoes',
                                   verbose_name='Modalidade'
                                   )
    data_incricao = models.DateTimeField(auto_now_add=True,
                                          verbose_name='Data da Inscrição',        #Essas partes não preciso comentar por ja serem autoexplicativas
                                          )                                        #No caso é a daat de criacação, data da insccricao, cancelamento dela, etc
    data_confirmacao = models.DateTimeField(blank=True, null=True,  
                                          verbose_name='Data de Confirmação',
                                          )
    data_cancelamento = models.DateTimeField(blank=True, null=True,
                                          verbose_name='Data de Cancelamento',
                                          )
    numero_protocolo = models.CharField(max_length= 30,
                                        unique=True,
                                        blank=True,
                                        verbose_name='Número do Protocolo'
                                        )
    motivo_cancelamento = models.TextField(blank=True,
                                           verbose_name='Motivo do Cancelamento'
                                        )
    class Meta:
        verbose_name = 'Inscrição'
        verbose_name_plural = 'Inscrições'
        ordering = ['-data_incricao']  # Mais recentes primeiro
        unique_together = ['cidadao', 'modalidade']  # Impede duplicação


    def save(self, *args, **kwargs): 
        #gera protocolo automaticamente se não existir
        if not self.numero_protocolo:  #Verifica se ainda não foi gerado
            from datetime import datetime

            timestamp = datetime.now().strftime('%Y%m%d%H%M%S') #Aqui vai ser um tiquinho dificil entender, mas tipo se hoje é 10/11/2025 14:30:15, vai gerar 20251110143015 
            ultimo_id = Inscricao.objects.all().order_by('-id').first()  #Pega o maior id cadastrado/ first retorna a primeira, que é a ultima por conta da order by('-id'), ou seja o maior id
            proximo_id = (ultimo_id.id+1 ) if ultimo_id else 1  #Se não tiver nenhum inscrito ainda, o próximo id é 1
            self.numero_protocolo = f"INS{timestamp}{proximo_id:04d}"  #Gera o protocolo no formato INS + timestamp + id com 4 digitos, ou seja se for id 1, vai ser 0001, pode tirar se quiser, mas é so pra mostrar que pode ser registrado mt gente
        
        super().save(*args, **kwargs)  #Chama o método save() original do Django para salvar no banco de dados

    def confirmar(self):
        #metodo para confirmar uma inscricao pendente

        self.status = 'confirmada'
        self.data_confirmacao = timezone.now()
        self.save()

    def cancelar(self, motivo=""):
        #metodo para cancelar uma inscricao pendente ou confirmada

        self.status = 'cancelada'
        self.data_cancelamento = timezone.now()
        if motivo:
            self.motivo_cancelamento = motivo
        self.save()


# Em resumo, esse modelo gerencia as inscrições dos cidadãos em modalidades específicas de CTs,
# garantindo que cada inscrição seja única e fornecendo métodos para confirmar ou cancelar inscrições de forma organizada
# No caso o que o cidadao poderá ver será apenas suas inscrições e seus status, o admin poderá ver todas as inscrições e gerenciar elas
#Fazendo a confirmação ou cancelamento conforme necessário