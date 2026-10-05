import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;

  username: string;
  emailAddress: string;

  password?: string;

  googleId?: string;

  avatar?: string | null;

  isVerified: boolean;

  otp?: string;
  otpExpires?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 30,
    },

    emailAddress: {
      type: String,
      match: [
        /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
        "Please enter a valid email address",
      ],
      trim: true,
      unique: true,
      required: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: function (): boolean {
        return !this.googleId;
      },
      minLength: 6,
      select: false,
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    avatar: {
      type: String,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    otp: {
      type: String,
      select: false,
    },

    otpExpires: {
      type: Date,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
