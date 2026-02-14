# Estrutura do backend

Visão simplificada da pasta `backend/src` do projeto:

- `server.ts` — ponto de entrada: configura e inicia o servidor HTTP.
- `lib/app.ts` — configura plugins e integra o Hapi/Express (ou framework usado).
- `lib/cache.ts` — cache em memória / wrapper de cache para reduzir chamadas externas.
- `providers/github.ts` — integração com a API do GitHub (leitura/escrita de dados do repositório).
- `routes/kanban-routes.ts` — define rotas relacionadas ao Kanban (endpoints REST).
- `schemas/kanban-schema.ts` — validação e modelos de payloads usados pelas rotas.
- `services/kanban-service.ts` — lógica de negócio para operações do Kanban.

Responsabilidades resumidas:

- Rotas: tradução HTTP → chamadas de serviço.
- Serviços: regras de negócio, orquestração entre providers e cache.
- Providers: abstraem APIs externas (GitHub).
- Cache: otimiza leituras frequentes.
