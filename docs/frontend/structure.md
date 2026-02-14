## Estrutura do Frontend

Pasta principal: `front/`

Arquivos e pastas principais

- `package.json` — dependências e scripts (`dev`, `build`, `preview`).
- `index.html` — ponto de entrada HTML da aplicação.
- `vite.config.ts` — configuração do Vite (inclui plugin React).
- `src/main.tsx` — entrada React: provedor do React Query e inicialização do tema (`window.toggleTheme`).
- `src/App.tsx` — estrutura global da aplicação e roteamento simples.
- `src/pages/Home.tsx` — página principal: formulário de busca, cabeçalho do perfil, filtros, QuickStats e o `Board`.
- `src/components/` — componentes de UI: `Header`, `Board`, `Column`, `Card`, `Filters`, `QuickStats`, `ReadmeModal`, `icons`.
- `src/hooks/` — hooks que encapsulam chamadas à API usando React Query (`useGitHubData`, `useStarredData`).
- `src/store/` — pequeno store com `zustand` quando necessário.
- `src/styles/index.css` — configurações do Tailwind + estilos personalizados (mica/glass) e variáveis de tema.
- `postcss.config.cjs`, `tailwind.config.cjs` — configuração do Tailwind/PostCSS.

Notas rápidas sobre os componentes

- `Header`: contém o botão de alternar tema e controles globais.
- `Home`: gerencia o estado da busca, aba ativa (`own` ou `starred`), filtros e o modal do README.
- `Board` → `Column` → `Card`: composição que monta o Kanban. Cada `Card` mostra informações resumidas do repositório e tem botão `README` para abrir o modal.
