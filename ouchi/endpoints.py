from django.conf.urls import include, url
from django.views.decorators.csrf import csrf_exempt
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
    IconOrderViewSet,
    IconMakerAPI,
    IconMakerSetupAPI,
    IconMakerCleanupAPI,
    PayPalAPI,
    ProcessWebhookView,
    AccountActivateAPI
)

#from .views import ListNote

router = routers.DefaultRouter()
router.register('profiles', ProfileViewSet, 'profiles')
router.register('portfolios', PortfolioViewSet, 'portfolios')
router.register('community/post', CommunityPostViewSet, 'community_post')
router.register('community/reply', CommunityReplyViewSet, 'community_reply')
router.register('order/icon', IconOrderViewSet, 'icon_order')

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
    url("^webhooks/paypal/$", ProcessWebhookView.as_view()),
    url("^icons/maker/$", IconMakerAPI.as_view()),
    url("^icons/maker/cleanup/$", IconMakerCleanupAPI.as_view()),
    url("^setup/icons/maker/$", IconMakerSetupAPI.as_view()),
    url(r"^reset/password/", include('django_rest_passwordreset.urls', namespace='password_reset')),
    url(r'^activate/account/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$',
        AccountActivateAPI.as_view(), name='activate')
]

