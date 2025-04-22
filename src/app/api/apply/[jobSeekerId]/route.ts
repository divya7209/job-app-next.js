import Application from "@/app/models/Application";
import connectToDB from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * Fetch applied jobs based on jobSeekerId
 * @param request NextRequest
 * @param param1 params
 * @returns 
 */

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ jobSeekerId: string }> }
) {
    const { jobSeekerId } = await params;
    try {
        await connectToDB();
        // Populate the jobId field to include job details
        const applications = await Application.find({ jobSeekerId }).populate('jobId')
        console.log('applications', applications);
        return NextResponse.json({ success: true, message: "Applied jobs fetched successfully", data: applications }, { status: 200 });
    } catch (error) {
        console.log('error', error);
        return NextResponse.json(
            { success: false, error: "Server Error" },
            { status: 500 }
        );
    }
}