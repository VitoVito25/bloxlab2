---
title: Manage Users Page — Gerenciar Usuários
date: 2026-05-30
tags:
  - page
  - users
  - admin
aliases:
  - gerenciar-usuarios
  - manage-users
---

# Manage Users Page

**Rota:** `/usuarios`
**Arquivo:** `src/pages/ManageUsersPage.tsx`
**Layout:** `AppLayout` (Navbar lateral)

---

## O que faz

Tela de gerenciamento de usuários do sistema. Permite filtrar usuários por instituição, cargo e nome, exibindo resultados em tabela paginada.

---

## Estrutura

```
ManageUsersPage
├── Filtros
│   ├── Instituição (select — mock: UFPR, USP, UNICAMP, UFRJ, UFMG)
│   ├── Cargo (Input)
│   └── Nome do Usuario (Input full-width)
├── Botão "Pesquisar Usuarios"
├── Tabela (colunas: Instituição | Nome | Cargo | Acesso | Visualizar)
│   └── Linhas zebradas (bg-white / bg-gray-50)
└── Paginação (rows per page + 1–N of N + ChevronLeft/Right)
```

---

## Estado local

| State | Tipo | Propósito |
|-------|------|-----------|
| `institution` | `string` | Filtro instituição selecionada |
| `role` | `string` | Filtro cargo |
| `username` | `string` | Filtro nome do usuário |

---

## Mock data

`MOCK_USERS` — 3 entradas com campos: `institution`, `username`, `role`, `permission`.

> Integração real: substituir por hook `useUsers()` em `src/features/users/hooks/` quando API estiver disponível.

---

## Relacionado

- [[access-requests-page]] — mesma estrutura de tabela
- [[search-docs-page]] — padrão de página seguido
