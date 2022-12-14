import { Schema, model } from "mongoose";

interface IUser {
  name: string;
  email: string;
  avatar: string;
  password: string;
  confirmPassword?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
  password: { type: String, required: true },
  confirmPassword: { type: String, required: false },
});

export const User = model<IUser>("User", userSchema);
