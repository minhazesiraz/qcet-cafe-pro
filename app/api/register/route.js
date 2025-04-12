import dbConnect from "@/config/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req) {
  await dbConnect();
  const { name, email, password, isAccepted } = await req.json();
  //   console.log({ name, email, password, isAccepted });

  // Check if user exists
  let user = await User.findOne({ email });
  if (user)
    return NextResponse.json({ error: "User already exists" }, { status: 400 });

  // logic to salt and hash password
  const salt = await bcrypt.genSalt(10);
  const pwHash = await bcrypt.hash(password, salt);

  const userData = {
    name,
    email,
    password: pwHash,
    isAccepted,
    // verificationToken,
    // verificationTokenExpiry,
    // verificationCode,
  };
  console.log(userData);

  try {
    await User.create(userData);
    // await sendVerificationEmail(email, verificationToken, verificationCode);
    return NextResponse.json(
      { message: "User created. Verification email sent." },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
