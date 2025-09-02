import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const [showPopup, setShowPopup] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
      navigate("/"); // Redirect back to homepage
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full text-center animate-bounceIn">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              🎉 Payment Successful!
            </h2>
            <p className="text-gray-700 mb-4">
              Thank you for upgrading to <b>SmartEmail Pro</b>.  
              Redirecting you back...
            </p>
            <div className="animate-pulse text-3xl">✅</div>
          </div>
        </div>
      )}
    </>
  );
}
