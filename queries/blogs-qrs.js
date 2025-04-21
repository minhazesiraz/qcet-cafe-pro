"use server";

import dbConnect from "@/config/db";
import Blog from "@/models/Blog";
import User from "@/models/User";

export async function getBlogs({ page = 1, limit = 5, search = "" }) {
   await dbConnect();

   const query = {};

   // apply case-insensitive search on blog title
   if (search) {
      query.title = { $regex: search, $options: "i" };
   }

   // get total count of matching blogs
   const total = await Blog.countDocuments(query);

   // Fetch paginated and sorted blog posts
   const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({
         path: "author",
         model: User,
         select: ["name", "email", "avatar"],
         match: { _id: { $ne: null } } // ensure author exists
      });

   // return serialized data
   return {
      blogs: JSON.parse(JSON.stringify(blogs)),
      total
   };
}

export async function getBlogBySlug(slug) {
   await dbConnect();

   const blog = await Blog.findOne({ slug, published: true })
      .select([
         "title",
         "content",
         "author",
         "tags",
         "published",
         "thumbnail",
         "slug",
         "createdAt"
      ])
      .populate({
         path: "author",
         model: User,
         select: ["name", "email", "avatar"],
         match: { _id: { $ne: null } }
      })
      .lean();

   console.log("Fetched Blog:", blog); // Log the result for debugging

   return blog;
}
