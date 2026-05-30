---
title: Upload Doc Page
date: 2026-05-30
tags:
  - page
  - upload
  - documents
---

# Upload Doc Page

## O que é
Tela para envio de documentos (PDF, XLSX, CSV) à blockchain bloxberg. O usuário informa um nome para o documento, seleciona o arquivo via seletor nativo do SO e confirma o envio.

## Para quem
Usuário autenticado com permissão de escrita no sistema.

## Como funciona
1. Usuário preenche "Nome do documento" (pode ser auto-preenchido ao selecionar o arquivo)
2. Clica "Procurar arquivos..." → seletor nativo abre, filtrando `.pdf`, `.xlsx`, `.csv`
3. Arquivo selecionado aparece na área "Documento": ícone contextual + nome + tamanho
4. "Limpar Arquivos" reseta o estado
5. "Enviar Documento" (desabilitado sem arquivo ou nome) → stub para integração futura

## Componentes principais

| Componente | Arquivo |
|-----------|---------|
| `Button` | `src/components/ui/button.tsx` |
| `Input` | `src/components/ui/input.tsx` |
| `AppLayout` | `src/components/AppLayout.tsx` (via route) |
| Ícones | `lucide-react`: Upload, FileText, Table, X |

## Fonte de dados
Nenhuma (stub). Campo de nome inicializado vazio; auto-preenchido com `file.name` se o campo estiver vazio ao selecionar o arquivo.

## Regras de negócio
- Aceita apenas `.pdf`, `.xlsx`, `.csv` (atributo `accept` no input oculto)
- Campo "Documento" exibe **somente o nome do arquivo** — sem preview de conteúdo
- Botão "Enviar Documento" desabilitado enquanto `file` ou `docName` forem vazios

## Decisões técnicas
- Input `type="file"` oculto (`hidden`) acionado programaticamente via `ref` → evita estilização do input nativo
- Sem drag-and-drop (não solicitado)
- Área "Documento" muda de `border-dashed border-gray-300` para `border-amber-400 bg-amber-50` ao selecionar arquivo
- Botão "Enviar Documento" usa `className` override (`bg-teal-500`) sobre o `Button` padrão amber para diferenciar ação primária destrutiva/irreversível das secundárias

## Edge cases conhecidos
- Se campo "Nome do documento" já preenchido ao selecionar arquivo: nome *não* é sobrescrito
- "Limpar Arquivos" reseta `fileInputRef.current.value` para permitir re-selecionar o mesmo arquivo

## Localização no código

```
src/pages/UploadDocPage.tsx   ← página completa (self-contained)
src/App.tsx                   ← route /enviar adicionada
```
