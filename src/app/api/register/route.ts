
import User from "@/app/models/User";
import connectToDB from "@/app/utils/db";
import { NextRequest, NextResponse } from "next/server"

/**
 * Register for new user
 * @param req NextRequest
 * @returns 
 */

export const POST = async (req: NextRequest, _res: NextResponse) => {
    await connectToDB();
    try {
        const data = await req.json();
        const newRegister = new User(data);
        const result = await newRegister.save()
        return NextResponse.json({ success: true, message: 'registered successfully', data: result })
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to register', data: error })
    }
}