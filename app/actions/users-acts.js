"use server";
import dbConnect from "@/config/db";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function updateUserRole(formData) {
   const userId = formData.get("userId");
   const role = formData.get("role");

   await dbConnect();

   if (!userId || !role) {
      throw new Error("User ID or role is missing");
   }

   const allowedRoles = ["admin", "moderator", "client"];
   if (!allowedRoles.includes(role)) {
      throw new Error("Invalid role");
   }

   const user = await User.findByIdAndUpdate(userId, { role }, { new: true });

   if (!user) {
      throw new Error("User not found");
   }

   // Revalidate the admin users table page
   revalidatePath("/admin/users-table");

   // Redirect to the users table after success
   redirect("/admin/users-table");

   // return { success: true, message: "Role updated", user };
   //  return { success: true };
   //  return user;
}
