---
title: Auth Feature
date: 2026-05-30
tags:
  - general
  - auth
  - feature
aliases:
  - autenticação
  - auth-context
  - sessão
---

# Auth Feature

## O que é

Módulo de autenticação do frontend. Gerencia a chamada à API de login, armazenamento da sessão do usuário e disponibilização dos dados de sessão para o restante da app via React Context.

> [!info] Auth é 100% backend
> O frontend não valida credenciais. Apenas chama a API, armazena a resposta e expõe os dados via contexto. Toda lógica de autenticação real vive no backend Go.

---

## Estrutura de arquivos

```
src/features/auth/
├── AuthContext.tsx          → Context + Provider + useAuth()
├── hooks/
│   └── useLogin.ts          → fetch POST /login, retorna { data, errorCode }
├── types.ts                 → TLoginForm, TLoginResponse, TRegisterForm
└── components/
    └── RegisterCard.tsx     → card de cadastro (toggle na LoginPage)
```

---

## AuthContext (`src/features/auth/AuthContext.tsx`)

Armazena os dados da sessão do usuário:

```ts
interface TAuthSession {
  nomeUsuario: string
  instituicao: string
  jwtToken: string
  access: string
}
```

### Persistência

Usa `sessionStorage` com chave `bloxlab_session`. Dados sobrevivem a refresh de página mas são apagados ao fechar a aba — comportamento intencional para segurança.

### API pública

| Export | Tipo | Descrição |
|--------|------|-----------|
| `AuthProvider` | Component | Envolvido em torno de toda a árvore em `App.tsx` |
| `useAuth()` | Hook | Retorna `{ session, login(data), logout() }` |

### Uso

```tsx
// App.tsx — envolver a árvore inteira
<BrowserRouter>
  <AuthProvider>
    <Routes>...</Routes>
  </AuthProvider>
</BrowserRouter>

// Qualquer componente filho
const { session } = useAuth()
// session?.nomeUsuario, session?.jwtToken, etc.
```

---

## useLogin (`src/features/auth/hooks/useLogin.ts`)

Hook que encapsula a chamada `POST /login`.

### Retorno

```ts
{ execute(email, password): Promise<{ data, errorCode }>, loading }
```

### Comportamento

| Cenário | `data` | `errorCode` |
|---------|--------|-------------|
| Status `2xx` | `TLoginResponse` | `null` |
| Status não-`2xx` | `null` | código HTTP como string (`"401"`, `"404"`) |
| Erro de rede | `null` | `"network_error"` |

Em sucesso, `execute` chama `login(data)` do `AuthContext` automaticamente antes de retornar.

### Por que `{ data, errorCode }` em vez de `data | null` + estado

Estado React assíncrono não estaria disponível imediatamente após `await execute()` no mesmo ciclo de render. Retornar o código diretamente elimina a race condition.

---

## TLoginResponse (`src/features/auth/types.ts`)

```ts
export interface TLoginResponse {
  nomeUsuario: string
  instituicao: string
  jwtToken: string
  access: string
}
```

Todos os campos são armazenados na sessão e ficam disponíveis via `useAuth().session`.

---

## Configuração de URL da API

URL base configurada via variável de ambiente Vite:

```
# .env
# TODO: alterar para URL do ambiente correto antes de deploy
VITE_API_BASE_URL=https://habit.digital
```

Referenciada no hook como `import.meta.env.VITE_API_BASE_URL`.

> [!warning] CORS em desenvolvimento
> Se `habit.digital` não liberar CORS para `localhost`, as requisições falharão. Solução: adicionar proxy no `vite.config.ts` e alterar `VITE_API_BASE_URL` para `/api`:
> ```ts
> server: {
>   proxy: {
>     '/api': {
>       target: 'https://habit.digital',
>       changeOrigin: true,
>       rewrite: (p) => p.replace(/^\/api/, '')
>     }
>   }
> }
> ```

---

## Onde os dados de sessão são consumidos

| Consumidor | Campo usado | Arquivo |
|------------|-------------|---------|
| `AppLayout` | `session?.nomeUsuario` | `src/components/AppLayout.tsx` |
| `Navbar` | prop `userName` (recebe de AppLayout) | `src/components/Navbar.tsx` |

---

## Relacionado

- [[login-page]] — tela que dispara o login e exibe erros
- [[navbar-component]] — consome `nomeUsuario` da sessão
- [[project-setup]] — configuração Vite e variáveis de ambiente
