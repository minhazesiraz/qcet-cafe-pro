"use client";

import { getUsers } from "@/queries/users-qrs";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart } from "recharts";

export default function Role_Comps() {
   const [users, setUsers] = useState([]);
   const [isClient, setIsClient] = useState(false);

   useEffect(() => {
      setIsClient(true);
   }, []);

   useEffect(() => {
      const fetchUsers = async () => {
         const users = await getUsers();
         console.log(users);
         setUsers(users);
      };

      fetchUsers();
   }, []);

   const roleCounts = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
   }, {});

   const data = Object.entries(roleCounts).map(([role, count]) => ({
      name: role,
      value: count
   }));

   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
   const RADIAN = Math.PI / 180;

   const renderCustomizedLabel = ({
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      percent
   }) => {
      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy + radius * Math.sin(-midAngle * RADIAN);

      return (
         <text
            x={x}
            y={y}
            fill="white"
            textAnchor={x > cx ? "start" : "end"}
            dominantBaseline="central"
         >
            {`${(percent * 100).toFixed(0)}%`}
         </text>
      );
   };

   return (
      <div>
         <h2 className="text-xl font-semibold mb-4">
            User Distribution by Role
         </h2>
         {isClient && (
            <PieChart width={400} height={400}>
               <Pie
                  data={data}
                  cx={200}
                  cy={200}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
               >
                  {data.map((entry, index) => (
                     <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                     />
                  ))}
               </Pie>
            </PieChart>
         )}
      </div>
   );
}
