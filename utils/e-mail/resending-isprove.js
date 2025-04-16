// "use server";

// import dbConnect from "@/config/db";
// import {
//    createProvingCode,
//    createProvingToken,
//    createProvingTokenExpires
// } from "@/lib/token-expires";
// import User from "@/models/User";

// export async function againIsProveLinks(email) {
//    try {
//       await dbConnect();

//       const provingToken = createProvingToken();
//       const provingTokenExpires = createProvingTokenExpires();
//       const provingCode = createProvingCode();

//       // const code = Math.floor(100000 + Math.random() * 900000).toString();
//       // const token = Math.random().toString(36).slice(2);
//       // const expiry = Date.now() + 10 * 60 * 1000; // 10 min

//       const user = await User.findOneAndUpdate(
//          { email },
//          {
//             email,
//             provingCode,
//             provingToken,
//             provingTokenExpires
//          },
//          { upsert: true, new: true }
//       );

//       // Simulate sending email
//       console.log(
//          `📨 Send to ${email}: Code = ${provingCode}, Token = ${provingToken}`
//       );

//       return { success: true, message: "Verification sent!" };
//    } catch (err) {
//       console.error("Resend error:", err);
//       return { success: false, error: "Something went wrong" };
//    }
// }
