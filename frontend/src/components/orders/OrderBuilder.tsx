import { useEffect, useState } from "react";
import { fetchProducts, createOrder } from "../../api";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface OrderItem {
  productId: number;
  quantity: number;
}

export default function OrderBuilder() {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const handleChange = (id: number, qty: number) => {
    setQuantities({ ...quantities, [id]: qty });
  };

  const total = products.reduce((sum, p) => {
    const qty = quantities[p.id] || 0;
    return sum + qty * p.price;
  }, 0);

  const handleSubmit = async () => {
    const items: OrderItem[] = Object.entries(quantities)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .filter(([_, qty]) => qty > 0)
      .map(([id, qty]) => ({ productId: Number(id), quantity: qty }));

    if (items.length === 0) {
      alert("Please select at least one product");
      return;
    }

    try {
      await createOrder({ items });
      alert("Order created!");
      setQuantities({});
    } catch (err) {
      console.error(err);
      alert("Error creating the order");
    }
  };

  return (
    <div className="order-builder">
      <table className="order-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            const qty = quantities[p.id] || 0;
            return (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>${Number(p.price).toFixed(2)}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    max={p.stock}
                    value={qty}
                    onChange={(e) => handleChange(p.id, Number(e.target.value))}
                    className="qty-input"
                  />
                </td>
                <td>${(qty * Number(p.price)).toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <p className="order-total">Total: ${total.toFixed(2)}</p>
      <button onClick={handleSubmit} className="order-button">
        Create Order
      </button>
    </div>
  );
}
