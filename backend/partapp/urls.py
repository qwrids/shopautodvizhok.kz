from django.urls import path, include
from .routers import router
from rest_framework_simplejwt.views import *
from .views import *

urlpatterns = [
    path("", include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(),name='token_verify'),
    path('register', RegisterUserAPIView.as_view()),
    path('logout/', APILogoutView.as_view(), name='auth_logout'),
]