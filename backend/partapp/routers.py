from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()

router.register(r'Good', GoodViewSet, 'Good')
router.register(r'Order', OrderViewSet, 'Order')
router.register(r'Cart', CartViewSet, 'Cart')