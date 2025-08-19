import { mongoose } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    fullName: { type: String },
    mobile: { type: String },
    password: { type: String },
    role: { type: String, enum: ["user", "admin"], required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const userModel = mongoose.model("users", userSchema);