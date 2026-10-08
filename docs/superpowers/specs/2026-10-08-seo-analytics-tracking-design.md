# Design Document: SEO, Engajamento e Rastreamento de Métricas (MostruárioApp)

**Data:** 08/10/2026  
**Status:** Aprovado  
**Autor:** Antigravity & Especialista de Marketing / ArtCoder  
**Projeto:** Landing Page do MostruárioApp  
**Domínio Canônico Oficial:** `https://www.mostruarioapp.com.br`  

---

## 1. Visão Geral e Objetivos de Marketing

O **MostruárioApp** é um aplicativo móvel 100% *Offline-First* voltado para o controle de maletas de semijoias, produtos consignados e romaneios de acerto. 

Este projeto tem como meta elevar o desempenho orgânico (SEO) da landing page e estruturar uma mensuração completa de conversão e comportamento de usuário por meio do **Google Tag Manager (GTM-NMLF6SWM)** e Google Analytics 4 (GA4).

### Metas Principais:
1. **Indexação e Visibilidade no Google Search**: Estabelecer metadados completos, URLs canônicas com `www`, sitemap e robots.txt para indexação prioritária em termos de busca de alta intenção comercial.
2. **Rich Snippets via Schema.org**: Apresentar dados estruturados de `SoftwareApplication` e `FAQPage` para garantir destaque visual na SERP do Google.
3. **Engajamento e Compartilhamento Social**: Configurar tags Open Graph e Twitter Cards com imagens otimizadas para pré-visualização no WhatsApp, redes sociais e comunicadores.
4. **Mensuração do Funil de Conversão**: Rastrear intenção de download do app na Google Play Store, simulação de acerto de consignação e engajamento com perguntas frequentes na camada de dados (`dataLayer`).

---

## 2. SEO Técnico & Metadados On-Page

### 2.1. Domínio Canônico
Todas as páginas devem ter a URL canônica explícita apontando para `https://www.mostruarioapp.com.br/` (com `www`):
* `index.html`: `https://www.mostruarioapp.com.br/`
* `privacidade.html`: `https://www.mostruarioapp.com.br/privacidade.html`
* `termos-de-uso.html`: `https://www.mostruarioapp.com.br/termos-de-uso.html`

### 2.2. Metatags Estratégicas (`index.html`)
* **Title:** `MostruárioApp - Controle de Maletas de Semijoias e Consignações 100% Offline`
* **Meta Description:** `Aplicativo para controle de maletas de semijoias, consignações e acerto de mercadorias 100% offline. Calcule sobras por contagem reversa, gere romaneios em PDF e receba por Pix no balcão sem precisar de internet.`
* **Meta Keywords:** `maleta de semijoias, controle de consignação, acerto de maleta, romaneio consignado, app semijoias offline, contagem reversa, pix offline`
* **Robots:** `index, follow, max-image-preview:large`

### 2.3. Social Share (Open Graph & Twitter Cards)
* `og:type`: `website`
* `og:locale`: `pt_BR`
* `og:site_name`: `MostruárioApp`
* `og:url`: `https://www.mostruarioapp.com.br/`
* `og:title`: `MostruárioApp - Controle de Maletas de Semijoias e Acerto Offline`
* `og:description`: `Elimine cadernos e erros manuais. Controle maletas, calcule sobras por contagem reversa e gere romaneios em PDF sem precisar de internet.`
* `og:image`: `https://www.mostruarioapp.com.br/assets/images/app-screen.png`
* `twitter:card`: `summary_large_image`
* `twitter:title`: `MostruárioApp - Controle de Maletas e Consignações`
* `twitter:description`: `Conferência ágil de mercadorias consignadas e romaneios em PDF 100% offline.`
* `twitter:image`: `https://www.mostruarioapp.com.br/assets/images/app-screen.png`

---

## 3. Dados Estruturados (Schema.org JSON-LD)

Será injetado em `index.html` um bloco JSON-LD contendo múltiplos schemas integrados:

### 3.1. `SoftwareApplication`
* `@type`: `SoftwareApplication`
* `name`: `MostruárioApp`
* `applicationCategory`: `BusinessApplication`
* `operatingSystem`: `Android`
* `offers`: `Offer` com `price: 0.00`, `priceCurrency: BRL` (Freemium)
* `installUrl`: `https://play.google.com/store/apps/details?id=br.com.artcoder.mostruarioapp`
* `description`: `Aplicativo móvel 100% offline para gestão de mostruários, consignações de semijoias e acertos de balcão com contagem reversa.`

### 3.2. `FAQPage`
* Mapeamento estruturado das 6 principais dúvidas listadas na seção FAQ do site:
  1. *O MostruárioApp realmente funciona sem internet?*
  2. *Como funciona a contagem reversa?*
  3. *Como funciona o Pix offline sem conexão?*
  4. *O plano grátis tem limite de tempo?*
  5. *Meus dados ficam seguros?*
  6. *Preciso cadastrar cartão de crédito para testar?*

### 3.3. `Organization`
* `@type`: `Organization`
* `name`: `ArtCoder Sistemas e Tecnologia Ltda`
* `url`: `https://www.mostruarioapp.com.br`
* `logo`: `https://www.mostruarioapp.com.br/assets/images/mostruarioapp.svg`

---

## 4. Arquivos de Rastreio e Indexação Raiz

### 4.1. `robots.txt`
```text
User-agent: *
Allow: /

Sitemap: https://www.mostruarioapp.com.br/sitemap.xml
```

### 4.2. `sitemap.xml`
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

---

## 5. Rastreamento e Camada de Dados (DataLayer & GTM)

### 5.1. Google Tag Manager
* Contêiner ativo: `GTM-NMLF6SWM` implementado no topo de `<head>` e no início de `<body>` de todas as páginas HTML.

### 5.2. Links de CTA Atualizados
Todos os botões de ação na landing page passarão a ter links funcionais e identificadores únicos de rastreamento:
* Link de destino: `https://play.google.com/store/apps/details?id=br.com.artcoder.mostruarioapp`
* Atributos: `target="_blank" rel="noopener noreferrer"`
* Localizações monitoradas:
  * `navbar_cta` ("Baixar Grátis" no menu superior)
  * `hero_google_play` (Botão "Disponível no Google Play" na dobra principal)
  * `pricing_free_tier` (Botão "Começar Gratuitamente" no card do plano Starter)
  * `pricing_pro_tier` (Botão "Assinar Plano Profissional" no card Pro)
  * `footer_cta` (Botão "Baixar MostruárioApp Grátis" no banner de fechamento)

### 5.3. Taxonomia de Eventos no `window.dataLayer` (`js/main.js`)
Função utilitária segura:
```javascript
function trackEvent(eventName, eventParams = {}) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: eventName,
        ...eventParams,
        timestamp: new Date().toISOString()
    });
}
```

1. **`download_click`**
   * Disparo: Ao clicar em qualquer CTA de download.
   * Parâmetros: `{ cta_location: string, destination_url: string }`
2. **`simulator_use`**
   * Disparo: Ao alternar entre kits (Ímãs vs. Semijoias) ou após alteração nos campos de peças restantes.
   * Parâmetros: `{ kit_name: string, model_type: string, pieces_sold: number, total_amount: number }`
3. **`pix_copy`**
   * Disparo: Ao clicar no botão de copiar chave Pix gerada no simulador.
   * Parâmetros: `{ kit_name: string, amount: number }`
4. **`faq_open`**
   * Disparo: Ao expandir qualquer pergunta no acordeão do FAQ.
   * Parâmetros: `{ question_title: string }`

---

## 6. Critérios de Sucesso e Verificação
1. **GTM Ativo e Sem Erros:** Presença de `window.dataLayer` inicializado e ausência de erros no console do navegador.
2. **Rich Results Validator / Validador Schema:** Schemas JSON-LD válidos segundo especificações do schema.org.
3. **SEO Audit:** Meta tags presentes, canonical com `www.mostruarioapp.com.br`, favicon e viewport corretos.
4. **Disparo de Eventos:** Inspeção manual do `dataLayer.push` ao interagir com CTAs, simulador e FAQ.
