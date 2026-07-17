import nextJest from "next/jest.js";
import dotenv from "dotenv";

const createJestConfig = nextJest({
  dir: ".",
});

dotenv.config({ path: ".env.development" });

const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimeout: 60000,
});

export default jestConfig;
