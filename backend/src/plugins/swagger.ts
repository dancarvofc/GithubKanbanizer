// plugins/swagger.ts
// Configura a documentação OpenAPI (Swagger) para a API.
// Este módulo registra dois plugins:
// - `@fastify/swagger`: gera o documento OpenAPI a partir dos schemas do Fastify
// - `@fastify/swagger-ui`: serve a interface web em `/docs`
//
// Usamos `jsonSchemaTransform` para garantir que os schemas gerados a partir
// do `fastify-type-provider-zod` sejam corretamente expostos no OpenAPI.
import { FastifyInstance } from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { jsonSchemaTransform } from 'fastify-type-provider-zod';

export async function setupSwagger(app: FastifyInstance) {
  await app.register(swagger, {
    openapi: {
      info: {
        title: 'GitHub Kanbanizer API',
        description: 'API for organizing GitHub repositories into a Kanban view',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  });

  // A rota `/docs` expõe a interface do Swagger. Ideal para desenvolvedores
  // testarem e entenderem os endpoints sem precisar usar curl/postman.
  await app.register(swaggerUi, {
    routePrefix: '/docs',
  });
}