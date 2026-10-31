#!/usr/bin/env bash
set -e

echo "Waiting for database to become available..."
python -c "
import sys, time, psycopg, os
db_url = os.getenv('DATABASE_URL')
for _ in range(30):
    try:
        psycopg.connect(db_url)
        print('Database is ready!')
        sys.exit(0)
    except Exception:
        print('Database DNS/Connection not ready yet. Retrying in 1 second...')
        time.sleep(1)
print('Could not connect to database after 30 seconds.')
sys.exit(1)
"

echo "Running database migrations..."
python manage.py migrate --noinput

echo "Ensuring default superuser exists..."
python manage.py createsuperuser --noinput || true

exec "$@"
