import { z } from "zod";

export const orderItemSchema = z.object({
  productId: z.number().int(),
  quantity: z.number().int().min(1)
});

export const createOrderSchema = z.object({
  items: z.array(orderItemSchema).min(1, "Please, select at least one product")
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
