import { getCartItems } from "@/actions/server/cart";
import CartItem from "@/components/CartItem";
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

      <div className="flex">
        <div className="flex-3">
          {cartItems.map((cartItem) => (
            <CartItem
              key={cartItem._id.toString()}
              cartItem={cartItem}
            ></CartItem>
          ))}
        </div>
        <div className="flex-1">hello world</div>
      </div>
    </div>
  );
}
