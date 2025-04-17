import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { auth_config } from "./auth.config";
import dbConnect from "./config/db";
import User from "./models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
   ...auth_config,
   providers: [
      Credentials({
         credentials: {
            email: {},
            password: {}
         },
         authorize: async (credentials) => {
            try {
               await dbConnect();

               if (!credentials.email || !credentials.password) {
                  throw new Error("Please enter your email and password.");
               }

               console.log("Checking user in the database...");
               const user = await User.findOne({ email: credentials.email })
                  .select("+password name email role isProve avatar")
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
                  isProve: user.isProve,
                  avatar: user.avatar,
                  role: user.role
               };
            } catch (error) {
               throw new Error(
                  error.message || "Authentication failed. Please try again."
               );
            }
         }
      }),
      Google({
         clientId: process.env.GOOGLE_CLIENT_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
         authorization: {
            params: {
               prompt: "consent",
               access_type: "offline",
               response_type: "code"
            }
         },
         async profile(profile) {
            await dbConnect();

            let user = await User.findOne({ email: profile.email });

            if (!user) {
               user = await User.create({
                  name: `${profile.given_name} ${profile.family_name}`,
                  email: profile.email,
                  avatar: profile.picture,
                  role: "client",
                  isProve: profile.email_verified ?? true
               });
            }

            return {
               id: user._id.toString(),
               name: user.name,
               email: user.email,
               isProve: user.isProve,
               avatar: user.avatar,
               role: user.role
            };
         }
      })
   ],
   session: {
      strategy: "jwt"
   },
   callbacks: {
      async jwt({ token, user, account }) {
         if (user) {
            token.id = user.id;
            token.role = user.role;
            token.email = user.email;
            token.name = user.name;
            token.isProve = user.isProve;
            token.avatar = user.avatar;

            console.log("updated token in auth.js:", token);
         }

         return token;
      },

      async session({ session, token }) {
         session.user.id = token.id;
         session.user.role = token.role;
         session.user.email = token.email;
         session.user.name = token.name;
         session.user.isProve = token.isProve;
         session.user.avatar = token.avatar;

         console.log(`returning session: ${JSON.stringify(session)}`);

         return session;
      }
   },
   secret: process.env.NEXTAUTH_SECRET
});
