import Products from "@/components/home/Products";
import React from "react";

export const metadata = {
  title: "Products",

  description:
    "Explore the exciting collection of products available at Hero Kidz.",

  openGraph: {
    title: "Products | Hero Kidz",
    description:
      "Explore the exciting collection of products available at Hero Kidz.",
    url: "/products",

    images: [
      {
        url: "https://i.ibb.co.com/KxK9zXRQ/image.png",
        width: 1200,
        height: 630,
        alt: "Hero Kidz Products",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Products | Hero Kidz",
    description:
      "Explore the exciting collection of products available at Hero Kidz.",
    images: ["https://i.ibb.co.com/KxK9zXRQ/image.png"],
  },
};

export default function ProductsPage() {
  return (
    <div>
      <Products />
    </div>
  );
}
