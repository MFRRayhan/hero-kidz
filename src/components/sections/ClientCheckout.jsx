"use client";

import { useMemo, useState } from "react";
import {
  BiLockAlt,
  BiPackage,
  BiUser,
  BiEnvelope,
  BiPhone,
  BiMap,
  BiMessageDetail,
} from "react-icons/bi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

export default function ClientCheckout({ cartItems = [] }) {
  const [items] = useState(cartItems);

  const [form, setForm] = useState({
    name: "",
    email: "",
    deliveryInfo: "",
    specialInstruction: "",
    contactNo: "",
  });

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Checkout:", form, cartItems);

    alert("Form submitted");
  };

  return (
    <section className="py-8">
      {/* Header */}
      <div className="mb-8 rounded-l-[5px] border-l-8 border-primary">
        <div className="pl-5">
          <div className="mb-2 flex items-center gap-2">
            <BiLockAlt className="text-xl text-primary" />

            <span className="text-sm font-medium text-base-content/60">
              Secure Checkout
            </span>
          </div>

          <h1 className="text-2xl font-bold sm:text-3xl">
            Complete Your Order
          </h1>

          <p className="mt-1 text-sm text-base-content/60">
            Review your order and complete the checkout process
          </p>
        </div>
      </div>

      {/* Checkout Content */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Customer Information */}
        <div className="lg:col-span-8">
          <form
            onSubmit={handleSubmit}
            className="rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6"
          >
            {/* Section Header */}
            <div className="mb-6 flex items-center gap-3 border-b border-base-300 pb-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <BiUser className="text-xl text-primary" />
              </div>

              <div>
                <h2 className="font-semibold">Customer Information</h2>

                <p className="text-sm text-base-content/60">
                  Enter your information for delivery
                </p>
              </div>
            </div>

            <fieldset className="fieldset">
              {/* Name + Email */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label className="label">
                    <span className="label-text font-medium">Name</span>
                  </label>

                  <label className="input flex w-full items-center gap-2">
                    <BiUser className="text-base-content/50" />

                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="grow"
                    />
                  </label>
                </div>

                <div>
                  <label className="label">
                    <span className="label-text font-medium">E-mail</span>
                  </label>

                  <label className="input flex w-full items-center gap-2">
                    <BiEnvelope className="text-base-content/50" />

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@doe.com"
                      required
                      className="grow"
                    />
                  </label>
                </div>
              </div>

              {/* Contact Number */}
              <div className="mt-4">
                <label className="label">
                  <span className="label-text font-medium">Contact Number</span>
                </label>

                <label className="input flex w-full items-center gap-2">
                  <BiPhone className="text-base-content/50" />

                  <input
                    type="tel"
                    name="contactNo"
                    value={form.contactNo}
                    onChange={handleChange}
                    placeholder="+880 1XXXXXXXXX"
                    required
                    className="grow"
                  />
                </label>
              </div>

              {/* Delivery Information */}
              <div className="mt-4">
                <label className="label">
                  <span className="label-text font-medium">
                    Delivery Address
                  </span>
                </label>

                <label className="textarea flex w-full items-start gap-2">
                  <BiMap className="mt-1 text-lg text-base-content/50" />

                  <textarea
                    name="deliveryInfo"
                    value={form.deliveryInfo}
                    onChange={handleChange}
                    placeholder="House, Road, Area, City..."
                    required
                    className="grow resize-none"
                    rows={3}
                  />
                </label>
              </div>

              {/* Special Instruction */}
              <div className="mt-4">
                <label className="label">
                  <span className="label-text font-medium">
                    Special Instructions
                  </span>

                  <span className="label-text-alt text-base-content/50">
                    Optional
                  </span>
                </label>

                <label className="textarea flex w-full items-start gap-2">
                  <BiMessageDetail className="mt-1 text-lg text-base-content/50" />

                  <textarea
                    name="specialInstruction"
                    value={form.specialInstruction}
                    onChange={handleChange}
                    placeholder="Any special instructions for delivery?"
                    className="grow resize-none"
                    rows={3}
                  />
                </label>
              </div>

              {/* Submit */}
              <button type="submit" className="btn btn-primary mt-6 w-full">
                <BiPackage className="text-lg" />
                Place Order
              </button>
            </fieldset>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
          <div className="sticky top-6 rounded-xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-6">
            {/* Summary Header */}
            <div className="mb-5 flex items-center gap-3 border-b border-base-300 pb-4">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                <BiPackage className="text-xl text-primary" />
              </div>

              <div>
                <h2 className="font-semibold">Order Summary</h2>

                <p className="text-sm text-base-content/60">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </p>
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{item.name}</p>

                    <p className="flex items-center gap-1 text-xs text-base-content/50">
                      {item.quantity} ×
                      <FaBangladeshiTakaSign />
                      {item.price}
                    </p>
                  </div>

                  <p className="flex shrink-0 items-center gap-0.5 text-sm font-semibold">
                    <FaBangladeshiTakaSign />
                    {item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="my-5 border-t border-base-300" />

            {/* Total Items */}
            <div className="flex justify-between text-sm">
              <span className="text-base-content/60">Total Items</span>

              <span className="font-medium">{totalItems}</span>
            </div>

            {/* Total Price */}
            <div className="mt-3 flex items-center justify-between">
              <span className="font-semibold">Total</span>

              <span className="flex items-center gap-0.5 text-xl font-bold text-primary">
                <FaBangladeshiTakaSign />
                {totalPrice}
              </span>
            </div>

            {/* Secure Message */}
            <div className="mt-5 flex items-start gap-2 rounded-lg bg-base-200 p-3">
              <BiLockAlt className="mt-0.5 shrink-0 text-primary" />

              <p className="text-xs leading-5 text-base-content/60">
                Your information is secure and will only be used to process your
                order.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
