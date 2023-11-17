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
    summary: String,
    Content: String,
    coverImg: String,
    comProject: Boolean,
    fromData: Date,
    toDate: Date,
  },
  {
    timestamps: true,
  },
);

const Project = model("Project", projectSchema);

export default Project;