"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
// import { verifyEmailByToken, verifyEmailByCode } from "@/app/actions/verify-email-actions";
import {
   againIsProveLinks,
   verifyEmailByCode,
   verifyEmailByToken
} from "@/app/actions/awaiting-confirmation";
import { signOut } from "next-auth/react";

export default function AwaitingConfirmationPage() {
   const router = useRouter();
   const searchParams = useSearchParams();
   const provingToken = searchParams.get("provingToken");
   const emailQuery = searchParams.get("email");

   const [email, setEmail] = useState(emailQuery || "");
   const [provingCode, setCode] = useState("");
   const [message, setMessage] = useState("");
   const [isPending, startTransition] = useTransition();

   // Token verification on page load
   useEffect(() => {
      if (!provingToken) return;
      startTransition(async () => {
         const res = await verifyEmailByToken(provingToken);
         setMessage(res.message || res.error);
         if (res.success) {
            await signOut({ callbackUrl: "/accounts/logon" });
         }
      });
   }, [provingToken]);

   const handleCodeVerify = () => {
      if (!email || !provingCode) {
         setMessage("Please fill both fields.");
         return;
      }

      startTransition(async () => {
         const res = await verifyEmailByCode(email, provingCode);
         setMessage(res.message || res.error);
         if (res.success) {
            await signOut({ callbackUrl: "/accounts/logon" });
         }
      });
   };

   const resendingProvingLinks = async () => {
      // solve this
      // !email return
      // https://chatgpt.com/c/67ffa3bf-4f7c-8007-b882-9169355f77c8
      const response = await againIsProveLinks(email);
   };

   return (
      <>
         <p>Awaiting confirmation Page</p>
         <div className="max-w-md mx-auto mt-10 p-6 border rounded text-center">
            <h1 className="text-2xl mb-4">Verify Your Email</h1>

            {!provingToken && (
               <>
                  <input
                     type="email"
                     placeholder="Your email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className="mb-3 w-full px-4 py-2 border rounded"
                  />
                  <input
                     type="text"
                     placeholder="Verification code"
                     value={provingCode}
                     onChange={(e) => setCode(e.target.value)}
                     className="mb-3 w-full px-4 py-2 border rounded"
                  />
                  <button
                     onClick={handleCodeVerify}
                     className="bg-blue-600 text-white px-4 py-2 rounded w-full"
                     disabled={isPending}
                  >
                     {isPending ? "Verifying..." : "Verify Code"}
                  </button>
                  <button onClick={resendingProvingLinks}>Resend</button>
               </>
            )}

            {message && <p className="mt-4 text-sm text-gray-700">{message}</p>}
         </div>
      </>
   );
}
