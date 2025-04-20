"use server";

import { auth } from "@/auth";
import dbConnect from "@/config/db";
import Blog from "@/models/Blog";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

export async function newPost(formData) {
   await dbConnect();

   const title = formData.get("title");
   const content = formData.get("content");
   const thumbnail = formData.get("thumbnail");
   const tags = formData.get("tags");

   if (!title || !content || !thumbnail || !tags) {
      throw new Error(
         "Oops! Looks like you missed something — all fields are needed."
      );
   }

   const slug = title.trim().toLowerCase().replace(/\s+/g, "-");

   const session = await auth();
   const uid = session?.user?.id || new ObjectId();

   await Blog.create({
      title,
      content,
      thumbnail,
      slug,
      tags: tags.split(",").map((tag) => tag.trim()),
      published: true,
      author: uid
   });

   revalidatePath("/blogs");
}
