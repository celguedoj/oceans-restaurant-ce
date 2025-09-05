# Oceans React Challenge – App (Full Stack) - Carlos Elguedo

## Requirements
- Docker & docker-compose
- Node >= 20 (if not using Docker)

## Start with Docker
1. `docker-compose up --build`
2. Backend: http://localhost:4000
3. Frontend: `cd frontend && npm install && npm run dev`

## Endpoints
- **Products**
  - GET `/products`
  - POST `/products` {name, price}

- **Orders**
  - GET `/orders`
  - POST `/orders` { items: [{ productId, quantity }] }

## Technical Notes
- **Backend:** TypeScript + Express + Zod + pg + repository/controller pattern
- **Frontend:** React 18 + TypeScript + Vite + React Hook Form + Zod resolver
- **Database:** Postgres initialized with `sql/schema.sql`
- **DB access:** centralized in `db/index.ts` with generic typing for queries

## Project Structure

### Backend
```
src/
├─ controllers/   # Controllers
├─ repositories/  # Repositories for DB
├─ routes/        # Routes connected to controllers
├─ db/            # Pool and typed queries
├─ schemas/       # Zod schemas
├─ sql/           # SQL scripts
├─ app.ts         # Express configuration
```

### Frontend
```
src/
├─ public/                 # Images, icons, etc.
├─ src/                    # Reusable React components
    ├─ components/         # Components of the app
    ├─ api.ts              # Requests to backend
    ├─ App.css             # Styles for App
    ├─ App.tsx             # Main app code
    ├─ index.css           # General styles 
    ├─ main.tsx            # Main entry point
```

## Running Frontend
1. Create `.env` with:
```txt
VITE_API_URL=http://localhost:4000
```
2. Development: `npm run dev`
3. Production build: `npm run build`
4. Preview production build: `npm run preview`

