"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PaymentConfirmation = () => {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const redirectStatus = searchParams.get("redirect_status");
    setStatus(redirectStatus);
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-75"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md text-center">
        {status === "succeeded" ? (
          <>
            <h1 className="text-3xl font-semibold text-green-600 mb-4 animate-fade-in">
              Payment Successful 🎉
            </h1>
            <p className="text-gray-700">
              Thank you for your payment. Your transaction has been completed
              successfully!
            </p>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-semibold text-red-600 mb-4 animate-fade-in">
              Payment Failed 😔
            </h1>
            <p className="text-gray-700">
              Unfortunately, your payment could not be processed. Please try
              again or contact support.
            </p>
          </>
        )}
        <a
          href="/"
          className="mt-6 inline-block bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
        >
          Go back to Home
        </a>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
