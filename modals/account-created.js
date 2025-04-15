"use client";

import { useRouter } from "next/navigation";

export default function AccountCreated({ isOpen, title, message }) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleGot_it = () => {
    router.push("/accounts/logon");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleGot_it}
      />

      {/* contents */}
      <div
        className="relative z-10 max-w-sm w-full bg-white rounded-2xl shadow-lg p-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold text-green-600 mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{message}</p>
        <button
          onClick={handleGot_it}
          className="mt-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-medium"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
