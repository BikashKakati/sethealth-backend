import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminUserSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);

interface AdminUserDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: string;
  isModified: (path: string) => boolean;
}

adminUserSchema.pre<AdminUserDocument>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const AdminUser = mongoose.model<AdminUserDocument>(
  "adminUser",
  adminUserSchema
);
