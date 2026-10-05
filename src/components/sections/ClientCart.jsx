"use client";

import { useMemo, useState } from "react";
import CartItem from "../CartItem";

export default function ClientCart({ cartItems = [] }) {
  const [items, setItems] = useState(cartItems);

  const totalItems = useMemo(() => {
    return items.reduce((acm, item) => acm + item.quantity, 0);
  }, [items]);

  const totalPrice = useMemo(
    () => items.reduce((acm, item) => acm + item.price * item.quantity, 0),
    [items],
  );

  const handleRemove = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const updateQty = (id, quantity) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item._id === id ? { ...item, quantity } : item)),
    );
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
              updateQty={updateQty}
            ></CartItem>
          ))}
        </div>
        <div className="flex-1">Total Items - {totalItems}</div>
        <div className="flex-1">Total Amount - {Math.round(totalPrice)}</div>
      </div>
    </>
  );
}
