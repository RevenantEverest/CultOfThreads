import type { Config } from 'jest';

const jestConfig: Config = {
    preset: "ts-jest",
    testEnvironment: "jest-environment-jsdom",
    testMatch: [
        "**/__tests__/**/?(*.)+(spec|test).ts?(x)" 
    ],
    transform: {
        "^.+\\.tsx?$": "ts-jest"
    },
    moduleNameMapper: {
        "^@@root/(.*)$": "<rootDir>/src/$1",
        "^@@assets/(.*)$": "<rootDir>/src/assets/$1",
        "^@@components/(.*)$": "<rootDir>/src/components/$1",
        "^@@containers/(.*)$": "<rootDir>/src/containers/$1",
        "^@@navigation/(.*)$": "<rootDir>/src/navigation/$1",
        "^@@pages/(.*)$": "<rootDir>/src/pages/$1",
        "^@@store/(.*)$": "<rootDir>/src/store/$1",
        "^@@types/(.*)$": "<rootDir>/src/types/$1",
        "^@@tests/support/(.*)$": "<rootDir>/src/__tests__/support/$1",

        /* Index specific aliases */
        "^@@constants": "<rootDir>/src/constants/index.ts",
        "^@@hooks": "<rootDir>/src/hooks/index.tsx",
        "^@@services": "<rootDir>/src/services/index.ts",
        "^@@themes": "<rootDir>/src/themes/index.ts",
        "^@@utils": "<rootDir>/src/utils/index.ts",
    },
    setupFiles: ["jest-canvas-mock"]
};

export default jestConfig;