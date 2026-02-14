## Frontend — GitHub Kanbanizer

Este diretório documenta a aplicação frontend (React + Vite + Tailwind) do projeto GitHub Kanbanizer.

O que há aqui

- `structure.md` — visão dos arquivos e pastas mais importantes, com onde procurar cada funcionalidade.
- `arquitetura.md` — arquitetura geral, bibliotecas principais e fluxo de dados entre componentes e API.
- `sequencia-dados.md` — sequência de execução (buscar usuário → montar Kanban → abrir README).
- `mermaid/` — diagramas em formato Mermaid (diagrama de componentes e sequência).

Começando (desenvolvimento)

1. No terminal, vá para a pasta do projeto.
2. Instale dependências e inicie o servidor de desenvolvimento:

```bash
cd front
pnpm install
pnpm dev
```

Observações rápidas

- A aplicação frontend chama a API do backend definida em `VITE_API_URL` (padrão `http://localhost:3001`).
- A renderização de README usa `react-markdown` + `remark-gfm`. O modal tenta primeiro a rota do backend e, se necessário, recorre ao `raw.githubusercontent`.
- O tema fica escuro por padrão; o botão de tema alterna a classe `light` em `html`.

Se quiser gerar PDF a partir destas páginas, use uma ferramenta de conversão Markdown → PDF.
