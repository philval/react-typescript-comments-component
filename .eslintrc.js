module.exports = {
  env: {
    node: true,
    es6: true,
    jest: true
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/jsx-runtime"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "6",
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {},
  globals: {
    cy: true
  }
};

/*
copilot /explain

The module.exports statement is used to export the configuration object so that ESLint
can use it.

The env property is used to specify the environments your code is designed to run in.
Each environment brings with it a certain set of predefined global variables. In this
case, node: true means that the code is expected to run in a Node.js environment,
es6: true enables ES6 (ES2015) syntax, and jest: true indicates that the code will be
tested with Jest, a JavaScript testing framework.

The extends property is a list of configurations that this configuration extends.
These configurations can set a baseline of rules for ESLint to apply. Here, it extends
the recommended configurations for ESLint, React, and TypeScript, as well as the
react/jsx-runtime configuration.

The parser property is set to @typescript-eslint/parser, which means that ESLint will
use this parser to parse the TypeScript code.

The parserOptions property is an object that can contain any options that you want to
pass to the parser. Here, it's set to recognize ECMAScript 6 and JSX syntax, and to
treat the code as ECMAScript modules.

The plugins property is an array of the plugins that you want to use with ESLint.
Plugins often provide additional rules. Here, it's using the React and TypeScript ESLint
plugins.

The rules property is an object where you can override the rules specified in the
extended configurations or define your own. It's currently empty, which means no
additional rules are being defined or overridden.

Finally, the globals property is used to define global variables that are read-only.
In this case, cy: true is defining cy as a global variable, which is commonly used in
Cypress, an end-to-end testing framework.
*/
