#!/usr/bin/env bash
echo "============================================"
echo "Run application tests . . . ."
echo "============================================"
docker-compose run --rm api npm test
echo "============================================"
echo "Application testing completed!"
echo "============================================"
echo ""