# Design Spec: Cards de Preço com Opções Mensal e Vitalícia

- **Data:** 2026-10-17
- **Status:** Aprovado para Planejamento
- **Arquivo Alvo:** `index.html`

---

## 1. Contexto e Objetivo

Atualmente, a Landing Page do MostruárioApp exibe dois cards na seção de preços:
1. **Plano Gratuito** (R$ 0 / para sempre - até 3 pontos).
2. **Versão Vitalícia Pro** (R$ 49,90 - pagamento único), com uma menção secundária em texto pequeno (*"ou R$ 9,90 / mês via Google Play"*).

Essa apresentação oculta a modalidade de assinatura mensal, reduzindo a clareza para usuários que preferem um desembolso inicial menor ou um compromisso mensal flexível.

**Objetivo:**
Reestruturar a seção de preços para exibir **3 cards dedicados lado a lado**:
- **Plano Gratuito**: R$ 0 / para sempre (Iniciante).
- **Assinatura Mensal**: R$ 9,90 / mês (Flexível, cancele quando quiser).
- **Licença Vitalícia**: R$ 49,90 em pagamento único (Melhor Custo-Benefício, destaque visual).

---

## 2. Arquitetura de Layout & Responsividade

### 2.1 Grade de Cards
- O contêiner de preços será ajustado de `max-w-4xl grid md:grid-cols-2` para `max-w-6xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch mx-auto`.
- No mobile: cards empilhados verticalmente (1 coluna).
- No tablet (`md`): 2 colunas com layout fluido ou alinhamento harmônico.
- No desktop (`lg`): 3 colunas de mesma altura (`items-stretch`).

### 2.2 Hierarquia Visual dos 3 Cards
1. **Card 1 - Plano Gratuito (Iniciante):**
   - Fundo: `bg-slate-50 border border-slate-200`
   - Badge: `bg-slate-200 text-slate-700` ("Iniciante")
   - Preço: `R$ 0` + subtexto `/ para sempre`
   - CTA: Estilo secundário neutro (`bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold`)
   - Tracking: `data-track-cta="pricing_free"`

2. **Card 2 - Assinatura Mensal (Flexível):**
   - Fundo: `bg-white border-2 border-slate-200 hover:border-indigo-400 shadow-md transition-all`
   - Badge: `bg-indigo-50 text-indigo-700 border border-indigo-200` ("Flexível")
   - Preço: `R$ 9,90` + subtexto `/ mês`
   - Legenda: `Sem fidelidade • Cancele quando quiser via Google Play`
   - Recursos: Todos os recursos Pro liberados durante a assinatura ativa.
   - CTA: Estilo moderno em azul/índigo (`bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-md shadow-indigo-600/20`)
   - Tracking: `data-track-cta="pricing_monthly"`

3. **Card 3 - Licença Vitalícia (Melhor Custo-Benefício - Destaque Principal):**
   - Fundo: `bg-slate-900 text-white border-2 border-amber-500 shadow-2xl relative overflow-hidden`
   - Faixa Superior: Gradiente âmbar com badge `Mais Escolhido` ou `Melhor Custo-Benefício`
   - Preço: `R$ 49,90` + tag `PAGAMENTO ÚNICO`
   - Legenda de Economia: `Equivale a apenas 5 meses de assinatura — pague uma vez e use para sempre!`
   - Recursos: Todos os recursos Pro com ícones dourados destacados.
   - CTA: Botão de conversão de alto impacto (`bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-heading font-extrabold shadow-lg shadow-amber-600/30`)
   - Tracking: `data-track-cta="pricing_lifetime"`

---

## 3. Matriz de Recursos nos Cards

| Recurso | Plano Gratuito | Assinatura Mensal (R$ 9,90) | Licença Vitalícia (R$ 49,90) |
| :--- | :---: | :---: | :---: |
| **Pontos e Parceiros Ativos** | Até 3 pontos | **Ilimitados** | **Ilimitados** |
| **Lotes e Acertos Ilimitados** | Sim | Sim | Sim |
| **Modo 100% Offline** | Sim | Sim | Sim |
| **Geração de Pix BRCode Estático** | Sim | Sim | Sim |
| **Logomarca Própria no Romaneio** | Não (tachado) | **Sim** | **Sim** |
| **Remoção de Marca d'água em PDF** | Não (tachado) | **Sim** | **Sim** |
| **Backup Estruturado (JSON/SQLite)**| Não (tachado) | **Sim** | **Sim** |
| **Suporte Prioritário no WhatsApp** | Não (tachado) | **Sim** | **Sim** |
| **Modelo de Cobrança** | Gratuito | Cobrança mensal Google Play | Pague 1x, acesso para sempre |

---

## 4. Atualizações de Textos de Apoio e FAQ

### 4.1 Subtítulo da Seção Preços
- Mantém o foco na liberdade de escolha:
  - Título: *"Comece de graça. Desbloqueie o Pro quando expandir."*
  - Subtítulo: *"Escolha entre a flexibilidade da assinatura mensal ou a economia definitiva da licença vitalícia."*

### 4.2 Rodapé da Seção Preços
- Mantém a indicação de segurança:
  - *"Compra e assinatura processadas com segurança pelo Google Play Billing. Cancele ou gerencie a qualquer momento."*

### 4.3 FAQ (Pergunta 4)
- Atualizar a resposta do FAQ 4 (`faq-answer-4`) para mencionar explicitamente as duas opções:
  - **Texto Atual:** *"Quando o seu negócio crescer para o 4º parceiro, basta fazer o upgrade único para a versão Pro Vitalícia."*
  - **Novo Texto:** *"Quando o seu negócio crescer para o 4º parceiro, você escolhe como deseja assinar: através da assinatura mensal flexível por R$ 9,90/mês ou pelo pagamento único vitalício de R$ 49,90 para usar para sempre sem mensalidades."*

---

## 5. Rastreamento e Analytics

Os atributos `data-track-cta` garantem o monitoramento nos eventos de clique existentes no script de analytics do site:
- `pricing_free` (já existente)
- `pricing_monthly` (novo)
- `pricing_lifetime` (renomeado/especificado a partir de `pricing_pro` para diferenciar compras mensais de compras vitalícias)

---

## 6. Verificação de Qualidade e Integridade
- Validar a renderização dos ícones Lucide (`check`, `minus`, `check-circle-2`, `sparkles`, `shield-check`).
- Validar contraste de acessibilidade (WCAG AA) para textos e botões em fundo escuro e fundo claro.
- Validar responsividade em viewport mobile (<640px), tablet (768px) e desktop (>1024px).
