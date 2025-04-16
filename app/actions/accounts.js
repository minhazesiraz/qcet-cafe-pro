"use server";

import { signIn } from "@/auth";

export const credentialsLogon = async (formData) => {
   try {
      const response = await signIn("credentials", {
         email: formData.get("email"),
         password: formData.get("password"),
         redirect: false
      });

      return response;
   } catch (error) {
      console.error("Authentication error:", error);
      throw new Error(error.message || "Authentication failed");
   }
};

export const onlinePlatformsLogin = async (formData) => {
   const actions = formData.get("actions");

   if (!actions) return;

   await signIn(actions, { redirectTo: "/blogs" });
};
