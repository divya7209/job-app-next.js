import bcrypt from "bcryptjs";
import mongoose, { Document } from "mongoose";
import { IUser } from "../constants/types";

export interface IUserDB extends IUser, Document {

}
const UserSchema = new mongoose.Schema<IUserDB>({
    name: String,
    email: String,
    password: String,
    mobile: Number,
    role: { type: String, enum: ['admin', 'employer', 'job-seeker'] },
},
    { timestamps: true }
);

// this will work only with registeration
UserSchema.pre("save", async function (next) { // before save method getting call password will change to hash and call next method go for saving
    if (!this.isModified("password")) return next(); // password is not modified
    this.password = await bcrypt.hash(this.password, 10); // salt no. define how complex the password will be
    next();// when password changed and hashing done then it will go next line
});

const User = mongoose?.models?.User || mongoose.model<IUserDB>("User", UserSchema);
export default User;
