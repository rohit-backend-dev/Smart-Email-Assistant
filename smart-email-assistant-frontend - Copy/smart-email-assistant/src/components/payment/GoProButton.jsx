import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

// preload once
const stripePromise = loadStripe("pk_test_51S2YPmJPmn88UxjiDNzuDwh9dK8tQWMFMhabQOa9qS42RaMHvoXWIS78Hg5wNROQbtIO50Np2AkHC7313N6Jo6J500RKkb6SzF");

export default function GoProButton() {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckout = async () => {
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe.js failed to initialize");

      const response = await fetch("http://localhost:8080/api/payment/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) throw new Error("Backend failed: " + response.status);

      const session = await response.json();
      if (!session.id) throw new Error("Invalid session response");

      const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
      if (error) throw error;
    } catch (err) {
      console.error("Checkout error:", err.message);
      alert("Something went wrong: " + err.message);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="ml-5 inline-block bg-gradient-to-r from-gray-900 to-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
      >
        Go Pro <span className="text-yellow-300">$$</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full animate-fadeIn">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">🚀 Upgrade to SmartEmail Pro</h2>
            <ul className="text-gray-600 mb-6 space-y-2 text-left">
              <li>✅ Unlimited email generations</li>
              <li>✅ Access to all tones & styles</li>
              <li>✅ Save & manage your drafts</li>
              <li>✅ Priority support</li>
              <li>✅ Early access to new features</li>
            </ul>
            <div className="flex justify-between">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-400 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleCheckout}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-gray-900 to-red-500 text-white font-semibold hover:opacity-90"
              >
                Continue to Payment 💳
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
