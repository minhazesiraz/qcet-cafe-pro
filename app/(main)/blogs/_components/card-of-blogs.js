import Image from "next/image";
import Link from "next/link";

export default function CardOfBlogs({ blog }) {
   console.log("card of blogs", blog);

   return (
      <>
         {/*<!-- Component: Blog card with action button --> */}
         <div className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200">
            {/*  <!-- Image --> */}
            <figure>
               <Image
                  // src="https://picsum.photos/id/1081/800/600"
                  width={800}
                  height={600}
                  src={blog?.thumbnail}
                  alt={blog?.title}
                  className="aspect-video w-full"
               />
            </figure>
            {/*  <!-- Body--> */}
            <div className="p-6">
               <header className="mb-4 flex gap-4">
                  <Link
                     href="#"
                     className="relative inline-flex h-12 w-12 items-center justify-center rounded-full text-white"
                  >
                     <Image
                        width={48}
                        height={48}
                        src={blog?.author?.avatar}
                        alt={blog?.author?.name}
                        // src="https://i.pravatar.cc/48?img=25"
                        title="user name"
                        className="max-w-full rounded-full"
                     />
                  </Link>
                  <div>
                     <h3 className="text-xl font-medium text-slate-700">
                        {blog?.title.split(" ").slice(0, 5).join(" ")}
                     </h3>
                     <p className="text-sm text-slate-400">
                        {" "}
                        By {blog?.author?.name.split(" ")[0]}{" "}
                        {new Date(blog?.createdAt).toLocaleDateString("en-US", {
                           year: "numeric",
                           month: "long",
                           day: "2-digit"
                           //  day: "numeric"
                        })}
                        {/* By Mary Jay, jun 3 2023 */}
                     </p>
                  </div>
               </header>
               <p>
                  {blog?.content.length > 200
                     ? blog?.content.slice(0, 200) + "..."
                     : blog?.content}
               </p>
            </div>
            {/*  <!-- Action base sized link button --> */}
            <div className="flex justify-end gap-2 p-2 pt-0">
               <button className="inline-flex h-10 items-center justify-center gap-2 justify-self-center whitespace-nowrap rounded px-5 text-sm font-medium tracking-wide text-emerald-500 transition duration-300 hover:bg-emerald-100 hover:text-emerald-600 focus:bg-emerald-200 focus:text-emerald-700 focus-visible:outline-none disabled:cursor-not-allowed disabled:text-emerald-300 disabled:shadow-none disabled:hover:bg-transparent">
                  {/* <span>Read more</span> */}
                  <Link href={`/blogs/${blog.slug}`}>Read more</Link>
               </button>
            </div>
         </div>
         {/*<!-- End Blog card with action button --> */}
      </>
   );
}
