"use server";

import { authOptions } from "@/lib/authOptions";
import { connect } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";

const cartCollections = connect("cart");

export const handleCart = async ({ product, inc = true }) => {
  const { user } = (await getServerSession(authOptions)) || {};

  if (!user) {
    return { success: false };
  }

  // Find the existing cart item for the current user and product
  const cartItemQuery = { email: user?.email, productId: product?._id };
  const existingCartItem = await cartCollections.findOne(cartItemQuery);

  if (existingCartItem) {
    // Update the quantity of the existing cart item
    const quantityUpdate = {
      $inc: {
        quantity: inc ? 1 : -1,
      },
    };

    const result = await cartCollections.updateOne(
      cartItemQuery,
      quantityUpdate,
    );

    return { success: Boolean(result.modifiedCount) };
  } else {
    // Add the product as a new cart item
    const newCartItem = {
      productId: product?._id,
      username: user?.name,
      email: user?.email,
      title: product?.title,
      quantity: 1,
      image: product?.image,
      price: product?.price - (product?.price * product?.discount) / 100,
    };
    const result = await cartCollections.insertOne(newCartItem);

    return { success: result.acknowledged };
  }
};
