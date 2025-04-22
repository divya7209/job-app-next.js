import nextJest from "next/jest";

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
    testEnvironment: "jest-environment-jsdom",
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
    testPathIgnorePatterns: ["/node_modules/", "/.next/"],
    collectCoverageFrom: [
        "src/**/*.{js,jsx,ts,tsx}",
        "!src/**/*.d.ts",
        "!src/**/index.ts",
        "!src/**/*.stories.{ts,tsx}",
        "!src/**/*.test.{ts,tsx}",
    ],
    coverageDirectory: "coverage",
    coverageReporters: ["text", "lcov", "html"],
    testMatch: [
        "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
        "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}",
    ],
    moduleDirectories: ["node_modules", "<rootDir>"],
};

export default createJestConfig(customJestConfig);