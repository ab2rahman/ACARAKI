# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ACARAKI is a monorepo for Festival Jamu Nusantara 2025 - a cultural event management system featuring:
- **Backend**: Laravel 11 API with Filament 3 admin panel
- **Frontend**: Next.js 16 public-facing website

**Domain**: Festival event registration, member check-ins via QR codes, activity tracking with points system, and gallery management.

**Production URL**: https://festivaljamunusantara.com/

---

## Quick Start

### Local Development (Docker)
```bash
cd backend
docker-compose up -d          # Start all services
# Backend: http://localhost/api
# phpMyAdmin: http://localhost:8080

cd ../frontend
npm run dev                   # Frontend: http://localhost:3000
```

### Production Server
- **SSH**: `ssh root@117.53.44.223` (password stored securely)
- **Backend**: `/var/www/app-be` (Laravel + PHP-FPM)
- **Frontend**: `/var/www/app-fe` (Next.js 16, Node.js 18.20.8)
- **Database**: MySQL 8.0 (acaraki_db)

---

## Common Commands

### Backend (Laravel)
```bash
cd backend

# Docker (recommended)
docker-compose up -d
docker-compose exec acaraki-be php artisan migrate
docker-compose exec acaraki-be php artisan storage:link

# Manual development server
php artisan serve

# Run tests
php artisan test                    # All tests
php artisan test --testsuite=Unit   # Unit tests only
php artisan test --filter TestName  # Specific test

# Database
php artisan migrate:fresh --seed    # Reset and seed database
php artisan migrate                 # Run migrations
php artisan db:seed                 # Seed database

# Code quality
./vendor/bin/pint                   # Fix code style (Laravel Pint)
php artisan optimize:clear          # Clear all caches

# Generate
php artisan make:migration          # Create migration
php artisan make:controller         # Create controller
php artisan make:model              # Create model
```

### Frontend (Next.js)
```bash
cd frontend

# Development (requires NEXT_PUBLIC_API_URL env variable)
npm run dev

# Production
npm run build
npm run start

# Linting
npm run lint
```

---

## Architecture

### Backend Structure

```
backend/app/
├── Filament/           # Filament admin resources & pages
│   ├── Resources/      # CRUD resources (Event, Festival, Booth, etc.)
│   └── Auth/           # Custom admin login
├── Http/
│   ├── Controllers/
│   │   └── Api/        # API controllers for frontend + members
│   └── Middleware/     # API auth middleware
├── Models/             # Eloquent models (Event, Festival, Booth, Activity, Member, etc.)
└── Providers/
    └── Filament/       # Admin panel configuration
```

### Key Domain Models

| Model | Purpose |
|-------|---------|
| **Event** | Public events with submission forms (fashion/mixologist competitions) |
| **Festival** | Main festival events with QR code check-ins (100 points) |
| **Booth** | Individual booths with QR code check-ins (50 points) |
| **Member** | User accounts (Sanctum auth) with point tracking |
| **Activity** | Check-in records linking members to festivals/booths |
| **Submission** | Event registration forms with file uploads |
| **Gallery** | Photo galleries with items |

### API Routes (backend/routes/api.php)

- **Public**: `/api/event`, `/api/event/{slug}`, `/api/gallery`, `/api/subscribe`
- **Auth**: `/api/auth/register`, `/api/auth/login`, `/api/auth/logout` (via Sanctum)
- **Member (protected)**: `/api/member/profile`, `/api/member/activities`, `/api/member/check-in`
- **Festival**: `/api/festival`

### Frontend Structure

```
frontend/src/
├── app/                # Next.js App Router pages
│   ├── [slug]/         # Event detail pages (dynamic)
│   ├── gallery/        # Gallery listing
│   ├── check-in/       # Member QR code check-in
│   └── member/         # Member profile & activities
├── components/         # React components
│   ├── Home/           # Homepage components
│   ├── EventDetail/    # Event page components
│   ├── Member/         # Member area components
│   └── Partials/       # Header, Footer
├── data/               # JSON content data
├── hooks/              # Custom React hooks
└── utils/
    └── auth.js         # API client with token refresh interceptor
```

---

## Key Patterns

### Authentication Flow
- **Members**: Laravel Sanctum token-based auth (`access_token` stored in localStorage)
- **Token refresh**: Axios interceptor in `frontend/src/utils/auth.js` handles 401 responses
- **Admin**: Filament's default auth (separate from member auth)

### QR Code System
- **Festivals/Booths**: Auto-generate 12-char alphanumeric codes on create
- **QR images**: Stored in `storage/app/public/qrcodes/`, served via `/storage/`
- **Check-in**: Members scan QR codes → `/api/member/check-in` → awards points
- **Points**: Festival = 100 points, Booth = 50 points

### File Uploads
- **Submissions**: Multiple file fields (`file_1` to `file_5`, `id_image`) stored in `storage/app/public/submissions/`
- **Tickets**: Stored in `tickets/` directory

### Admin Panel
- **Route**: Configurable via `CMS_ROUTE` env var (default: `webadmin`)
- **Resources**: Auto-discovered from `app/Filament/Resources/`
- **Theme**: Uses `hasnayeen/themes` plugin for theme switching

---

## Environment Variables

### Backend (.env) - Docker
```bash
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=acaraki_db
DB_USERNAME=acaraki_user
DB_PASSWORD=eGMtQznGqo~2
REDIS_HOST=redis
REDIS_PORT=6379
```

### Frontend (.env.local) - Local Development
```bash
NEXT_PUBLIC_API_URL=http://localhost/api
```

### Frontend (.env) - Production (Vercel)
```bash
NEXT_PUBLIC_API_URL=https://festivaljamunusantara.com/api
```

---

## Docker Services

| Service | Container | Port | Purpose |
|---------|-----------|------|---------|
| Laravel | acaraki-be | 80 | Backend API |
| MySQL | acaraki-mysql | 3306 | Database |
| Redis | acaraki-redis | 6379 | Cache/Queue |
| phpMyAdmin | acaraki-phpmyadmin | 8080 | DB Admin |

---

## Backup Files

| File | Location | Size | Description |
|------|----------|------|-------------|
| Database backup | `acaraki_backup_20260320.sql.gz` | 237KB | Full database dump |
| Storage backup | `backend/storage_temp.tar.gz` | 2.1GB | All images/files (local only) |

---

## Recent Changes (March 2025)

- ✅ Set up Docker environment for local development
- ✅ Downloaded ~5000 gallery images from server
- ✅ Cleaned malware from server startup scripts
- ✅ Upgraded Next.js from 15.3.3 to 16.2.0
- ✅ Upgraded server Node.js from v12 to v18.20.8
- ✅ Configured CORS for localhost access
- ✅ Fixed nginx configuration for production
- ✅ Deployed frontend to Vercel (dev-acaraki)

---

## Development Notes

- **Database**: Uses SQLite by default (`database/database.sqlite`)
- **Timezone**: Asia/Makassar (`APP_TIMEZONE` in .env)
- **Image optimization**: Uses `joshembling/image-optimizer` package
- **Frontend fetches**: Uses client-side `useEffect` for API calls (not SSR)
