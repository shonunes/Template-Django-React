from django.db import DatabaseError, connection
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def health_check(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT version();")
            db_version = cursor.fetchone()[0]
        return Response({
            "status": "ok",
            "database": "connected",
            "engine": connection.vendor,
            "details": db_version,
        })
    except DatabaseError as e:
        return Response(
            {"status": "error", "database": "disconnected", "details": str(e)},
            status=500,
        )
