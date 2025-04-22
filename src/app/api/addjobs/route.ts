

import { Job } from "@/app/models/Application";
import connectToDB from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server";
/**
 *
 * @param req : NextRequest
 * @param res:  NextResponse
 * @returns
 */

export const POST = async (req: NextRequest, res: NextResponse) => {
    await connectToDB();
    try {
        const jobs = await req.json();

        // converting id to normal string to objectId
        // { ...jobs, employerId: new mongoose.Types.ObjectId(jobs?.employerId) }
        const newJobs = new Job(jobs);
        const result = await newJobs.save()
        return NextResponse.json({ success: true, message: 'User authenticated successfully', data: result }, { status: 200 });
    } catch (error) {
        console.log('error', error)
        return NextResponse.json({ success: false, message: 'Failed to authenticate user', data: error }, { status: 500 });
    }
};