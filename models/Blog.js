import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
         trim: true,
         minlength: [
            5,
            "Your title’s too short—make it at least 5 characters."
         ],
         maxlength: [120, "Titles over 120 characters are not allowed."]
      },
      content: {
         type: String,
         required: true,
         minlength: [
            100,
            "Let’s make it longer! Your content needs 100+ characters."
         ]
      },
      author: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
         required: true
      },
      tags: [String],
      published: {
         type: Boolean,
         default: false
      },
      thumbnail: {
         type: String,
         required: [true, "Submission incomplete: Thumbnail image is missing."],
         validate: {
            validator: function (v) {
               return /^(https?:\/\/).+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
            },
            message: (props) => `${props.value} is not a valid image URL`
         }
      },
      slug: {
         type: String,
         required: true,
         unique: true
      }
   },
   { timestamps: true }
);

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;
