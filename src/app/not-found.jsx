import Link from "next/link";
import React from "react";
import { BiSolidErrorAlt } from "react-icons/bi";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center gap-5 min-h-screen flex-col">
      <BiSolidErrorAlt size={70} className="text-primary" />
      <h2 className="text-4xl">Page Not Found</h2>
      <Link href={"/"} className="btn btn-primary btn-outline">
        Go to Homepage
      </Link>
    </div>
  );
}
