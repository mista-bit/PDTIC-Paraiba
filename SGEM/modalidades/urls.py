from rest_framework.routers import DefaultRouter
from .views import ModalidadeViewSet, CTModalidadeViewSet
from django.urls import path, include 

router = DefaultRouter() # Cria automaticamente as rotas para os ViewSets
router.register(r'modalidades', ModalidadeViewSet, basename='modalidades') # Registra o ViewSet de Modalidades
router.register(r'ct_modalidades', CTModalidadeViewSet, basename='ct_modalidades') # Registra o ViewSet de CTModalidades

urlpatterns = [
    path('', include(router.urls)), 
] # Inclui as rotas geradas pelo router nas URLs do aplicativo
