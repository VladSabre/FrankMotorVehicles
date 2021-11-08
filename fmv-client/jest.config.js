/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFiles: ["<rootDir>/test/setEnvVars.js"],
    moduleNameMapper: {
        "^.+\\.(css|less|scss)$": "identity-obj-proxy"
    }
};