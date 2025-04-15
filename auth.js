import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { auth_config } from "./auth.config";
import dbConnect from "./config/db";
import User from "./models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...auth_config,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          await dbConnect();

          if (!credentials.email || !credentials.password) {
            throw new Error("Please enter your email and password.");
          }

          console.log("Checking user in the database...");
          const user = await User.findOne({ email: credentials.email })
            .select("+password name email role isProve")
            .lean();

          if (!user) {
            throw new Error("No user found with this email.");
          }

          console.log("User from DB:", user);
          if (!user.password) {
            throw new Error("Password not found for this user");
          }

          console.log("Comparing password...");
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isValid) {
            throw new Error("Invalid credentials");
          }

          console.log("Login successful!", user);
          console.log("Login successful!", user._id.toString());

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.avatar,
            role: user.role,
            isProve: user.isProve,
          };
        } catch (error) {
          throw new Error(
            error.message || "Authentication failed. Please try again."
          );
        }
      },
    }),
  ],
});
