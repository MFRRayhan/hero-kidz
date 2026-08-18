"use client";
import { usePathname, useRouter } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";

export default function CartBtn({ product }) {
  const isLoggedIn = false;
  const pathname = usePathname();
  const router = useRouter();

  console.log({ isLoggedIn, pathname, router });

  const handleCart = () => {
    if (!isLoggedIn) {
      router.push(`/login?callbackUrl=${pathname}`);
    }
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
