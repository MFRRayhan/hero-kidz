"use client";

import { usePathname, useRouter } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";

export default function CartBtn({ product }) {
  const isLoggedIn = false;

  const pathname = usePathname();
  const router = useRouter();

  const handleCart = () => {
    if (!isLoggedIn) {
      const callbackUrl = encodeURIComponent(pathname);

      router.push(`/login?callbackUrl=${callbackUrl}`);

      return;
    }

    // User logged in হলে এখানে
    // Add to Cart logic থাকবে
    console.log("Add to cart:", product);
  };

  return (
    <button
      onClick={handleCart}
      className="btn btn-primary btn-sm sm:btn-md w-full mt-2"
    >
      <IoCartOutline className="text-xl" />
      Add to Cart
    </button>
  );
}
