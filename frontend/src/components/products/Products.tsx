import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import { fetchProducts } from "../../api";
import "./Products.css";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const ProductList = ({ products }: { products: Product[] }) => {
    return (
      <table className="items-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="product-name">{p.name}</td>
              <td>${p.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="products-container">
      <h2 className="products-title">📦 Products</h2>

      <div className="products-content">
        <div className="product-form-card">
          <h3 className="section-title">Add product</h3>
          <ProductForm onCreated={loadProducts} />
        </div>

        <div className="product-list-card">
          <h3 className="section-title">List of products</h3>
          <ProductList products={products} />
        </div>
      </div>
    </div>
  );
}
