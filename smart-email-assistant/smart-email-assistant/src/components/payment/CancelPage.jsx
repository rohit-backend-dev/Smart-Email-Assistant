// src/components/payment/CancelPage.jsx
import { useNavigate } from "react-router-dom";

export default function CancelPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <h2 className="text-2xl font-bold text-red-600 mb-4">❌ Payment Canceled</h2>
      <p className="text-gray-700 mb-6">
        No worries! You can try upgrading again anytime.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-6 py-3 rounded-lg bg-gradient-to-r from-gray-900 to-red-500 text-white font-semibold hover:opacity-90"
      >
        Back to Home
      </button>
    </div>
  );
}
