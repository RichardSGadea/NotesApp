#!/bin/sh
# entrypoint.sh

# Instalar dependencias de Composer (si no se instalaron)
composer install

# Ejecutar migraciones automáticamente
php artisan migrate --force

# Iniciar servidor PHP
php artisan serve --host=0.0.0.0 --port=8000
