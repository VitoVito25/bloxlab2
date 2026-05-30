---
title: Navbar Component
date: 2026-05-30
tags:
  - general
  - component
  - layout
aliases:
  - AppLayout
  - Sidebar
---

# Navbar Component

## O que é
Sidebar de navegação lateral usada em todas as páginas pós-login. Composta por dois arquivos:

- `src/components/Navbar.tsx` — componente de navegação
- `src/components/AppLayout.tsx` — wrapper de layout que combina sidebar + `<Outlet />`

## Estrutura visual

```
┌─────────────────────────────────────────────────┐  ← bg-amber-400 (frame)
│  ┌──────────────┐  ┌──────────────────────────┐ │
│  │   Navbar     │  │   <Outlet /> (conteúdo)  │ │
│  │  bg-white    │  │       bg-white           │ │
│  │  rounded-2xl │  │       rounded-2xl        │ │
│  └──────────────┘  └──────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

O fundo amber `p-2 gap-2` cria o frame visual dourado entre os painéis.

## Props

### `Navbar`

| Prop | Tipo | Descrição |
|------|------|-----------|
| `userName` | `string` | Nome exibido no rodapé da sidebar |

> [!warning] Integração pendente
> `userName` é passado como prop estático `"[nomeUsuarioNavBar]"` em `AppLayout`. Quando auth context for implementado, substituir pelo dado real do usuário.

## Itens de navegação

| Label | Rota | Ícone (lucide-react) |
|-------|------|---------------------|
| Página Inicial | `/home` | `Home` |
| Pesquisar Documentos | `/pesquisar` | `FileSearch` |
| Enviar Documentos | `/enviar` | `FilePlus2` |
| Gerenciar Usuários | `/usuarios` | `Users` |
| Solicitações de acesso | `/solicitacoes` | `UserPlus` |
| Métricas Importantes | `/metricas` | `TrendingUp` |
| Dados do contrato | `/contrato` | `FileText` |

Array `NAV_ITEMS` definido como constante interna em `Navbar.tsx` — não é prop.

## Estado ativo

Usa `useLocation()` do react-router-dom via `<NavLink>`. Item ativo recebe:
- `border-amber-400 bg-amber-50` 

Item inativo recebe hover:
- `hover:border-amber-300 hover:bg-amber-50/50`

## Como adicionar nova rota

1. Adicionar entrada em `NAV_ITEMS` em `src/components/Navbar.tsx`
2. Adicionar `<Route path="/nova-rota" element={<NovaPage />} />` dentro do bloco `<Route element={<AppLayout />}>` em `src/App.tsx`

## Decisões técnicas
- `NAV_ITEMS` como constante interna (não prop) — itens de nav são fixos por papel/permissão; flexibilidade via props seria over-engineering agora
- `AppLayout` usa `<Outlet />` — único layout compartilhado para todas as rotas autenticadas, sem duplicação
- Largura da sidebar: `w-64` (256px) — necessário para labels como "Pesquisar Documentos" e "Solicitações de acesso" caberem em linha única

## Relacionado
- [[main-page]] — primeira página renderizada no layout
- [[login-page]] — página fora do AppLayout (rota `/`)
- [[project-setup]] — configuração de rotas e aliases
