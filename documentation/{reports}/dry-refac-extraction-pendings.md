---
title: DRY — Pendências de Extração
date: 2026-05-30
tags:
  - reports
  - dry
  - refactoring
---

# Pendências de Extração

> Duplicações identificadas mas ainda não extraídas, aguardando aprovação do usuário.

---

## 2026-05-30

> [!note] Pendente — Alta prioridade
> **Bloco de paginação** (`Rows per page` + contagem + botões ChevronLeft/ChevronRight) — código idêntico em 3 arquivos:
> - `src/pages/SearchDocsPage.tsx:101-119`
> - `src/pages/ManageUsersPage.tsx:94-113`
> - `src/pages/AccessRequestsPage.tsx:55-73`
>
> Candidato a: `src/components/TablePagination.tsx` — props: `total`, `rowsPerPage`, `options`.
> Aguarda integração API (paginação real pode mudar a interface de props necessária).

> [!note] Pendente — Alta prioridade
> **Wrapper + cabeçalho de tabela** — estrutura de `<div className="overflow-hidden rounded-xl border ...">` + `<table>` + `<thead>` com row amber-400 — quase idêntico em:
> - `src/pages/SearchDocsPage.tsx:67-98`
> - `src/pages/ManageUsersPage.tsx:63-90`
> - `src/pages/AccessRequestsPage.tsx:24-52`
>
> Candidato a: `src/components/DataTable.tsx` — props genéricas: `columns`, `rows`, `renderRow`.
> Aguarda definição de interface de dados real (API).

> [!note] Pendente — Alta prioridade
> **Constante `INSTITUTIONS`** — idêntica em dois arquivos:
> - `src/pages/SearchDocsPage.tsx:12`
> - `src/pages/ManageUsersPage.tsx:13`
>
> Candidato a: `src/utils/constants.ts` ou `src/features/institutions/constants.ts`.
> Bloqueio: nenhum — pode extrair agora.

> [!note] Pendente — Média prioridade
> **Padrão password toggle** (`Input type=password/text` + botão Eye/EyeOff) — aparece em 3 arquivos:
> - `src/pages/LoginPage.tsx:64-81`
> - `src/pages/ProfilePage.tsx:76-92`
> - `src/features/auth/components/RegisterCard.tsx:107-125`
>
> Candidato a: `src/components/ui/password-input.tsx` — props: `value`, `onChange`, `name`, `autoComplete?`.
> Aguarda aprovação.

> [!note] Pendente — Média prioridade
> **Overlay de modal** (`fixed inset-0 bg-black/40 z-50 flex items-center justify-center` + Card wrapper + botão X) — padrão idêntico em:
> - `src/components/ui/alert-modal.tsx`
> - `src/components/ui/edit-access-modal.tsx`
> - `src/components/ui/view-user-modal.tsx`
>
> Candidato a: componente base `ModalShell` — props: `isOpen`, `onClose`, `children`, `maxWidth?`.
> Aguarda aprovação.

> [!note] Pendente — Baixa prioridade
> **Classe CSS de `<select>` básico** — string `"flex h-10 w-full rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-400"` repetida em:
> - `src/pages/SearchDocsPage.tsx:33`
> - `src/pages/ManageUsersPage.tsx:30`
> - `src/pages/ProfilePage.tsx:57`
>
> Candidato a: variante de `Input` para select, ou constante `SELECT_CLASS` em `src/lib/utils.ts`.
> Aguarda aprovação. Nota: `RegisterCard` usa variante diferente com `appearance-none` — ver [[dry-refac-intentionals-devergencies]].

> [!note] Pendente — Baixa prioridade
> **Header de página** — `<h1 className="text-3xl font-bold text-gray-900 text-center">` — presente em 7 das 8 páginas.
>
> Candidato a: `src/components/PageTitle.tsx` — props: `children`.
> Aguarda aprovação.

---

Ver também: [[dry-refactoring]] | [[dry-refac-intentionals-devergencies]] | [[dry-refac-duplications-solved]]
