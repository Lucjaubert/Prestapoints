const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: "w6iz9a",

  e2e: {
    baseUrl: "http://localhost:4200",
  },

  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.js",
  },
});
