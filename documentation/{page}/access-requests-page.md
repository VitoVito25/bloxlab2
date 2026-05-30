---
title: Access Requests Page — Solicitações de Acesso
date: 2026-05-30
tags:
  - page
  - users
  - admin
  - access
aliases:
  - solicitacoes-acesso
  - access-requests
---

# Access Requests Page

**Rota:** `/solicitacoes`
**Arquivo:** `src/pages/AccessRequestsPage.tsx`
**Layout:** `AppLayout` (Navbar lateral)

---

## O que faz

Tela de aprovação de solicitações de acesso ao sistema. Lista usuários que solicitaram acesso, sem filtros de texto — apenas botão de busca e tabela paginada.

---

## Estrutura

```
AccessRequestsPage
├── Botão "Pesquisar Usuarios"
├── Tabela (colunas: Instituição | Nome | Cargo | Acesso | Visualizar)
│   └── Linhas zebradas (bg-white / bg-gray-50)
└── Paginação (rows per page + 1–N of N + ChevronLeft/Right)
```

---

## Mock data

`MOCK_REQUESTS` — 4 entradas com campos: `institution`, `username`, `role`, `permission`.

> Integração real: substituir por hook `useAccessRequests()` em `src/features/users/hooks/` quando API estiver disponível.

---

## Relacionado

- [[manage-users-page]] — mesma estrutura de tabela, com filtros adicionais
- [[search-docs-page]] — padrão de página seguido
