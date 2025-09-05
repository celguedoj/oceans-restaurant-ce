import db from "../db";
import { CreateProductInput } from "../schemas/product.schema";

export type Product = {
  id: number;
  name: string;
  price: number;
  created_at: string;
};

export class ProductRepository {
  async getAll(): Promise<Product[]> {
    const { rows } = await db.query(
      "SELECT id, name, price, created_at FROM products ORDER BY id"
    );
    return rows;
  }

  async create(product: CreateProductInput): Promise<Product> {
    const { name, price } = product;
    const { rows } = await db.query(
      "INSERT INTO products (name, price) VALUES ($1, $2) RETURNING id, name, price, created_at",
      [name, price]
    );
    return rows[0];
  }
}
