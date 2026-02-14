// providers/github.ts
// Pequena camada para criar uma instância do Octokit (cliente do GitHub).
// Mantemos essa inicialização centralizada para facilitar troca de implementação
// ou testes (mocks) no futuro.
import { Octokit } from "octokit";
import * as dotenv from "dotenv";

dotenv.config();

// A variável de ambiente `GH_TOKEN` deve conter um token com permissões
// adequadas para ler repositórios públicos/privados conforme necessário.
// Deixamos `undefined` quando não informada para permitir modos de execução
// mais restritos durante desenvolvimento local.
// Definimos o tipo explicitamente para o TypeScript ficar claro ao importar.
export const github: Octokit = new Octokit({
  auth: process.env.GH_TOKEN || undefined
});