---
title: Project Setup
date: 2026-05-30
tags:
  - general
  - setup
  - infrastructure
aliases:
  - tech-setup
  - configuração-do-projeto
---

# Project Setup

Registro das decisões de infraestrutura e configuração do projeto BloxLab Data Availability frontend.

---

## Stack instalada

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Framework | React | 19.x |
| Linguagem | TypeScript | 5.8 |
| Build tool | Vite | 6.x |
| Estilização | Tailwind CSS | 4.x |
| Componentes base | shadcn/ui (manual) | — |
| Roteamento | react-router-dom | 7.x |
| Ícones | lucide-react | — |
| Utilitário CSS | clsx + tailwind-merge | — |

---

## Tailwind v4 — setup via Vite plugin

> [!warning] Tailwind v4 é diferente do v3
> Não existe mais `tailwind.config.js` obrigatório nem `npx tailwindcss init`. A configuração é feita via CSS (`@theme`) e o plugin Vite.

**Como foi configurado:**

1. `npm install -D tailwindcss @tailwindcss/vite`
2. Plugin adicionado em `vite.config.ts`:
   ```ts
   import tailwindcss from '@tailwindcss/vite'
   // ...
   plugins: [tailwindcss(), react()]
   ```
3. `src/index.css` usa `@import "tailwindcss"` (não as três diretivas `@tailwind` do v3)

---

## shadcn/ui — instalação manual

> [!note] Por que manual?
> O CLI `npx shadcn@latest init` cancela em diretórios não-vazios. Como o repo já continha vault e `.git`, os componentes foram criados manualmente seguindo o padrão shadcn.

**Arquivos criados:**

| Arquivo | Propósito |
|---------|-----------|
| `src/lib/utils.ts` | função `cn()` (clsx + tailwind-merge) |
| `src/components/ui/button.tsx` | Button com variantes (default=amber, outline, ghost, link) |
| `src/components/ui/input.tsx` | Input com estilo `bg-gray-100`, sem borda, focus amber |
| `src/components/ui/card.tsx` | Card + CardContent |
| `components.json` | configuração shadcn (baseColor: amber, cssVariables: true) |

**Dependências instaladas:**
- `@radix-ui/react-slot` — necessário para `asChild` no Button
- `class-variance-authority` — variantes dos componentes
- `clsx` + `tailwind-merge` — utilitário `cn()`

---

## Estrutura de pastas inicial

```
src/
├── components/
│   └── ui/           ← Button, Input, Card (shadcn/ui)
├── features/
│   └── auth/
│       └── types.ts  ← TLoginForm
├── lib/
│   └── utils.ts      ← cn()
├── pages/
│   └── LoginPage.tsx
├── App.tsx
├── main.tsx
├── index.css
└── vite-env.d.ts
```

---

## Path alias configurado

`@` → `src/` — configurado em `vite.config.ts` e `tsconfig.app.json`:

```ts
// vite.config.ts
resolve: { alias: { '@': path.resolve(__dirname, './src') } }

// tsconfig.app.json
"paths": { "@/*": ["./src/*"] }
```

---

## Decisões pendentes

- [ ] Configuração de ESLint (não instalado ainda)
- [ ] Definir biblioteca de gráficos (Recharts ou outra) quando necessário
- [ ] Estratégia de fetch/cache (React Query, SWR ou hooks custom)

---

## Relacionado

- [[coding-conventions]] — padrões de nomenclatura e estrutura de componente
- [[login-page]] — primeira tela implementada
