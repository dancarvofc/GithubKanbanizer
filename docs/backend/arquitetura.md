# Arquitetura do backend 

O backend segue uma arquitetura modular e simples, pensada para separação de responsabilidades:

- Entrada (Server): recebe requisições HTTP e delega ao roteamento.
- Roteamento (Routes): converte chamadas HTTP em chamadas a serviços específicos.
- Serviços (Services): contêm lógica de negócio e coordenam providers e cache.
- Providers: componentes responsáveis por integrar APIs externas (por exemplo, GitHub).
- Cache: reduz latência e número de chamadas externas, mantendo dados temporários.

Por que essa organização?

- Facilita testes unitários: cada módulo tem responsabilidade única.
- Torna a manutenção mais simples: trocar o provider (ou o cache) impacta pouco o restante.
- Permite escalonar partes críticas (por exemplo, mover cache para Redis).

Exemplo curto de responsabilidades:

- `KanbanService`: valida, transforma e persiste dados via `GithubProvider`.
- `GithubProvider`: contém a lógica HTTP e mapeamento para os endpoints do GitHub.
