---
title: Separation of Concerns — BloxLab Data Availability
date: 2026-05-30
tags:
  - instructions
  - architecture
  - feature-based
  - claude
aliases:
  - soc
  - feature-pattern
---

# Separation of Concerns

> **Para Claude:** Nota especialista em separação de lógica e apresentação. Leia antes de qualquer sessão de refatoração arquitetural.

---

> [!warning] Regra obrigatória
> **Nunca executar refatoração sem aprovação explícita do usuário.** Mudanças de arquitetura afetam múltiplos arquivos — apresentar plano completo antes de executar qualquer linha.

> [!important] Workflow de execução — mudanças grandes e complexas
> Quando a refatoração envolve múltiplos arquivos ou tiers:
> 1. Apresentar plano completo (arquivos, tiers, estimativas de linhas)
> 2. Aguardar aprovação explícita
> 3. Executar **um tier de cada vez**
> 4. Retornar ao usuário após cada tier para validação
> 5. Aguardar "ok" antes de avançar ao próximo tier
>
> Nunca encadear todos os tiers automaticamente. O usuário precisa confirmar que nada quebrou entre cada etapa.

---

## O que verificar

### 1. Business logic em componentes de UI
Regras de negócio (cálculos, filtros, validações) embutidas diretamente no template/JSX ou em componentes de apresentação pura.

### 2. Chamadas de API em componentes de apresentação
Chamadas REST dentro de componentes que deveriam só receber dados como props/parâmetros.

### 3. Componentes container/presentational misturados
Um componente único fazendo: fetch → transformação → renderização. Deveria ser: hook faz fetch+transform, componente recebe dados e renderiza.

---

## Padrão adotado — Feature-based com custom hooks

```
[useTeamData()]           ← custom hook: fetch REST + parse + cache local
    ↓ dados tipados
[TeamsPage]               ← container: orquestra estado de UI (filtros, sort, paginação)
    ↓ props
[TeamsTable]              ← presentational: recebe array de times, renderiza tabela
    ↓ props
[TeamRow]                 ← presentational: um time, renderiza linha

Mesmo padrão para qualquer recurso: Publications, Athletes, Blockchain status, etc.
```

**Regras:**
- Custom hooks vivem em `src/features/[nome]/hooks/` ou `src/hooks/` se compartilhados
- Componentes presentacionais não fazem `fetch`, não conhecem a API REST
- Lógica de transformação de dados da API → modelo de UI fica no hook, nunca no componente
- Componentes de página (`*Page.tsx`) são os únicos que podem orquestrar múltiplos hooks

---

## Resultados do audit

> Resultados registrados em [[separation-of-concerns-report]] — não armazenar aqui.

---

## Prompt de audit periódico

```
Examine a estrutura dos componentes e identifique onde a separação
entre lógica e apresentação pode ser melhorada. Procure por:
1. Componentes de UI com regras de negócio embutidas
2. Chamadas REST diretamente em componentes de apresentação
3. Componentes que poderiam seguir o padrão hook/container/presentational

Sugira refatorações para melhorar a separação de responsabilidades,
tornando os componentes mais reutilizáveis e testáveis.
Não execute nada sem aprovação do usuário.
```

---

Ver também: [[coding-conventions]] | [[performance-audit]] | [[dry-refactoring]]
