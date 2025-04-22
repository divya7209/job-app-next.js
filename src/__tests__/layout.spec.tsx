import RootLayout from "@/app/layout";
import { render } from "@testing-library/react";

// Mock the next/router useRouter function
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe("Given RootLayout", () => {
    it("should render RootLayout", () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve({ success: true }),
            })
        ) as jest.Mock;
        render(
            <RootLayout>
                <div>Test Child</div>
            </RootLayout>
        );
    });
});
