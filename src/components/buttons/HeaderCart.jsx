"use client";

import Link from "next/link";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";

export default function HeaderCart({ cartItems = [] }) {
  const [items, setItems] = useState(cartItems);

  return (
    <>
      {/* Cart */}
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

          {/* Cart Count */}
          <span className="badge badge-primary badge-xs indicator-item">
            {items.length}
          </span>
        </div>
      </Link>
    </>
  );
}
