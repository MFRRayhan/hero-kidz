import { getCartItems } from "@/actions/server/cart";
import ClientCart from "@/components/sections/ClientCart";
import ClientCheckout from "@/components/sections/ClientCheckout";

export default async function Checkout() {
  const cartItems = await getCartItems();

  return (
    <div>
      <ClientCheckout cartItems={cartItems}></ClientCheckout>
    </div>
  );
}
