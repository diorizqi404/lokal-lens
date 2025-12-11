# Deployment Guide - LokalLens

Panduan deployment aplikasi LokalLens menggunakan Docker di VPS.

## Prerequisites

- VPS dengan Docker dan Docker Compose terinstall
- Port 3000 dan 3306 tersedia
- File `lokallen_db.sql` di root project

## Setup di VPS

### 1. Install Docker & Docker Compose (jika belum)

```bash
# Update package list
sudo apt update

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose -y

# Add user to docker group (optional)
sudo usermod -aG docker $USER
```

### 2. Clone atau Upload Project

```bash
# Clone dari repository
git clone <your-repo-url>
cd lokal-lens

# Atau upload via SCP/SFTP
```

### 3. Setup Environment Variables

Pastikan file `.env` ada di root project dengan variabel yang benar:

```bash
# Copy dari template
cp .env.production .env

# Edit sesuai kebutuhan
nano .env
```

**PENTING**: Ganti `JWT_SECRET` dengan nilai yang aman di production!

### 4. Pastikan File SQL Ada

Pastikan file `lokallen_db.sql` ada di root project:

```bash
ls -la lokallen_db.sql
```

### 5. Build dan Run

```bash
# Build dan start containers
docker-compose up -d --build

# Lihat logs
docker-compose logs -f

# Cek status
docker-compose ps
```

### 6. Verifikasi Database

```bash
# Masuk ke MySQL container
docker exec -it lokallens-mysql mysql -u lokallens -plokallens123 lokal-lens

# Cek tables
SHOW TABLES;
exit;
```

## Management Commands

### Stop Containers
```bash
docker-compose down
```

### Restart Containers
```bash
docker-compose restart
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app
docker-compose logs -f mysql
```

### Rebuild After Code Changes
```bash
docker-compose down
docker-compose up -d --build
```

### Backup Database
```bash
docker exec lokallens-mysql mysqldump -u lokallens -plokallens123 lokal-lens > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Restore Database
```bash
docker exec -i lokallens-mysql mysql -u lokallens -plokallens123 lokal-lens < backup.sql
```

## Nginx Reverse Proxy (Optional)

Untuk production, disarankan menggunakan Nginx sebagai reverse proxy:

### Install Nginx
```bash
sudo apt install nginx -y
```

### Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/lokallens
```

Paste konfigurasi berikut:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Enable Site
```bash
sudo ln -s /etc/nginx/sites-available/lokallens /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### SSL dengan Certbot (Optional)
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d your-domain.com
```

## Troubleshooting

### Container tidak start
```bash
# Cek logs
docker-compose logs

# Cek status
docker-compose ps
```

### Database connection error
```bash
# Pastikan MySQL sudah ready
docker-compose logs mysql

# Test connection
docker exec -it lokallens-mysql mysql -u lokallens -plokallens123 -e "SELECT 1"
```

### Port sudah digunakan
```bash
# Cek port yang digunakan
sudo netstat -tulpn | grep :3000
sudo netstat -tulpn | grep :3306

# Ubah port di docker-compose.yml jika perlu
```

### Rebuild dari awal
```bash
docker-compose down -v
docker-compose up -d --build
```

## Security Notes

1. **Ganti JWT_SECRET** di production dengan nilai yang kuat
2. **Ganti MySQL password** di docker-compose.yml
3. **Jangan expose port MySQL** ke public (hapus `ports` di service mysql jika tidak perlu akses eksternal)
4. **Gunakan firewall** untuk membatasi akses
5. **Setup SSL** dengan Certbot untuk HTTPS
6. **Regular backup** database

## Monitoring

### Check Resource Usage
```bash
docker stats
```

### Check Disk Space
```bash
df -h
docker system df
```

### Clean Up Unused Resources
```bash
docker system prune -a
```

## Update Application

```bash
# Pull latest code
git pull

# Rebuild and restart
docker-compose down
docker-compose up -d --build
```

## Support

Jika ada masalah, cek:
1. Logs: `docker-compose logs -f`
2. Container status: `docker-compose ps`
3. Network: `docker network ls`
4. Volumes: `docker volume ls`
