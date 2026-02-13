import fastify from 'fastify';
import cors from '@fastify/cors';
import { 
  ZodTypeProvider, 
  serializerCompiler, 
  validatorCompiler 
} from 'fastify-type-provider-zod';


import { kanbanRoutes } from '../routes/kanban-routes.js';
import { setupSwagger } from '../plugins/swagger.js';

const app = fastify().withTypeProvider<ZodTypeProvider>();

export async function bootstrap() {
  app.setValidatorCompiler(validatorCompiler);
  app.setSerializerCompiler(serializerCompiler);

  await app.register(cors, { origin: true });
  await setupSwagger(app);
  await app.register(kanbanRoutes);

  return app;
}