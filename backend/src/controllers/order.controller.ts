import { OrderRepository, Product } from "../repositories/order.repository";
import db from "../db";
import { createOrderSchema, CreateOrderInput } from "../schemas/order.schema";

const orderRepo = new OrderRepository();

export class OrderController {
  async getOrders(req: any, res: any, next: any) {
    try {
      const orders = await orderRepo.getAllOrders();
      res.json(orders);
    } catch (err) {
      next(err);
    }
  }

  async createOrder(req: any, res: any, next: any) {
    const client = await db.pool.connect();
    try {
      const parsed: CreateOrderInput = createOrderSchema.parse(req.body);
      const items = parsed.items;

      await client.query("BEGIN");

      const products: Product[] = await orderRepo.getProductsByIds(
        client,
        items.map((i) => i.productId)
      );

      const priceMap: Record<number, number> = {};
      products.forEach((p) => (priceMap[p.id] = Number(p.price)));

      let total = 0;

      const orderItems = items.map((it) => {
        const price = priceMap[it.productId];
        if (price === undefined) {
          throw { status: 400, message: `Producto ${it.productId} no existe` };
        }
        const subtotal = price * it.quantity;
        total += subtotal;
        return { ...it, unit_price: price, subtotal };
      });

      const order = await orderRepo.createOrder(client, total);

      for (const it of orderItems) {
        await orderRepo.insertOrderItem(client, order.id, it);
      }

      await client.query("COMMIT");

      res.status(201).json(order);
    } catch (err) {
      await client.query("ROLLBACK").catch(() => {});
      next(err);
    } finally {
      client.release();
    }
  }
}
