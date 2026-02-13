import { github } from "../providers/github.js";
import { cache } from "../lib/cache.js";
import { differenceInDays } from "date-fns";
import { KanbanResponse } from "../schemas/kanban-schema.js";

/**
 * SERVIÇO PRINCIPAL
 * Responsável pela orquestração: Cache -> Busca GitHub -> Processamento -> Cache
 */
export async function getKanbanData(username: string): Promise<KanbanResponse> {
  const cacheKey = `kanban-${username}`;
  
  // 1. Tenta recuperar do Cache (evita chamadas desnecessárias ao GitHub)
  const cached = cache.get<KanbanResponse>(cacheKey);
  if (cached) return cached;

  // 2. Busca Perfil e Repositórios em paralelo (Performance)
  const [userRes, reposRes] = await Promise.all([
    github.rest.users.getByUsername({ username }),
    github.rest.repos.listForUser({ username, sort: 'updated', per_page: 100 })
  ]);

  // 3. Estrutura a resposta baseada no nosso Schema
  const result: KanbanResponse = {
    user: {
      name: userRes.data.name || null,
      avatar_url: userRes.data.avatar_url,
      bio: userRes.data.bio || null,
    },
    columns: organizeReposIntoColumns(reposRes.data)
  };

  // 4. Salva o resultado final no cache e retorna
  cache.set(cacheKey, result);
  return result;
}

/**
 * LÓGICA DE NEGÓCIO
 * Separa os repositórios brutos nas colunas do Kanban
 */
function organizeReposIntoColumns(repos: any[]) {
  const now = new Date();
  
  const columns = {
    active_labs: [] as any[],
    production_ready: [] as any[],
    legacy_library: [] as any[]
  };

  repos.forEach((repo) => {
    // Cálculo de maturidade (dias desde o último push)
    const lastUpdate = new Date(repo.pushed_at || repo.updated_at || now);
    const diffInDays = differenceInDays(now, lastUpdate);

    // Mapeia apenas o que o nosso card do frontend precisa
    const card = {
      id: repo.id,
      name: repo.name,
      description: repo.description || null,
      stars: repo.stargazers_count,
      url: repo.html_url,
      language: repo.language || null,
      is_fork: repo.fork
    };

    // Regras de Classificação
    const isRecentlyUpdated = diffInDays <= 30;
    const isPolished = repo.stargazers_count > 0 && !repo.fork;

    if (isPolished && !isRecentlyUpdated) {
      // 🏆 Production Ready: Estável, com estrelas e sem mexer agora
      columns.production_ready.push(card);
    } 
    else if (isRecentlyUpdated && !repo.archived) {
      // 🧪 Active Labs: Mexeu nos últimos 30 dias
      columns.active_labs.push(card);
    } 
    else {
      // 📚 Legacy / Library: Projetos antigos, arquivados ou sem atividade recente
      columns.legacy_library.push(card);
    }
  });

  return columns;
}