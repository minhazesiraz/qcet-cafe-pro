"use client";

import { getUsers } from "@/queries/users-qrs";
import { useEffect, useState } from "react";
import {
   Bar,
   BarChart,
   CartesianGrid,
   ResponsiveContainer,
   Tooltip,
   XAxis,
   YAxis
} from "recharts";

export default function RoleApp() {
   const [users, setUsers] = useState([]);

   useEffect(() => {
      const fetchUsers = async () => {
         const fetchedUsers = await getUsers();
         setUsers(fetchedUsers);
      };

      fetchUsers();
   }, []);

   // Count users by role
   const roleCounts = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
   }, {});

   // Convert to recharts format
   const chartData = Object.entries(roleCounts).map(([role, count]) => ({
      role,
      count
   }));

   return (
      <div className="w-full h-[300px]">
         <h2 className="text-xl font-semibold mb-4">Users by Role</h2>
         <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="role" />
               <YAxis allowDecimals={false} />
               <Tooltip />
               <Bar dataKey="count" fill="#8884d8" barSize={50} />
            </BarChart>
         </ResponsiveContainer>
      </div>
   );
}
