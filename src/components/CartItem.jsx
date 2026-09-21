"use client";

import { removeCartItem } from "@/actions/server/cart";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import Swal from "sweetalert2";

export default function CartItem({ cartItem, onIncrease, onDecrease }) {
  const { title, image, price, quantity, _id } = cartItem;

  const handleRemoveCartItem = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await removeCartItem(_id);

        if (result.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      }
    });
  };

  return (
    <div className="flex items-center gap-4 rounded-xl border border-base-300 bg-base-100 p-4 shadow-sm mb-5">
      {/* Product Image */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="line-clamp-2 font-semibold">{title}</h3>

        <p className="flex items-center mt-1 text-sm text-gray-500">
          Price: <FaBangladeshiTakaSign /> {price}
        </p>

        {/* Quantity Controls */}
        <div className="mt-3 flex items-center gap-2">
          <button
            onClick={() => onDecrease(cartItem)}
            disabled={quantity <= 1}
            className="btn btn-sm btn-outline"
          >
            -
          </button>

          <span className="min-w-8 text-center font-semibold">{quantity}</span>

          <button
            onClick={() => onIncrease(cartItem)}
            className="btn btn-sm btn-outline"
          >
            +
          </button>
        </div>
      </div>

      {/* Total + Remove */}
      <div className="flex flex-col items-end gap-3">
        <p className="font-bold flex items-center">
          <FaBangladeshiTakaSign /> {price * quantity}
        </p>

        <button
          onClick={handleRemoveCartItem}
          className="btn btn-sm btn-error btn-outline"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
