import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import "./common.css";

const CheckOutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      // console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("");
      // console.log("[PaymentMethod]", paymentMethod);
    }

    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      // setCardError(confirmError.message);
    }
    setProcessing(false);
    // console.log("[PaymentIntent]", paymentIntent);

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      // todo next steps
      // save payment information to the server
      const paymentData = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price,
        quantity: cart.length,
        cartItems: cart.map((item) => item._id),
        classItems: cart.map((item) => item.classId),
        classNames: cart.map((item) => item.name),
        status: "service pending",
        date: new Date(),
      };
      axiosSecure.post("/payments", paymentData).then((res) => {
        console.log(res.data);
        if (res.data.insertResult.insertedId) {
          toast.success("Transaction complete successfully");
        }
      });
    }
  };

  return (
    <>
      <form
        className="lg:w-2/3 xl:w-1/2 mx-5 lg:mx-auto pt-10 text-center form"
        onSubmit={handlePaymentSubmit}
      >
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          type="submit"
          className="btn btn-primary w-full px-5 mt-7"
          disabled={!stripe || !clientSecret || processing}
        >
          Payment
        </button>
      </form>
      {cardError && (
        <p className="bg-red-600 text-white p-3 text-center mt-5 w-1/2 mx-auto rounded-lg">
          {cardError}
        </p>
      )}
      {transactionId && (
        <p className="bg-green-700 text-white p-3 text-center mt-5 w-1/2 mx-auto rounded-lg">
          Your transaction id: {transactionId}
        </p>
      )}
      <ToastContainer />
    </>
  );
};

export default CheckOutForm;
