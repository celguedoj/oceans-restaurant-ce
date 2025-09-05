import db from "../db";

export type Product = { id: number; price: number };

export class OrderRepository {
  async getAllOrders() {
    const { rows: orders } = await db.query(
      "SELECT id, created_at, total FROM orders ORDER BY id DESC"
    );

    const results = await Promise.all(
      orders.map(async (o: { id: number; created_at: string; total: number }) => {
        const { rows: items } = await db.query(
          `SELECT oi.id, oi.quantity, oi.unit_price, oi.subtotal, p.id as product_id, p.name
           FROM order_items oi
           JOIN products p ON p.id = oi.product_id
           WHERE oi.order_id = $1`,
          [o.id]
        );
        return { ...o, items };
      })
    );

    return results;
  }

  async createOrder(client: any, total: number) {
    const { rows } = await client.query(
      "INSERT INTO orders (total) VALUES ($1) RETURNING id, created_at, total",
      [total]
    );
    return rows[0];
  }

  async insertOrderItem(client: any, orderId: number, item: { productId: number; quantity: number; unit_price: number; subtotal: number }) {
    await client.query(
      `INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal)
       VALUES ($1,$2,$3,$4,$5)`,
      [orderId, item.productId, item.quantity, item.unit_price, item.subtotal]
    );
  }

  async getProductsByIds(client: any, ids: number[]): Promise<Product[]> {
    const { rows } = await client.query(
      `SELECT id, price FROM products WHERE id = ANY($1::int[])`,
      [ids]
    );
    return rows;
  }
}
