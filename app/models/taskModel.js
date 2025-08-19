
import { mongoose } from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: {
      type: String,
    },
    description: { type: String },
    status: { type: String },
    priority: { type: String },

    dueDate: { type: Date, default: Date.now() },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const taskModel = mongoose.model("todoTasks", taskSchema);
