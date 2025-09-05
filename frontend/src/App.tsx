import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import ProductsPage from "./components/products/Products";
import OrdersPage from "./components/orders/Orders";
import DashboardPage from "./components/dashboard/Dashboard";
import "./App.css";

export default function App() {
  return (
    <Router>
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="navbar-logo">🍽️ Oceans Restaurant</h1>
          <div className="navbar-links">
            <Link className="nav-link" to="/products">
              Products
            </Link>
            <Link className="nav-link" to="/orders">
              New order
            </Link>
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </div>
        </div>
      </nav>

      <div className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}
