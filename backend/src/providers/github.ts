import { Octokit } from "octokit";
import * as dotenv from "dotenv";

dotenv.config();

// Definimos o tipo explicitamente para o TS não se perder nos links do pnpm
export const github: Octokit = new Octokit({
  auth: process.env.GH_TOKEN || undefined
});