const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

export async function fetchProducts() {
  const r = await fetch(`${API_URL}/products`);
  return r.json();
}

export async function createProduct(payload: {name: string, price:number}) {
  const r = await fetch(`${API_URL}/products`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });
  return r.json();
}

export async function fetchOrders() {
  const r = await fetch(`${API_URL}/orders`);
  return r.json();
}

export async function createOrder(payload: { items: {productId:number, quantity:number}[] }) {
  const r = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(payload)
  });
  return r.json();
}
