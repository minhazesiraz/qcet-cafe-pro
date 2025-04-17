"use server";

import dbConnect from "@/config/db";
import {
   createProvingCode,
   createProvingToken,
   createProvingTokenExpires
} from "@/lib/token-expires";
import User from "@/models/User";
import { dispatchIsProveLinks } from "@/utils/e-mail/isprove-e-mail";
import { revalidatePath } from "next/cache";

export async function verifyEmailByToken(provingToken) {
   await dbConnect();

   if (!provingToken) return { error: "Missing token" };

   const user = await User.findOne({
      provingToken,
      provingTokenExpires: { $gt: Date.now() }
   });

   if (!user) return { error: "Invalid or expired token" };

   user.isProve = true;
   user.provingToken = undefined;
   user.provingTokenExpires = undefined;
   await user.save();

   revalidatePath("/accounts/logon"); // optional, to ensure the login page re-renders
   return { success: true, message: "Email verified successfully!" };
}

export async function verifyEmailByCode(email, provingCode) {
   await dbConnect();

   if (!email || !provingCode) return { error: "Missing email or code" };

   const user = await User.findOne({
      email,
      provingCode,
      provingTokenExpires: { $gt: Date.now() }
   });

   if (!user) return { error: "Invalid or expired code" };

   user.isProve = true;
   user.provingCode = undefined;
   user.provingToken = undefined;
   user.provingTokenExpires = undefined;
   await user.save();

   revalidatePath("/accounts/logon");
   return { success: true, message: "Email verified successfully!" };
}

export async function againIsProveLinks(email) {
   try {
      await dbConnect();

      const provingToken = createProvingToken();
      const provingTokenExpires = createProvingTokenExpires();
      const provingCode = createProvingCode();

      // const code = Math.floor(100000 + Math.random() * 900000).toString();
      // const token = Math.random().toString(36).slice(2);
      // const expiry = Date.now() + 10 * 60 * 1000; // 10 min

      console.log("Updating user with email:", email);
      const user = await User.findOneAndUpdate(
         { email },
         {
            $set: {
               provingCode,
               provingToken,
               provingTokenExpires
            }
         },
         // don't use upsert if you don't want to create a new user
         //  { upsert: true, new: true }
         { new: true }
      );

      if (!user) {
         return { success: false, message: "User not found" };
      }

      // Simulate sending email
      console.log(
         `📨 Send to ${email}: Code = ${provingCode}, Token = ${provingToken}`
      );

      await dispatchIsProveLinks(email, provingToken, provingCode);

      return { success: true, message: "Verification sent!" };
   } catch (err) {
      console.error("Resend error:", err);
      return { success: false, error: "Something went wrong" };
   }
}
