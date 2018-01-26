#!/usr/bin/env bash
echo "============================================"
echo "Run application tests . . . ."
echo "============================================"
docker exec myapp-api npm test
echo "============================================"
echo "Application testing completed!"
echo "============================================"
echo ""