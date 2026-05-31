---
title: Dead Code Audit — Report
date: 2026-05-30
tags:
  - reports
  - dead-code
  - audit
---

# Resultado do Audit — 2026-05-30

## Dependências não utilizadas

| Pacote | Motivo | Risco de remoção |
|--------|--------|-----------------|
| `@playwright/test` | Nenhum arquivo de teste existe no projeto (`*.spec.ts`, `*.test.ts` — zero encontrados via glob) | Baixo |
| `autoprefixer` | Projeto usa Tailwind v4 via `@tailwindcss/vite` — plugin Vite substitui PostCSS pipeline. Nenhum `postcss.config.*` existe. | Baixo |
| `postcss` | Mesmo motivo acima. Não referenciado em nenhum arquivo. | Baixo |

> `tailwindcss` é mantido como peer dep do `@tailwindcss/vite` — não remover.

---

## Arquivos removidos em 2026-05-30

Nenhum arquivo removido nesta sessão. Aguardando aprovação do usuário.

---

## Debug logs ativos

| Arquivo | Linha | Tipo | Descrição |
|---------|-------|------|-----------|
| `src/pages/UploadDocPage.tsx` | 37 | `console.log` | `console.log('Enviando:', { docName, file })` — log de debug placeholder; deve ser removido junto com integração backend |

---

## Estado placeholder (mock-stage)

Estado de formulário que existe mas não é consumido por nenhuma lógica de filtragem ou submissão. Não é dead code estrito (usado como valor de input controlado), mas sem utilidade funcional até integração com API.

| Arquivo | State vars | Observação |
|---------|-----------|------------|
| `src/pages/SearchDocsPage.tsx` | `institution`, `docId`, `docName` | Controlam inputs mas não filtram `MOCK_DOCS` |
| `src/pages/ManageUsersPage.tsx` | `institution`, `role`, `username` | Controlam inputs mas não filtram `MOCK_USERS` |
| `src/pages/ProfilePage.tsx` | `name`, `institution`, `role`, `email`, `password` | Controlam inputs mas nenhum handler de submit existe ainda |

> Estes estados se tornam úteis com integração — não remover antes disso.

---

## Botões sem handler

| Arquivo | Elemento | Observação |
|---------|----------|-----------|
| `src/features/auth/components/RegisterCard.tsx` | Button "Enviar solicitação" | Sem `onClick` — aguarda integração |
| `src/pages/ProfilePage.tsx` | Button "Salvar novos Dados" | Sem `onClick` — aguarda integração |
| `src/pages/ProfilePage.tsx` | Button "Solicitar novo acesso" | Sem `onClick` |
| `src/pages/ProfilePage.tsx` | Button "Visualizar meus documentos" | Sem `onClick` |

---

## TODOs ativos no código

TODOs encontrados no código com contexto para retomar — consultar [[dead-code-todos]].

---

Ver também: [[dead-code-audit]] | [[dead-code-todos]] | [[dead-code-unused-modules]]
