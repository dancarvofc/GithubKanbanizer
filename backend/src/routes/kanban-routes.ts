import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { getKanbanData } from '../services/kanban-service.js';

// 1. Ajuste o nome aqui para bater com o que está no arquivo de schema
import { getKanbanParams, kanbanResponseSchema } from '../schemas/kanban-schema.js';

export async function kanbanRoutes(app: FastifyInstance) {
  const typedApp = app.withTypeProvider<ZodTypeProvider>();

  typedApp.get(
    '/kanban/:username',
    {
      schema: {
        tags: ['Kanban'],
        params: getKanbanParams,
        response: {
          // 2. Ajuste aqui também!
          200: kanbanResponseSchema,
        },
      },
    },
    async (request) => {
      const { username } = request.params;
      return await getKanbanData(username);
    }
  );
}