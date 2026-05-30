---
title: Performance Audit — BloxLab Data Availability
date: 2026-05-30
tags:
  - instructions
  - performance
  - optimization
  - claude
aliases:
  - perf-audit
  - performance
---

# Performance Audit

> **Para Claude:** Nota especialista em identificar e corrigir problemas de performance. Leia antes de qualquer sessão de otimização.

---

> [!warning] Regra obrigatória
> **Nunca aplicar otimizações sem aprovação explícita do usuário.** Apresentar lista com impacto estimado, aguardar confirmação, executar em lotes pequenos.

---

## O que verificar

### 1. Componentes — memoização desnecessária de renders
Candidatos: componentes que recebem as mesmas props mas re-renderizam por causa do pai.
- Subcomponentes puros definidos fora do componente pai
- Componentes de lista (linhas de tabela de times, cards de atletas)
- Componentes de badge/status usados muitas vezes por render

**Sinal de problema:** componente renderiza toda vez que o pai atualiza state não relacionado ao filho.

### 2. Handlers — callbacks recriados a cada render
Candidatos: funções passadas como props ou usadas em deps de effects.
- Handlers de eventos definidos inline
- Funções que dependem de state/props e são passadas para filhos

**Sinal de problema:** filho usa memoização mas ainda re-renderiza — handler inline cria nova referência a cada render do pai.

### 3. Cálculos pesados — sem memoização
Candidatos: derivações de dados que rodam em toda renderização.
- Agregações de arrays de times/atletas (filter, sort, reduce)
- Formatação de dados para exibição de transações blockchain
- Transformação de resposta da API REST para modelo de UI

**Sinal de problema:** cálculo lento sem cache = recalcula em todo re-render, mesmo quando deps não mudaram.

### 4. Listas grandes — sem virtualização
Candidatos: listas com 50+ itens visíveis simultaneamente.
- Tabelas de times com muitas entradas
- Histórico de publicações on-chain

**Sinal de problema:** scroll lento, frames dropped ao renderizar lista grande.

### 5. Assets não otimizados
- Imagens sem dimensões explícitas (causam layout shift)
- Imagens grandes carregadas sem lazy loading
- Assets sem compressão / formato moderno (WebP, AVIF)

### 6. Chamadas REST — redundância e falta de cache
- Fetch disparado em cada re-render sem controle de deps
- Múltiplos componentes fazendo fetch do mesmo endpoint independentemente
- Polling de status blockchain sem throttle/debounce

---

## Prompt de audit periódico

```
Identifique problemas de performance e oportunidades de otimização. Procure por:
1. Componentes que renderizam frequentemente sem necessidade
2. Funções recriadas em cada renderização
3. Cálculos pesados sem cache/memoização
4. Listas grandes sem virtualização
5. Assets não otimizados (imagens, fontes, scripts)
6. Chamadas REST redundantes ou sem controle de cache

Sugira melhorias concretas para cada problema encontrado,
explicando o impacto estimado na performance.
Não execute nada sem aprovação do usuário.
```

---

## Resultados

> Registre os resultados de cada audit em [[performace-audit-report]], não aqui.
> Mantém este arquivo pequeno e reduz consumo de tokens por sessão.

---

Ver também: [[coding-conventions]] | [[dry-refactoring]] | [[performace-audit-report]]
