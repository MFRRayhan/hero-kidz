import ProductSkeleton from "@/components/skeletons/ProductSkeleton";
import React from "react";

export default function loading() {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
}
