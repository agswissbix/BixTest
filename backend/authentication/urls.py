# authentication/urls.py
from django.urls import path
from .views import login_view, logout_view, home_view
from .views import csrf_token_view

urlpatterns = [
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('home/', home_view, name='home'),
    path('csrf-token/', csrf_token_view, name='csrf_token'),
]