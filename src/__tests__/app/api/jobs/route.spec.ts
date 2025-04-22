/** @format */


import { GET } from "@/app/api/jobs/route";
import { Job } from "@/app/models/Application";
import connectToDB from "@/app/utils/db";
import { getServerSession } from "next-auth";

// Mock the dependencies
jest.mock("@/models/user");
jest.mock("@/lib/mongodb");
jest.mock("next-auth");
jest.mock("@/lib/authOptions", () => ({
    authOptions: {
        providers: [],
        callbacks: {},
    },
}));

// Mock NextResponse
jest.mock("next/server", () => ({
    NextResponse: {
        json: jest.fn((data, options) => ({
            json: () => Promise.resolve(data),
            status: options?.status || 200,
        })),
    },
}));

interface MockQuery {
    lean: jest.Mock;
}

describe("Portfolio API Route", () => {
    const mockUser = {
        email: "test@example.com",
        portfolio: {
            stocks: [
                { symbol: "AAPL", quantity: 10, averagePrice: 150 },
                { symbol: "GOOGL", quantity: 5, averagePrice: 2800 },
            ],
            totalValue: 15500,
        },
    };

    const mockSession = {
        user: {
            email: "test@example.com",
        },
    };

    beforeEach(() => {
        jest.clearAllMocks();
        (getServerSession as jest.Mock).mockResolvedValue(mockSession);
        (connectToDB as jest.Mock).mockResolvedValue(undefined);

        // Mock User.findOne with lean()
        const mockFindOne = jest.fn().mockReturnThis() as unknown as MockQuery;
        mockFindOne.lean = jest.fn().mockResolvedValue(mockUser);
        (Job.find as jest.Mock).mockReturnValue(mockFindOne);
    });

    it("should successfully fetch user portfolio", async () => {
        const response = await GET();
        expect(response.status).toBe(200);

        const responseData = await response.json();
        expect(responseData).toEqual({
            success: true,
            data: mockUser,
        });
    });
});

