# Cards de Preço: Mensal e Vitalício - Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adicionar um card dedicado de assinatura mensal (R$ 9,90/mês) junto ao plano gratuito (R$ 0) e ao plano vitalício (R$ 49,90) em uma grade de 3 colunas responsiva no `index.html`.

**Architecture:** Atualizar a seção `#precos` no `index.html` alterando a grade para 3 colunas (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`), inserindo o novo card para Assinatura Mensal com identidade visual própria, enriquecendo o card Vitalício com destaque de economia e atualizando o item 4 do FAQ e eventos de rastreamento (`data-track-cta`).

**Tech Stack:** HTML5 semântico, Tailwind CSS (via CDN), Lucide Icons, Vanilla JavaScript / Analytics tracking tags.

## Global Constraints

- Manter compatibilidade total com Tailwind CSS e as classes existentes do design system da LP.
- Garantir responsividade perfeita em Mobile (<640px), Tablet (768px) e Desktop (>=1024px).
- Usar ícones oficiais do Lucide já importados na página (`check`, `minus`, `check-circle-2`, `shield-check`, `zap`).
- Manter links da Google Play Store atualizados com tags `data-track-cta` apropriadas: `pricing_free`, `pricing_monthly`, `pricing_lifetime`.
- Atualizar a resposta da pergunta 4 do FAQ para esclarecer as duas modalidades pagas.

---

### Task 1: Reestruturar o Contêiner da Seção de Preços e Textos de Introdução

**Files:**
- Modify: `index.html:1056-1072`

**Interfaces:**
- Consumes: Estrutura da seção `#precos`
- Produces: Contêiner de 3 colunas e textos atualizados

- [ ] **Step 1: Inspecionar linhas 1056 a 1072 em `index.html`**
- [ ] **Step 2: Atualizar o subtítulo da seção e classe do contêiner da grade**
  Substituir `max-w-4xl mx-auto` e `grid md:grid-cols-2` por `max-w-6xl mx-auto` e `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch`.
  Atualizar o parágrafo descritivo para destacar a escolha entre assinatura mensal ou licença vitalícia.
- [ ] **Step 3: Validar a sintaxe HTML do cabeçalho da seção**

---

### Task 2: Implementar o Card da Assinatura Mensal e Atualizar Cards Gratuito e Vitalício

**Files:**
- Modify: `index.html:1073-1188`

**Interfaces:**
- Consumes: Classes de estilo dos cards existentes
- Produces: 3 cards estilizados (Gratuito, Mensal R$ 9,90 e Vitalício R$ 49,90)

- [ ] **Step 1: Manter e ajustar o Card Gratuito**
  Garantir alinhamento e botão de CTA com `data-track-cta="pricing_free"`.
- [ ] **Step 2: Inserir o novo Card de Assinatura Mensal**
  - Título: "Assinatura Mensal"
  - Subtítulo: "Flexibilidade total para seu fluxo de trabalho"
  - Badge: "Flexível" (`bg-indigo-50 text-indigo-700 border border-indigo-200`)
  - Preço: "R$ 9,90" `/ mês`
  - Subtexto: "Sem fidelidade • Cancele quando quiser no Google Play"
  - Lista de benefícios Pro (com ícones `check` esmeralda ou índigo)
  - CTA: "Assinar Plano Mensal" com `data-track-cta="pricing_monthly"`
- [ ] **Step 3: Ajustar o Card da Versão Vitalícia Pro**
  - Badge de topo: "Melhor Custo-Benefício"
  - Preço: "R$ 49,90" com tag "PAGAMENTO ÚNICO"
  - Subtexto: Substituir o texto anterior de "ou R$ 9,90/mês" pelo destaque de economia: "Equivale a 5 meses de mensalidade — pague 1x e use para sempre!"
  - CTA: "Garantir Licença Vitalícia" com `data-track-cta="pricing_lifetime"`
- [ ] **Step 4: Atualizar a nota de rodapé da seção de preços**
  Indicar que tanto assinaturas quanto compras avulsas são processadas com segurança pela Google Play Billing.

---

### Task 3: Atualizar o FAQ (Item 4) e Validar Ícones e Rastreamento

**Files:**
- Modify: `index.html:1261-1266`

**Interfaces:**
- Consumes: Texto do FAQ existente
- Produces: Resposta da Pergunta 4 alinhada com as duas opções de upgrade

- [ ] **Step 1: Atualizar o texto da resposta `faq-answer-4`**
  Esclarecer que ao expandir além de 3 parceiros, o usuário pode escolher entre a assinatura mensal flexível (R$ 9,90/mês) ou a licença vitalícia definitiva (R$ 49,90).
- [ ] **Step 2: Verificar renderização de ícones Lucide e classes Tailwind**
  Certificar-se de que `lucide.createIcons()` continuará renderizando todos os ícones da nova seção sem erros.

---

### Task 4: Verificação Visual e Validação

**Files:**
- Check: `index.html`

- [ ] **Step 1: Executar validação de formatação e integridade do HTML**
- [ ] **Step 2: Testar a renderização localmente no navegador**
  Verificar layout nas 3 resoluções (Mobile 375px, Tablet 768px, Desktop 1200px).
- [ ] **Step 3: Fazer commit das alterações no Git**
