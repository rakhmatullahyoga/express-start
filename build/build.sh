#!/usr/bin/env bash
echo "============================================"
echo "Building application containers . . . ."
echo "============================================"
docker-compose build --no-cache
echo "============================================"
echo "Application containers built!"
echo "============================================"
echo ""