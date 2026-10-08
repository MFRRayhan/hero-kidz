"use client";

import {
  decrementCartItem,
  incrementCartItem,
  removeCartItem,
} from "@/actions/server/cart";
import Image from "next/image";
import { useState } from "react";
import { FaMinus, FaPlus, FaSpinner, FaTrash } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Swal from "sweetalert2";

export default function CartItem({ cartItem, updateQty, onRemove }) {
  const { title, image, price, quantity, _id } = cartItem;
  const [loading, setLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const handleRemoveCartItem = async () => {
    const swalResult = await Swal.fire({
      title: "Remove product?",
      text: "This product will be removed from your cart.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Cancel",
    });

    if (!swalResult.isConfirmed) return;

    try {
      setRemoveLoading(true);

      const result = await removeCartItem(_id);

      if (result.success) {
        onRemove(_id);

        Swal.fire({
          title: "Removed!",
          text: "The product has been removed from your cart.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } finally {
      setRemoveLoading(false);
    }
  };

  const onIncrease = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const result = await incrementCartItem(_id, quantity);

      if (result.success) {
        updateQty(_id, quantity + 1);
      } else if (result.message) {
        Swal.fire({
          icon: "warning",
          title: "Maximum limit reached",
          text: result.message,
          confirmButtonText: "Okay",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const onDecrease = async () => {
    if (loading || quantity <= 1) return;

    try {
      setLoading(true);

      const result = await decrementCartItem(_id, quantity);

      if (result.success) {
        updateQty(_id, quantity - 1);
      }
    } finally {
      setLoading(false);
    }
  };

  const itemTotal = Math.round(price * quantity);

  return (
    <div className="group rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm transition hover:shadow-md sm:p-5">
      <div className="flex gap-4">
        {/* Product Image */}
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-base-200 sm:h-28 sm:w-28">
          <Image
            src={image}
            alt={title}
            fill
            sizes="112px"
            className="object-cover transition duration-300 group-hover:scale-105"
          />
        </div>

        {/* Product Information */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="line-clamp-2 text-sm font-semibold leading-5 sm:text-base">
              {title}
            </h3>

            <button
              onClick={handleRemoveCartItem}
              disabled={removeLoading}
              aria-label="Remove product"
              className="btn btn-circle btn-ghost btn-sm text-error hover:bg-error/10"
            >
              {removeLoading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaTrash />
              )}
            </button>
          </div>

          {/* Unit Price */}
          <div className="mt-1 flex items-center gap-1 text-sm text-base-content/60">
            <FaBangladeshiTakaSign className="text-xs" />

            <span>{Math.round(price)}</span>

            <span>/ unit</span>
          </div>

          {/* Quantity + Total */}
          <div className="mt-4 flex items-center justify-between gap-3">
            {/* Quantity Controller */}
            <div className="flex items-center rounded-lg border border-base-300 bg-base-200/50">
              <button
                onClick={onDecrease}
                disabled={quantity <= 1 || loading}
                aria-label="Decrease quantity"
                className="flex h-9 w-9 items-center justify-center rounded-l-lg transition hover:bg-base-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FaMinus className="text-xs" />
              </button>

              <span className="flex h-9 min-w-10 items-center justify-center border-x border-base-300 px-2 text-sm font-semibold">
                {loading ? (
                  <FaSpinner className="animate-spin text-xs" />
                ) : (
                  quantity
                )}
              </span>

              <button
                onClick={onIncrease}
                disabled={loading}
                aria-label="Increase quantity"
                className="flex h-9 w-9 items-center justify-center rounded-r-lg transition hover:bg-base-300 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <FaPlus className="text-xs" />
              </button>
            </div>

            {/* Item Total */}
            <div className="text-right">
              <p className="text-xs text-base-content/50">Subtotal</p>

              <p className="flex items-center justify-end gap-1 text-base font-bold">
                <FaBangladeshiTakaSign className="text-sm" />

                {itemTotal}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
