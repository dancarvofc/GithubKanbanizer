import { z } from 'zod';

// `getKanbanParams` valida o parâmetro `:username` presente na URL.
// Aqui garantimos que o cliente envie um username não-vazio.
export const getKanbanParams = z.object({
  username: z.string().min(1),
});

// `repoCardSchema` descreve o formato do cartão que o frontend espera.
// Mantemos apenas os campos necessários para a visualização Kanban.
const repoCardSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  stars: z.number(),
  url: z.string().url(),
  language: z.string().nullable(),
  is_fork: z.boolean(),
});

// `kanbanResponseSchema` é o formato completo retornado pela rota.
// - `user`: informações do perfil (nome, avatar, bio)
// - `columns`: três colunas com arrays de cards já mapeados
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

// Conveniência: cria um tipo TypeScript a partir do schema Zod.
// Útil para tipar funções e garantir consistência entre validação e código.
export type KanbanResponse = z.infer<typeof kanbanResponseSchema>;