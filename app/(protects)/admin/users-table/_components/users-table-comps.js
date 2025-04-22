import { getUsers } from "@/queries/users-qrs";
import Link from "next/link";

export default async function UsersTable_Comps() {
   const users = await getUsers();
   console.log(users);

   return (
      <>
         <p>Lorem ipsum dolor sit amet.</p>
         {users.length > 0 ? (
            <div className="w-full overflow-x-auto">
               <table
                  className="w-full text-left border border-collapse rounded sm:border-separate border-slate-200"
                  cellSpacing="0"
               >
                  <tbody>
                     <tr>
                        <th
                           scope="col"
                           className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                        >
                           Name
                        </th>
                        <th
                           scope="col"
                           className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                        >
                           Email
                        </th>
                        <th
                           scope="col"
                           className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                        >
                           Company
                        </th>
                        <th
                           scope="col"
                           className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                        >
                           Role
                        </th>
                        <th
                           scope="col"
                           className="h-12 px-6 text-sm font-medium border-l first:border-l-0 stroke-slate-700 text-slate-700 bg-slate-100"
                        >
                           createdAt
                        </th>
                     </tr>
                     {users.map((user) => (
                        <tr key={user._id}>
                           <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                              <Link
                                 href={`/admin/users-table/${user._id}?email=${user.email}`}
                              >
                                 {user.name}
                              </Link>
                           </td>
                           <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                              {user.email}
                           </td>
                           <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                              Carroll Group
                           </td>
                           <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                              {user.role.charAt(0).toUpperCase() +
                                 user.role.slice(1)}
                           </td>
                           <td className="h-12 px-6 text-sm transition duration-300 border-t border-l first:border-l-0 border-slate-200 stroke-slate-500 text-slate-500 ">
                              {new Date(user.createdAt).toLocaleDateString(
                                 "en-US",
                                 {
                                    year: "numeric",
                                    month: "2-digit",
                                    day: "2-digit"
                                 }
                              )}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         ) : (
            <p>No users found.</p>
         )}
      </>
   );
}
