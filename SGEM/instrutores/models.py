from django.db import models

# Create your models here.

class Instrutor(models.Model):
    id_instrutor = models.AutoField(primary_key=True)
    nome_instrutor = models.CharField(max_length=256)
    cpf_instrutor = models.CharField(max_length=14, unique=True)
    email_instrutor = models.EmailField(unique=True)
    telefone_instrutor = models.CharField(max_length=15)

    def __str__(self):
        return self.nome_instrutor