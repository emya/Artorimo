from django.conf.urls import include, url
from rest_framework import routers

from .api import (
    RegistrationAPI,
    LoginAPI,
    UserAPI,
    AskHelpAPI,
    ArtistAPI,
    ProfileViewSet,
    PortfolioViewSet,
)

#from .views import ListNote

router = routers.DefaultRouter()
router.register('profiles', ProfileViewSet, 'profiles')
router.register('portfolios', PortfolioViewSet, 'portfolios')

urlpatterns = [
    url("^", include(router.urls)),
    url("^auth/register/$", RegistrationAPI.as_view()),
    url("^auth/login/$", LoginAPI.as_view()),
    url("^auth/user/$", UserAPI.as_view()),
    url("^ask/help/$", AskHelpAPI.as_view()),
    url("^artists/$", ArtistAPI.as_view()),
    url(r"^reset/password/", include('django_rest_passwordreset.urls', namespace='password_reset')),
]

