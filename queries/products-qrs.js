"use server";
import { auth } from "@/auth";
import dbConnect from "@/config/db";
import Plan from "@/models/Plan";

export async function getProducts() {
   await dbConnect();

   const session = await auth();
   const _id = session?.user?.id;

   if (!_id) {
      return []; // or throw error if no session
   }

   const products = await Plan.find({ author: _id }).select(["name", "price"]);

   return JSON.parse(JSON.stringify(products));
}

// {"_id":{"$oid":"680808ae216a28669ea9e119"},"name":"Website Builder Pro","author":{"$oid":"67fc40b8d1a67ef8b85bb15a"},"price":{"$numberDouble":"49.99"},"__v":{"$numberInt":"0"}}
