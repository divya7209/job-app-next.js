import { Job } from "@/app/models/Application";
import connectToDB from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server";

/**
 * delete the quiz questions based on _id
 * @param request NextRequest
 * @param param1 params
 * @returns 
 */

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ jobId: string }> }

) {
    const { jobId } = await params;
    try {
        await connectToDB();
        const job = await Job.findByIdAndDelete(jobId)
        console.log('jobId ', jobId)

        if (!job) {
            return NextResponse.json({ success: false, message: "Quiz not found" });
        }
        return NextResponse.json({ success: true, message: "Quiz deleted successfully", data: job });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Server Error" },
            { status: 500 }
        );
    }
}