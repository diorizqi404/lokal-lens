#!/bin/bash

# Enable Docker BuildKit for faster builds
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

echo "🚀 Building with optimizations..."
echo "⚡ BuildKit enabled"

# Build with BuildKit and layer caching
docker compose build \
  --build-arg BUILDKIT_INLINE_CACHE=1 \
  --progress=plain

echo "✅ Build complete!"
echo "🎯 Starting containers..."

docker compose up -d

echo "📊 Checking status..."
docker compose ps

echo ""
echo "📝 View logs with: docker compose logs -f app"
