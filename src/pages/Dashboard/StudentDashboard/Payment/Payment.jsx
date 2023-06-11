import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../../../hooks/useCart";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = () => {
  const [cart] = useCart();
  const totalPrice = cart.reduce((sum, item) => item.price + sum, 0);

  return (
    <div className="max-w-screen-xl mx-auto my-10">
      <h1 className="text-4xl font-bold text-center">PAYMENT</h1>
      <hr className="w-1/2 mx-auto border-2 border-primary my-5" />
      <Elements stripe={stripePromise}>
        <CheckoutForm cart={cart} price={totalPrice} />
      </Elements>
    </div>
  );
};

export default Payment;
