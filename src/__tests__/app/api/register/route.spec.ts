
import { POST } from "@/app/api/addjobs/route";
import { Job } from "@/app/models/Application";
import { NextRequest, NextResponse } from "next/server";

jest.mock("@/app/models/User"); // Correctly mock the History module
const data = [
  {
    _id: {
      $oid: "67d2c0cd809a5b6449d4a02b"
    },
    title: "Product Manager",
    companyName: "Innovatech",
    description: "Lead product development teams and manage product lifecycle.",
    location: "Pune",
    experience: 5,
    salary: "15 LPA",
    employerId: "605c72ef2f799e1a8c8b4568",
    createdAt: "2025-03-12T09:00:00Z",
    updatedAt: "2025-03-12T09:00:00Z",
    skills: "leadership"
  }
]

describe("When History runs", () => {
  let req: Partial<NextRequest>;
  let res: Partial<NextResponse>;



  beforeEach(() => {
    req = {};
    res = {};
  });

  it("should return success response with data", async () => {
    // Ensure History.find is treated as a mock function
    (Job.find as jest.Mock).mockResolvedValue(data);

    const response = await POST(req as NextRequest, res as NextResponse);
    const jsonResponse = await response.json();

  });
});