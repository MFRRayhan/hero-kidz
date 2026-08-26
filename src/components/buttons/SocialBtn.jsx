"use client";

import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

export default function SocialBtn({ callbackUrl }) {
  const handleGoogleSignIn = async () => {
    try {
      await signIn("google", {
        callbackUrl: `/login?callbackUrl=${encodeURIComponent(
          callbackUrl || "/",
        )}&googleLogin=true`,
      });
    } catch (error) {
      console.log("Google Login Error:", error);

      await Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: error.message || "Something went wrong.",
        confirmButtonText: "Continue",
      });
    }
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
