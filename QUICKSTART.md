# Quick Start Guide - LokalLens Docker

## 🚀 Fastest Way to Deploy

### Prerequisites
- Docker & Docker Compose installed
- File `lokallen_db.sql` in project root
- `.env` file configured

### Option 1: Using Makefile (Recommended)

```bash
# Enable BuildKit (IMPORTANT!)
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

# Build and start (one command!)
make rebuild

# Or step by step
make build    # Build images
make up       # Start containers
make logs     # View logs
```

### Option 2: Using Docker Compose

```bash
# Enable BuildKit
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

# Build and start
docker compose build
docker compose up -d

# View logs
docker compose logs -f
```

### Option 3: Using Build Script

```bash
chmod +x build-optimized.sh
./build-optimized.sh
```

## 📋 Common Commands

```bash
# View all available commands
make help

# Start containers
make up

# Stop containers
make down

# Restart
make restart

# View logs
make logs           # All logs
make logs-app       # App only
make logs-mysql     # MySQL only

# Rebuild after code changes
make rebuild

# Clean everything
make clean

# Backup database
make backup-db

# Shell access
make shell-app      # App container
make shell-mysql    # MySQL container
```

## 🔧 Troubleshooting

### Build too slow?
```bash
# Make sure BuildKit is enabled
echo $DOCKER_BUILDKIT  # Should output: 1

# If not, enable it
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1
```

### Prisma error?
```bash
# Rebuild without cache
make build-no-cache
make up
```

### Database connection error?
```bash
# Check MySQL is ready
docker compose logs mysql

# Wait for "ready for connections"
```

### Port already in use?
```bash
# Check what's using the port
sudo netstat -tulpn | grep :9999

# Change port in docker compose.yml if needed
```

## 🎯 Access Application

- **Application**: http://your-vps-ip:9999
- **MySQL**: localhost:9906 (if exposed)

## 📊 Monitoring

```bash
# Resource usage
make stats

# Disk usage
make disk

# Container status
make ps
```

## 🔐 Security Checklist

- [ ] Change `JWT_SECRET` in `.env`
- [ ] Change MySQL passwords in `docker compose.yml`
- [ ] Setup firewall (ufw/iptables)
- [ ] Setup Nginx reverse proxy
- [ ] Setup SSL with Certbot
- [ ] Regular database backups

## 📚 More Info

- Full deployment guide: `DEPLOYMENT.md`
- Build optimization: `BUILD-OPTIMIZATION.md`
- Docker best practices: Official Docker docs

## 🆘 Need Help?

1. Check logs: `make logs`
2. Check container status: `make ps`
3. Check resources: `make stats`
4. Read troubleshooting in `DEPLOYMENT.md`
