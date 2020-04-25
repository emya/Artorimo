from django.conf.urls import include, url
from rest_framework import routers

from .api import (
    RegistrationAPI,
    LoginAPI,
    UserAPI,
    ProfileViewSet
)

#from .views import ListNote

router = routers.DefaultRouter()
router.register('profiles', ProfileViewSet, 'profiles')

urlpatterns = [
    url("^", include(router.urls)),
    url("^auth/register/$", RegistrationAPI.as_view()),
    url("^auth/login/$", LoginAPI.as_view()),
    url("^auth/user/$", UserAPI.as_view()),
]

