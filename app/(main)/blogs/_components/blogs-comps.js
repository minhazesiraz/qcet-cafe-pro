"use client";

import { getBlogs } from "@/queries/blogs-qrs";
import { useEffect, useRef, useState } from "react";
import CardOfBlogs from "./card-of-blogs";
import Pagination_Comps from "./pagination-comps";
import Search_Comps from "./search-comps";

export default function Blogs_Comps() {
   const [blogs, setBlogs] = useState([]);
   const [page, setPage] = useState(1);
   const [limit, setLimit] = useState(5);
   const [search, setSearch] = useState("");
   const [total, setTotal] = useState(0);
   const [loading, setLoading] = useState(false);

   const inputRef = useRef(null); // 👈 Input reference moved here

   const loadBlogs = async ({ newPage = page, newSearch = search } = {}) => {
      setLoading(true);
      const data = await getBlogs({
         page: newPage,
         limit,
         search: newSearch
      });

      if (data) {
         setBlogs(data.blogs);
         setTotal(data.total);
      }

      setLoading(false);

      // ✅ Refocus input after data loads
      setTimeout(() => {
         inputRef.current?.focus();
      }, 50);
   };

   //  const loadBlogs = useCallback(
   //     async ({ newPage = page, newSearch = search } = {}) => {
   //        setLoading(true);
   //        const data = await getBlogs({
   //           page: newPage,
   //           limit,
   //           search: newSearch
   //        });

   //        if (data) {
   //           setBlogs(data.blogs);
   //           setTotal(data.total);
   //        }

   //        setLoading(false);

   //        setTimeout(() => {
   //           inputRef.current?.focus();
   //        }, 50);
   //     },
   //     [page, limit, search]
   //  );

   useEffect(() => {
      loadBlogs();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [page, limit]);

   //  useEffect(() => {
   //     loadBlogs();
   //  }, [loadBlogs]);

   const onSearch = () => {
      setPage(1);
      loadBlogs({ newPage: 1, newSearch: search.trim() });
   };

   //  const onSearch = useCallback(() => {
   //     setPage(1);
   //     loadBlogs({ newPage: 1, newSearch: search.trim() });
   //  }, [search, loadBlogs]);

   return (
      <>
         <Search_Comps
            inputRef={inputRef} // 👈 Pass ref
            search={search}
            setSearch={setSearch}
            onSearch={onSearch}
            loading={loading}
         />

         <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog) => (
               <CardOfBlogs key={blog._id} blog={blog} />
            ))}
         </div>

         <Pagination_Comps
            page={page}
            setPage={setPage}
            totalPages={Math.ceil(total / limit)}
            setLimit={setLimit}
            limit={limit}
         />
      </>
   );
}
