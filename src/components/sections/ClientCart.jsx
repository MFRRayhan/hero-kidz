"use client";

import { useState } from "react";
import CartItem from "../CartItem";

export default function ClientCart({ cartItems = [] }) {
  const [items, setItems] = useState(cartItems);

  return (
    <>
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
    </>
  );
}
