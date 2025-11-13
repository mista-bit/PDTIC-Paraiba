from rest_framework.routers import DefaultRouter
from .views import CidadaoViewSet

router = DefaultRouter()
router.register(r'cidadaos', CidadaoViewSet, basename='cidadao')

urlpatterns = router.urls