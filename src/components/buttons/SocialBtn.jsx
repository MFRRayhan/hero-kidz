"use client";
import { signIn } from "next-auth/react";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

export default function SocialBtn({ callbackUrl }) {
  const handleGoogleSignIn = async () => {
    const result = await signIn("google", {
      callbackUrl: callbackUrl || "/",
    });

    // console.log("GOOGLE SIGN IN RESULT:", result);
    // console.log("OK:", result?.ok);
    // console.log("ERROR:", result?.error);
    // console.log("STATUS:", result?.status);
    // console.log("URL:", result?.url);

    if (result?.error) {
      await Swal.fire({
        icon: "error",
        title: "Login Failed!",
        text: "Google login failed. Please try again.",
        confirmButtonText: "Try Again",
      });

      return;
    }

    await Swal.fire({
      icon: "success",
      title: "Login Successful!",
      text: "You have been logged in successfully with Google.",
      confirmButtonText: "Continue",
    });
  };

  return (
    <>
      {/* Google Login */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="btn btn-outline w-full flex items-center"
      >
        <FaGoogle />
        Continue with Google
      </button>
    </>
  );
}
