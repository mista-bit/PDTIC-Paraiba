from django.db import models
from ct.models import ct  # Import do modelo CT

# Create your models here.


#Essa forma de fazer, mas se fossemos fazer assim, so poderia haver uma modalidade por ct e somente 1 ct poderia ter a modalidade
class Modalidade(models.Model):
    id_modalidade = models.AutoField(primary_key=True)
    nome_modalidade = models.CharField(max_length=256)
    regras_modalidade = models.TextField(blank=True, null=False) #Tive essa ideia agora, se quiser tirar tudo bem

    def __str__(self):
        return self.nome_modalidade


class CT_Modalidade(models.Model): #Tabela intermediária para representar a relação Many-to-Many entre CT e Modalidade/ many-to-many significa que um CT pode ter várias modalidades e uma modalidade pode ser oferecida em vários CTs
    ct = models.ForeignKey(ct, on_delete=models.CASCADE, related_name='modalidades') # Relaciona o CT com suas modalidades
    modalidade = models.ForeignKey(Modalidade, on_delete= models.CASCADE, related_name='cts') # Relaciona a modalidade com os CTs que a possuem/ on dele para que caso o CT seja deletado pelo adm, tudo relacionado à ele também seja/ related_name é para acessas as modalidades como: hoje_ct.modalidades.all()  # Lista todas as modalidades daquele CT
    vagas_disponiveisMod = models.IntegerField(default=35) #Número de vagas disponíveis para essa modalidade naquele CT
    horarios_oferecidos = models.CharField(max_length=256) #Horários oferecidos para essa modalidade naquele CT
    dias_na_semana = models.CharField(max_length=100) #Dias da semana em que a modalidade é oferecida naquele CT

    def __str__(self):
        return f"{self.ct.nome_ct} - {self.modalidade.nome_modalidade}"

    class Meta: 
        unique_together = ('ct','modalidade') #Evita a repetição da combinação CT-Modalidade tipo (ginasio+futebol), não pode ter essa mesma combinação no ct de novo
        verbose_name = 'CT - Modalidade'
        verbose_name_plural = 'CTs - Modalidades' # So pra deixar o nome bonito no admin sksks
