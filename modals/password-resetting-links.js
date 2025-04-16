"use client";

import { useRouter } from "next/navigation";

export default function PasswordResettingLinks({
   isOpen,
   title,
   message,
   email
}) {
   const router = useRouter();

   if (!isOpen) return null;

   const getUrl = (email) => {
      const domain = email.split("@")[1]?.toLowerCase();

      if (!domain) return "https://mail.google.com"; // Fallback

      if (domain.includes("gmail.com")) return "https://mail.google.com";
      if (domain.includes("yahoo.com")) return "https://mail.yahoo.com";
      if (domain.includes("outlook.com") || domain.includes("hotmail.com"))
         return "https://outlook.live.com/mail";
      if (domain.includes("icloud.com")) return "https://www.icloud.com/mail";
      if (domain.includes("aol.com")) return "https://mail.aol.com";
      if (domain.includes("zoho.com")) return "https://mail.zoho.com";

      // Fallback to general email client
      return `https://${domain}`;
   };

   const handleGoToInbox = () => {
      const inboxUrl = getUrl(email);
      window.open(inboxUrl, "_blank");
      router.push("/accounts/logon");
   };

   const handleClose = () => {
      router.push("/accounts/logon");
   };

   return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
         <div
            className="relative max-w-sm w-full bg-white rounded-xl shadow-lg p-6 text-center"
            onClick={(e) => e.stopPropagation()}
         >
            <h2 className="text-xl font-semibold text-blue-600 mb-2">
               {title}
            </h2>
            <p className="text-gray-700 mb-4">{message}</p>
            <div className="flex gap-4 justify-center mt-4">
               <button
                  onClick={handleGoToInbox}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-lg"
               >
                  Go to Inbox
               </button>
               <button
                  onClick={handleClose}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium px-4 py-2 rounded-lg"
               >
                  Close
               </button>
            </div>
         </div>
      </div>
   );
}
