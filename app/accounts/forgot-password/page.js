"use client";

import { initiatePasswordResetLinks } from "@/app/actions/forgot-password-actions";
import PasswordResettingLinks from "@/modals/password-resetting-links";
import { useState } from "react";

export default function ForgotPasswordPage() {
   const [message, setMessage] = useState(null);
   const [email, setEmail] = useState(null);
   const [error, setError] = useState(null);
   const [showSuccess, setShowSuccess] = useState(false);

   const onSubmit = async (e) => {
      e.preventDefault();

      const formData = new FormData(e.target);
      const userData = Object.fromEntries(formData.entries());
      // console.log(userData);

      const email = userData.email;

      const response = await initiatePasswordResetLinks(email);

      if (response.success) {
         setMessage(response.success);
         setError(null);
         setEmail(email);
      } else if (response.error) {
         setError(response.error);
         setMessage(null);
      }

      setShowSuccess(true);
   };

   return (
      <>
         <p>Forgot Password Page</p>
         <form onSubmit={onSubmit}>
            <div className="relative my-6">
               <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Your email"
                  className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
               />
               <label
                  htmlFor="email"
                  className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
               >
                  Your email
               </label>
               <small className="absolute flex w-full justify-between px-4 py-1 text-xs text-slate-400 transition peer-invalid:text-pink-500">
                  <span>Text field with helper text</span>
                  <span className="text-slate-500">1/10</span>
               </small>
            </div>
            <button type="submit">Send Reset Link</button>
         </form>
         {/* {message && <p>{message}</p>} */}
         <PasswordResettingLinks
            isOpen={showSuccess}
            title="Check your email"
            message={`${message} ${email}`}
            email={email}
         />
      </>
   );
}
