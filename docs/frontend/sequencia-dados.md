# Sequência de dados (frontend)

1. Usuário digita um username e submete.
2. `Home` chama o hook `useKanban(username)` que usa React Query.
3. `useKanban` faz `fetch(${VITE_API_URL}/kanban/${username})`.
4. Backend responde com um objeto contendo `user` e `columns` (cada coluna é uma lista de cards compactos).
5. `Home` calcula `languages`, `stats` e aplica filtros (linguagem, showForks) para gerar `filteredColumns`.
6. `Board` renderiza `Column`s; cada `Column` mapeia para `Card`.
7. `Card` mostra `language`, `fork` tag, `stars` e botões `README` / `Open`.
8. Ao clicar `README`, `Home` abre `ReadmeModal` passando `owner` e `repo`.
9. `ReadmeModal` tenta `fetch(${VITE_API_URL}/readme?owner=...&repo=...)`.
   - Se OK: renderiza o texto com `react-markdown`.
   - Se falhar: tenta `https://raw.githubusercontent.com/{owner}/{repo}/{branch}/README.md` para branches comuns (HEAD, main, master).

Erros e fallback
- Se nenhuma fonte retorna README, o modal mostra mensagem amigável "README not found".
- Se o backend retorna erro por rate-limit, considere autenticar as chamadas no servidor (token GitHub).
