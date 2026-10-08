"use client";

import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FiUser, FiSettings, FiLogOut } from "react-icons/fi";

export default function AuthBtns() {
  const session = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/login",
    });

    router.push("/login");
  };

  if (session.status !== "authenticated") {
    return (
      <Link
        href="/login"
        className="btn btn-primary btn-sm sm:btn-md rounded-full px-5"
      >
        Login
      </Link>
    );
  }

  const user = session.data?.user;

  return (
    <div className="dropdown dropdown-end">
      {/* Avatar Button */}
      <button
        tabIndex={0}
        className="
          btn
          btn-ghost
          btn-circle
          avatar
          p-0
          ring-2
          ring-base-300
          hover:ring-primary
          transition-all
          duration-200
        "
      >
        <div className="w-10 sm:w-11 rounded-full overflow-hidden">
          <Image
            src={user?.image || "/default-avatar.png"}
            width={100}
            height={100}
            alt={user?.name || "User avatar"}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      </button>

      {/* Dropdown */}
      <ul
        tabIndex={-1}
        className="
          menu
          menu-sm
          dropdown-content
          z-50
          mt-3
          w-64
          rounded-2xl
          border
          border-base-300
          bg-base-100
          p-2
          shadow-xl
        "
      >
        {/* User Info */}
        <li className="pointer-events-none mb-1">
          <div className="flex items-center gap-3 px-3 py-3">
            <div className="avatar shrink-0">
              <div className="w-10 rounded-full overflow-hidden">
                <Image
                  src={user?.image || "/default-avatar.png"}
                  width={50}
                  height={50}
                  alt={user?.name || "User avatar"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="min-w-0">
              <p className="truncate font-semibold">{user?.name || "User"}</p>

              <p className="truncate text-xs text-base-content/60">
                {user?.email || "No email"}
              </p>
            </div>
          </div>
        </li>

        <div className="divider my-1" />

        {/* Profile */}
        <li>
          <Link
            href="/profile"
            className="flex items-center gap-3 rounded-xl py-3"
          >
            <FiUser className="text-lg" />
            <span>Profile</span>
          </Link>
        </li>

        {/* Settings */}
        <li>
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-xl py-3"
          >
            <FiSettings className="text-lg" />
            <span>Settings</span>
          </Link>
        </li>

        <div className="divider my-1" />

        {/* Logout */}
        <li>
          <button
            onClick={handleSignOut}
            className="
              flex
              items-center
              gap-3
              rounded-xl
              py-3
              text-error
              hover:bg-error/10
            "
          >
            <FiLogOut className="text-lg" />
            <span>Logout</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
