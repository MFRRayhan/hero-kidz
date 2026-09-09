import Banner from "@/components/home/Banner";
import Products from "@/components/home/Products";
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
