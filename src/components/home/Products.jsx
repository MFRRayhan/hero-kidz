// import products from "@/data/toys.json";
import { getProducts } from "@/actions/server/product";
import ProductCard from "../cards/ProductCard";

export default async function Products() {
  const products = await getProducts();

  return (
    <section className="py-20">
      <h2 className="section-title">Our Products</h2>

      <div className="grid md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id.toString()}
            product={product}
          ></ProductCard>
        ))}
      </div>
    </section>
  );
}
