---
title: Main Page
date: 2026-05-30
tags:
  - page
  - home
aliases:
  - Tela Inicial
  - HomePage
---

# Main Page

## O que é
Tela inicial pós-login do BloxLab. Exibida na rota `/home` após autenticação bem-sucedida. Serve como ponto de entrada para todas as features da plataforma.

## Para quem
Todos os usuários autenticados.

## Como funciona
Usuário chega via redirect do backend após login. Layout renderizado pelo [[navbar-component|AppLayout]]: sidebar de navegação à esquerda, área de conteúdo branca à direita com boas-vindas.

## Componentes principais

| Componente | Caminho |
|-----------|---------|
| `AppLayout` | `src/components/AppLayout.tsx` |
| `Navbar` | `src/components/Navbar.tsx` |
| `MainPage` | `src/pages/MainPage.tsx` |

## Fonte de dados
Nenhuma — tela estática de boas-vindas. Dados do usuário (nome na navbar) virão do contexto de auth quando integração for implementada.

## Regras de negócio
Sem regras de negócio próprias. Acesso depende de autenticação gerenciada 100% pelo backend.

## Decisões técnicas
- `userName` na `Navbar` é hardcoded `"[nomeUsuarioNavBar]"` por ora — sem auth context no frontend ainda
- Layout usa `bg-amber-400` como fundo para criar frame visual entre painéis (sidebar e conteúdo ambos `bg-white rounded-2xl`)
- `<Outlet />` do react-router-dom permite que `AppLayout` sirva todas as rotas autenticadas futuras sem duplicação

## Edge cases conhecidos
- Navegar para `/home` sem estar autenticado não é bloqueado no frontend — proteção fica no backend/redirect

## Relacionado
- [[navbar-component]] — Navbar lateral e AppLayout
- [[login-page]] — tela anterior no fluxo
