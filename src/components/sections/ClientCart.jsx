"use client";

import { useMemo, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

import CartItem from "../CartItem";

export default function ClientCart({ cartItems = [] }) {
  const [items, setItems] = useState(cartItems);

  const totalItems = useMemo(() => {
    return items.reduce((acm, item) => acm + item.quantity, 0);
  }, [items]);

  const totalPrice = useMemo(() => {
    return items.reduce((acm, item) => acm + item.price * item.quantity, 0);
  }, [items]);

  const handleRemove = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };

  const updateQty = (id, quantity) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item._id === id ? { ...item, quantity } : item)),
    );
  };

  return (
    <section className="py-8">
      {/* Header */}
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <FaShoppingCart className="text-primary" />

          <span className="text-sm font-medium text-base-content/60">
            Shopping Cart
          </span>
        </div>

        <h1 className="text-2xl font-bold sm:text-3xl">Your Cart</h1>

        <p className="mt-1 text-sm text-base-content/60">
          {items.length} {items.length === 1 ? "product" : "products"} in your
          cart
        </p>
      </div>

      {items.length === 0 ? (
        /* Empty Cart */
        <div className="flex min-h-60 flex-col items-center justify-center rounded-2xl border border-dashed border-base-300 bg-base-100 p-8 text-center">
          <FaShoppingCart className="mb-4 text-4xl text-base-content/20" />

          <h2 className="text-xl font-semibold">Your cart is empty</h2>

          <p className="mt-1 text-sm text-base-content/50">
            Add some products to your cart to see them here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Cart Items */}
          <div className="space-y-4">
            {items.map((cartItem) => (
              <CartItem
                key={cartItem._id.toString()}
                cartItem={cartItem}
                onRemove={handleRemove}
                updateQty={updateQty}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm lg:sticky lg:top-5">
            <h2 className="mb-5 text-lg font-bold">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-base-content/60">Total Products</span>

                <span className="font-medium">{items.length}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-base-content/60">Total Items</span>

                <span className="font-medium">{totalItems}</span>
              </div>

              <div className="my-4 border-t border-base-300" />

              <div className="flex items-center justify-between">
                <span className="font-semibold">Total Amount</span>

                <span className="flex items-center gap-1 text-xl font-bold text-primary">
                  <FaBangladeshiTakaSign />
                  {Math.round(totalPrice)}
                </span>
              </div>
            </div>

            <button className="btn btn-primary mt-6 w-full">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
