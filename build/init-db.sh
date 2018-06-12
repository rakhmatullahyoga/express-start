#!/usr/bin/env bash
echo "============================================"
echo "Run database migration and seeds . . . ."
echo "============================================"
docker-compose run --rm api /bin/bash -c "node node_modules/.bin/sequelize db:migrate && node node_modules/.bin/sequelize db:seed:all"
echo "============================================"
echo "Database initialization succeed!"
echo "============================================"
echo ""