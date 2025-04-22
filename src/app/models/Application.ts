import mongoose, { Schema, Document } from 'mongoose';
import { JobSchema } from './Job'; // Ensure Job model is imported
import { IJob } from '../constants/types';

interface IApplication extends Document {
    jobId: mongoose.Types.ObjectId;
    jobSeekerId: mongoose.Types.ObjectId;
    status: 'applied' | 'accepted' | 'rejected';
}

const ApplicationSchema: Schema = new Schema({
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    jobSeekerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, required: true },
}, { timestamps: true });

// for populate jobs data inside application
export const Job = mongoose?.models?.Job || mongoose.model<IJob>('Job', JobSchema);

const Application = mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);
export default Application;