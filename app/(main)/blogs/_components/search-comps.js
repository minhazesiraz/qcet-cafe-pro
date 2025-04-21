"use client";

import { useEffect } from "react";

export default function Search_Comps({
   inputRef,
   search,
   setSearch,
   onSearch,
   loading
}) {
   const handleKeyDown = (e) => {
      if (e.key === "Enter") {
         onSearch();
      }
   };

   useEffect(() => {
      if (search === "") {
         inputRef.current?.focus();
      }
   }, [search]);

   //  useEffect(() => {
   //     if (search === "") {
   //        inputRef.current?.focus();
   //     }
   //  }, [search, inputRef]);

   const handleChange = (e) => {
      const value = e.target.value;
      setSearch(value);

      if (value.trim() === "") {
         onSearch();
      }
   };

   return (
      <div className="relative my-6">
         <input
            ref={inputRef}
            type="search"
            value={search}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Search here"
            aria-label="Search content"
            className="peer relative h-10 w-full rounded border border-slate-200 px-4 pr-12 text-sm text-slate-500 outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
            disabled={loading}
         />

         {loading ? (
            <svg
               className="absolute right-4 top-2.5 h-5 w-5 animate-spin text-slate-400"
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
            >
               <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
               ></circle>
               <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
               ></path>
            </svg>
         ) : (
            <svg
               xmlns="http://www.w3.org/2000/svg"
               onClick={onSearch}
               className="absolute right-4 top-2.5 h-5 w-5 cursor-pointer stroke-slate-400 peer-disabled:cursor-not-allowed"
               fill="none"
               viewBox="0 0 24 24"
               stroke="currentColor"
               strokeWidth="1.5"
               aria-hidden="true"
               aria-label="Search icon"
               role="graphics-symbol"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
               />
            </svg>
         )}
      </div>
   );
}
