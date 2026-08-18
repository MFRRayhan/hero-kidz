import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href="/" className="text-2xl flex items-center gap-1">
      <Image
        src="/assets/logo.png"
        alt="logo"
        width={50}
        height={50}
        className="w-12.5 h-auto"
      />

      <h2>
        Hero <span className="text-primary">Kidz</span>
      </h2>
    </Link>
  );
}
