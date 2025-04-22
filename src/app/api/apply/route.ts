import Application from "@/app/models/Application";
import connectToDB from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server";
/**
 * @param req : NextRequest
 * @param res:  NextResponse
 * @returns
 */

export const POST = async (req: NextRequest, res: NextResponse) => {
    await connectToDB();
    try {
        // It extracts jobId and jobSeekerId from the request body.
        const { jobId, jobSeekerId } = await req.json();
        // Create a new application
        const application = await Application.create({
            jobId,
            jobSeekerId,
            status: 'applied',
            //   appliedAt: new Date(),
        });
        return NextResponse.json({ success: true, message: 'User authenticated successfully', data: application }, { status: 200 });
    } catch (error) {
        console.log('error', error)
        return NextResponse.json({ success: false, message: 'Failed to authenticate user', data: error }, { status: 500 });
    }
};