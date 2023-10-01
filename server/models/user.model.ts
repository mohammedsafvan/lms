import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";

const emailRegexp: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export interface IUser extends Document {
  name: string;
  emai: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ courseId: string }>;
  comparePasswords: (password: string) => Promise<boolean>;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    emai: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (value: string) {
          return emailRegexp.test(value);
        },
        message: "Please enter a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [6, "Password must be atleast 6 characters"],
      select: false,
    },

    avatar: {
      public_id: String,
      url: String,
    },

    role: {
      type: String,
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    courses: [
      {
        courseId: String,
      },
    ],
  },
  { timestamps: true }
);

// Hashing Password
userSchema.pre<IUser>('save',async function(next){
  if(!this.isModified('password')){
    next();
  }
  this.password = await bcrypt.hash(this.password, 10)
  next()
})
