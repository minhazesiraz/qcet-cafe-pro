"use client";

import { getBlogs } from "@/queries/blogs-qrs";
import { useEffect, useState } from "react";
import CardOfBlogs from "./card-of-blogs";
import Search_Comps from "./search-comps";

export default function Blogs_Comps() {
   const [blogs, setBlogs] = useState([]);
   const [page, setPage] = useState(1);
   const [limit, setLimit] = useState(5);
   const [search, setSearch] = useState("");
   const [total, setTotal] = useState(0);
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      const loadingBlogs = async () => {
         const data = await getBlogs({ page, limit, search });

         if (data) {
            console.log(data.blogs);
            setBlogs(data.blogs);
            setTotal(data.total);
         }
      };
      loadingBlogs();
   }, [limit, page, search]);

   const onSearch = async () => {
      setLoading(true);
      setPage(1);
      await loadingBlogs();
      setLoading(false);
   };

   return (
      <>
         {/* search */}
         <Search_Comps
            search={search}
            setSearch={setSearch}
            onSearch={onSearch}
            loading={loading}
         />

         {/* blogs */}
         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
               <CardOfBlogs key={blog._id} blog={blog} />
            ))}
         </div>
      </>
   );
}
