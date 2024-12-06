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


def get_field_options(request):
    data = json.loads(request.body)
    fieldid = data['fieldid']

    with connection.cursor() as cursor:
        cursor.execute("SELECT optionid, description FROM sys_option WHERE fieldid = %s", [fieldid])
        options = dictfetchall(cursor)

    return JsonResponse({"options": options})


def save_new_table_field(request):
    data = json.loads(request.body)

    tableid = data['tableid']
    fieldid = data['fieldid']
    fielddescription = data['fielddescription']
    fieldtype = data['fieldtype']

    with connection.cursor() as cursor:
        cursor.execute(
            "SELECT * FROM sys_field WHERE tableid= %s AND fieldid= %s", [tableid, fieldid]
        )
        row = dictfetchall(cursor)

        if not row:

            if fieldtype != 'Linked' and fieldtype != 'LongText':
                if fieldtype == 'Categoria':
                    cursor.execute(
                        "INSERT INTO sys_field (tableid, fieldid, description, lookuptableid, fieldtypeid, length, label) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                        [tableid, fieldid, fielddescription, fieldid + '_' + tableid, 'Parola', 255, 'Dati']
                    )
                if fieldtype == 'Checkbox':
                    cursor.execute(
                        "INSERT INTO sys_field (tableid, fieldid, description, lookuptableid, fieldtypeid, length, label, fieldtypewebid) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
                        [tableid, fieldid, fielddescription, fieldid + '_' + tableid, 'Parola', 255, 'Dati', 'checkbox']
                    )

                elif fieldtype in [ 'Numero', 'Parola', 'Memo', 'Utente']:
                    cursor.execute(
                        "INSERT INTO sys_field (tableid, fieldid, description, fieldtypeid, length, label) VALUES (%s, %s, %s, %s, %s, %s)",
                        [tableid, fieldid, fielddescription, fieldtype, 255, 'Dati']
                    )

                sql = f"ALTER TABLE user_{tableid} ADD COLUMN {fieldid} VARCHAR(255) NULL"

                if fieldtype == 'Data':
                    cursor.execute(
                        "INSERT INTO sys_field (tableid, fieldid, description, fieldtypeid, length, label) VALUES (%s, %s, %s, %s, %s, %s)",
                        [tableid, fieldid, fielddescription, 'Data', 255, 'Dati']
                    )

                    sql = f"ALTER TABLE user_{tableid} ADD COLUMN {fieldid} DATE NULL"


                cursor.execute(sql)

                if fieldtype == 'Categoria':

                    cursor.execute(
                        "INSERT INTO sys_lookup_table (description, tableid, itemtype, codelen, desclen) VALUES (%s, %s, %s, %s, %s)",
                        [fieldid, fieldid + '_' + tableid, 'Carattere', 255, 255]
                    )

                    values = data['valuesArray']

                    for value in values:
                        id = value['id']
                        description = value['description']

                        cursor.execute(
                            "INSERT INTO sys_lookup_table_item (lookuptableid, itemcode, itemdesc) VALUES (%s, %s, %s)",
                            [fieldid + '_' + tableid, description, description]
                        )
                    
                if fieldtype == 'Checkbox':
                    
                    cursor.execute(
                        "INSERT INTO sys_lookup_table (description, tableid, itemtype, codelen, desclen) VALUES (%s, %s, %s, %s, %s)",
                        [fieldid, fieldid + '_' + tableid, 'Carattere', 255, 255]
                    )

                    cursor.execute(
                        "INSERT INTO sys_lookup_table_item (lookuptableid, itemcode, itemdesc) VALUES (%s, %s, %s)",
                        [fieldid + '_' + tableid, 'Si', 'Si']
                    )

                    cursor.execute(
                        "INSERT INTO sys_lookup_table_item (lookuptableid, itemcode, itemdesc) VALUES (%s, %s, %s)",
                        [fieldid + '_' + tableid, 'No', 'No']
                    )

            elif fieldtype == 'LongText':


                cursor.execute(
                    "INSERT INTO sys_field (tableid, fieldid, description, fieldtypeid, length, label, fieldtypewebid) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                    [tableid, fieldid, fielddescription, 'Memo', 4294967295, 'Dati', 'html']
                )

                sql = f"ALTER TABLE user_{tableid} ADD COLUMN {fieldid} LONGTEXT NULL"

                cursor.execute(sql)


            else:

                linkedtableid = data['linkedtable']
                newcolumn = 'recordid' + linkedtableid + '_'
                newcolumn2 = '_recordid' + linkedtableid

                fieldid2 = 'recordid' + tableid + '_'

                fields = data['linkedtablefields']
                keyfieldlink = ''

                for field in fields:
                    keyfieldlink += field + ','

                keyfieldlink = keyfieldlink[:-1]

                sql = f"ALTER TABLE user_{tableid} ADD COLUMN {newcolumn} VARCHAR(255) NULL"

                sql2 = f"INSERT INTO sys_field (tableid, fieldid, description, fieldtypeid, length, label, keyfieldlink, tablelink) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
                params2 = [tableid, newcolumn, fielddescription, 'Parola', 255, linkedtableid, keyfieldlink,
                           linkedtableid]

                sql3 = f"INSERT INTO sys_field (tableid, fieldid, description, fieldtypeid, length, label, keyfieldlink, tablelink) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
                params3 = [linkedtableid, fieldid2, fielddescription, 'Parola', 255, tableid, keyfieldlink, tableid]

                sql4 = f"INSERT INTO sys_table_link (tableid, tablelinkid) VALUES (%s, %s)"
                params4 = [linkedtableid, tableid]

                sql5 = f"ALTER TABLE user_{tableid} ADD COLUMN {newcolumn2} VARCHAR(255) NULL"

                sql6 = f"INSERT INTO sys_field (tableid, fieldid, description, fieldtypeid, length, label, keyfieldlink, tablelink) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"
                params6 = [tableid, newcolumn2, fielddescription, 'Parola', 255, 'Dati', keyfieldlink, linkedtableid]

                with connection.cursor() as cursor:
                    cursor.execute(sql)
                    cursor.execute(sql2, params2)
                    cursor.execute(sql3, params3)
                    cursor.execute(sql4, params4)
                    cursor.execute(sql5)
                    cursor.execute(sql6, params6)

    return JsonResponse({'success': True})



