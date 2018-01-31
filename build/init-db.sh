#!/usr/bin/env bash
echo "============================================"
echo "Run database migration and seeds . . . ."
echo "============================================"
docker-compose run --rm api node node_modules/.bin/sequelize db:migrate
echo "============================================"
echo "Database initialization succeed!"
echo "============================================"
echo ""