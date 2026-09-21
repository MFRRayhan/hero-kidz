import { getCartItems } from "@/actions/server/cart";
import CartItem from "@/components/CartItem";
import ClientCart from "@/components/sections/ClientCart";
import React from "react";

export default async function Cart() {
  const cartItems = await getCartItems();
  console.log(cartItems);

  return (
    <div className="space-y-3">
      <h2 className="text-4xl border-l-7 pl-4 py-4 border-primary rounded-md">
        My Cart
      </h2>
      <ClientCart cartItems={cartItems} />
    </div>
  );
}
