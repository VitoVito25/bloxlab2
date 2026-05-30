---
title: Contract Data Page
date: 2026-05-30
tags:
  - page
  - blockchain
  - contract
aliases:
  - dados-contrato
  - ContractDataPage
---

# Dados do Contrato Inteligente

## O que é
Tela informativa e estática que documenta a estrutura do contrato inteligente publicado na rede bloxberg. Expõe estrutura de dados on-chain e os níveis de acesso disponíveis na plataforma.

## Para quem
Usuários autenticados que precisam entender como os dados são organizados no contrato. Acesso via rota `/contrato` na navbar lateral.

## Como funciona
Dois painéis lado a lado com cards informativos:

**Estrutura dos dados** (esquerda):
| Card | Conteúdo |
|------|----------|
| Estrutura mapping | Entidade(Id documento) → return Escritor, URL do documento |
| Estrutura para postar | Id e Escritor gerado automaticamente; Entidade e URL informados |
| Estrutura para pesquisar | Entidade e ID informados; Escritor e URL retornados |

**Níveis de acesso** (direita):
| Card | Conteúdo |
|------|----------|
| Níveis de acesso | None, ReadTemporary, ReadPermanent, ReadWriteTemporary, ReadWritePermanent, Admin |
| Conceder acessos | Apenas Admin pode conceder |
| Acessos temporários | Tempo de acesso obrigatório em blocos ao conceder acesso temporário |

## Componentes principais
- `src/pages/ContractDataPage.tsx` — página completa
- `InfoCard` — subcomponente local (título + linhas de texto), definido no mesmo arquivo
- `DATA_STRUCTURE_CARDS` / `ACCESS_LEVEL_CARDS` — constantes com os dados estáticos

## Fonte de dados
100% estático — reflete a estrutura do contrato inteligente bloxberg já implantado. Nenhuma chamada de API necessária.

## Regras de negócio
- Apenas o usuário com papel **Admin** pode conceder acessos a outros usuários
- Acessos temporários exigem informar duração em número de blocos da rede bloxberg
- Estrutura de mapping retorna Escritor e URL dado um Id de documento

## Decisões técnicas
- Dados modelados como arrays de constantes (`DATA_STRUCTURE_CARDS`, `ACCESS_LEVEL_CARDS`) para manter o JSX limpo
- `InfoCard` como subcomponente local — fortemente acoplado à página, sem necessidade de extração

## Edge cases conhecidos
- Dados fixos — qualquer mudança no contrato requer atualização manual desta página e da constante no componente

## Relacionado
- [[vault-structure]]
- [[coding-conventions]]
