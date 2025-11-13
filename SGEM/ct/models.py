from django.db import models

# Create your models here.
class ct(models.Model):
    id_ct = models.AutoField(primary_key=True)
    nome_ct = models.CharField(max_length=100)
    capacidade_ct = models.IntegerField()
    cep = models.CharField(max_length=9, blank=True, null=True)
    rua = models.CharField(max_length=200, blank=True, null=True)
    numero_rua = models.CharField(max_length=10, blank=True, null=True)
    bairro = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.nome_ct



    
    
    

