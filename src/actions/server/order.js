"use server";

import { authOptions } from "@/lib/authOptions";
import { connect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { clearCart, getCartItems } from "./cart";

const ordersCollections = connect("orders");

export const createOrder = async (payload) => {
  const { user } = (await getServerSession(authOptions)) || {};
  if (!user) return [];

  const cart = await getCartItems();

  if (cart.length === 0) return { success: false };

  const newOrder = {
    ...payload,
    createdAt: new Date().toISOString(),
    items: cart,
  };

  const result = await ordersCollections.insertOne(newOrder);

  if (result.insertedId) {
    await clearCart();
  }

  return { success: Boolean(result.insertedId) };
};
