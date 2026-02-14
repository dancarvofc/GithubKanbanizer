# Sequência de dados — fluxo típico

Abaixo um exemplo simples do fluxo quando um cliente cria um cartão Kanban:

1. Cliente envia `POST /kanban/cards` com os dados do cartão.
2. `server.ts` recebe a requisição e passa para `kanban-routes`.
3. `kanban-routes` valida o payload usando `kanban-schema` e chama `KanbanService`.
4. `KanbanService` aplica regras de negócio e consulta `Cache` para dados relacionados.
   - Se necessário, chama `GithubProvider` para persistir/ler dados no GitHub.
5. `GithubProvider` executa a chamada HTTP ao GitHub e retorna o resultado.
6. `KanbanService` atualiza o `Cache` com o novo estado e retorna a resposta ao roteador.
7. `kanban-routes` formata a resposta HTTP e o servidor responde ao cliente.

Este fluxo está modelado em um diagrama de sequência em `mermaid/sequence-kanban.mmd`.
