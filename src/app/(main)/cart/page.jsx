import { getCartItems } from "@/actions/server/cart";
import React from "react";

export default async function Cart() {
  const cartItems = await getCartItems();
  console.log(cartItems);

  return (
    <div className="space-y-3">
      <h2 className="text-4xl border-l-7 pl-4 py-4 border-primary rounded-md">
        My Cart
      </h2>
      <p>
        <span className="text-primary font-bold">{cartItems.length}</span> items
        found in cart
      </p>
    </div>
  );
}
