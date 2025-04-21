export default function Pagination_Comps({
   page,
   setPage,
   totalPages,
   setLimit,
   limit
}) {
   return (
      <div className="mt-4 flex items-center justify-center gap-2">
         {/* Prev Button */}
         <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="px-4 py-2 border bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            disabled={page === 1}
         >
            Prev
         </button>

         {/* First page & leading dots */}
         {page > 3 && (
            <>
               <button
                  onClick={() => setPage(1)}
                  className="px-4 py-2 border hover:bg-gray-300"
               >
                  1
               </button>
               <span className="px-2">...</span>
            </>
         )}

         {/* Page Number Buttons */}
         {Array.from({ length: totalPages }, (_, i) =>
            i + 1 >= page - 2 && i + 1 <= page + 2 ? (
               <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 border ${
                     page === i + 1
                        ? "bg-blue-500 text-white"
                        : "hover:bg-gray-300 bg-gray-200"
                  }`}
               >
                  {i + 1}
               </button>
            ) : null
         )}

         {/* Trailing dots & last page */}
         {page < totalPages - 2 && (
            <>
               <span className="px-2">...</span>
               <button
                  onClick={() => setPage(totalPages)}
                  className="px-4 py-2 border hover:bg-gray-300"
               >
                  {totalPages}
               </button>
            </>
         )}

         {/* Next Button */}
         <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            className="px-4 py-2 border bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            disabled={page === totalPages}
         >
            Next
         </button>

         {/* Jump to Page Input */}
         <input
            type="number"
            min={1}
            max={totalPages}
            value={page}
            onChange={(e) =>
               setPage(
                  Math.min(Math.max(1, Number(e.target.value)), totalPages)
               )
            }
            className="px-2 py-1 border ml-2 w-16 text-center"
         />
      </div>
   );
}
