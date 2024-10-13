"use client";

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-confirmation`,
      },
    });

    if (error) {
      setError(error.message ?? "An unknown error occurred");
      setProcessing(false);
    }
    // If successful, Stripe will redirect to the return_url
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button
        disabled={!stripe || processing}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        {processing ? "Processing..." : "Pay now"}
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
    </form>
  );
};

interface StripePaymentFormProps {
  clientSecret: string;
}

const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  clientSecret,
}) => {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <CheckoutForm />
    </Elements>
  );
};

export default StripePaymentForm;
