# Build Optimization Guide

## Masalah: Build Lambat (1000+ detik)

### Penyebab Utama:
1. **npm install lambat** - Download dependencies dari internet
2. **Next.js build lambat** - Compile semua pages dan components
3. **Prisma generate** - Generate Prisma Client
4. **No caching** - Rebuild dari awal setiap kali

## Solusi Optimasi

### 1. Enable Docker BuildKit (PALING PENTING!)

```bash
# Set environment variables
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

# Atau tambahkan ke ~/.bashrc atau ~/.zshrc
echo 'export DOCKER_BUILDKIT=1' >> ~/.bashrc
echo 'export COMPOSE_DOCKER_CLI_BUILD=1' >> ~/.bashrc
source ~/.bashrc
```

**Benefit**: BuildKit 2-3x lebih cepat dengan parallel builds dan better caching

### 2. Gunakan Build Script

```bash
# Beri permission
chmod +x build-optimized.sh

# Run
./build-optimized.sh
```

### 3. Build dengan Cache

```bash
# First build (lambat)
DOCKER_BUILDKIT=1 docker compose build

# Subsequent builds (cepat karena cache)
DOCKER_BUILDKIT=1 docker compose build
```

### 4. Optimasi npm install

Di Dockerfile sudah dioptimasi dengan:
- `npm ci` instead of `npm install` (lebih cepat & deterministic)
- `--ignore-scripts` untuk skip unnecessary scripts
- `npm cache clean --force` untuk cleanup
- Multi-stage build untuk separate dependencies

### 5. Layer Caching Strategy

Dockerfile sudah dioptimasi dengan urutan:
1. Install system dependencies (jarang berubah)
2. Copy package.json (berubah kadang-kadang)
3. npm install (di-cache jika package.json tidak berubah)
4. Copy source code (sering berubah)
5. Build (hanya jika source berubah)

### 6. Gunakan .dockerignore

File `.dockerignore` sudah dikonfigurasi untuk exclude:
- node_modules (tidak perlu di-copy)
- .next (build output lama)
- .git (tidak perlu)
- Documentation files

## Estimasi Waktu Build

### Tanpa Optimasi:
- First build: **15-20 menit** (900-1200 detik)
- Rebuild: **15-20 menit** (selalu dari awal)

### Dengan Optimasi:
- First build: **8-12 menit** (480-720 detik)
- Rebuild (no code change): **30-60 detik** (cache hit)
- Rebuild (code change): **2-4 menit** (120-240 detik)

## Tips Tambahan

### 1. Build di VPS dengan Spec Lebih Tinggi
```bash
# Cek CPU cores
nproc

# Jika punya banyak cores, npm akan otomatis parallel
```

### 2. Gunakan npm Registry Mirror (Opsional)
Jika di Indonesia, gunakan mirror lokal:

```bash
# Tambahkan di Dockerfile sebelum npm ci
RUN npm config set registry https://registry.npmmirror.com
```

### 3. Pre-build di Local, Push Image
Jika VPS lemah, build di local lalu push:

```bash
# Build di local
docker build -t lokallens-app:latest .

# Save to tar
docker save lokallens-app:latest > lokallens-app.tar

# Upload ke VPS
scp lokallens-app.tar user@vps:/path/

# Load di VPS
docker load < lokallens-app.tar
```

### 4. Gunakan Docker Registry
Setup private registry atau gunakan Docker Hub:

```bash
# Tag image
docker tag lokallens-app:latest yourusername/lokallens-app:latest

# Push
docker push yourusername/lokallens-app:latest

# Pull di VPS
docker pull yourusername/lokallens-app:latest
```

## Monitoring Build Progress

### Lihat Detail Build
```bash
DOCKER_BUILDKIT=1 docker compose build --progress=plain
```

### Lihat Layer Cache
```bash
docker system df -v
```

### Clean Build Cache (jika perlu)
```bash
# Clean all cache
docker builder prune -a

# Clean specific cache
docker builder prune --filter "until=24h"
```

## Troubleshooting

### Build Masih Lambat?

1. **Cek BuildKit aktif**:
```bash
docker version | grep BuildKit
```

2. **Cek network speed**:
```bash
# Test npm registry speed
time npm view next version
```

3. **Cek disk space**:
```bash
df -h
docker system df
```

4. **Cek CPU/Memory**:
```bash
htop
# atau
top
```

### Cache Tidak Bekerja?

1. **Pastikan file tidak berubah**:
```bash
# Jangan edit package.json jika tidak perlu
# Jangan edit Dockerfile jika tidak perlu
```

2. **Rebuild dengan cache**:
```bash
# Jangan gunakan --no-cache kecuali perlu
docker compose build
```

## Best Practices

1. ✅ **Selalu enable BuildKit**
2. ✅ **Jangan edit package.json kecuali perlu**
3. ✅ **Gunakan .dockerignore**
4. ✅ **Build incremental, bukan dari awal**
5. ✅ **Monitor build time untuk detect issues**
6. ❌ **Jangan gunakan `--no-cache` kecuali debugging**
7. ❌ **Jangan copy node_modules ke Docker**
8. ❌ **Jangan install unnecessary packages**

## Hasil Akhir

Dengan semua optimasi ini, build time seharusnya:
- **First build**: 8-12 menit
- **Rebuild (minor changes)**: 2-4 menit
- **Rebuild (no changes)**: 30-60 detik

Jauh lebih cepat dari 1000+ detik! 🚀
