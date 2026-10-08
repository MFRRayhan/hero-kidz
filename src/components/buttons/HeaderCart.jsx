"use client";

import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";

export default function HeaderCart({ cartItems = [] }) {
  return (
    <Link
      href="/cart"
      className="
        btn
        btn-ghost
        btn-circle
        text-primary
        hover:bg-primary/10
      "
    >
      <div className="indicator">
        <IoCartOutline className="text-2xl" />

        {cartItems.length > 0 && (
          <span className="badge badge-primary badge-xs indicator-item">
            {cartItems.length}
          </span>
        )}
      </div>
    </Link>
  );
}
