import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const config: Config = {
  clearMocks: true,
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  setupFilesAfterEnv: ["<rootDir>/src/helpers/singleton.ts"],
  transform: {
    "^.+\\.(ts|tsx)?$": ["ts-jest", { useESM: true }],
  },
};

export default createJestConfig(config);
