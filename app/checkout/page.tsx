"use client";

import StripePaymentForm from "@/components/stripe/StripePaymentForm";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState("");
  const [planDetails, setPlanDetails] = useState({
    title: "",
    price: "",
    credits: "",
  });
  const searchParams = useSearchParams();

  useEffect(() => {
    const plan = searchParams.get("plan");
    const price = searchParams.get("price");
    const credits = searchParams.get("credits");

    setPlanDetails({
      title: plan || "",
      price: price || "",
      credits: credits || "",
    });

    // Convert price string to cents
    const amountInCents = Math.round(
      parseFloat(price?.replace("$", "") || "0") * 100
    );

    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amountInCents }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Checkout</CardTitle>
          <CardDescription>
            Complete your {planDetails.title} plan purchase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Plan: {planDetails.title}</p>
          <p className="mb-4">Price: {planDetails.price}</p>
          <p className="mb-4">Credits: {planDetails.credits}</p>
          {clientSecret && <StripePaymentForm clientSecret={clientSecret} />}
        </CardContent>
      </Card>
    </div>
  );
}
