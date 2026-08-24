"use client";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";

export default function SocialBtn() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleGoogleSignIn = async () => {
    const result = await signIn("google", {
      redirect: false,
    });

    console.log("GOOGLE SIGN IN RESULT:", result);
    console.log("OK:", result?.ok);
    console.log("ERROR:", result?.error);
    console.log("STATUS:", result?.status);
    console.log("URL:", result?.url);
  };

  return (
    <>
      {/* Google Login */}
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline w-full flex items-center"
      >
        <FaGoogle />
        Continue with Google
      </button>
    </>
  );
}
