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
    data = json.loads(request.body)
    userid=data['user']

    with connection.cursor() as cursor:
        cursor.execute(f"SELECT workspaceid as id, name, icon FROM sys_table_workspace")
        workspaces = dictfetchall(cursor)

        cursor.execute("SELECT sys_table.id, sys_user_table_order.tableorder, sys_table.workspace, sys_table.description AS name FROM sys_table LEFT JOIN sys_user_table_order ON sys_user_table_order.tableid = sys_table.id AND sys_user_table_order.userid = %s ORDER BY sys_user_table_order.tableorder", [userid])
        tables = dictfetchall(cursor)

        for workspace in workspaces:
            workspace['tables'] = []
            for table in tables:
                if table['workspace'] == workspace['name']:
                    workspace['tables'].append(table)
                    if table['tableorder'] is None:
                         table['isVisible'] = False
                    else:   
                        table['isVisible'] = True


    return JsonResponse({"workspaces": workspaces})


def save_tables_order(request):
    data = json.loads(request.body)
    workspaces = data['workspaces']
    userid = data['userid']

    with connection.cursor() as cursor:
        cursor.execute("DELETE FROM sys_user_table_order WHERE userid = %s", [userid])
        for workspace in workspaces:
            for table in workspace['tables']:
                    cursor.execute("UPDATE sys_table SET workspace = %s WHERE id = %s", [workspace['name'], table['id']])
                    if table['isVisible']:
                        cursor.execute("INSERT INTO sys_user_table_order (userid, tableid, tableorder,typepreference) VALUES (%s, %s, %s, 'menu')", [userid, table['id'], table['tableorder']])
 
    return JsonResponse({"status": "ok"})

def get_table_fields(request):
    data = json.loads(request.body)
    tableid = data['tableid']

    with connection.cursor() as cursor:
        cursor.execute("SELECT fieldid, description FROM sys_field WHERE tableid = %s", [tableid])
        fields = dictfetchall(cursor)

    return JsonResponse({"fields": fields})



