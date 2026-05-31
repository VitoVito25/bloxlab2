---
title: Dead Code — Componentes e Módulos Não Utilizados
date: 2026-05-30
tags:
  - reports
  - dead-code
  - audit
aliases:
  - unused-modules
---

# Componentes e Módulos Nunca Utilizados

Exportados que não aparecem em nenhum `import` ativo no projeto.

> [!warning] Cuidado com falsos positivos
> Ferramentas de análise de imports podem reportar falsos positivos em:
> - Componentes de UI scaffolded reservados para uso futuro
> - Arquivos que são importados dinamicamente
> - Entry points que não aparecem em imports mas são usados pelo bundler

---

## Falsos positivos conhecidos

| Arquivo | Motivo do falso positivo |
|---------|--------------------------|
| — | Nenhum identificado nesta sessão |

---

## Módulos confirmados como dead code

| Arquivo | Exporta | Risco de remoção | Status |
|---------|---------|-----------------|--------|
| — | Nenhum módulo inteiramente morto identificado | — | — |

> Todos os componentes e hooks encontrados são importados e utilizados em pelo menos um lugar ativo. Ver [[dead-code-audit-report]] para dependências npm não utilizadas.

---

## Observações

- `MetricField` (`ImportantMetricsPage.tsx`), `InfoCard` (`ContractDataPage.tsx`), `FileIcon` (`UploadDocPage.tsx`), `Field` (`RegisterCard.tsx`) — componentes locais não exportados, usados dentro do próprio arquivo. Não são dead code.
- `TAuthSession` (`AuthContext.tsx`) — interface local não exportada, usada internamente. Não é dead code.
- `TExecuteResult`, `TUseLoginResult` (`useLogin.ts`) — interfaces locais usadas no arquivo. Não são dead code.

---

Ver também: [[dead-code-audit]] | [[dead-code-audit-report]] | [[dead-code-todos]]
