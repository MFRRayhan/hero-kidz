"use server";

import { authOptions } from "@/lib/authOptions";
import { connect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";

import { clearCart, getCartItems } from "./cart";
import { sendEmail } from "@/lib/sendEmail";
import { invoiceTemplate } from "@/lib/orderInvoiceTemplate";

const ordersCollections = connect("orders");

export const createOrder = async (payload) => {
  const { user } = (await getServerSession(authOptions)) || {};

  if (!user) return { success: false };

  const cart = await getCartItems();

  if (cart.length === 0) {
    return { success: false };
  }

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0,
  );

  const newOrder = {
    ...payload,
    customerName: user.name,
    customerEmail: user.email,
    createdAt: new Date().toISOString(),
    items: cart,
    subtotal,
    total: subtotal,
  };

  const result = await ordersCollections.insertOne(newOrder);

  if (result.insertedId) {
    const html = invoiceTemplate({
      orderId: result.insertedId.toString(),
      customerName: user.name,
      customerEmail: user.email,
      items: cart,
      subtotal,
      discount: 0,
      total: subtotal,
      createdAt: newOrder.createdAt,
    });

    await sendEmail({
      to: user.email,
      subject: `Hero Kidz Order Confirmation #${result.insertedId}`,
      html,
    });

    await clearCart();
  }

  return {
    success: Boolean(result.insertedId),
  };
};
