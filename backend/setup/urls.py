from django.contrib import admin
from django.urls import path, include
from zapsign.views import *
from rest_framework import routers

router = routers.DefaultRouter()
router.register('companies', CompanyViewSet, basename='company')
router.register('docs', DocViewSet, basename='docs')
router.register('users', UserViewSet, basename='user')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('user/<int:pk>/doc/', ListDocsUserViewSet.as_view()),
    path('company/<int:pk>/doc/', ListDocsCompanyViewSet.as_view()),
]
