# Oceans React Challenge – Backend (Full Stack) - Carlos Elguedo

This is the backend for 🌊 **Oceans React Challenge – Full Stack App**

## Requirements
- Node >= 20
- PostgreSQL
- Docker & docker-compose (optional)

## Setup

1. Clone the repository:
```bash
git clone <your-repo-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root with your database configuration:
```txt
POSTGRES_HOST=localhost
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=oceans
POSTGRES_PORT=5432
```

4. Run migrations or initialize the database:
```bash
psql -U postgres -d oceans -f sql/schema.sql
```

## Running the Backend

### Development
```bash
npm run dev
```
The backend will run on `http://localhost:4000` by default.

### Production Build
```bash
npm run build
npm start
```

## API Endpoints

### Products
- **GET** `/products` – List all products
- **POST** `/products` – Create a new product
  ```json
  {
    "name": "Product Name",
    "price": 100
  }
  ```

### Orders
- **GET** `/orders` – List all orders with items
- **POST** `/orders` – Create a new order
  ```json
  {
    "items": [
      { "productId": 1, "quantity": 2 },
      { "productId": 3, "quantity": 1 }
    ]
  }
  ```

## Project Structure

```
src/
├─ controllers/   # Controllers handling business logic
├─ repositories/  # Repositories for DB interaction
├─ routes/        # Routes connecting controllers
├─ db/            # Pool and typed query (db/index.ts)
├─ schemas/       # Zod schemas for validation
├─ app.ts         # Main Express configuration
```

## Technical Notes
- **Framework:** Express + TypeScript
- **Database:** PostgreSQL
- **Validation:** Zod
- **Architecture:** Controllers + Repositories + Routes
- **DB Access:** Centralized in `db/index.ts` with generic query typing
- **Logging:** Morgan for request logging

