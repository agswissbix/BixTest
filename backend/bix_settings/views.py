# authentication/views.py
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
import json


def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
        ]


def get_users_list(request):
        with connection.cursor() as cursor:
            cursor.execute("SELECT sys_user_id as value,username as description FROM v_users")
            users = dictfetchall(cursor)
            print(users)
            return JsonResponse({"users": users})


def get_workspaces_tables(request):
    with connection.cursor() as cursor:
        cursor.execute(f"SELECT workspaceid as id, name, icon FROM sys_table_workspace")
        workspaces = dictfetchall(cursor)

        cursor.execute(f"SELECT id, description as name, workspace, workspaceorder FROM sys_table ORDER BY workspaceorder")
        tables = dictfetchall(cursor)

        for workspace in workspaces:
            workspace['tables'] = []
            for table in tables:
                if table['workspace'] == workspace['name']:
                    workspace['tables'].append(table)


    return JsonResponse({"workspaces": workspaces})
