# Docker Commands Cheatsheet - LokalLens

## 🚀 Quick Commands (Using Makefile)

```bash
make help          # Show all available commands
make build         # Build images (fast, with cache)
make up            # Start containers
make down          # Stop containers
make restart       # Restart containers
make logs          # View all logs
make logs-app      # View app logs only
make logs-mysql    # View MySQL logs only
make rebuild       # Rebuild and restart
make clean         # Clean everything
make ps            # Show container status
make stats         # Show resource usage
```

## 🔧 Setup Commands

```bash
# 1. Enable BuildKit (IMPORTANT!)
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

# Add to ~/.bashrc for permanent
echo 'export DOCKER_BUILDKIT=1' >> ~/.bashrc
echo 'export COMPOSE_DOCKER_CLI_BUILD=1' >> ~/.bashrc
source ~/.bashrc

# 2. First time build
make build
make up

# Or without Makefile
docker compose build
docker compose up -d
```

## 📦 Build Commands

```bash
# Fast build (with cache)
make build
# or
docker compose build

# Build without cache (for debugging)
make build-no-cache
# or
docker compose build --no-cache

# Build specific service
docker compose build app
docker compose build mysql

# Build with progress output
docker compose build --progress=plain
```

## ▶️ Container Management

```bash
# Start containers
make up
# or
docker compose up -d

# Stop containers
make down
# or
docker compose down

# Restart containers
make restart
# or
docker compose restart

# Stop and remove volumes
docker compose down -v

# Rebuild and restart
make rebuild
```

## 📊 Monitoring Commands

```bash
# View logs (follow mode)
make logs
# or
docker compose logs -f

# View specific service logs
make logs-app
make logs-mysql
# or
docker compose logs -f app
docker compose logs -f mysql

# View last 100 lines
docker compose logs --tail=100 app

# Container status
make ps
# or
docker compose ps

# Resource usage (live)
make stats
# or
docker stats

# Disk usage
make disk
# or
docker system df -v
```

## 🔍 Debugging Commands

```bash
# Shell into app container
make shell-app
# or
docker exec -it lokallens-app sh

# Shell into MySQL
make shell-mysql
# or
docker exec -it lokallens-mysql mysql -u lokallens -plokallens123 lokal-lens

# Check app container processes
docker exec lokallens-app ps aux

# Check environment variables
docker exec lokallens-app env

# Inspect container
docker inspect lokallens-app

# Check networks
docker network ls
docker network inspect lokallens-network
```

## 💾 Database Commands

```bash
# Backup database
make backup-db
# or
docker exec lokallens-mysql mysqldump -u lokallens -plokallens123 lokal-lens > backup.sql

# Restore database
make restore-db FILE=backup.sql
# or
docker exec -i lokallens-mysql mysql -u lokallens -plokallens123 lokal-lens < backup.sql

# MySQL shell
docker exec -it lokallens-mysql mysql -u lokallens -plokallens123 lokal-lens

# Show tables
docker exec lokallens-mysql mysql -u lokallens -plokallens123 lokal-lens -e "SHOW TABLES;"

# Check database size
docker exec lokallens-mysql mysql -u lokallens -plokallens123 -e "SELECT table_schema AS 'Database', ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)' FROM information_schema.TABLES WHERE table_schema = 'lokal-lens';"
```

## 🧹 Cleanup Commands

```bash
# Clean everything (containers, volumes, images)
make clean
# or
docker compose down -v
docker system prune -f

# Clean build cache only
make clean-cache
# or
docker builder prune -f

# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Remove unused networks
docker network prune

# Nuclear option (clean EVERYTHING)
docker system prune -a --volumes
```

## 🔄 Update Commands

```bash
# After code changes
git pull
make rebuild

# After dependency changes (package.json)
make build-no-cache
make up

# After Dockerfile changes
make build-no-cache
make up

# After docker compose.yml changes
make down
make up
```

## 🐛 Troubleshooting Commands

```bash
# Check if BuildKit is enabled
echo $DOCKER_BUILDKIT  # Should be: 1

# Check Docker version
docker version

# Check Docker Compose version
docker compose version

# Check container health
docker inspect --format='{{.State.Health.Status}}' lokallens-app

# Check MySQL health
docker inspect --format='{{.State.Health.Status}}' lokallens-mysql

# Check port usage
sudo netstat -tulpn | grep :9999
sudo netstat -tulpn | grep :9906

# Check disk space
df -h
docker system df

# Check memory usage
free -h

# View Docker daemon logs
sudo journalctl -u docker -f
```

## 📝 Useful One-Liners

```bash
# Restart only app container
docker compose restart app

# View app logs in real-time with timestamps
docker compose logs -f --timestamps app

# Count number of running containers
docker ps -q | wc -l

# Get app container IP
docker inspect -f '{{range.NetworkSettings.Networks}}{{.IPAddress}}{{end}}' lokallens-app

# Check if app is responding
curl http://localhost:9999

# Follow logs and grep for errors
docker compose logs -f app | grep -i error

# Export container as image
docker commit lokallens-app lokallens-backup:latest

# Copy file from container
docker cp lokallens-app:/app/.next/standalone ./backup/

# Copy file to container
docker cp ./file.txt lokallens-app:/app/
```

## 🎯 Production Commands

```bash
# Deploy to production
git pull
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1
docker compose build
docker compose up -d

# Zero-downtime deployment (if using multiple instances)
docker compose up -d --no-deps --build app

# Backup before update
make backup-db
docker commit lokallens-app lokallens-backup:$(date +%Y%m%d)

# Rollback if needed
docker compose down
docker tag lokallens-backup:20241211 lokallens-app:latest
docker compose up -d
```

## 📚 Environment Variables

```bash
# View all environment variables in container
docker exec lokallens-app env

# Check specific variable
docker exec lokallens-app printenv DATABASE_URL

# Set environment variable temporarily
docker compose run -e DEBUG=true app sh
```

## 🔐 Security Commands

```bash
# Scan image for vulnerabilities (if Docker Scout installed)
docker scout cves lokallens-app

# Check running processes in container
docker exec lokallens-app ps aux

# Check open ports
docker exec lokallens-app netstat -tulpn

# View container logs for security events
docker compose logs app | grep -i "error\|fail\|unauthorized"
```

---

**Pro Tip**: Add these to your shell aliases for even faster access!

```bash
# Add to ~/.bashrc or ~/.zshrc
alias dc='docker compose'
alias dcb='docker compose build'
alias dcu='docker compose up -d'
alias dcd='docker compose down'
alias dcl='docker compose logs -f'
alias dcp='docker compose ps'
```
