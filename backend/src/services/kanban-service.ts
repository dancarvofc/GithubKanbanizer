import { github } from "../providers/github.js";
import { cache } from "../lib/cache.js";
import { differenceInDays } from "date-fns";
import { KanbanResponse } from "../schemas/kanban-schema.js";

/**
 * getKanbanData
 * ----------------
 * Função principal do serviço — responsável por entregar ao controlador
 * (rota) os dados já prontos no formato que o frontend espera.
 *
 * Passos claros e simples:
 * 1) Tenta recuperar do cache local (rápido, evita chamadas externas)
 * 2) Se não existir, busca perfil e lista de repositórios no GitHub em paralelo
 * 3) Constrói a resposta aplicando regras de negócio (organiza colunas)
 * 4) Armazena o resultado no cache e retorna
 */
export async function getKanbanData(username: string): Promise<KanbanResponse> {
  const cacheKey = `kanban-${username}`;
  
  // 1. Recupera do cache quando possível — melhora muito a experiência
  const cached = cache.get<KanbanResponse>(cacheKey);
  if (cached) return cached;

  // 2. Busca em paralelo: perfil do usuário e lista de repositórios.
  // Fazer em paralelo reduz latência porque ambas as chamadas são independentes.
  const [userRes, reposRes] = await Promise.all([
    github.rest.users.getByUsername({ username }),
    github.rest.repos.listForUser({ username, sort: 'updated', per_page: 100 })
  ]);

  // 3. Monta o objeto final conforme o `KanbanResponse` do schema.
  const result: KanbanResponse = {
    user: {
      name: userRes.data.name || null,
      avatar_url: userRes.data.avatar_url,
      bio: userRes.data.bio || null,
    },
    columns: organizeReposIntoColumns(reposRes.data)
  };

  // 4. Salva no cache para leituras subsequentes e retorna.
  cache.set(cacheKey, result);
  return result;
}


/**
 * organizeReposIntoColumns
 * ------------------------
 * Recebe os repositórios brutos do GitHub e transforma em três colunas
 * que compõem o Kanban. A ideia é simples e transparente para desenvolvedores:
 * - `active_labs`: projetos com atividade recente (ex.: últimos 30 dias)
 * - `production_ready`: projetos com estrelas, não-forks e estáveis
 * - `legacy_library`: projetos antigos, arquivados ou sem atividade
 *
 * A função também mapeia os campos para o formato compacto que o frontend usa
 * (id, nome, descrição, estrelas, url, linguagem, is_fork).
 */
function organizeReposIntoColumns(repos: any[]) {
  const now = new Date();
  
  const columns = {
    active_labs: [] as any[],
    production_ready: [] as any[],
    legacy_library: [] as any[]
  };

  repos.forEach((repo) => {
    // Determina quando foi a última atividade relevante (pushed_at ou updated_at)
    const lastUpdate = new Date(repo.pushed_at || repo.updated_at || now);
    const diffInDays = differenceInDays(now, lastUpdate);

    // Mapeia para o formato do card (apenas campos necessários)
    const card = {
      id: repo.id,
      name: repo.name,
      description: repo.description || null,
      stars: repo.stargazers_count,
      url: repo.html_url,
      language: repo.language || null,
      is_fork: repo.fork
    };

    // Regras simples de classificação (intencionais e fáceis de entender):
    // - `isRecentlyUpdated`: atividade nos últimos 30 dias
    // - `isPolished`: possui estrelas e não é um fork (sinal de qualidade)
    const isRecentlyUpdated = diffInDays <= 30;
    const isPolished = repo.stargazers_count > 0 && !repo.fork;

    if (isPolished && !isRecentlyUpdated) {
      // Projetos com prova social (estrelas) e estáveis.
      columns.production_ready.push(card);
    } 
    else if (isRecentlyUpdated && !repo.archived) {
      // Projetos com atividade recente (laboratórios ativos).
      columns.active_labs.push(card);
    } 
    else {
      // Resto: projetos antigos, arquivados ou sem muita interação recente.
      columns.legacy_library.push(card);
    }
  });

  return columns;
}