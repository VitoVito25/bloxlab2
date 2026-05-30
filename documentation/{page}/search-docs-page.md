---
title: Search Docs Page
date: 2026-05-30
tags:
  - page
  - documentos
aliases:
  - Pesquisar Documentos
  - SearchDocsPage
---

# Search Docs Page

## O que é
Tela de pesquisa de documentos publicados na blockchain. Exibida na rota `/pesquisar`. Permite filtrar documentos por instituição, id e nome, e visualizar os resultados em tabela com paginação.

## Para quem
Todos os usuários autenticados que precisam consultar documentos on-chain.

## Como funciona
Usuário preenche um ou mais filtros (Instituição, Id do documento, Nome do documento) e aciona "Pesquisar Documentos". Os resultados aparecem na tabela abaixo. Cada linha tem um ícone de lupa na coluna "Opções" para acesso ao detalhe do documento. Paginação no rodapé controla quantos itens são exibidos por página.

> [!info] Estado atual
> Dados são mockados (`MOCK_DOCS` estático em `src/pages/SearchDocsPage.tsx`). Integração com API REST do backend está pendente.

## Componentes principais

| Componente / Elemento | Caminho |
|----------------------|---------|
| `SearchDocsPage` | `src/pages/SearchDocsPage.tsx` |
| `Button` | `src/components/ui/button.tsx` |
| `Input` | `src/components/ui/input.tsx` |
| `AppLayout` | `src/components/AppLayout.tsx` |
| `Navbar` | `src/components/Navbar.tsx` |
| Ícones `Search`, `ChevronLeft`, `ChevronRight` | `lucide-react` |

## Fonte de dados
Futuramente: API REST do backend Go — endpoint de busca de documentos. Por ora: array `MOCK_DOCS` hardcoded com 3 registros de exemplo.

## Regras de negócio
Sem regras de negócio implementadas ainda. Filtros são controlados localmente com `useState`; nenhuma lógica de filtragem está ativa sobre os dados mock.

## Decisões técnicas
- **Sem componente Table shadcn/ui** — tabela construída com `<table>` nativo + Tailwind para manter consistência com o modelo base e evitar dependência desnecessária
- **Native `<select>` para Instituição** — sem `Select` do shadcn/ui porque não está instalado; estilizado com as mesmas classes do `Input` (`bg-gray-100 rounded-lg h-10`)
- **Filtros em grid 2 cols + full-width** — layout direto com `grid grid-cols-2 gap-4` fiel ao modelo base (`search-docs-base.png`)
- **Header da tabela amber** — `bg-amber-400 text-gray-900` para consistência visual com a navbar e botões do sistema
- **Alternância de linhas** — `bg-white` / `bg-gray-50` para legibilidade sem zebra-striping agressiva
- **Paginação com `Button` ghost icon** — reutiliza variante existente do `Button` (`variant="ghost" size="icon"`)

## Edge cases conhecidos
- Botões de paginação `<` e `>` estão `disabled` — sem lógica de página implementada ainda
- Filtros não filtram os dados mock — aguarda integração com API
- Navegar para `/pesquisar` sem autenticação não é bloqueado no frontend

## Relacionado
- [[navbar-component]] — AppLayout e Navbar lateral
- [[ui-components]] — Button e Input reutilizados
- [[main-page]] — tela anterior no fluxo pós-login
