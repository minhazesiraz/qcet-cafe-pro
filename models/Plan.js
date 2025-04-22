import mongoose from "mongoose";

const planSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      trim: true
   },
   author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false
   },
   price: {
      type: Number,
      required: true
   }
});

const Plan = mongoose.models.Plan || mongoose.model("Plan", planSchema);

export default Plan;
