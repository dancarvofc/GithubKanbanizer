// lib/app.ts
// Configuração central da aplicação: plugins, middlewares e rotas.
// Mantemos a criação do servidor (Fastify) aqui para centralizar
// configurações que afetam toda a aplicação.
import fastify from 'fastify';
import cors from '@fastify/cors';
import { 
  ZodTypeProvider, 
  serializerCompiler, 
  validatorCompiler 
} from 'fastify-type-provider-zod';


import { kanbanRoutes } from '../routes/kanban-routes.js';
import { setupSwagger } from '../plugins/swagger.js';

// Usamos Zod como provedor de tipos para ter validação/serialização
// consistente entre rotas e TypeScript.
const app = fastify().withTypeProvider<ZodTypeProvider>();

// bootstrap: método responsável por aplicar configurações e retornar
// a instância pronta do servidor. Separar isso permite testes mais
// simples (por exemplo, subir a app em memória para testes de integração).
export async function bootstrap() {
  // Compiladores do fastify-type-provider-zod — conectam Zod ao Fastify
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  // Habilita CORS de forma permissiva (ajuste em produção se necessário)
  await app.register(cors, { origin: true });

  // Registra a documentação Swagger/OpenAPI e as rotas do Kanban
  await setupSwagger(app);
  await app.register(kanbanRoutes);

  return app;
}