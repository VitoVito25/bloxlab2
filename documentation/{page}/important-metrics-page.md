---
title: Important Metrics Page
date: 2026-05-30
tags:
  - page
  - metrics
  - dashboard
aliases:
  - metricas-importantes
  - ImportantMetricsPage
---

# Métricas Importantes

## O que é
Tela de dashboard que exibe métricas da plataforma divididas em duas visões: semanal e total acumulado. Os campos ficam vazios até receberem dados da API.

## Para quem
Todos os usuários autenticados. Acesso via rota `/metricas` na navbar lateral.

## Como funciona
Dois painéis lado a lado (Semanal | Total) exibem os mesmos 4 indicadores:
1. Total de Arquivos Enviados
2. Total de Arquivos Acessados
3. Total de Acessos na Plataforma
4. Total de Usuários

Cada indicador = label + campo de display cinza arredondado. Valores virão de chamada REST futura.

## Componentes principais
- `src/pages/ImportantMetricsPage.tsx` — página completa
- `MetricField` — subcomponente local (label + `div` display), definido no mesmo arquivo

## Fonte de dados
Mock vazio por ora. Substituir por hook de fetch quando endpoint da API estiver disponível.

## Regras de negócio
Nenhuma definida — tela de exibição pura.

## Decisões técnicas
- Layout `grid grid-cols-2` espelha colunas Semanal/Total com mesmos labels, evitando duplicação de dados estáticos via array `METRICS`
- Campo de display como `div` em vez de `input` — é read-only, sem interação

## Edge cases conhecidos
- Campos ficam vazios até API retornar dados — sem estado de loading por ora

## Relacionado
- [[vault-structure]]
- [[coding-conventions]]
