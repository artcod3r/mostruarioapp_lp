# SEO, Analytics e Rastreamento Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implementar o pacote completo de SEO Técnico (Metadados, Open Graph, Twitter Cards, Schema.org JSON-LD, Sitemap, Robots.txt) e camada de dados (`dataLayer`) para mensuração de conversão no Google Tag Manager (GTM-NMLF6SWM) na landing page MostruárioApp.

**Architecture:** A aplicação é estática (HTML5 + Tailwind CSS + Vanilla JS). A indexação do Google será potencializada por metadados completos com canonical `https://www.mostruarioapp.com.br/` e Schemas JSON-LD (`SoftwareApplication` e `FAQPage`). As ações de conversão e engajamento dispararão eventos padronizados no `window.dataLayer` que alimentam o contêiner GTM já configurado.

**Tech Stack:** HTML5, Schema.org (JSON-LD), XML (Sitemap), Robots.txt, Vanilla JavaScript (ES6+), Google Tag Manager (`GTM-NMLF6SWM`).

## Global Constraints

- Domínio canônico oficial fixo: `https://www.mostruarioapp.com.br` (com `www`).
- Google Play URL: `https://play.google.com/store/apps/details?id=br.com.artcoder.mostruarioapp`.
- Contêiner GTM mantido: `GTM-NMLF6SWM`.
- Todos os links externos abrem em nova aba com `target="_blank" rel="noopener noreferrer"`.
- Código limpo, sem dependências externas adicionais, compatível com os navegadores atuais.

---

### Task 1: Arquivos Raiz de Indexação (robots.txt e sitemap.xml)

**Files:**
- Create: `robots.txt`
- Create: `sitemap.xml`

**Interfaces:**
- Consumes: Domínio canônico `https://www.mostruarioapp.com.br`.
- Produces: Arquivos de diretrizes de rastreamento e mapa de URLs indexáveis para os mecanismos de busca.

- [ ] **Step 1: Criar o arquivo `robots.txt`**
Configurar permissão de leitura universal e indicação do sitemap oficial.
```text
User-agent: *
Allow: /

Sitemap: https://www.mostruarioapp.com.br/sitemap.xml
```

- [ ] **Step 2: Criar o arquivo `sitemap.xml`**
Incluir as páginas `index.html` (como `/`), `privacidade.html` e `termos-de-uso.html`.
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.mostruarioapp.com.br/</loc>
    <lastmod>2026-10-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.mostruarioapp.com.br/privacidade.html</loc>
    <lastmod>2026-10-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://www.mostruarioapp.com.br/termos-de-uso.html</loc>
    <lastmod>2026-10-08</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>
```

- [ ] **Step 3: Validar a sintaxe dos arquivos**
Executar verificação rápida no terminal se o XML é bem formado e robots.txt está acessível.
```bash
python3 -c "import xml.etree.ElementTree as ET; ET.parse('sitemap.xml'); print('Sitemap XML válido!')"
```

- [ ] **Step 4: Commit**
```bash
git add robots.txt sitemap.xml
git commit -m "feat(seo): add robots.txt and sitemap.xml with canonical domain"
```

---

### Task 2: Metatags On-Page, Canonical e Open Graph em index.html, privacidade.html e termos-de-uso.html

**Files:**
- Modify: `index.html:1-35`
- Modify: `privacidade.html:1-35`
- Modify: `termos-de-uso.html:1-35`

**Interfaces:**
- Consumes: Título, descrições, imagem `assets/images/app-screen.png`, URLs canônicas.
- Produces: Meta tags para visualização social no WhatsApp/Twitter/Facebook e tags de indexação nos buscadores.

- [ ] **Step 1: Inserir Canonical e Meta Tags em `index.html`**
Adicionar no `<head>`:
  - `<link rel="canonical" href="https://www.mostruarioapp.com.br/">`
  - `<meta name="description" content="Aplicativo para controle de maletas de semijoias, consignações e acerto de mercadorias 100% offline. Calcule sobras por contagem reversa, gere romaneios em PDF e receba por Pix no balcão sem precisar de internet.">`
  - `<meta name="keywords" content="maleta de semijoias, controle de consignação, acerto de maleta, romaneio consignado, app semijoias offline, contagem reversa, pix offline">`
  - `<meta name="robots" content="index, follow, max-image-preview:large">`
  - Open Graph (`og:type`, `og:locale`, `og:site_name`, `og:url`, `og:title`, `og:description`, `og:image`)
  - Twitter Card (`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image`)

- [ ] **Step 2: Inserir Canonical e Meta Tags em `privacidade.html` e `termos-de-uso.html`**
Adicionar no `<head>` de cada arquivo:
  - Em `privacidade.html`: `<link rel="canonical" href="https://www.mostruarioapp.com.br/privacidade.html">` e `<meta name="description" content="Política de Privacidade do MostruárioApp - Armazenamento de dados 100% local com SQLite.">`
  - Em `termos-de-uso.html`: `<link rel="canonical" href="https://www.mostruarioapp.com.br/termos-de-uso.html">` e `<meta name="description" content="Termos de Uso e Condições Gerais do aplicativo MostruárioApp.">`

- [ ] **Step 3: Validar a presença das tags**
```bash
grep -E "canonical|og:image|twitter:card" index.html privacidade.html termos-de-uso.html
```

- [ ] **Step 4: Commit**
```bash
git add index.html privacidade.html termos-de-uso.html
git commit -m "feat(seo): add canonical, open graph, and metadata tags across all pages"
```

---

### Task 3: Schemas Estruturados Schema.org (JSON-LD) em index.html

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: Especificações de `SoftwareApplication`, `FAQPage`, `Organization`.
- Produces: Bloco `<script type="application/ld+json">` válido no `<head>`.

- [ ] **Step 1: Criar e injetar o bloco JSON-LD com os 3 Schemas**
Incluir no `<head>` de `index.html`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.mostruarioapp.com.br/#app",
      "name": "MostruárioApp",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Android",
      "description": "Aplicativo móvel 100% offline para gestão de mostruários, consignações de semijoias e acertos de balcão com contagem reversa e Pix offline.",
      "image": "https://www.mostruarioapp.com.br/assets/images/app-screen.png",
      "offers": {
        "@type": "Offer",
        "price": "0.00",
        "priceCurrency": "BRL",
        "category": "Freemium"
      },
      "installUrl": "https://play.google.com/store/apps/details?id=br.com.artcoder.mostruarioapp",
      "publisher": {
        "@type": "Organization",
        "name": "ArtCoder Sistemas e Tecnologia Ltda",
        "url": "https://www.mostruarioapp.com.br"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.mostruarioapp.com.br/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "O MostruárioApp realmente funciona sem internet?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim, 100%. O MostruárioApp foi concebido com arquitetura Offline-First. Todo o catálogo, romaneios, histórico de acertos e cálculo matemático de QR Code Pix operam no banco local SQLite do seu aparelho sem necessitar de 3G, 4G ou Wi-Fi."
          }
        },
        {
          "@type": "Question",
          "name": "Como funciona a contagem reversa?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Em vez de conferir cada peça vendida, você só conta o que sobrou no mostruário. O aplicativo subtrai automaticamente o saldo restante da carga inicial entregue e calcula instantaneamente a comissão e o valor a receber."
          }
        },
        {
          "@type": "Question",
          "name": "Como funciona o Pix offline sem conexão?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "O MostruárioApp gera matematicamente a cadeia estática EMV padrão Banco Central no próprio celular. Sua parceira abre o banco dela, lê a tela do seu celular e efetua o pagamento na hora."
          }
        },
        {
          "@type": "Question",
          "name": "O plano grátis tem limite de tempo?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não. O plano gratuito é vitalício e permite gerenciar até 3 mostruários/parceiros ativos com romaneios ilimitados sem qualquer cobrança ou necessidade de cartão."
          }
        },
        {
          "@type": "Question",
          "name": "Meus dados ficam seguros?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Sim. Todos os dados comerciais permanecem exclusivamente criptografados no banco de dados local do seu dispositivo móvel, em estrita conformidade com a LGPD."
          }
        },
        {
          "@type": "Question",
          "name": "Preciso cadastrar cartão de crédito para testar?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Não. Não solicitamos dados de pagamento para download ou uso da versão gratuita."
          }
        }
      ]
    },
    {
      "@type": "Organization",
      "@id": "https://www.mostruarioapp.com.br/#organization",
      "name": "ArtCoder Sistemas e Tecnologia Ltda",
      "url": "https://www.mostruarioapp.com.br",
      "logo": "https://www.mostruarioapp.com.br/assets/images/mostruarioapp.svg"
    }
  ]
}
</script>
```

- [ ] **Step 2: Validar o JSON-LD extraído do HTML**
Executar script de validação para garantir que o JSON parseia perfeitamente sem erros de formatação.
```bash
python3 -c "import bs4, json; soup = bs4.BeautifulSoup(open('index.html').read(), 'html.parser'); script = soup.find('script', {'type': 'application/ld+json'}); data = json.loads(script.string); print('JSON-LD válido! Entidades:', len(data['@graph']))"
```

- [ ] **Step 3: Commit**
```bash
git add index.html
git commit -m "feat(seo): add Schema.org JSON-LD for SoftwareApplication, FAQPage and Organization"
```

---

### Task 4: Atualização dos Links de Conversão (CTAs) em index.html

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: Google Play Store URL `https://play.google.com/store/apps/details?id=br.com.artcoder.mostruarioapp`.
- Produces: Tags `<a>` semânticas com atributo de rastreamento `data-track-cta` e identificadores para o Google Play.

- [ ] **Step 1: Atualizar o botão da Navbar**
Mudar de `#download` para link direto ou link com tracking:
```html
<a href="https://play.google.com/store/apps/details?id=br.com.artcoder.mostruarioapp"
   target="_blank" rel="noopener noreferrer" data-track-cta="navbar"
   class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 text-sm font-semibold shadow-md transition-all hover:scale-105">
    <i data-lucide="arrow-down-to-line" class="w-4 h-4 text-amber-400"></i>
    <span>Baixar Grátis</span>
</a>
```

- [ ] **Step 2: Atualizar o botão do Hero (Google Play)**
Mudar o `<button>` em `#download` para `<a>`:
```html
<a href="https://play.google.com/store/apps/details?id=br.com.artcoder.mostruarioapp"
   target="_blank" rel="noopener noreferrer" data-track-cta="hero"
   class="w-full sm:w-auto flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-slate-900 text-white hover:bg-slate-800 shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer">
    <i data-lucide="play" class="w-6 h-6 fill-amber-400 text-amber-400"></i>
    <div class="text-left">
        <p class="text-[10px] uppercase font-bold tracking-wider text-slate-400 leading-none">Disponível no</p>
        <p class="text-base font-heading font-bold text-white leading-tight">Google Play</p>
    </div>
</a>
```

- [ ] **Step 3: Atualizar botões de planos (Pricing) e Banner Final**
Adicionar links reais com `data-track-cta="pricing-free"`, `data-track-cta="pricing-pro"` e `data-track-cta="footer"`.

- [ ] **Step 4: Commit**
```bash
git add index.html
git commit -m "feat(cro): replace static CTA buttons with real Google Play tracking links"
```

---

### Task 5: Camada de Dados DataLayer e Métricas no JavaScript (js/main.js)

**Files:**
- Modify: `js/main.js`

**Interfaces:**
- Consumes: Ações de clique em CTA, eventos do simulador, cópia de Pix e expansão do FAQ.
- Produces: Chamadas para `window.dataLayer.push({ event, ... })`.

- [ ] **Step 1: Implementar função `trackEvent(eventName, params)` em `js/main.js`**
Garantir inicialização segura do `window.dataLayer`:
```javascript
function trackEvent(eventName, params = {}) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: eventName,
        ...params,
        timestamp: new Date().toISOString()
    });
}
```

- [ ] **Step 2: Adicionar listener para cliques em CTAs (`download_click`)**
Capturar cliques em todos os elementos com `data-track-cta`:
```javascript
document.querySelectorAll('[data-track-cta]').forEach(cta => {
    cta.addEventListener('click', function() {
        const location = this.getAttribute('data-track-cta');
        trackEvent('download_click', {
            cta_location: location,
            destination_url: this.getAttribute('href') || 'https://play.google.com/store/apps/details?id=br.com.artcoder.mostruarioapp'
        });
    });
});
```

- [ ] **Step 3: Integrar eventos do simulador (`simulator_use`) e Pix (`pix_copy`)**
- Na função `selectKit(key)` e `recalculate()`: disparar `simulator_use`.
- Na função de cópia do código Pix (`copyPixCode`): disparar `pix_copy`.

- [ ] **Step 4: Integrar eventos do FAQ (`faq_open`)**
No clique para expandir perguntas frequentes, disparar evento `faq_open` com `question_title`.

- [ ] **Step 5: Testar e validar a lógica de eventos no console**
Verificar se nenhuma quebra de sintaxe existe em `js/main.js` executando node sintaxe check.
```bash
node -c js/main.js
```

- [ ] **Step 6: Commit**
```bash
git add js/main.js
git commit -m "feat(analytics): add dataLayer event tracking for download clicks, simulator, pix copy, and FAQ"
```

---

### Task 6: Auditoria Final e Verificação Completa

**Files:**
- Teste e validação geral: `index.html`, `privacidade.html`, `termos-de-uso.html`, `robots.txt`, `sitemap.xml`, `js/main.js`.

- [ ] **Step 1: Testar sitemap, robots, metadados e scripts sem erros**
- [ ] **Step 2: Simular cliques e navegação para garantir que o visual do Tailwind e os scripts não foram afetados**
- [ ] **Step 3: Commit final se houver ajustes residuais**
