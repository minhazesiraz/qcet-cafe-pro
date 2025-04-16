"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ForgotPassword({ isOpen, title, message }) {
   const router = useRouter();

   useEffect(() => {
      if (isOpen) {
         const timer = setTimeout(() => {
            router.push("/accounts/logon");
         }, 2000);

         return () => clearTimeout(timer);
      }
   }, [isOpen, router]);

   if (!isOpen) return null;

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
         {/* Semi-transparent background (no blur) */}
         <div className="absolute inset-0 bg-black/30" />

         {/* Modal Content */}
         <div className="relative z-10 max-w-sm w-full bg-white rounded-xl shadow-md p-6 text-center">
            <h2 className="text-xl font-semibold text-green-600 mb-2">
               {title}
            </h2>
            <p className="text-gray-700">{message}</p>
         </div>
      </div>
   );
}
