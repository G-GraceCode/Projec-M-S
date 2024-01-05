import mongoose from "mongoose";

const { Schema, model } = mongoose;

const projectSchema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    title: String,
    category: String,
    projectUrl: String,
    summary: String,
    content: String,
    coverImg: String,
    comProject: Boolean,
    fromDate: Date,
    toDate: Date,
  },
  {
    timestamps: true,
  },
);

projectSchema.index({ title: "text", category: "text" });

const Project = model("Project", projectSchema);

export default Project;
