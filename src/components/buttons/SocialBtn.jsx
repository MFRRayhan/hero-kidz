"use client";

import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

export default function SocialBtn({ callbackUrl }) {
  const handleGoogleSignIn = async () => {
    await signIn("google", {
      callbackUrl: `/login?callbackUrl=${encodeURIComponent(
        callbackUrl || "/",
      )}&googleLogin=true`,
    });
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      className="btn btn-outline w-full flex items-center"
    >
      <FaGoogle />
      Continue with Google
    </button>
  );
}
