---
title: Profile Page
date: 2026-05-30
tags:
  - page
  - profile
  - usuario
---

# Profile Page

## O que é
Tela de gestão de perfil do usuário autenticado. Permite visualizar e editar dados pessoais (nome, cargo, e-mail, senha) e consultar informações de acesso à plataforma (tipo e tempo de acesso).

## Para quem
Qualquer usuário autenticado na plataforma.

## Como funciona
Usuário acessa via botão de perfil no rodapé da Navbar lateral (`/perfil`). Visualiza seus dados atuais, edita campos permitidos e salva. Os campos de acesso (tipo e tempo) são somente leitura — vindos do backend. Há atalhos para solicitar novo acesso e visualizar documentos próprios.

## Componentes principais

- `src/pages/ProfilePage.tsx` — página completa
- `src/components/Navbar.tsx` — botão de perfil no rodapé (NavLink para `/perfil`)
- `src/components/ui/button` — Button
- `src/components/ui/input` — Input

## Layout

Grid 2 colunas:

| Coluna Esquerda (editável) | Coluna Direita (read-only + ações) |
|---|---|
| Nome completo | Tipo de Acesso |
| Instituição | Tempo de Acesso (Em dias) |
| Cargo (select) | Botão: Solicitar novo acesso |
| E-mail | Botão: Visualizar meus documentos |
| Senha (toggle show/hide) | |
| Botão: Salvar novos Dados | |

## Fonte de dados
Atualmente usa `MOCK_USER` hardcoded em `ProfilePage.tsx`. Substituir por chamada REST ao backend quando integração for feita — endpoint de perfil do usuário autenticado.

## Regras de negócio

- **Instituição**: editável — campo com estado local, receberá valor real do backend quando integrado
- **Tipo de Acesso** e **Tempo de Acesso**: read-only — gerenciados pelo admin via [[access-requests-page]]
- **Senha**: campo vazio por padrão, preencher apenas para alterar
- **Cargo**: select com opções fixas (Treinador, Médico, Analista, Fisioterapeuta, Nutricionista, Psicólogo, Coordenador)

## Decisões técnicas

- Botão de perfil na Navbar convertido de `<div>` estático para `<NavLink to="/perfil">` com mesmo estilo visual dos itens de nav (isActive state)
- Todos os 5 campos da coluna esquerda editáveis com estado local (`useState`) — prontos para receber valores reais da API
- Toggle de senha usa `Eye`/`EyeOff` do lucide-react, estado local `showPassword`

## Edge cases conhecidos

- `MOCK_USER.name` aparece tanto no `<h1>` quanto no campo "Nome completo" — ao integrar com API, atualizar os dois
- Salvar novos Dados e os botões de ação ainda não têm handlers reais — apenas estrutura visual

## Relacionado
- [[navbar-component]] — NavLink de perfil no rodapé da sidebar
- [[access-requests-page]] — gestão de acessos pelo admin
