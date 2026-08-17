import products from "@/data/toys.json";
import ProductCard from "../cards/ProductCard";

export default function Products({ loading }) {
  return (
    <section className="py-20">
      <h2 className="section-title">Our Products</h2>

      <div className="grid md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.title} product={product}></ProductCard>
        ))}
      </div>
    </section>
  );
}
