import Banner from "@/components/sections/Banner";
import Products from "@/components/sections/Products";
import Test from "@/components/Test";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

export default async function Homepage() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <Test />
      <p>{JSON.stringify(session)}</p>

      <Banner />
      <Products />
    </div>
  );
}
