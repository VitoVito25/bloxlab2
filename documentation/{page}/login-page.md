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

> [!warning] Redirect temporário (modo teste)
> Botão "Login" usa `useNavigate('/home')` sem validação de credenciais. Implementado para testes de navegação. Remover quando integração com API for feita.

## Componentes principais

| Componente | Arquivo |
|------------|---------|
| `LoginPage` | `src/pages/LoginPage.tsx` |
| logo `<img>` (`bloxlab-logo.png`) | `public/bloxlab-logo.png` |
| `Button` (shadcn/ui) | `src/components/ui/button.tsx` |
| `Input` (shadcn/ui) | `src/components/ui/input.tsx` |
| `Card`, `CardContent` (shadcn/ui) | `src/components/ui/card.tsx` |

## Fonte de dados

Nenhuma por agora — formulário controlado via `useState` local. Integração com API REST do backend pendente.

## Regras de negócio

Nenhuma regra de negócio ativa nesta fase (UI only). Quando a integração for implementada, documentar aqui.

## Decisões técnicas

**Logo como imagem PNG real (`public/bloxlab-logo.png`)**
Substituído o placeholder SVG/texto pelo arquivo `bloxlab-logo.png` copiado para `public/`. Vite serve `public/` na raiz — referenciado como `/bloxlab-logo.png`. Altura fixada em `h-16` (4rem) com `w-auto` para preservar proporção. Componente `BloxLabLogo` removido.

**Toggle de senha com estado local**
`useState(showPassword)` no próprio `LoginPage` — não extraído para hook porque só existe um campo de senha nesta tela.

**shadcn/ui instalado manualmente (sem `npx shadcn init`)**
O diretório já continha arquivos (vault, .git) e o CLI do shadcn cancela em diretórios não-vazios. Componentes foram criados manualmente seguindo o padrão shadcn. Ver [[project-setup]] para detalhes.

**Logo + card centralizados via wrapper com largura explícita**
O wrapper `div.relative` recebe `w-full max-w-sm px-4` — largura definida, centralizada pelo flex pai (`items-center`). O card usa `w-full` (sem `mx-4`) e o logo usa `absolute bottom-full inset-x-0 flex justify-center`: ambos referenciam o mesmo bloco contendo → mesmo centro horizontal. Sem largura explícita no wrapper, `inset-x-0` e o card tinham centros diferentes e o logo ficava desalinhado.

**Gradiente linear vertical no fundo (topo claro → base laranja)**
Background trocado de `radial-gradient` para `linear-gradient(to bottom, #FFCA58 0%, #FFB300 60%, #FF7000 100%)`. Motivo: o gradiente radial criava uma zona de laranja uniforme exatamente onde a logo é renderizada, ocultando detalhes do PNG. Com o gradiente linear, o topo da tela (onde a logo vive) recebe âmbar claro (#FFCA58), contrastando com os detalhes da logo; a base escurece progressivamente para laranja saturado (#FF7000).

**Espaçamento logo → card: `mb-9`**
Margem inferior da logo aumentada de `mb-6` para `mb-9` (de 24 px para 36 px) para dar respiração visual entre logo e card sem deslocar o conjunto do centro da tela.

**Links externos com `target="_blank"` e `rel="noopener noreferrer"`**
"Conheça a BloxLab" aponta para notícia da UTFPR sobre a rede bloxberg. "Supported by BloxsBerg" aponta para `bloxberg.org`. Ambos abrem em nova aba para não tirar o usuário da app. `rel="noopener noreferrer"` previne acesso ao `window.opener` pela página de destino.

## Edge cases conhecidos

- Toggle eye: ao mostrar senha, tipo do input muda para `text` — autocomplete pode interferir em alguns browsers. Comportamento aceitável por agora.
- Botão "Cadastre-se": `type="button"` explícito para não disparar submit do form. Rota de cadastro ainda não existe.
- Logo PNG: se o arquivo `public/bloxlab-logo.png` não existir em prod, o `<img>` renderiza quebrado — garantir que o asset está no bundle/deploy.

## Relacionado

- [[project-setup]] — configuração técnica do projeto (Vite, Tailwind, shadcn)
- [[ui-components]] — Button, Input, Card usados nesta tela
- [[coding-conventions]] — padrões de nomenclatura e estrutura
- [[main-page]] — destino do redirect pós-login
- [[navbar-component]] — layout pós-login (AppLayout + Navbar)
