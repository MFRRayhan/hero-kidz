"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const pathName = usePathname();

  const isActive = href === "/" ? pathName === "/" : pathName.startsWith(href);

  return (
    <Link href={href} className={isActive ? "text-primary" : ""}>
      {children}
    </Link>
  );
}
