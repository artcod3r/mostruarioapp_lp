# MostruárioApp - Landing Page

Landing Page moderna, responsiva e de alta conversão para o aplicativo **MostruárioApp** — solução móvel 100% *Offline-First* voltada para artesãos, fabricantes e revendedoras de semijoias e produtos consignados.

---

## 📱 Sobre o MostruárioApp

O **MostruárioApp** simplifica a conferência e o acerto de mercadorias em consignação, eliminando cadernos e planilhas manuais:
- **Contagem Reversa:** Você só confere o que sobrou; o app calcula o que vendeu.
- **Pix Offline no Balcão:** Geração matemática de QR Code EMV Copia e Cola sem necessidade de sinal de internet.
- **Romaneios em PDF:** Comprovantes detalhados com assinatura digital na tela.
- **100% Offline-First:** Dados armazenados localmente via SQLite com privacidade garantida.

---

## 🚀 Funcionalidades da Landing Page

- **Hero com CTA Direto:** Apresentação do produto com foco no download via Google Play.
- **Simulador Interativo de Acertos:**
  - Alternância entre modelos (Margem Fixa vs. Percentual Comissionado).
  - Cálculo dinâmico em tempo real de sobras, vendas, repasse do parceiro e lucro líquido.
  - Demonstração interativa de cópia de chave Pix e geração de comprovante.
- **Tabela Comparativa de Recursos:** Destaque para as vantagens da contagem reversa e operação offline.
- **Planos e Preços Transparentes:** Detalhamento do modelo Freemium (até 3 pontos) e plano vitalício.
- **FAQ Interativo:** Sanamento das principais dúvidas dos lojistas e revendedoras.
- **Conformidade Legal:** Modais dinâmicos para Política de Privacidade e Termos de Uso.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** semântico e estruturado para SEO.
- **Tailwind CSS** (via CDN com temas e paletas estendidas).
- **CSS3 Vanilla** (`css/style.css`): Efeitos de *glassmorphism*, sombras e filtros modernos.
- **JavaScript Moderno (ES6+)** (`js/main.js`): Lógica reativa do simulador, manipulação do DOM e controle de modais.
- **Lucide Icons**: Conjunto de ícones leves e elegantes.
- **Tipografia:** Google Fonts (*Plus Jakarta Sans* e *Inter*).

---

## 📂 Estrutura de Arquivos

```text
mostruarioapp_lp/
├── assets/
│   ├── images/
│   │   ├── mostruarioapp.svg # Logo oficial em vetor SVG
│   │   ├── app-screen.png    # Captura da tela real do app
│   │   ├── logo.png          # Logo institucional
│   │   └── logowobg.png      # Logo oficial com fundo transparente
│   └── favico.ico            # Cópia de segurança do favicon
├── css/
│   └── style.css             # Estilos customizados e utilitários de vidro/blur
├── js/
│   └── main.js               # Configurações do Tailwind, interações e lógica do simulador
├── favico.ico                # Ícone de aba do navegador
├── index.html                # Página principal da Landing Page
├── privacidade.html          # Política de Privacidade (LGPD & Google Play)
├── termos-de-uso.html        # Termos de Uso e Condições Gerais
└── README.md                 # Documentação do projeto
```

---

## 🖥️ Como Executar Localmente

Como a aplicação é estática, ela pode ser executada diretamente sem necessidade de *build* ou instalação pesada:

### Opção 1: Via Python
```bash
python3 -m http.server 8080
```
Acesse: [http://localhost:8080](http://localhost:8080)

### Opção 2: Via Node (Serve ou Lite-Server)
```bash
npx serve .
```

### Opção 3: Navegador Direto
Basta abrir o arquivo `index.html` com dois cliques ou arrastá-lo para a janela de qualquer navegador web moderno.

---

## 📄 Licença e Direitos

Desenvolvido para **MostruárioApp / ArtCoder**. Todos os direitos reservados.
