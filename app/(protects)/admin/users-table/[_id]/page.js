// "use client";

import { updateUserRole } from "@/app/actions/users-acts";

// import { useRouter } from "next/router";

export default async function Role_Page(props) {
   const params = await props.params;
   const searchParams = await props.searchParams;

   console.log("params", params);

   const userId = params._id.toString();
   const email = searchParams.email;

   console.log("userId", userId);
   console.log("email", email);
   //  const userId = params.id;
   //  const email = searchParams.email;
   //  const userId = await params.id;
   //  const email = await searchParams.email;
   //  const router = useRouter();

   const initialRole = "client";

   //  const onSubmit = async (e) => {
   //     e.preventDefault();
   //     //  setLoading(true);

   //     const formData = new FormData(e.target);
   //     const userData = Object.fromEntries(formData.entries());

   //     //  const userData = {
   //     //    name: e.target.name.value,
   //     //    company: e.target.company.value,
   //     //    email: e.target.email.value,
   //     //    isAccepted: e.target.isAccepted.value,
   //     //  };
   //     console.log(userData);

   //     //  if (!userData.name || !userData.email || !userData.password) {
   //     //     setLoading(false);
   //     //     return;
   //     //  }

   //     try {
   //        const response = await updateUserRole(formData);

   //        if (response?.error) {
   //           throw new Error(response.error);
   //        }

   //        //  router.push("/admin/users-table");
   //        console.log("User role updated successfully:", response);

   //        // setShowSuccess(true);
   //        // setTimeout(() => {
   //        //    router.push("/accounts/awaiting-confirmation");
   //        // }, 5000);
   //     } catch (err) {
   //        console.error(err);
   //        // setErrorMessage(err.message || "Something went wrong.");
   //     }
   //  };

   return (
      <>
         <p>Role Page</p>
         <div className="p-6">
            <h2 className="text-xl font-semibold">Update Role for {email}</h2>

            <form
               action={updateUserRole}
               //  onSubmit={onSubmit}
               className="mt-4 space-y-4"
            >
               <input type="hidden" name="userId" value={userId} />

               <div className="relative md:w-60">
                  <select
                     name="role"
                     required
                     defaultValue={initialRole}
                     className="peer h-10 w-full rounded border border-slate-300 bg-white px-4 text-sm text-slate-700 focus:border-emerald-500 outline-none"
                  >
                     <option value="" disabled>
                        Select role
                     </option>
                     <option value="admin">Admin</option>
                     <option value="moderator">Moderator</option>
                     <option value="client">Client</option>
                  </select>
               </div>

               <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
               >
                  Update Role
               </button>
            </form>
         </div>
      </>
   );
}
