"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthBtns() {
  const session = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/login",
    });
    router.push("/login");
  };

  return (
    <>
      {session.status === "authenticated" ? (
        <button onClick={handleSignOut} className="btn btn-primary btn-outline">
          Logout
        </button>
      ) : (
        <Link href={"/login"} className="btn btn-primary btn-outline">
          Login
        </Link>
      )}
    </>
  );
}
