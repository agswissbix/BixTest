# authentication/urls.py
from django.urls import path
from .views import get_sidebar_tables, get_table_data

urlpatterns = [
    path('get_sidebar_tables/', get_sidebar_tables, name='get_sidebar_tables'),
    path('get_table_data/', get_table_data, name='get_table_data'),
]