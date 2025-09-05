import { useEffect, useState } from "react";
import { fetchOrders } from "../../api";
import "./Dashboard.css";

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  subtotal: number;
}

interface Order {
  id: number;
  created_at: string;
  items: OrderItem[];
  total: number;
}

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📊 Orders dashboard</h2>
      <div className="orders-grid">
        {orders.map((o) => (
          <div key={o.id} className="order-card">
            <h3 className="order-header">
              Order #{o.id} - {new Date(o.created_at).toLocaleString()}
            </h3>

            <table className="items-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {o.items.map((it) => (
                  <tr key={it.id}>
                    <td className="product-name">{it.name}</td>
                    <td>{it.quantity}</td>
                    <td>${it.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="order-total">💰 Total: ${o.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
