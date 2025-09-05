
import OrderBuilder from "./OrderBuilder";
import "./Orders.css";

export default function OrdersPage() {
  return (
    <div className="orders-container">
      <h2 className="orders-title">🛒 New order</h2>
      <OrderBuilder />
    </div>
  );
}
