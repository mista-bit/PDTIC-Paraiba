from django.db import models
from datetime import date


# Create your models here.

# Modelo para o cadastro do cidadao no sistema
class Cidadao(models.Model):
    id_cidadao = models.AutoField(primary_key=True)
    
    nome_cidadao = models.CharField(max_length=256)
    cpf_cidadao = models.CharField(max_length=14, unique=True) # o unique é pra garantir que não tenha cpf repetido no banco de dados
    data_nascimento = models.DateField()

    email_cidadao = models.EmailField(unique=True) #Deixei todos sem o balnk e nul pq são dados necessários
    telefone_cidadao = models.CharField(max_length=15)
    cep_cidadao = models.CharField(max_length=9)
    rua_cidadao = models.CharField(max_length=200)
    numero_rua_cidadao = models.CharField(max_length=10)
    bairro_cidadao = models.CharField(max_length=100)
    data_cadastro = models.DateTimeField(
        auto_now_add=True,
        verbose_name='Data de Cadastro',
    ) # Serve para saber quando o cidadao foi cadastrado no sistema


    class Meta:
        verbose_name = 'Cidadão'
        verbose_name_plural = 'Cidadãos'
        ordering = ['nome_cidadao']  # Ordena alfabeticamente


    @property
    def idade(self):
        #Calcula a idade do cidadaao baseado na data de nascimento

        hoje = date.today()
        return hoje.year - self.data_nascimento.year - ((hoje.month, hoje.day) < (self.data_nascimento.month, self.data_nascimento.day))

    def inscricoes_ativas(self):
        #retornara inscricoes confirmadas ou pendentes
        return  self.inscricoes.filter(status__in=['pendente', 'confirmada'])

    def __str__(self):
        return f"{self.nome_cidadao} - {self.cpf_cidadao}"