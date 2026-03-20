# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

ACARAKI is a monorepo for Festival Jamu Nusantara 2025 - a cultural event management system featuring:
- **Backend**: Laravel 11 API with Filament 3 admin panel
- **Frontend**: Next.js 15 public-facing website

**Domain**: Festival event registration, member check-ins via QR codes, activity tracking with points system, and gallery management.

---

## Common Commands

### Backend (Laravel)
```bash
cd backend

# Development server
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

### Backend (.env)
```bash
APP_ENV=local
APP_DEBUG=true
DB_CONNECTION=sqlite              # Default: SQLite
CMS_ROUTE="webadmin"              # Admin panel route
FRONTEND_APP_URL=https://...      # For QR code URLs
```

### Frontend
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000/api  # Backend API URL
```

---

## Development Notes

- **Database**: Uses SQLite by default (`database/database.sqlite`)
- **Timezone**: Asia/Makassar (`APP_TIMEZONE` in .env)
- **Image optimization**: Uses `joshembling/image-optimizer` package
- **Frontend fetches**: Uses client-side `useEffect` for API calls (not SSR)
