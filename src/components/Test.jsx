"use client";

import { useSession } from "next-auth/react";

export default function Test() {
  const session = useSession();

  return <div>User Session: {JSON.stringify(session)}</div>;
}
