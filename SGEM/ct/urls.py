from rest_framework.routers import DefaultRouter
from .views import CtViewSet

router = DefaultRouter()
router.register(r'ct', CtViewSet, basename='ct')

urlpatterns = router.urls