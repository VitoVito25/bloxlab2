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

## Audit — [DATA DO AUDIT]

### Prioridade 1 — [Descrição do problema]

`[caminho/arquivo.tsx]` — [descrição: ex: "mistura 3 roles + 4 queries + 25 componentes"]

**Plano de split:**

| Arquivo novo | Conteúdo | Tier | Status |
|---|---|---|---|
| `src/[pasta]/[arquivo].ts` | [o que vai para este arquivo] | 1 | ⬜ pendente |

### Divergências intencionais documentadas

- `[nome]` em `[arquivo]`: [motivo de manter separado]. **Não** unificar.

---

Ver também: [[separation-of-concerns]] | [[dry-refactoring]] | [[performace-audit-report]]
