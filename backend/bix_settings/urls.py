# authentication/urls.py
from django.urls import path
from .views import get_users_list, get_workspaces_tables

urlpatterns = [
    path('get_users_list/', get_users_list, name='get_users_list'),
    path('get_workspaces_tables/', get_workspaces_tables, name='get_workspaces_tables'),
]