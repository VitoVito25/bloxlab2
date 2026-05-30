---
title: UI Components — Biblioteca Base
date: 2026-05-30
tags:
  - general
  - components
  - shadcn
  - ui
aliases:
  - component-library
  - componentes-base
  - shadcn-components
---

# UI Components — Biblioteca Base

> [!warning] Consulte esta nota antes de criar qualquer elemento visual
> Se um componente com o propósito desejado já existe aqui, **reutilize**. Nunca criar variante ad-hoc sem perguntar. Ver [[coding-conventions#Reutilização de componentes — brand guideline]].

Componentes base do projeto, instalados manualmente via padrão shadcn/ui. Vivem em `src/components/ui/`. Todos usam a função utilitária [[#cn()]] para composição de classes Tailwind.

---

## cn()

**Arquivo:** `src/lib/utils.ts`

Utilitário de composição de classes CSS. Combina `clsx` (condicional) + `tailwind-merge` (resolve conflitos de classes Tailwind).

```ts
import { cn } from '@/lib/utils'

cn('px-4 py-2', isActive && 'bg-amber-400', className)
```

Usar em **todo** componente que aceita `className` externo.

---

## Button

**Arquivo:** `src/components/ui/button.tsx`

Baseado em `@radix-ui/react-slot` para suporte a `asChild`. Variantes via `class-variance-authority`.

### Variantes disponíveis

| `variant` | Visual | Uso |
|-----------|--------|-----|
| `default` | fundo amber-400, texto branco | ação primária |
| `outline` | borda, fundo transparente | ação secundária |
| `ghost` | sem borda, hover sutil | ação terciária / ícone |
| `link` | texto amber-500 sublinhado | navegação inline |

| `size` | Altura | Uso |
|--------|--------|-----|
| `default` | h-10 | padrão |
| `sm` | h-8 | compacto |
| `lg` | h-11 | destaque |
| `icon` | h-9 w-9 | botão só com ícone |

### Exemplos

```tsx
// Ação primária full-width (ex: Login)
<Button className="w-full">Login</Button>

// Ação secundária
<Button variant="outline">Cancelar</Button>

// Botão ícone
<Button variant="ghost" size="icon"><Eye /></Button>

// Renderiza como <a> via asChild
<Button asChild variant="link">
  <a href="/about">Saiba mais</a>
</Button>
```

> [!tip] Cor base é amber
> O design token do projeto é amber. Não criar variantes com outras cores sem aprovação explícita.

---

## Input

**Arquivo:** `src/components/ui/input.tsx`

Input HTML estilizado. Fundo `bg-gray-100`, sem borda visível, focus com ring amber.

### Props

Aceita todas as props nativas de `<input>` + `className` para extensão.

### Exemplos

```tsx
// Básico
<Input type="email" placeholder="Email" />

// Controlado
<Input
  name="password"
  type={showPassword ? 'text' : 'password'}
  value={form.password}
  onChange={handleChange}
  className="pr-10"   // espaço para ícone à direita
/>
```

> [!note] Toggle de senha
> Para input com ícone sobreposto (eye toggle), adicionar `className="pr-10"` no Input e posicionar o botão com `absolute right-3`. Ver implementação em `src/pages/LoginPage.tsx`.

---

## Card / CardContent

**Arquivo:** `src/components/ui/card.tsx`

Container visual. `Card` define o fundo branco e arredondamento; `CardContent` define o padding interno.

### Exemplos

```tsx
<Card className="max-w-sm w-full">
  <CardContent>
    {/* conteúdo */}
  </CardContent>
</Card>

// Sem padding padrão (override)
<CardContent className="p-4">
  ...
</CardContent>
```

---

## Relacionado

- [[project-setup]] — como os componentes foram instalados (setup manual, sem CLI)
- [[coding-conventions]] — regras de reutilização e brand guideline
- [[login-page]] — primeira tela que consome estes componentes
