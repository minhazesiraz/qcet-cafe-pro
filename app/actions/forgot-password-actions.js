"use server";

import dbConnect from "@/config/db";
import { createResettingToken } from "@/lib/token-expires";
import User from "@/models/User";
import { dispatchPasswordResetLinks } from "@/utils/e-mail/forgot-password-e-mail";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function initiatePasswordResetLinks(email) {
   dbConnect();

   const user = await User.findOne({ email });
   if (!user) return { error: "User not found" };

   const { resettingToken, hashedToken, expires } = createResettingToken();

   user.resettingToken = hashedToken;
   user.resettingTokenExpires = expires;
   await user.save();

   // send e-mail
   await dispatchPasswordResetLinks(email, resettingToken);

   return { success: "We've emailed you a link to reset your password." };
}

export async function resettingPassword(email, token, newPassword) {
   dbConnect();

   const user = await User.findOne({ email });
   if (!user) return { error: "User not found" };

   // validate reset token
   const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
   if (
      user.resettingToken !== hashedToken ||
      user.resettingTokenExpires < Date.now()
   ) {
      return { error: "Invalid or expired token" };
   }

   // Hash New Password & Update
   user.password = await bcrypt.hash(newPassword, 10);
   user.resettingToken = undefined;
   user.resettingTokenExpires = undefined;
   await user.save();

   return { success: "Password successfully reset. You can now login." };
}
