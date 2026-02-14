// server.ts
// Ponto de entrada do backend. Responsável por:
// - carregar variáveis de ambiente
// - inicializar a aplicação (registry de plugins/rotas)
// - iniciar o servidor HTTP
//
// O propósito deste arquivo é deliberadamente pequeno: manter a inicialização
// separada da lógica da aplicação para facilitar testes e leitura.
import * as dotenv from 'dotenv';
import { bootstrap } from './lib/app.js';

dotenv.config();

const port = Number(process.env.PORT) || 3001;

// Função que inicializa e sobe o servidor.
// Mantemos o try/catch aqui para garantir que erros de startup
// sejam reportados claramente e que o processo encerre em falha.
async function start() {
  const app = await bootstrap();

  try {
    await app.listen({ port, host: '0.0.0.0' });
    console.log(`🚀 GitHub Kanbanizer is On Fire!`);
    console.log(`📡 Server: http://localhost:${port}`);
    console.log(`📄 API Docs: http://localhost:${port}/docs`);
  } catch (err) {
    console.error('❌ Error starting server:', err);
    process.exit(1);
  }
}

start();