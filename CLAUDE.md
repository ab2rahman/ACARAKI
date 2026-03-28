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
- **SSH**: `ssh root@117.53.44.223` (password: `2026~acarak1`)
- **Backend**: `/var/www/app-be` (Laravel + PHP-FPM 8.2)
- **Frontend**: `/var/www/app-fe` (Next.js 15.3.3, Node.js 18.20.8, PM2 managed)
- **Database**: MySQL 8.0 (acaraki_db) at localhost
- **DB Credentials**: acaraki_user / eGMtQznGqo~2
- **Cron Cleaned**: Malware (XMRig miner) removed from crontab (March 2026)

#### PM2 Process Management (Frontend)
```bash
# SSH to server first
ssh root@117.53.44.223

# Check process status
pm2 list

# View logs
pm2 logs acaraki-fe

# Restart frontend
pm2 restart acaraki-fe

# Stop/Start
pm2 stop acaraki-fe
pm2 start acaraki-fe

# Monitor resources
pm2 monit

# After making changes, save for reboot persistence
pm2 save
```

#### Frontend Deployment
```bash
# SSH to server
ssh root@117.53.44.223

# Navigate to frontend directory
cd /var/www/app-fe

# Pull latest code
git pull

# Install dependencies (if needed)
npm install --legacy-peer-deps

# Build production bundle
npm run build

# Restart PM2 process
pm2 restart acaraki-fe
pm2 save
```

---

## Common Commands

### Backend (Laravel)
```bash
cd backend

# Docker (recommended)
docker-compose up -d
docker-compose exec backend-acaraki-be-1 php artisan migrate
docker-compose exec backend-acaraki-be-1 php artisan storage:link
# Note: Container name is `backend-acaraki-be-1`

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

# Install QR scanner dependency (if needed)
npm install react-qr-scanner --legacy-peer-deps
npm install @babel/runtime --legacy-peer-deps

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
│   ├── Home/           # Homepage components (Banner, Tickets, Galleries, etc.)
│   ├── EventDetail/    # Event page components
│   ├── Member/         # Member area components (LoginRegister, MemberDetails)
│   ├── Partials/       # Header, Footer
│   └── QRScanner/      # Mobile QR scanner component (floating FAB)
├── constants/          # Design system constants
│   └── design.js       # Key Visual fonts, colors, typography tokens
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
- **Check-in via Scanner**: Mobile-only floating QR scanner button → opens camera → scans code → `/api/member/check-in` → awards points
- **Check-in via URL**: Members can also visit `/check-in/{code}` directly
- **Points**: Festival = 100 points, Booth = 50 points
- **Scanner Component**: `frontend/src/components/QRScanner/QRScanner.js`
  - Only visible on mobile (<768px)
  - Only shows when user is authenticated
  - Uses `react-qr-scanner` library
  - Floating orange FAB button at bottom-right corner

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

## Data Sync from Production

To sync production data to local (database + storage):

```bash
# 1. Dump production database (requires SSH access)
ssh root@117.53.44.223
mysqldump -u acaraki_user -p'eGMtQznGqo~2' acaraki_db > /tmp/acaraki_prod.sql

# 2. Copy to local and import
scp root@117.53.44.223:/tmp/acaraki_prod.sql /tmp/acaraki_prod.sql
docker exec -i acaraki-mysql mysql -u acaraki_user -p'eGMtQznGqo~2' acaraki_db < /tmp/acaraki_prod.sql

# 3. Download and extract storage files
ssh root@117.53.44.223 "cd /var/www/app-be && tar -czf /tmp/storage.tar.gz storage/app/public/"
scp root@117.53.44.223:/tmp/storage.tar.gz /tmp/storage.tar.gz
tar -xzf /tmp/storage.tar.gz -C backend/storage/app/public/

# 4. Ensure storage link is created
cd backend
docker-compose exec backend-acaraki-be-1 php artisan storage:link
```

---

## Recent Changes (March 2026)

- ✅ Added mobile QR scanner component with floating FAB button
- ✅ Fixed frontend null safety for Banner, Tickets components
- ✅ Fixed FestivalController null handling for empty database
- ✅ Fixed docker-compose.yml with default WWWGROUP/WWWUSER values
- ✅ Synced production database (6 galleries, 6647 images) to local
- ✅ Extracted production storage files (2.1GB) to local
- ✅ Created storage symlink for proper image serving
- ✅ Cleaned malware (XMRig crypto-miner) from production crontab
- ✅ Set up Docker environment for local development
- ✅ Configured PM2 for frontend auto-restart and boot persistence
- ✅ Fixed production 502 errors (API + frontend service management)
- ✅ Added Key Visual design system (fonts + colors)
- ✅ Created design constants at `frontend/src/constants/design.js`
- ✅ Created LogoBadgeGroup component for sponsor logos in header

---

## Development Notes

- **Database**: Uses MySQL 8.0 in Docker, SQLite for local fallback
- **Timezone**: Asia/Makassar (`APP_TIMEZONE` in .env)
- **Image optimization**: Uses `joshembling/image-optimizer` package
- **Frontend fetches**: Uses client-side `useEffect` for API calls (not SSR)
- **Storage symlink**: Must run `php artisan storage:link` after first setup to serve uploaded files
- **Production Malware Cleanup (March 2026)**:
  - Removed XMRig crypto-miner cron entries from root's crontab
  - Files were already deleted (`/usr/bin/.update`, `/tmp/x86_64.kok`)
  - System is now clean with MALDET (Linux Malware Detect) running

---

## Design System

Based on BPOM x acaraki Jamu Festival Key Visual (June 2026)

### Typography
Fonts are located in `frontend/public/fonts/` (sourced from `/Downloads/Fonts`)

| Font | Usage | Tailwind Class | File |
|------|-------|----------------|------|
| **SS Nickson One** | "acaraki" logo, main titles | `font-display` | `S&S Nickson One.otf` |
| **Museo** | Body text, navigation, dates | `font-museo` | `Museo-*.ttf` (weights 100-900) |

```jsx
// Usage examples
<h1 className="font-display text-4xl">acaraki</h1>
<p className="font-museo">Body text here</p>
```

### Color Palette

| Category | Color | Hex | Usage |
|----------|-------|-----|-------|
| **Primary** | Beige | `#E8DCC8` | Backgrounds |
| | Brown | `#5C4033` | Text, headers |
| | Brown Dark | `#3C2A20` | Secondary text |
| | Gold | `#D4A84B` | Accents, highlights |
| **Nature** | Green | `#4A7C59` | Wellness theme |
| | Green Light | `#7BA37B` | Foliage accents |
| **Brand** | Orange | `#FCA311` | CTAs, buttons |

```jsx
// Usage with Tailwind utility classes
<div className="bg-[#E8DCC8]">Beige background</div>
<div className="text-[#5C4033]">Brown text</div>
<div className="text-[#D4A84B]">Gold accent</div>
```

### Design Constants
Design tokens are exported from `frontend/src/constants/design.js`:

```javascript
import { COLORS, FONTS, TYPOGRAPHY } from '@/constants/design';

// Access colors
const beige = COLORS.PRIMARY.BEIGE;
const gold = COLORS.PRIMARY.GOLD;

// Access fonts
const displayFont = FONTS.DISPLAY;
```

### Component Styling Guide

**Banner:**
- Title: `font-display` for "acaraki", `font-museo` for subtitle
- Background: 90vh height, bottom 90% of image

**Header:**
- Nav items: `font-museo font-bold`
- Active/hover: Gold (`#D4A84B`)
- Background: Brown (`#5C4033`) with 90% opacity
- Logo badges: `LogoBadgeGroup` component with gradient backgrounds

**LogoBadgeGroup Component:**
Located at `frontend/src/components/Partials/LogoBadgeGroup.js`
- Displays 3 sponsor logos with gradient card backgrounds
- Responsive sizing: mobile 52px height, desktop 60px height
- Gradient: `from-[#f3e6cf] to-[#d6b98b]` with rounded bottom corners
- Middle logo slightly larger (64px on desktop)
- Default logos: GP Jamu, acaraki x Cap Badak, BPOM

```jsx
import LogoBadgeGroup from "@/components/Partials/LogoBadgeGroup";

// With default logos
<LogoBadgeGroup />

// With custom logos
<LogoBadgeGroup
    images={[
        { src: "/imgs/logo.png", alt: "Logo" },
    ]}
/>
```

---

## Production Troubleshooting

### 502 Bad Gateway Error

**Frontend returns 502** (homepage not loading):
```bash
# Check if PM2 process is running
pm2 list

# If stopped/errored, restart
pm2 restart acaraki-fe

# Check what's using port 3000
ss -tlnp | grep 3000

# If port conflict, kill the process
kill -9 <PID>

# Then restart PM2
pm2 restart acaraki-fe
```

**API returns 502** (backend not responding):
```bash
# Restart PHP-FPM
systemctl restart php8.2-fpm

# Check status
systemctl status php8.2-fpm
```
