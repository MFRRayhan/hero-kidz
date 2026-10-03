"use client";

import { useState } from "react";
import CartItem from "../CartItem";

export default function ClientCart({ cartItems = [] }) {
  const [items, setItems] = useState(cartItems);
  const totalItems = items.reduce((acm, item) => acm + item.quantity, 0);

  const handleRemove = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  return (
    <>
      <p>
        <span className="text-primary font-bold">{items.length}</span> items
        found in cart
      </p>

      <div className="flex">
        <div className="flex-3">
          {items.map((cartItem) => (
            <CartItem
              key={cartItem._id.toString()}
              cartItem={cartItem}
              onRemove={handleRemove}
            ></CartItem>
          ))}
        </div>
        <div className="flex-1">Total Items - {totalItems}</div>
      </div>
    </>
  );
}
