import mongoose, { Document, ObjectId } from "mongoose";

export interface IUser {
    name: string;
    email: string;
    password: string;
    mobile: number;
    role: "admin" | "employer" | "job-seeker",
    createdAt?: Date;
    updatedAt?: Date;
}
export interface IJob {
    _id: unknown;
    updatedAt?: string | number | Date;
    jobId?: ObjectId;
    createdAt?: any;
    title: string;
    companyName: string;
    description: string;
    location: string;
    experience: number;
    salary: string;
    skills?: string;
    employerId?: mongoose.Schema.Types.ObjectId;
}
