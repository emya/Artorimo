from django.conf.urls import include, url
from rest_framework import routers

from .api import (
    RegistrationAPI,
    LoginAPI,
    UserAPI,
    AskHelpAPI,
    AskGoodsAPI,
    NotifyUsersAPI,
    EmailMagazinesAPI,
    ArtistAPI,
    ProfileViewSet,
    PortfolioViewSet,
    CommunityPostViewSet,
    CommunityReplyViewSet,
    PayPalAPI,
)

#from .views import ListNote

router = routers.DefaultRouter()
router.register('profiles', ProfileViewSet, 'profiles')
router.register('portfolios', PortfolioViewSet, 'portfolios')
router.register('community/post', CommunityPostViewSet, 'community_post')
router.register('community/reply', CommunityReplyViewSet, 'community_reply')

urlpatterns = [
    url("^", include(router.urls)),
    url("^auth/register/$", RegistrationAPI.as_view()),
    url("^auth/login/$", LoginAPI.as_view()),
    url("^auth/user/$", UserAPI.as_view()),
    url("^ask/help/$", AskHelpAPI.as_view()),
    url("^ask/goods/$", AskGoodsAPI.as_view()),
    url("^notify/users/$", NotifyUsersAPI.as_view()),
    url("^send/emagazines/$", EmailMagazinesAPI.as_view()),
    url("^artists/$", ArtistAPI.as_view()),
    url("^payment/paypal/$", PayPalAPI.as_view()),
    url(r"^reset/password/", include('django_rest_passwordreset.urls', namespace='password_reset')),
]

