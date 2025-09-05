import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createProduct } from "../../api";

const productSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  price: z.number().positive("Precio debe ser mayor a 0")
});

type FormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  onCreated?: () => void;
}

export default function ProductForm({ onCreated }: ProductFormProps) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: zodResolver(productSchema),
    defaultValues: { name: "", price: 0 } 
  });

  const onSubmit = async (data: FormData) => {
    try {
      await createProduct(data);
      reset();
      onCreated?.();
    } catch (err) {
      console.error(err);
      alert("Error creando producto");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div>
        <label>Nombre</label>
        <input {...register("name")} />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>

      <div>
        <label>Precio</label>
        <input type="number" step="0.01" {...register("price", { valueAsNumber: true })} />
        {errors.price && <p style={{ color: "red" }}>{errors.price.message}</p>}
      </div>

      <button type="submit">Crear producto</button>
    </form>
  );
}
