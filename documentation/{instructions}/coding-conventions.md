---
title: Coding Conventions — BloxLab Data Availability
date: 2026-05-30
tags:
  - instructions
  - conventions
  - standards
  - claude
aliases:
  - code-standards
  - dev-guidelines
---

# Coding Conventions

> **Para Claude:** Nota especialista em padrões de escrita de código. Define nomenclatura, estrutura de componente, state management, performance e comentários. Leia antes de escrever qualquer código novo.

---

> *"Menos é mais — mas ainda funciona."*

---

## Nomenclatura

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Componentes | `PascalCase` | `TeamCard`, `PublicationForm` |
| Hooks | `camelCase` + prefixo `use` | `useTeamData`, `useBlockchainStatus` |
| Arquivos de página | `PascalCase` + sufixo `Page` | `TeamsPage.tsx`, `DashboardPage.tsx` |
| Utilitários/helpers | `camelCase` + sufixo `Utils` | `blockchainUtils.ts`, `dateUtils.ts` |
| Constantes | `UPPER_SNAKE_CASE` | `API_BASE_URL`, `MAX_RETRY_COUNT` |
| Tipos/interfaces | `PascalCase` + prefixo `T` ou `I` | `TTeam`, `IApiResponse` |
| Features (pastas) | `kebab-case` | `src/features/teams/`, `src/features/publications/` |

---

## Estrutura de componente

```tsx
// 1. Imports externos (react, bibliotecas)
// 2. Imports internos (tipos, utils, hooks, componentes)
// 3. Tipos/interfaces locais
// 4. Constantes locais
// 5. Componente principal
// 6. Subcomponentes locais (se pequenos e fortemente acoplados)
```

---

## Estrutura de feature

Cada feature em `src/features/[nome]/` segue:

```
src/features/teams/
├── components/       ← componentes presentacionais da feature
├── hooks/            ← custom hooks (fetch, lógica de negócio)
├── types.ts          ← tipos da feature
├── utils.ts          ← helpers específicos da feature
└── index.ts          ← re-exports públicos da feature
```

---

## State management

| Situação | Padrão |
|----------|--------|
| Estado local simples | `useState` |
| Estado derivado | `useMemo` — nunca `useState` redundante |
| Efeito colateral / fetch | `useEffect` com deps explícitas, ou custom hook |
| Estado de UI global (ex: sidebar aberto) | `React.createContext` |
| Dados do servidor / cache | custom hook com `useState` + `useEffect`, ou biblioteca a definir |

---

## Performance

- Re-renders: handlers → `useCallback`; objetos/arrays derivados → `useMemo`
- Não criar objetos inline em props que causam re-render desnecessário
- Listas de times/publicações com 50+ itens: avaliar virtualização
- Chamadas REST: não disparar na cada re-render — isolar em hooks com controle de deps

---

## Comentários no código

- Comentar só o **porquê**, nunca o **o quê**
- TODOs com contexto: `// TODO: [motivo] — [quando será resolvido]`
- Não deixar código comentado sem explicação — ou remove, ou documenta motivo

---

## Reutilização de componentes — brand guideline

Antes de criar qualquer componente, card, badge, botão, formatação ou elemento visual **novo**:

1. **Varrer o codebase** por componente existente com mesmo propósito ou visual similar
2. **Match exato** → reutilizar. Não duplicar.
3. **Match parcial ou ambíguo** → perguntar ao usuário:
   > "Esse componente novo, você quer parecido com `{ComponenteEncontrado}`?"
4. **Nenhum match** → criar novo e registrar no vault como padrão estabelecido

**Objetivo:** brand guideline — mesmos botões, badges, cards, ícones e estilos em todo o codebase. Consistência visual depende de não criar variantes ad-hoc.

> [!warning] Nunca criar variante inline silenciosa
> Se criar um elemento levemente diferente do padrão existente sem perguntar, o guideline quebra. Sempre confirmar antes de divergir do padrão.

---

## O que NÃO fazer

- Não adicionar features, abstrações ou refatorações além do que a tarefa pede
- Não criar error handling para cenários impossíveis
- Não usar feature flags ou shims de retrocompatibilidade quando dá pra mudar o código
- Não escrever docstrings multi-linha — no máximo uma linha curta

---

## Stack técnica

| Decisão | Padrão |
|---------|--------|
| Linguagem | TypeScript |
| Framework | React |
| Estilização | Tailwind CSS |
| Componentes base | shadcn/ui (componentes em `src/components/ui/`) |
| Gráficos | a definir |
| Animações | CSS transitions (Tailwind) |
| Roteamento | react-router-dom v6 |
| Auth | gerenciado pelo backend — N/A no frontend |
| Build | Vite |
| Backend | Go REST API + MongoDB (externo) |
| Blockchain | bloxberg (rede de universidades) |

---

Ver também: [[dead-code-audit]] | [[dry-refactoring]] | [[separation-of-concerns]]
