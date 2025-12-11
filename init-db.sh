#!/bin/bash
set -e

echo "Waiting for MySQL to be ready..."
until mysql -h localhost -P 9906 -u root -p"${MYSQL_ROOT_PASSWORD}" -e "SELECT 1" > /dev/null 2>&1; do
  echo "MySQL is unavailable - sleeping"
  sleep 2
done

echo "MySQL is up - creating user and database..."

mysql -h localhost -P 9906 -u root -p"${MYSQL_ROOT_PASSWORD}" <<-EOSQL
    CREATE DATABASE IF NOT EXISTS \`${MYSQL_DATABASE}\`;
    CREATE USER IF NOT EXISTS '${MYSQL_USER}'@'%' IDENTIFIED BY '${MYSQL_PASSWORD}';
    GRANT ALL PRIVILEGES ON \`${MYSQL_DATABASE}\`.* TO '${MYSQL_USER}'@'%';
    FLUSH PRIVILEGES;
EOSQL

echo "User and database created successfully!"

# Import SQL dump if exists
if [ -f /docker-entrypoint-initdb.d/lokallen_db.sql ]; then
    echo "Importing SQL dump..."
    mysql -h localhost -P 9906 -u root -p"${MYSQL_ROOT_PASSWORD}" "${MYSQL_DATABASE}" < /docker-entrypoint-initdb.d/lokallen_db.sql
    echo "SQL dump imported successfully!"
fi

echo "Database initialization complete!"
