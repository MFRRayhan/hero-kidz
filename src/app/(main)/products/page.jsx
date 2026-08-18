import Products from "@/components/home/Products";
import React from "react";

export const metadata = {
  title: "All Products",
  description:
    "Hero Kidz is your trusted online store for quality kids' products, toys, clothing, and more.",
};

export default function ProductsPage() {
  return (
    <div>
      <Products />
    </div>
  );
}
