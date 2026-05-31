---
title: Performance Audit — Resultados de Audit — BloxLab Data Availability
date: 2026-05-30
tags:
  - report
  - performance
  - audit
aliases:
  - perf-audit-report
  - performance-audit-report
---

# Resultados do Audit — Performance

> Resultados de cada execução do prompt de audit de [[performance-audit]].

---

## Audit — 2026-05-30

> Status: 🔴 crítico | 🟡 moderado | 🟢 baixa prioridade | ✅ sem problema

---

### ✅ Componentes auxiliares — sem re-criação por render

Todos os componentes helpers são declarados em nível de módulo (fora do render do componente pai) — React os trata como componentes estáveis.

| Componente | Arquivo | Posição |
|-----------|---------|---------|
| `MetricField` | `ImportantMetricsPage.tsx:8` | módulo — ✅ |
| `InfoCard` | `ContractDataPage.tsx:6` | módulo — ✅ |
| `FileIcon` | `UploadDocPage.tsx:12` | módulo — ✅ |
| `Field` | `RegisterCard.tsx:136` | módulo (após export default) — ✅ |

---

### ✅ Chamadas REST — sem redundância

Único fetch real é `useLogin` em `src/features/auth/hooks/useLogin.ts` — chamado on-demand via `execute()`, não em re-renders. Todas as outras páginas usam mock data.

---

### ✅ Cálculos pesados — sem problema atual

Nenhum `filter`, `sort` ou `reduce` rodando em re-renders. `formatFileSize` em `UploadDocPage.tsx:6-9` é chamada apenas dentro do render com `file` presente — custo desprezível.

---

### ✅ Listas — virtualização não necessária

Listas de mock têm 3-4 itens. Virtualização (ex: `react-window`) não se justifica no estado atual.

---

### 🟡 Handlers inline — recriados a cada render

Handlers `onChange` definidos inline como arrow functions são recriados a cada render do componente pai. Impacto atual é baixo (sem filhos memoizados abaixo), mas pode crescer com integração de API.

| Arquivo | Handlers inline | Impacto atual |
|---------|----------------|--------------|
| `src/pages/ProfilePage.tsx` | 5 campos com `onChange={(e) => setState(e.target.value)}` | Baixo — sem filhos memoizados |
| `src/pages/SearchDocsPage.tsx` | 3 handlers (`institution`, `docId`, `docName`) | Baixo — sem filhos memoizados |
| `src/pages/ManageUsersPage.tsx` | 3 handlers (`institution`, `role`, `username`) | Baixo — sem filhos memoizados |

**Fix quando relevante:** `useCallback` nos handlers se filhos forem memoizados. Aguarda integração API.

---

### 🟡 Imagens sem dimensões explícitas — potencial CLS

Imagens carregadas sem atributos `width`/`height` explícitos podem causar Cumulative Layout Shift (CLS) enquanto o browser não conhece as dimensões do asset.

| Arquivo | Linha | Elemento | Problema |
|---------|-------|----------|---------|
| `src/pages/LoginPage.tsx` | 43 | `<img src="/bloxlab-logo.png" className="h-16 w-auto max-w-none">` | Sem `width`/`height` attribute — browser não reserva espaço antes do load |
| `src/components/Navbar.tsx` | 32 | `<img src="/bloxlab-logo.png" className="h-14 w-auto">` | Mesmo problema |

**Fix proposto:** adicionar `width` e `height` nativos correspondentes às dimensões reais da imagem. Ganho: elimina layout shift no carregamento. Impacto estimado: melhoria de CLS score.

**Pendente (aguardar aprovação):**
1. Verificar dimensões reais de `/bloxlab-logo.png` — ganho: CLS score

---

### 🟢 Memoização de componentes — não necessária agora

Nenhum componente presentacional recebe props que mudam sem necessidade. Sem `React.memo`, `useMemo` ou `useCallback` excessivos. Estado atual está correto.

---

### 🟢 Assets — sem compressão / lazy loading (baixa prioridade)

`/bloxlab-logo.png` é carregado em dois lugares sem `loading="lazy"`. Como é asset above-the-fold (aparece imediatamente no login e na navbar), lazy loading seria contraproducente aqui — OK não usar.

Compressão e formato moderno (WebP/AVIF) podem ser considerados futuramente para otimização de LCP, mas não são críticos no estado atual.

---

Ver também: [[performance-audit]] | [[dry-refactoring]] | [[separation-of-concerns-report]]
