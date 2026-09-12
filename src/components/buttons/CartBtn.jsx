"use client";

import { handleCart } from "@/actions/server/cart";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import Swal from "sweetalert2";

export default function CartBtn({ product }) {
  const pathname = usePathname();
  const router = useRouter();
  // const { status } = useSession();
  const session = useSession();
  const isAuthenticated = session?.status === "authenticated";
  const [isLoading, setIsLoading] = useState(false);

  // console.log("Status:", status);

  // const handleAddToCart = () => {
  //   if (status === "loading") return;

  //   if (status === "unauthenticated") {
  //     const callbackUrl = encodeURIComponent(pathname);
  //     router.push(`/login?callbackUrl=${callbackUrl}`);
  //     return;
  //   }

  //   console.log("Add to cart:", product);
  // };

  const handleAddToCart = async () => {
    if (isAuthenticated) {
      setIsLoading(true);
      const result = await handleCart({ product, inc: true });

      // if (result.success) {
      //   Swal.fire("Add to cart", product.title, "success");
      // } else {
      //   Swal.fire("oops!", "Something went wrong", "error");
      // }

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Added to cart",
          text: `${product.title} has been added to your cart.`,
          showConfirmButton: false,
          timer: 1800,
          timerProgressBar: true,
        });
        setIsLoading(false);
      } else {
        Swal.fire({
          icon: "error",
          title: "Unable to add item",
          text: "Something went wrong. Please try again.",
          confirmButtonText: "Try Again",
        });
        setIsLoading(false);
      }
    } else {
      router.push(`/login?callbackUrl=${pathname}`);
    }
  };

  return (
    <button
      disabled={session?.status === "loading" || isLoading}
      onClick={handleAddToCart}
      className="btn btn-primary btn-sm sm:btn-md w-full mt-2"
    >
      <IoCartOutline className="text-xl" />
      Add to Cart
    </button>
  );
}
