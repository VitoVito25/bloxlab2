## Resumo do Projeto

**Projeto:** BloxLab Data Availability

**O que faz:** Plataforma frontend para publicar e consultar dados de times de futebol de base na blockchain bloxberg (rede de universidades). Contrato inteligente e backend em Go + MongoDB já implementados. Este repositório cobre apenas o frontend, que consome a API REST do backend e exibe os dados on-chain. Login e autenticação são gerenciados 100% pelo backend — sem lógica de auth no frontend.

**Stack:**
- React + TypeScript
- Tailwind CSS (estilização)
- shadcn/ui — componentes em `src/components/ui/` (Table, Badge, Card, etc.)
- react-router-dom v6 (roteamento)
- Vite (build)
- Gráficos: a definir (shadcn/ui + Recharts quando necessário)

**Estrutura de pastas — feature-based:**
```
src/
├── components/        ← componentes compartilhados entre features
│   └── ui/            ← componentes shadcn/ui
├── features/          ← uma pasta por domínio (teams, publications, athletes…)
│   └── [feature]/
│       ├── components/
│       ├── hooks/
│       ├── types.ts
│       └── utils.ts
├── utils/             ← helpers genéricos reutilizáveis
├── hooks/             ← hooks compartilhados entre features
└── pages/             ← páginas (orquestram features)
```

**Padrão arquitetural:** feature-based com custom hooks — hook faz fetch REST + parse, componente de página orquestra estado de UI, componentes presentacionais só recebem props e renderizam.

## Protocolo de Início de Sessão

Execute **nesta ordem**, sem pular etapas:

### 1. Carregar estrutura do vault

Ler `documentation/{general}/vault-structure.md` para mapear pastas, convenções de prefixo e regra de pareamento tools → reports.

### 2. Carregar todas as instruções

Ler **todos** os arquivos em `documentation/{instructions}/`:

- `ai-best-practices.md` — contrato de comportamento, fluxo obrigatório por sessão, regras de comunicação
- `coding-conventions.md` — nomenclatura, estrutura de componente, stack
- `dry-refactoring.md` — protocolo DRY, estrutura atual de utils, divergências intencionais
- `separation-of-concerns.md` — padrão container/presentational, pendências de refactor
- `dead-code-audit.md` — identificação e remoção de código morto
- `performance-audit.md` — checklist de otimizações e resultados

> Não pular nenhum arquivo. Cada um contém restrições ativas que afetam o plano.

### 3. Confirmar leitura

Após ler todos os arquivos acima, reportar:

```
Vault carregado. [N] instruções lidas. Pronto para receber demanda.
```

Só então aguardar a demanda do usuário.

---

## Regras Permanentes

- Consultar `{instructions}` antes de qualquer estruturação de plano — nunca da memória
- Relatórios de audit ficam em `{reports}/` — nunca em `{instructions}/`
- Vault desatualizado = risco de retrabalho — atualizar no Step 5 de cada sessão
- Ver [[ai-best-practices]] para fluxo completo (ENTENDER → ESTRUTURAR → APRESENTAR → EXECUTAR → DOCUMENTAR)

### Documentação obrigatória — sem exceção

**Todo artefato gerado durante execução de código deve ser documentado no vault antes de reportar o tier como concluído.** Sem exceção.

| Artefato criado | Onde documentar |
|-----------------|-----------------|
| Nova página / tela | `documentation/{page}/[nome].md` — usar template de page |
| Novo componente `src/components/ui/` | `documentation/{general}/ui-components.md` — adicionar seção |
| Nova feature (`src/features/[nome]/`) | `documentation/{general}/[nome]-feature.md` |
| Novo hook compartilhado (`src/hooks/`) | documentar na nota da feature ou em `{general}/` |
| Novo utilitário (`src/lib/` ou `src/utils/`) | documentar na nota de setup ou feature correspondente |
| Decisão arquitetural ou de setup | `documentation/{general}/project-setup.md` |

**Regra de ouro:** se criou o arquivo, criou a nota. Se atualizou componente existente, atualizou a nota. Vault e código andam juntos — vault defasado é documentação morta.

> Após cada nota criada/atualizada: atualizar `documentation/{general}/vault-structure.md` com a nova entrada.

### 1. Think Before Coding
Don't assume. Don't hide confusion. Surface tradeoffs.

Before implementing:

State your assumptions explicitly. If uncertain, ask.
If multiple interpretations exist, present them - don't pick silently.
If a simpler approach exists, say so. Push back when warranted.
If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First
Minimum code that solves the problem. Nothing speculative.

No features beyond what was asked.
No abstractions for single-use code.
No "flexibility" or "configurability" that wasn't requested.
No error handling for impossible scenarios.
If you write 200 lines and it could be 50, rewrite it.
Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes
Touch only what you must. Clean up only your own mess.

When editing existing code:

Don't "improve" adjacent code, comments, or formatting.
Don't refactor things that aren't broken.
Match existing style, even if you'd do it differently.
If you notice unrelated dead code, mention it - don't delete it.
When your changes create orphans:

Remove imports/variables/functions that YOUR changes made unused.
Don't remove pre-existing dead code unless asked.
The test: Every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution
Define success criteria. Loop until verified.

Transform tasks into verifiable goals:

"Add validation" → "Write tests for invalid inputs, then make them pass"
"Fix the bug" → "Write a test that reproduces it, then make it pass"
"Refactor X" → "Ensure tests pass before and after"
For multi-step tasks, state a brief plan:

1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.
