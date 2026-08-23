"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

export default function SocialBtn() {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <>
      {/* Google Login */}
      <button className="btn btn-outline w-full flex items-center">
        <FaGoogle />
        Continue with Google
      </button>
    </>
  );
}
