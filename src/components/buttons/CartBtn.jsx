"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";

export default function CartBtn({ product }) {
  const pathname = usePathname();
  const router = useRouter();
  const { status } = useSession();
  console.log(status);

  const handleCart = () => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      const callbackUrl = encodeURIComponent(pathname);
      router.push(`/login?callbackUrl=${callbackUrl}`);
      return;
    }

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
