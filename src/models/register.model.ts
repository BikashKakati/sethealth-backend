import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { boolean } from "zod";

const registeredUsers = new mongoose.Schema(
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
      select: false,
    },
    role: {
      type: String,
      enum:["patient","doctor","admin"],
      default:"patient"
    },
    status:{
      type:Boolean,
      default:true,
    }
  },
  { timestamps: true }
);

interface registerDocument extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: string;
  status:boolean;
  isModified: (path: string) => boolean;
}

registeredUsers.pre<registerDocument>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

export const RegisteredUsers = mongoose.model<registerDocument>(
  "registeredUsers",
  registeredUsers
);
