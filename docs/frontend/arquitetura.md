# Frontend Architecture

Overview

The frontend is a single-page React application built with Vite and TypeScript. Styling is implemented with Tailwind CSS and a small set of custom CSS utilities for the "mica/glass" aesthetic.

## Arquitetura do Frontend

Visão geral

A interface é uma aplicação React de página única (Vite + TypeScript). O estilo usa Tailwind CSS com algumas regras CSS próprias para obter o efeito "mica/glass".

Principais bibliotecas e responsabilidades

- **React + TypeScript** — construção dos componentes e tipagem segura.
- **Vite** — servidor de desenvolvimento rápido e empacotamento para produção.
- **Tailwind CSS** — utilitários para layout e design responsivo.
- **Framer Motion** — animações leves para cards e transições de layout.
- **@tanstack/react-query** — busca, cache e sincronização do estado vindo do backend.
- **Zustand** — pequeno store para estados de UI que precisem ser compartilhados (uso opcional).
- **react-markdown + remark-gfm** — renderização segura de Markdown para exibir READMEs.

Fluxo de dados (resumido)

1. O usuário digita um username e submete a busca.
2. O hook `useKanban` (React Query) solicita `GET /kanban/:username` ao backend.
3. O backend responde com `user` e `columns` (colunas: `active_labs`, `production_ready`, `legacy_library`) — cada item é um objeto de cartão com campos reduzidos (id, name, description, stars, url, language, is_fork).
4. O frontend recebe e armazena essa resposta no cache do React Query e renderiza o `Board` (composto por `Column` → `Card`).
5. Ao clicar em `README` em um `Card`, abre-se `ReadmeModal`; o modal pede o README ao backend e, se necessário, tenta o fallback em `raw.githubusercontent`.

Responsabilidade do estado

- **Estado do servidor** (repositórios, perfil): gerenciado por React Query e cacheado para reduzir chamadas externas.
- **Estado de interface** (aba ativa, filtros, linguagem selecionada, mostrar forks, modal aberto): mantido em `Home` e/ou em `Zustand` quando necessário compartilhar entre componentes.

Theming e tokens

- A troca de tema é feita alternando a classe `light` no elemento `html`.
- Tema escuro é o padrão. Variáveis de tema (por exemplo `--accent`) estão definidas em `src/styles/index.css`.

Melhorias recomendadas

- Persistir preferência de tema em `localStorage` para lembrar a escolha do usuário.
- Extrair o estado de `filters` para um pequeno store se vários componentes precisarem acessá-lo.
- Adicionar plugins de renderização Markdown (ex.: destaque de sintaxe) com cuidado e sempre sanitizar HTML se optar por renderizar HTML bruto.

Libraries & Roles
- React + TypeScript — UI and component model.
- Vite — dev server and bundler.
- Tailwind CSS — utility-first styling.
- Framer Motion — small animations for layout and card interactions.
- @tanstack/react-query — server state fetching and caching.
- Zustand — small client store for ephemeral UI state (if needed).
- react-markdown + remark-gfm — safe markdown rendering of README files.

Data flow

1. User types a GitHub username and submits.
2. `useKanban` (React Query hook) calls backend endpoint `/kanban/:username`.
3. Backend returns `columns` grouped as `active_labs`, `production_ready`, `legacy_library` with compact card objects.
4. Frontend stores this response in React Query cache and renders `Board` with `Column`/`Card`.
5. When the user clicks `README` on a `Card`, `ReadmeModal` attempts to fetch via backend `/readme?owner=&repo=`; if that fails it falls back to raw.githubusercontent URLs.

State responsibilities
- Server state (repos, profile) → React Query.
- UI state (active tab, filters, selected language, showForks, readme modal) → component state in `Home` (or Zustand if shared more broadly).

Theming

- Theme is toggled by adding/removing `light` class on the `html` element.
- Dark theme is default. CSS variables live in `src/styles/index.css` (e.g., `--accent`).

Extensibility suggestions
- Move per-user persisted preference (theme) to `localStorage` in `main.tsx`.
- Extract `filters` state into a small store if many components must read it.
- Add `react-markdown` rendering plugins (syntax highlighting, table support) carefully and sanitize raw HTML if enabled.
