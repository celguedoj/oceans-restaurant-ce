import { ProductRepository } from "../repositories/product.repository";
import { createProductSchema, CreateProductInput } from "../schemas/product.schema";

const productRepo = new ProductRepository();

export class ProductController {
  async getProducts(req: any, res: any, next: any) {
    try {
      const products = await productRepo.getAll();
      res.json(products);
    } catch (err) {
      next(err);
    }
  }

  async createProduct(req: any, res: any, next: any) {
    try {
      const parsed: CreateProductInput = createProductSchema.parse(req.body);
      const product = await productRepo.create(parsed);
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  }
}
