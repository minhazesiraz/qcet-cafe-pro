"use client";

import { newPost } from "@/app/actions/blogs-acts";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Create_formData() {
   const [preview, setPreview] = useState(null);
   const [thumbnailUrl, setThumbnailUrl] = useState(null);
   const [submitting, setSubmitting] = useState(false);
   const fileInputRef = useRef(null);
   const router = useRouter();

   const onChange = (e) => {
      const file = e.target.files[0];

      if (!file) {
         setPreview(null);
         return;
      } else {
         setPreview(URL.createObjectURL(file));
      }
   };

   const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
   };

   const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();

      const file = e.dataTransfer.files[0];

      if (file) {
         setPreview(URL.createObjectURL(file));
         const dataTransfer = new DataTransfer();
         dataTransfer.items.add(file);
         fileInputRef.current.files = dataTransfer.files;
      }
   };

   const onSubmit = async (e) => {
      e.preventDefault();
      // e.stopPropagation();

      const formData = new FormData(e.target);
      // console.log("onSubmit", formData);

      const file = formData.get("file-upload");

      if (!file) {
         alert("You haven’t selected a file.");
         return;
      }

      setSubmitting(true);
      const uploadFormData = new FormData();
      uploadFormData.append("image", file);

      try {
         const res = await fetch(
            `https://api.imgbb.com/1/upload?key=b4be52e3484e4c7ce2d5b349647b4c69`,
            {
               method: "POST",
               body: uploadFormData
            }
         );

         const data = await res.json();
         //  console.log("Upload Response:", data.data);
         if (!data?.success) {
            throw new Error("Upload failed. Please try again.");
            return;
         }

         const url = data?.data?.url;
         setThumbnailUrl(url);
         console.log("Thumbnail URL set:", url);
         formData.append("thumbnail", url);

         await newPost(formData);
         alert("Post created successfully!");
         setSubmitting(false);
         router.push("/blogs");
      } catch (error) {
         console.error("Error uploading file:", error);
         alert("Error: Could not create post. Please try again.");
      }
   };

   return (
      <>
         <div className="max-w-6xl mx-auto py-12 px-4">
            <form onSubmit={onSubmit} className="space-y-6">
               <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center rounded text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
               >
                  {submitting ? (
                     "Publishing..."
                  ) : (
                     <>
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           aria-label="Post icon"
                           role="graphics-symbol"
                           fill="none"
                           viewBox="0 0 60 60"
                           strokeWidth="1.5"
                           stroke="currentColor"
                           className="h-5 w-5"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="white"
                              d="M1080,270a30,30,0,1,1,30-30A30,30,0,0,1,1080,270Zm14-34h-10V226a4,4,0,0,0-8,0v10h-10a4,4,0,0,0,0,8h10v10a4,4,0,0,0,8,0V244h10A4,4,0,0,0,1094,236Z"
                              transform="translate(-1050 -210)"
                           />
                        </svg>
                        <span className="ml-2">Publish</span>
                     </>
                  )}
               </button>

               <div className="relative my-6">
                  <input
                     id="title"
                     type="text"
                     name="title"
                     placeholder="your name"
                     className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />
                  <label
                     htmlFor="title"
                     className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-gray-900 before:rounded-sm before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                  >
                     Your name
                  </label>
               </div>

               <div className="relative">
                  <textarea
                     id="content"
                     type="text"
                     name="content"
                     rows="6"
                     placeholder="Write your message"
                     className="peer relative w-full rounded border border-slate-200 p-4 text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  ></textarea>
                  <label
                     htmlFor="content"
                     className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-gray-900 before:rounded-sm before:transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                  >
                     Write your message
                  </label>
               </div>

               <div className="relative my-6">
                  <input
                     ref={fileInputRef}
                     id="thumbnail"
                     name="file-upload"
                     type="file"
                     className="peer hidden"
                     accept=".gif,.jpg,.png,.jpeg"
                     onChange={onChange}
                  />

                  <label
                     htmlFor="thumbnail"
                     className="relative flex cursor-pointer flex-col items-center justify-center gap-4 rounded border border-slate-300 px-6 py-10 text-center h-64 w-full overflow-hidden"
                     onDrag={handleDrag}
                     onDrop={handleDrop}
                  >
                     {preview ? (
                        <img
                           src={preview}
                           alt="Preview"
                           className="absolute inset-0 h-full w-full object-cover rounded"
                        />
                     ) : (
                        <>
                           <span className="inline-flex h-12 items-center justify-center self-center rounded bg-slate-100/70 px-3 text-slate-400">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 aria-label="File input icon"
                                 role="graphics-symbol"
                                 fill="none"
                                 viewBox="0 0 24 24"
                                 strokeWidth="1.5"
                                 stroke="currentColor"
                                 className="h-6 w-6"
                              >
                                 <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                 />
                              </svg>
                           </span>
                           <p className="flex flex-col items-center justify-center gap-1 text-sm">
                              <span className="text-emerald-500 hover:text-emerald-500">
                                 Upload media
                                 <span className="text-slate-500">
                                    {" "}
                                    or drag and drop{" "}
                                 </span>
                              </span>
                              <span className="text-slate-600">
                                 PNG, JPG or GIF up to 10MB
                              </span>
                           </p>
                        </>
                     )}
                  </label>
               </div>

               <div className="relative my-6">
                  <input
                     id="tags"
                     type="text"
                     name="tags"
                     placeholder="your name"
                     className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-emerald-500 focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                  />
                  <label
                     htmlFor="tags"
                     className="absolute left-2 -top-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-gray-900 before:rounded-sm before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-emerald-500 peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                  >
                     Tags
                  </label>
                  <small className="absolute flex w-full justify-between px-4 py-1 text-xs text-slate-400 transition peer-invalid:text-pink-500">
                     <span>
                        Enter <span className="text-red-600">tags</span>,
                        separated by commas
                     </span>
                     <span className="text-slate-500">1/10</span>
                  </small>
               </div>
            </form>
         </div>
      </>
   );
}
