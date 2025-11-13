from rest_framework.routers import DefaultRouter
from .views import InstrutorViewSet

router = DefaultRouter()
router.register(r'instrutores', InstrutorViewSet, basename='instrutores')

urlpatterns = router.urls