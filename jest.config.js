export default {
  transform: {
    "^.+\\.(ts|tsx)$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css|svg)$": "<rootDir>/__mocks__/mock.js"
  }
};

// mock css and svg files when using Jest.
// https://jestjs.io/docs/configuration#modulenamemapper-objectstring-string--arraystring
