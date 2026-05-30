import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

function getBasePath() {
  if (process.env.BASE_PATH) {
    return process.env.BASE_PATH;
  }

  if (process.env.GITHUB_ACTIONS === "true") {
    const repository = process.env.GITHUB_REPOSITORY;
    const repoName = repository?.split("/")?.[1];
    if (repoName) {
      return `/${repoName}/`;
    }
  }

  return "/";
}

export default defineConfig({
  plugins: [react()],
  base: getBasePath()
});
