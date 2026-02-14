// routes/kanban-routes.ts
// Define os endpoints relacionados ao Kanban. Cada rota:
// - valida os dados de entrada (params/body) via Zod
// - declara o schema de resposta para documentação OpenAPI
// - chama o serviço responsável pela lógica de negócio
import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { getKanbanData } from '../services/kanban-service.js';

// Importamos os schemas Zod que servem tanto para validação quanto para
// gerar a documentação automática (OpenAPI).
import { getKanbanParams, kanbanResponseSchema } from '../schemas/kanban-schema.js';

export async function kanbanRoutes(app: FastifyInstance) {
  // Criamos uma versão tipada do app para aproveitar a tipagem Zod nas rotas
  const typedApp = app.withTypeProvider<ZodTypeProvider>();

  // GET /kanban/:username
  // - `params` valida o :username
  // - `response` descreve o formato que o endpoint retorna (usado pelo Swagger)
  typedApp.get(
    '/kanban/:username',
    {
      schema: {
        tags: ['Kanban'],
        params: getKanbanParams,
        response: {
          200: kanbanResponseSchema,
        },
      },
    },
    async (request) => {
      const { username } = request.params;
      // Delegamos toda a lógica para o service. Aqui queremos apenas
      // orquestrar a requisição → resposta.
      return await getKanbanData(username);
    }
  );
}