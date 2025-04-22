"use server";

import { auth } from "@/auth";
import dbConnect from "@/config/db";
import Plan from "@/models/Plan";

export async function placeOrder(formData) {
   await dbConnect();

   const name = formData.get("name");
   const price = formData.get("price");

   const session = await auth();
   const uid = session?.user?.id || new ObjectId();

   await Plan.create({
      name,
      price,
      author: uid
   });

   // Here you can save to your DB
   console.log("Order placed:", { name, price });

   return { message: `Successfully ordered ${name} for $${price}!` };
}
