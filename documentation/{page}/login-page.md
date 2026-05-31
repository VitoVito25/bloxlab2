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
2. Clica em "Login" — botão fica desabilitado e exibe "Entrando..." durante a requisição
3. Frontend chama `POST /login` via `useLogin` hook
4. **Sucesso:** dados da sessão salvos via `AuthContext`, redireciona para `/home`
5. **Falha:** `AlertModal` exibe código do erro (ex: `Código do erro: 401`)

> [!info] Sem lógica de auth no frontend
> O frontend não valida credenciais localmente. Toda lógica de autenticação vive no backend Go. O frontend apenas armazena a resposta no `sessionStorage` via [[auth-feature]].

## Componentes principais

| Componente | Arquivo |
|------------|---------|
| `LoginPage` | `src/pages/LoginPage.tsx` |
| `useLogin` | `src/features/auth/hooks/useLogin.ts` |
| `AlertModal` | `src/components/ui/alert-modal.tsx` |
| logo `<img>` (`bloxlab-logo.png`) | `public/bloxlab-logo.png` |
| `Button` (shadcn/ui) | `src/components/ui/button.tsx` |
| `Input` (shadcn/ui) | `src/components/ui/input.tsx` |
| `Card`, `CardContent` (shadcn/ui) | `src/components/ui/card.tsx` |

## Fonte de dados

`POST ${VITE_API_BASE_URL}/login` — URL base configurada em `.env` via `VITE_API_BASE_URL`.
Resposta armazenada em `sessionStorage` pelo [[auth-feature]].

## Regras de negócio

- Login só avança para `/home` se a API retornar status `2xx` com todos os campos: `nomeUsuario`, `instituicao`, `jwtToken`, `access`
- Qualquer status não-`2xx` ou falha de rede abre o `AlertModal` com o código de erro
- Sessão persiste enquanto a aba estiver aberta (sessionStorage) — logout ao fechar a aba

## Decisões técnicas

**`AlertModal` para erros de login**
Optado por `AlertModal` em vez de toast/snackbar para manter consistência com o padrão de feedback já existente na app. O componente já existia (`src/components/ui/alert-modal.tsx`) — reusado sem alteração.

**`errorCode` retornado diretamente do `execute()`**
`useLogin.execute()` retorna `{ data, errorCode }` em vez de só `data | null`. Motivo: estado React assíncrono não estaria disponível imediatamente após `await execute()` no mesmo ciclo de render. Retornar o código diretamente elimina a race condition.

**`disabled={loading}` + texto dinâmico no botão**
Botão desabilitado durante `loading` para evitar cliques múltiplos e duplo envio à API.

**Logo como imagem PNG real (`public/bloxlab-logo.png`)**
Substituído placeholder SVG pelo arquivo em `public/`. Vite serve `public/` na raiz — referenciado como `/bloxlab-logo.png`. Altura fixada em `h-16` com `w-auto` para preservar proporção.

**Toggle de senha com estado local**
`useState(showPassword)` no próprio `LoginPage` — não extraído para hook porque só existe um campo de senha nesta tela.

**shadcn/ui instalado manualmente (sem `npx shadcn init`)**
O diretório já continha arquivos e o CLI cancela em diretórios não-vazios. Ver [[project-setup]] para detalhes.

**Gradiente linear vertical no fundo**
`linear-gradient(to bottom, #FFCA58 0%, #FFB300 60%, #FF7000 100%)`. Gradiente radial anterior ocultava detalhes da logo — linear deixa o topo mais claro onde a logo vive.

## Edge cases conhecidos

- **CORS:** se `habit.digital` não liberar CORS para `localhost`, requisições falharão com `network_error`. Solução: configurar proxy no `vite.config.ts` e alterar `VITE_API_BASE_URL` para `/api`. Ver [[auth-feature]] para instruções.
- Toggle eye: ao mostrar senha, autocomplete pode interferir em alguns browsers. Aceitável.
- Botão "Cadastre-se": `type="button"` explícito para não disparar submit. Rota de cadastro ainda não existe.
- Logo PNG: se `public/bloxlab-logo.png` não existir em prod, `<img>` renderiza quebrado.

## Relacionado

- [[auth-feature]] — AuthContext, useLogin, sessionStorage, TLoginResponse
- [[project-setup]] — configuração técnica do projeto (Vite, Tailwind, shadcn)
- [[ui-components]] — Button, Input, Card, AlertModal usados nesta tela
- [[coding-conventions]] — padrões de nomenclatura e estrutura
- [[main-page]] — destino do redirect pós-login
- [[navbar-component]] — layout pós-login (AppLayout + Navbar)
