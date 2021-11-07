module.exports = {
  moduleFileExtensions: [
    "js",
    "ts",
    "svelte"
  ],
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.svelte$": [
      "svelte-jester",
      {
        preprocess: true
      }
    ],
    "^.+\\.ts$": "ts-jest"
  },
};
