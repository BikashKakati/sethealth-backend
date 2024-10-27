import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "name is required"],
  },
  email: {
    type: String,
    unique: [true, "Email is already exist"],
    require: [true, "Email is required"],
  },
  password: {
    type: String,
    require: [true, "password is required"],
  },
  role: {
    type: String,
    require: [true, "role is required"],
  },
});

export const AdminUser = mongoose.model("adminUser", adminUserSchema);
