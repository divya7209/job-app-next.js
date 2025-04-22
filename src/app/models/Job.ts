import { Schema } from 'mongoose';
import { IJob } from '../constants/types';

type IuserDB = IJob & Document

export const JobSchema: Schema = new Schema<IuserDB>({
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    skills: { type: String },
    description: { type: String, required: true },
    location: { type: String, required: true },
    experience: { type: Number, required: true },
    salary: { type: String, required: true },
    employerId: { type: Schema.Types.ObjectId, ref: 'User' },
},
    { timestamps: true }
);

