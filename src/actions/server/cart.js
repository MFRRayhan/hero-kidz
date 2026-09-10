"use server";

import { authOptions } from "@/lib/authOptions";
import { connect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";

const cartCollections = connect("cart");

export const handleCart = async ({ product, inc = true }) => {
  const user = await getServerSession(authOptions);

  console.log(user);

  return { success: true };
};
