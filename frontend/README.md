# React + TypeScript + Vite

This is the frontend for 🌊 **Oceans React Challenge – App (Full Stack)**

## Setup

1. Clone the repository:

```bash
git clone https://github.com/celguedoj/oceans-restaurant-ce.git
cd oceans-restaurant-ce/frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root of your project with the URL of your backend server:

```txt
VITE_API_URL=http://localhost:4000
```

---

## Running the App

### Development

Run Vite in development mode with hot-reloading:

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`) to see the app running.

### Production Build

Create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` folder.

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

---

## Available Scripts

| Command       | Description                                  |
|---------------|----------------------------------------------|
| `npm run dev` | Start the app in development mode            |
| `npm run build` | Build the app for production               |
| `npm run preview` | Preview the production build locally     |

---

## Environment Variables

| Variable        | Description                         |
|-----------------|-------------------------------------|
| `VITE_API_URL`  | URL of the backend API server       |

Make sure your backend server is running at this URL for the frontend to work properly.


---

## Notes

- The project is built using **React 18**, **TypeScript**, and **Vite**.
- API requests are handled using `fetch` or `axios` (depending on your setup) with the base URL from `VITE_API_URL`.
- Make sure the backend server is running before starting the frontend.

