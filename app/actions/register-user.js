"use server";

import dbConnect from "@/config/db";
import {
   createProvingCode,
   createProvingToken,
   createProvingTokenExpires
} from "@/lib/token-expires";
import User from "@/models/User";
import { dispatchIsProveLinks } from "@/utils/e-mail/isprove-e-mail";
import bcrypt from "bcryptjs";

export async function register(formData) {
   //  const userData = Object.fromEntries(formData.entries());

   // const email = userData.email;

   //  const { name, email, password } = userData;

   const name = formData.get("name");
   const email = formData.get("email");
   const password = formData.get("password");

   await dbConnect();
   const existing = await User.findOne({ email });
   if (existing) return { error: "User already exists." };
   // return NextResponse.json(
   //    { error: "User already exists" },
   //    { status: 400 }
   // );

   // logic to salt and hash password
   const salt = await bcrypt.genSalt(10);
   const pwHash = await bcrypt.hash(password, salt);

   const provingToken = createProvingToken();
   const provingTokenExpires = createProvingTokenExpires();
   const provingCode = createProvingCode();

   // const token = nanoid(32);
   // const code = Math.floor(100000 + Math.random() * 900000); // 6-digit

   // const expiry = Date.now() + 15 * 60 * 1000;

   const newUser = {
      name,
      email,
      password: pwHash,
      provingToken,
      provingTokenExpires,
      provingCode
   };

   //  const user = new User({
   //     email,
   //     emailVerified: false,
   //     verificationToken: token,
   //     verificationTokenExpiry: expiry,
   //     verificationCode: code.toString()
   //  });

   //  await user.save();

   await User.create(newUser);

   console.log("Sending verification email to:", email);
   await dispatchIsProveLinks(email, provingToken, provingCode);

   //  await sendVerificationEmail({ email, token, code });

   return { success: true, message: "User created. Verification email sent." };

   //  return NextResponse.json(
   //     { success: true, message: "User created. Verification email sent." },
   //     { status: 200 }
   //  );
}
