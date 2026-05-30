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
| `teal` | fundo emerald-400, texto branco | confirmação (modais) |
| `destructive` | fundo red-400, texto branco | cancelar / ação destrutiva |
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

> [!tip] Paleta aprovada
> Design token base: amber. Variantes adicionais aprovadas: `teal` (emerald-400, confirmação em modais) e `destructive` (red-400, cancelar). Qualquer nova cor fora desta paleta requer aprovação explícita.

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

## EditAccessModal

**Arquivo:** `src/components/ui/edit-access-modal.tsx`

Modal de edição de acesso. Overlay + card com select de tipo e input de dias. Dois botões: confirmar (teal) e cancelar (destructive). Estado interno do formulário.

### Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| `isOpen` | `boolean` | Controla visibilidade |
| `onClose` | `() => void` | Callback do X |
| `onConfirm` | `(accessType: string, accessDays: string) => void` | Callback confirmar com valores do form |
| `onCancel` | `() => void` | Callback cancelar |

### Exemplo

```tsx
<EditAccessModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onConfirm={(type, days) => { /* salvar */ setIsOpen(false) }}
  onCancel={() => setIsOpen(false)}
/>
```

---

## ViewUserModal

**Arquivo:** `src/components/ui/view-user-modal.tsx`

Modal de visualização/edição de usuário. 6 campos: nome, instituição, cargo (select), tipo de acesso (select), tempo de acesso, e-mail. Botão "Salvar Alterações" (teal) full-width. Exporta também o tipo `TViewUserData`.

### Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| `isOpen` | `boolean` | Controla visibilidade |
| `user` | `TViewUserData` | Dados iniciais do formulário |
| `onClose` | `() => void` | Callback do X |
| `onSave` | `(data: TViewUserData) => void` | Callback com dados atualizados |

### TViewUserData

```ts
interface TViewUserData {
  username: string
  institution: string
  role: string
  accessType: string
  accessTime: string
  email: string
}
```

### Exemplo

```tsx
<ViewUserModal
  isOpen={isOpen}
  user={selectedUser}
  onClose={() => setIsOpen(false)}
  onSave={(data) => { /* salvar */ setIsOpen(false) }}
/>
```

---

## AlertModal

**Arquivo:** `src/components/ui/alert-modal.tsx`

Modal de alerta reutilizável. Overlay escuro + card centralizado com título, mensagem e botão de confirmação. Fecha via X (topo-direito) ou botão de ação.

### Props

| Prop | Tipo | Descrição |
|------|------|-----------|
| `isOpen` | `boolean` | Controla visibilidade — `false` retorna `null` |
| `title` | `string` | Título em negrito no topo do card |
| `message` | `string` | Texto de corpo abaixo do título |
| `buttonMessage` | `string` | Label do botão de confirmação |
| `onClose` | `() => void` | Callback do botão X |
| `onConfirm` | `() => void` | Callback do botão de confirmação |

### Exemplo

```tsx
const [isOpen, setIsOpen] = useState(false)

<AlertModal
  isOpen={isOpen}
  title="Confirmar ação"
  message="Deseja prosseguir com esta operação?"
  buttonMessage="Confirmar"
  onClose={() => setIsOpen(false)}
  onConfirm={() => { /* lógica */ setIsOpen(false) }}
/>
```

> [!tip] Uso
> Importar de `@/components/ui/alert-modal`. Estado `isOpen` fica no componente pai via `useState`.

---

## Relacionado

- [[project-setup]] — como os componentes foram instalados (setup manual, sem CLI)
- [[coding-conventions]] — regras de reutilização e brand guideline
- [[login-page]] — primeira tela que consome estes componentes
