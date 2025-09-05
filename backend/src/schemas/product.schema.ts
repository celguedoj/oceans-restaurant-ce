import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1, "Name Required"),
  price: z.number().positive("Price should be positive"),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
