---
title: Login Page
date: 2026-05-30
tags:
  - page
  - auth
aliases:
  - tela-de-login
  - login-screen
---

# Login Page

## O que é

Primeira tela do produto. Ponto de entrada obrigatório para qualquer usuário. Apresenta o formulário de autenticação e a identidade visual do BloxLab.

## Para quem

Qualquer usuário que precise acessar o sistema — gestores de clubes, analistas, treinadores de base.

## Como funciona

1. Usuário preenche email e senha
2. Clica em "Login"
3. (Integração pendente) POST para API do backend — auth gerenciado 100% pelo backend

> [!info] Sem lógica de auth no frontend
> O frontend não valida credenciais localmente nem armazena tokens diretamente. Toda lógica de autenticação vive no backend Go.

## Componentes principais

| Componente | Arquivo |
|------------|---------|
| `LoginPage` | `src/pages/LoginPage.tsx` |
| `BloxLabLogo` | subcomponente local em `src/pages/LoginPage.tsx` |
| `Button` (shadcn/ui) | `src/components/ui/button.tsx` |
| `Input` (shadcn/ui) | `src/components/ui/input.tsx` |
| `Card`, `CardContent` (shadcn/ui) | `src/components/ui/card.tsx` |

## Fonte de dados

Nenhuma por agora — formulário controlado via `useState` local. Integração com API REST do backend pendente.

## Regras de negócio

Nenhuma regra de negócio ativa nesta fase (UI only). Quando a integração for implementada, documentar aqui.

## Decisões técnicas

**Logo BLOXLAB em código puro (sem imagem SVG externa)**
Optou-se por renderizar o logo via HTML/CSS para evitar dependência de asset externo na fase inicial. O "X" com linha horizontal decorativa é feito com SVG inline aninhado no span. Trocar por asset real quando o logo final for definido.

**Toggle de senha com estado local**
`useState(showPassword)` no próprio `LoginPage` — não extraído para hook porque só existe um campo de senha nesta tela.

**shadcn/ui instalado manualmente (sem `npx shadcn init`)**
O diretório já continha arquivos (vault, .git) e o CLI do shadcn cancela em diretórios não-vazios. Componentes foram criados manualmente seguindo o padrão shadcn. Ver [[project-setup]] para detalhes.

**Card centralizado verticalmente com logo acima via posicionamento absoluto**
O card é o âncora flex (`justify-center` no container). O logo usa `absolute bottom-full` relativo ao wrapper do card para flutuar acima sem participar do cálculo de centralização. Assim o card fica exato no centro vertical da viewport independente do tamanho do logo.

**Links externos com `target="_blank"` e `rel="noopener noreferrer"`**
"Conheça a BloxLab" aponta para notícia da UTFPR sobre a rede bloxberg. "Supported by BloxsBerg" aponta para `bloxberg.org`. Ambos abrem em nova aba para não tirar o usuário da app. `rel="noopener noreferrer"` previne acesso ao `window.opener` pela página de destino.

## Edge cases conhecidos

- Toggle eye: ao mostrar senha, tipo do input muda para `text` — autocomplete pode interferir em alguns browsers. Comportamento aceitável por agora.
- Botão "Cadastre-se": `type="button"` explícito para não disparar submit do form. Rota de cadastro ainda não existe.
- Logo usa `whitespace-nowrap` para não quebrar linha em viewports estreitas — se o logo crescer, revisar.

## Relacionado

- [[project-setup]] — configuração técnica do projeto (Vite, Tailwind, shadcn)
- [[ui-components]] — Button, Input, Card usados nesta tela
- [[coding-conventions]] — padrões de nomenclatura e estrutura
