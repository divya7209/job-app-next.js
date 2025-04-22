/**
 * @jest-environment node
 */


import { Job } from "@/app/models/Application";
import connectToDB from "@/app/utils/db";
import { NextResponse } from "next/server";

export const GET = async () => {
    await connectToDB();
    try {
        const jobs = await Job.find();
        return NextResponse.json({ success: true, message: 'User authenticated successfully', data: jobs }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to authenticate user', data: error }, { status: 500 });
    }
};