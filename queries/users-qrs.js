"use server";
import dbConnect from "@/config/db";
import User from "@/models/User";

export async function getUsers() {
   await dbConnect();

   const users = await User.find({}).select([
      "name",
      "email",
      "avatar",
      "role",
      "createdAt"
   ]);

   return JSON.parse(JSON.stringify(users));
}
