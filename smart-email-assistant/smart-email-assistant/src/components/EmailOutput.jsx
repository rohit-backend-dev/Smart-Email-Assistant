import { useState } from "react";

export default function EmailOutput({ email, onEdit }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg relative">
      <div className="whitespace-pre-wrap">{email}</div>
      <div className="flex gap-4 mt-4">
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {copied ? "Copied ✅" : "Copy"}
        </button>
        <button
          onClick={() => onEdit(email)}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
        >
          Edit ✏️
        </button>
      </div>
    </div>
  );
}
