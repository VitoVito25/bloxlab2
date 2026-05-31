---
title: Separation of Concerns — Resultados de Audit — BloxLab Data Availability
date: 2026-05-30
tags:
  - report
  - architecture
  - audit
aliases:
  - soc-report
---

# Resultados do Audit — Separation of Concerns

> Resultados de cada execução do prompt de audit de [[separation-of-concerns]].

---

## Audit — 2026-05-30

### Componentes bem separados (referência)

| Arquivo | Padrão | Status |
|---------|--------|--------|
| `src/components/Navbar.tsx` | Puramente presentacional — recebe `userName` como prop, sem estado de negócio | ✅ |
| `src/components/AppLayout.tsx` | Container thin — lê sessão do contexto e passa para Navbar | ✅ |
| `src/features/auth/AuthContext.tsx` | Contexto + provider + hook `useAuth` — sem JSX de apresentação | ✅ |
| `src/features/auth/hooks/useLogin.ts` | Hook: fetch REST + call `login(ctx)` + estado `loading` — sem JSX | ✅ |
| `src/components/ui/alert-modal.tsx` | Presentacional puro — recebe props, renderiza modal | ✅ |
| `src/components/ui/edit-access-modal.tsx` | Estado mínimo de UI (`accessType`, `accessDays`) — sem chamada REST | ✅ |
| `src/components/ui/view-user-modal.tsx` | Estado mínimo de UI (`form`) — sem chamada REST | ✅ |

---

### Prioridade 1 — Pages monolíticas (container + presentacional fundidos)

Três páginas misturam: dados mock / estado de filtro / lógica de display / tabela / paginação — tudo em um componente único. Quando API for integrada, virarão arquivos de 200+ linhas difíceis de testar.

#### `src/pages/SearchDocsPage.tsx`

Estado de filtro + constantes mock + tabela de documentos + paginação = 124 linhas, tudo inline.

**Plano de split (pré-aprovação):**

| Arquivo proposto | Conteúdo | Tier | Status |
|---|---|---|---|
| `src/features/documents/hooks/useSearchDocs.ts` | fetch REST + estado de resultados + loading/error | 1 | ⬜ pendente |
| `src/features/documents/components/DocsTable.tsx` | tabela presentacional — recebe `docs[]` como prop | 1 | ⬜ pendente |
| `src/pages/SearchDocsPage.tsx` | apenas orquestração de filtros + hook + componente | 1 | ⬜ pendente |

#### `src/pages/ManageUsersPage.tsx`

Mesmo padrão — filtros + mock + tabela de usuários + paginação = 117 linhas.

**Plano de split (pré-aprovação):**

| Arquivo proposto | Conteúdo | Tier | Status |
|---|---|---|---|
| `src/features/users/hooks/useManageUsers.ts` | fetch REST + filtros aplicados + loading/error | 1 | ⬜ pendente |
| `src/features/users/components/UsersTable.tsx` | tabela presentacional — recebe `users[]` como prop | 1 | ⬜ pendente |
| `src/pages/ManageUsersPage.tsx` | apenas orquestração | 1 | ⬜ pendente |

#### `src/pages/AccessRequestsPage.tsx`

Mais simples (sem filtros), mas mesma mistura — mock + tabela + paginação = 77 linhas.

**Plano de split (pré-aprovação):**

| Arquivo proposto | Conteúdo | Tier | Status |
|---|---|---|---|
| `src/features/access/hooks/useAccessRequests.ts` | fetch REST + loading/error | 1 | ⬜ pendente |
| `src/features/access/components/RequestsTable.tsx` | tabela presentacional | 1 | ⬜ pendente |
| `src/pages/AccessRequestsPage.tsx` | apenas orquestração | 1 | ⬜ pendente |

---

### Prioridade 2 — Hooks de submissão faltando

Ações de usuário que precisarão de hook quando API for integrada.

| Arquivo | Ação | Hook necessário | Status |
|---------|------|----------------|--------|
| `src/features/auth/components/RegisterCard.tsx` | "Enviar solicitação" — sem onClick | `useRegister` em `src/features/auth/hooks/useRegister.ts` | ⬜ pendente |
| `src/pages/UploadDocPage.tsx` | `handleSubmit` faz `console.log` | `useUploadDoc` em `src/features/documents/hooks/useUploadDoc.ts` | ⬜ pendente |
| `src/pages/ProfilePage.tsx` | "Salvar novos Dados" — sem onClick | `useUpdateProfile` em `src/features/profile/hooks/useUpdateProfile.ts` | ⬜ pendente |

---

### Prioridade 3 — Componentes internos candidatos à extração

Componentes locais presentacionais definidos dentro do próprio arquivo de página. Funcionam bem no estado atual (mock), mas poderiam ser extraídos quando a feature crescer.

| Componente | Arquivo atual | Candidato a | Prioridade |
|-----------|--------------|------------|-----------|
| `MetricField` | `ImportantMetricsPage.tsx:8-14` | `src/features/metrics/components/MetricField.tsx` | Baixa |
| `InfoCard` | `ContractDataPage.tsx:6-15` | `src/features/contract/components/InfoCard.tsx` | Baixa |
| `FileIcon` | `UploadDocPage.tsx:12-16` | manter inline — pequeno demais para extrair | — |
| `Field` | `RegisterCard.tsx:136-143` | manter inline — usado apenas em RegisterCard | — |

---

### Divergências intencionais documentadas

- `MainPage.tsx` — atualmente é página de demo de modais (AlertModal, EditAccessModal, ViewUserModal). Intencionalmente monolítica por enquanto. Será reescrita com conteúdo real. **Não refatorar até definição de conteúdo real.**

---

Ver também: [[separation-of-concerns]] | [[dry-refactoring]] | [[performace-audit-report]]
