from django.shortcuts import render
from django.http import JsonResponse
from django.db import connection
import json
from bix_settings.views import dictfetchall

def get_sidebar_tables(request):
    with connection.cursor() as cursor:
        cursor.execute(f"SELECT workspaceid as id, name, icon FROM sys_table_workspace")
        workspaces = dictfetchall(cursor)

        cursor.execute(f"SELECT id, description as name, workspace, workspaceorder FROM sys_table WHERE workspaceorder is not null ORDER BY workspaceorder")
        tables = dictfetchall(cursor)

        for workspace in workspaces:
            workspace['tables'] = []
            for table in tables:
                if table['workspace'] == workspace['name']:
                    workspace['tables'].append(table)

    return JsonResponse({"workspaces": workspaces})

def get_table_data(request):
    data = json.loads(request.body)
    tableid = data.get("tableid")
    tableid = 'user_' + tableid
    with connection.cursor() as cursor:
        cursor.execute(f"SELECT * FROM {tableid} WHERE deleted_ = 'N' LIMIT 40")
        table_rows = dictfetchall(cursor)
    return JsonResponse({"table_rows": table_rows})

    
