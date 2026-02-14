// src/lib/cache.ts
// Um cache simples em memória usado para reduzir chamadas repetidas ao GitHub.
// Mantemos aqui uma instância de NodeCache configurada com um TTL razoável
// para dados do Kanban. Isso ajuda a melhorar a latência do backend e evita
// atingir limites de API em caso de muitos acessos simultâneos.
//
// Observações práticas:
// - `stdTTL` (em segundos): tempo padrão que cada item fica válido. Aqui usamos 600s (10 minutos).
// - `checkperiod`: frequência em segundos para varredura e limpeza de itens expirados.
//
// Em ambientes de produção com múltiplas instâncias, considere usar um cache
// compartilhado (ex: Redis) em vez do cache em memória local.
import NodeCache from 'node-cache';

export const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });