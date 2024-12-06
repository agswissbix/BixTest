# authentication/urls.py
from django.urls import path
from .views import get_users_list, get_workspaces_tables, save_tables_order, get_table_fields, save_new_table_field

urlpatterns = [
    path('get_users_list/', get_users_list, name='get_users_list'),
    path('get_workspaces_tables/', get_workspaces_tables, name='get_workspaces_tables'),
    path('save_tables_order/', save_tables_order, name='save_tables_order'),
    path('get_table_fields/', get_table_fields, name='get_table_fields'),
    path('save_new_table_field/', save_new_table_field, name='save_new_table_field'),
]