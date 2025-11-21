# Grippi Campaign Analytics Dashboard

A full‑stack marketing campaign analytics dashboard (Next.js frontend, FastAPI backend, PostgreSQL database).

## Quick summary
- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS
- Backend: FastAPI (Python) + PostgreSQL
- Purpose: view campaign metrics, filter by status, and inspect campaign details

## Prerequisites
- Node.js 18+ and npm
- Python 3.9+
- PostgreSQL 14+
- Git

## Quick Start (recommended)
Run two terminals: backend and frontend.

Terminal A — Backend (PowerShell)
```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\activate
pip install -r requirements.txt
# set DATABASE_URL in environment or .env (see Environment Variables below)
# run with uvicorn for hot reload during development
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Terminal B — Frontend (PowerShell)
```powershell
cd frontend
npm install
# set NEXT_PUBLIC_API_URL to the backend URL (e.g. http://localhost:8000) in .env.local
npm run dev
```

Open the frontend at http://localhost:3000 and the backend at http://localhost:8000

## Database setup
- The SQL file with example DDL/data is in `database/create_campaigns_postgress.sql`.
- Create your DB and user, then run the SQL script with psql.

Example (psql):
```bash
# create DB and user (adjust names/password)
psql -U postgres -c "CREATE DATABASE grippi;"
psql -U postgres -c "CREATE USER grippi_user WITH PASSWORD 'your_password';"
psql -U postgres -d grippi -f database/create_campaigns_postgress.sql
```

## Backend
- Directory: `backend/`
- Run with uvicorn (recommended) or `python backend/main.py`.
- Dependencies in `backend/requirements.txt`.

## Frontend
- Directory: `frontend/`
- Uses Next.js (app router). Tailwind config is `frontend/tailwind.config.cjs` and PostCSS config is `frontend/postcss.config.cjs`.

## Environment variables
- Backend (`backend/.env` or host env):
  - `DATABASE_URL=postgresql://user:password@host:port/database`
- Frontend (`frontend/.env.local`):
  - `NEXT_PUBLIC_API_URL=http://localhost:8000`

Security note
- Do not commit secrets. If you accidentally committed `backend/.env`, remove it from the repo and add to `.gitignore`:
```powershell
git rm --cached backend/.env
echo "backend/.env" >> .gitignore
git add .gitignore
git commit -m "chore: remove committed env and ignore it"
```

## Project structure (high level)
```
grippi-analytics/
├── backend/                # FastAPI app (main.py, requirements.txt)
├── frontend/               # Next.js app (app/, components/, package.json)
├── database/               # SQL scripts (create_campaigns_postgress.sql)
└── README.md
```

## API (examples)
- GET /campaigns — list campaigns (optional `?status=Active`)
- GET /campaigns/{id} — single campaign
- GET /health — health check

## Deployment notes
- Backend: platforms like Railway or Render — set `DATABASE_URL` in the host environment and use uvicorn in the start command (e.g. `uvicorn backend.main:app --host 0.0.0.0 --port $PORT`).
- Frontend: Vercel or Netlify — set `NEXT_PUBLIC_API_URL` to the deployed backend URL.

## Troubleshooting
- If Tailwind / PostCSS errors occur, ensure `@tailwindcss/postcss`, `tailwindcss`, and `autoprefixer` are installed and `postcss.config.cjs` is present in `frontend/`.
- If Next dev fails: clear the cache and reinstall deps:
```powershell
rm -Recurse -Force .next
rm -Recurse -Force node_modules
npm install
npm run dev
```

## Contact
Harsh Dalmia
# Grippi Campaign Analytics Dashboard

A full-stack marketing campaign analytics dashboard built with Next.js, FastAPI, and PostgreSQL.

## Project Overview

This application displays marketing campaign data with filtering capabilities, featuring:
- **Frontend**: Next.js 14 with TypeScript and Tailwind CSS
- **Backend**: FastAPI (Python) with PostgreSQL
- **Database**: PostgreSQL with sample campaign data

## Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- PostgreSQL 14+
- Git

## Local Setup Instructions

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd grippi-analytics
```

### 2. Database Setup

#### Install PostgreSQL
- **macOS**: `brew install postgresql@14`
- **Ubuntu**: `sudo apt-get install postgresql`
- **Windows**: Download from [postgresql.org](https://www.postgresql.org/download/)

#### Create Database

```bash
# Start PostgreSQL service
# macOS: brew services start postgresql@14
# Ubuntu: sudo service postgresql start

# Access PostgreSQL
psql postgres

# Create database and user
CREATE DATABASE grippi;
CREATE USER grippi_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE grippi TO grippi_user;
\q
```

#### Run SQL Script

```bash
# Navigate to database folder
cd database

# Execute schema
psql -U grippi_user -d grippi -f schema.sql
```

### 3. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# macOS/Linux: source venv/bin/activate
# Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
echo "DATABASE_URL=postgresql://grippi_user:your_password@localhost:5432/grippi" > .env

# Run the server
python main.py
```

Backend will run at: `http://localhost:8000`

Test it: `http://localhost:8000/campaigns`

### 4. Frontend Setup

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local

# Run development server
npm run dev
```

Frontend will run at: `http://localhost:3000`

##  Project Structure

```
grippi-analytics/
├── backend/
│   ├── main.py              # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   └── .env                 # Environment variables
├── frontend/
│   ├── app/
│   │   ├── page.tsx        # Dashboard page
│   │   ├── layout.tsx      # Root layout
│   │   └── globals.css     # Global styles
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── .env.local          # Environment variables
└── database/
    └── schema.sql          # Database schema & data
```

##  Deployment Instructions

### Backend Deployment (Railway)

1. Create account at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add PostgreSQL database:
   - Click "New" → "Database" → "PostgreSQL"
   - Copy the `DATABASE_URL` from variables
5. Configure backend service:
   - Go to backend service settings
   - Add environment variable: `DATABASE_URL` = (paste from PostgreSQL)
   - Set root directory: `/backend`
   - Railway will auto-detect Python and install dependencies
6. Run database migrations:
   - Connect to Railway PostgreSQL using the provided credentials
   - Execute the `schema.sql` script
7. Copy the generated backend URL (e.g., `https://your-app.railway.app`)

### Frontend Deployment (Vercel)

1. Create account at [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure build settings:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
5. Add environment variable:
   - **Key**: `NEXT_PUBLIC_API_URL`
   - **Value**: Your Railway backend URL (e.g., `https://your-app.railway.app`)
6. Click "Deploy"
7. Copy the generated frontend URL

## Testing the Application

### API Endpoints

```bash
# Get all campaigns
curl http://localhost:8000/campaigns

# Filter by status
curl http://localhost:8000/campaigns?status=Active

# Get single campaign
curl http://localhost:8000/campaigns/1

# Health check
curl http://localhost:8000/health
```

### Frontend Features

1. **Dashboard View**: Displays all campaigns with summary statistics
2. **Filter Dropdown**: Toggle between All/Active/Paused campaigns
3. **Responsive Design**: Works on desktop and mobile devices
4. **Loading States**: Shows spinner while fetching data
5. **Error Handling**: Displays errors with retry option

## 📊 Database Schema

```sql
campaigns
├── id (SERIAL PRIMARY KEY)
├── name (VARCHAR)
├── status (VARCHAR) - 'Active' or 'Paused'
├── clicks (INTEGER)
├── cost (DECIMAL)
├── impressions (INTEGER)
└── created_at (TIMESTAMP)
```

## 🔧 Key Features

### Backend (FastAPI)
- RESTful API with `/campaigns` endpoint
- Query parameter filtering by status
- PostgreSQL integration with connection pooling
- Error handling and validation
- CORS middleware for frontend access
- Health check endpoint

### Frontend (Next.js)
- Server-side rendering with Next.js 14
- TypeScript for type safety
- Tailwind CSS for responsive design
- Real-time data fetching
- Status filtering
- Currency and number formatting
- Loading and error states



## Environment Variables

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@host:port/database
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

##  Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running: `pg_isready`
- Check connection string in `.env`
- Ensure database exists: `psql -l`

### CORS Errors
- Verify `NEXT_PUBLIC_API_URL` is set correctly
- Check FastAPI CORS middleware configuration

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Next.js cache: `rm -rf .next`

##  Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python 3.9+, Pydantic, Uvicorn
- **Database**: PostgreSQL 14+, psycopg2
- **Deployment**: Vercel (Frontend), Railway (Backend + Database)

## 👤 Author

Harsh Dalmia