---
title: DRY — Divergências Intencionais
date: 2026-05-30
tags:
  - reports
  - dry
  - refactoring
---

# Divergências Intencionais — NÃO compartilhadas

> Código que PARECE duplicado mas é intencional manter separado.

---

## 2026-05-30

| Item | Arquivos divergentes | Motivo da divergência |
|------|---------------------|----------------------|
| Classe CSS de `<select>` | `RegisterCard.tsx` (usa `appearance-none` + CHEVRON_SVG customizado) vs `SearchDocsPage`, `ManageUsersPage`, `ProfilePage` (select nativo básico) | `RegisterCard` é card de login com design polido — select aparente com chevron amber customizado é intencional. Páginas internas usam select nativo simples. **Não unificar.** |
| Primeiro item de "Rows per page" | `AccessRequestsPage.tsx` tem opção `5` como primeira; `SearchDocsPage` e `ManageUsersPage` têm `10` | Solicitações de acesso têm volume menor esperado. Diferença intencional de UX. **Não unificar.** |
| Select nos modais (`EditAccessModal`, `ViewUserModal`) vs selects de página | Modais usam `cn()` com lógica de placeholder color; páginas usam classe estática | Modais precisam de estilo condicional para o estado placeholder (cor cinza vs preta). Lógica diferente, não apenas duplicação. **Não unificar a classe base sem preservar o `cn()`.** |
| `handleChange` em `RegisterCard` vs `ViewUserModal` | `RegisterCard` usa `e.target.name` como chave dinâmica; `ViewUserModal` usa `handleChange(field, value)` | Diferentes estratégias de update de form state — ambas válidas, diferentes contratos de chamada. |

---

Ver também: [[dry-refactoring]] | [[dry-refac-duplications-solved]] | [[dry-refac-extraction-pendings]]
