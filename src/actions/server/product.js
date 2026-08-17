import { connect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

const productsCollection = connect("products");

export const getProducts = async () => {
  const products = await productsCollection.find().toArray();
  return products;
};

export const getSingleProduct = async (id) => {
  if (!id || ObjectId.isValid(id)) return {};

  const query = { _id: new ObjectId(id) };
  const product = await productsCollection.findOne(query);
  return product;
};
