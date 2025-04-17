import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         trim: true
      },
      email: {
         type: String,
         required: [true, "Email is required"],
         unique: true,
         trim: true,
         lowercase: true,
         match: [/\S+@\S+\.\S+/, "Invalid email format"]
      },
      password: {
         type: String,
         required: false,
         minlength: 6,
         select: false
      },
      role: {
         type: String,
         enum: ["admin", "moderator", "client"],
         default: "client"
      },
      avatar: {
         type: String,
         default: "https://i.pravatar.cc/40?img=7"
      },
      isProve: {
         type: Boolean,
         default: false
      },
      provingToken: {
         type: String,
         default: null
      },
      provingTokenExpires: {
         type: Date,
         default: null
      },
      provingCode: {
         type: String,
         default: null
      },
      resettingToken: {
         type: String,
         default: null
      },
      resettingTokenExpires: {
         type: Date,
         default: null
      },
      refreshingToken: {
         type: String,
         default: null
      },
      refreshingTokenExpires: {
         type: Date,
         default: null
      }
   },
   // automatic: createdAt & updatedAt
   { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
