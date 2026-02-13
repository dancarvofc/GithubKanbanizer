import { z } from 'zod';

// Schema para os parâmetros da URL (o que vem depois de /kanban/)
export const getKanbanParams = z.object({
  username: z.string().min(1),
});

const repoCardSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  stars: z.number(),
  url: z.string().url(),
  language: z.string().nullable(),
  is_fork: z.boolean(),
});

// O Schema que a rota usa para validar a resposta
export const kanbanResponseSchema = z.object({
  user: z.object({
    name: z.string().nullable(),
    avatar_url: z.string().url(),
    bio: z.string().nullable(),
  }),
  columns: z.object({
    active_labs: z.array(repoCardSchema),
    production_ready: z.array(repoCardSchema),
    legacy_library: z.array(repoCardSchema),
  })
});

// Isso cria um Tipo TypeScript real baseado no seu Zod Schema
export type KanbanResponse = z.infer<typeof kanbanResponseSchema>;