import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173/",
    chromeWebSecurity: false,
    supportFile: false,
    video: true
  }
});
