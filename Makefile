.PHONY: build up down restart logs clean help

# Enable BuildKit
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

help: ## Show this help
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

build: ## Build with optimizations (fast)
	@echo "🚀 Building with BuildKit optimizations..."
	docker compose build --build-arg BUILDKIT_INLINE_CACHE=1

build-no-cache: ## Build without cache (slow, for debugging)
	@echo "🔨 Building without cache..."
	docker compose build --no-cache

up: ## Start containers
	@echo "▶️  Starting containers..."
	docker compose up -d
	@echo "✅ Containers started!"
	@make logs

down: ## Stop containers
	@echo "⏹️  Stopping containers..."
	docker compose down
	@echo "✅ Containers stopped!"

restart: ## Restart containers
	@echo "🔄 Restarting..."
	@make down
	@make up

logs: ## Show logs
	docker compose logs -f

logs-app: ## Show app logs only
	docker compose logs -f app

logs-mysql: ## Show MySQL logs only
	docker compose logs -f mysql

ps: ## Show container status
	docker compose ps

rebuild: ## Rebuild and restart (fast)
	@echo "🔄 Rebuilding and restarting..."
	@make build
	@make down
	@make up

clean: ## Clean all (containers, volumes, images)
	@echo "🧹 Cleaning up..."
	docker compose down -v
	docker system prune -f
	@echo "✅ Cleaned!"

clean-cache: ## Clean build cache only
	@echo "🧹 Cleaning build cache..."
	docker builder prune -f
	@echo "✅ Cache cleaned!"

shell-app: ## Shell into app container
	docker exec -it lokallens-app sh

shell-mysql: ## Shell into MySQL container
	docker exec -it lokallens-mysql mysql -u lokallens -plokallens123 lokal-lens

backup-db: ## Backup database
	@echo "💾 Backing up database..."
	docker exec lokallens-mysql mysqldump -u lokallens -plokallens123 lokal-lens > backup_$$(date +%Y%m%d_%H%M%S).sql
	@echo "✅ Backup created!"

restore-db: ## Restore database (usage: make restore-db FILE=backup.sql)
	@echo "📥 Restoring database from $(FILE)..."
	docker exec -i lokallens-mysql mysql -u lokallens -plokallens123 lokal-lens < $(FILE)
	@echo "✅ Database restored!"

stats: ## Show resource usage
	docker stats

disk: ## Show disk usage
	docker system df -v
