---
title: Register Page
date: 2026-05-30
tags:
  - page
  - auth
aliases:
  - tela-cadastro
  - cadastro
---

# Register Page

## O que é
Card de cadastro exibido na `LoginPage` em substituição ao card de login quando o usuário clica em "Cadastre-se". Implementado como componente isolado (`RegisterCard`) com toggle de estado na página pai.

## Para quem
Novos usuários solicitando acesso à plataforma BloxLab — técnicos, preparadores físicos, médicos e outros profissionais de times de base.

## Como funciona
1. Usuário clica em "Cadastre-se" no card de login → `showRegister` vira `true`
2. `RegisterCard` substitui o card de login com animação de entrada (`animate-card-enter`)
3. Usuário preenche os campos e clica "Enviar solicitação" (integração com API pendente)
4. Botão `ArrowLeft` no header fecha o card e volta ao login (`onClose` → `showRegister = false`)

## Componentes principais

| Componente | Caminho |
|-----------|---------|
| `RegisterCard` | `src/features/auth/components/RegisterCard.tsx` |
| `LoginPage` (orquestrador) | `src/pages/LoginPage.tsx` |
| `Card`, `CardContent` | `src/components/ui/card.tsx` |
| `Input` | `src/components/ui/input.tsx` |
| `Button` | `src/components/ui/button.tsx` |

## Campos do formulário

| Campo | Tipo | Observação |
|-------|------|-----------|
| Nome completo | `text` | |
| Instituição | `text` | |
| Cargo | `select` | Técnico, Preparador Físico, Médico, Fisiologista, Nutricionista, Psicólogo, Coordenador |
| Tipo de Acesso | `select` | Administrador, Editor, Visualizador |
| E-mail | `email` | |
| Senha | `password` | toggle show/hide (padrão do login) |

O tipo `TRegisterForm` está em `src/features/auth/types.ts`.

## Fonte de dados
Formulário local controlado (`useState`). Envio para API REST do backend Go — **integração pendente**.

## Decisões técnicas

- **Componente separado, não nova rota** — o wireframe posiciona o cadastro no mesmo contexto visual do login (mesmo fundo gradiente, mesma logo). Criar `/register` separado quebraria o fluxo. Toggle de estado na `LoginPage` foi a solução mínima.
- **Select nativo + chevron SVG** — sem dependência de `shadcn/ui Select` que não está instalado. Select nativo estilizado com `appearance-none` e ícone âmbar via `background-image` SVG inline.
- **`animate-card-enter` em `index.css`** — `tailwindcss-animate` não está instalado. Keyframe customizado adicionado ao `index.css` para não adicionar dependência.
- **`Button` reutilizado no CTA** — mesmo estilo do botão de login (amber-400, cor plana). Não criar variante ad-hoc — [[coding-conventions]] exige reuso.
- **`ArrowLeft` no header** — semântica de "voltar" mais clara que X para o usuário.

> [!warning] Integração pendente
> O botão "Enviar solicitação" não tem handler de submit conectado à API. Implementar quando o endpoint de cadastro do backend estiver disponível.

## Edge cases conhecidos
- Selects iniciam com `value=""` e opção `disabled` como placeholder — evita envio de valor vazio sem validação explícita
- Fechar o card (`onClose`) não reseta o formulário na `LoginPage`, mas o `RegisterCard` desmonta e recria estado limpo na próxima abertura

## Relacionado
- [[login-page]] — página pai que gerencia o toggle
- [[coding-conventions]] — padrões de estrutura de componente seguidos
