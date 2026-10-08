// Tailwind Configuration
tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Plus Jakarta Sans', 'sans-serif'],
            },
            colors: {
                brand: {
                    50: '#fbf8f0',
                    100: '#f5edd7',
                    200: '#ebd9ad',
                    300: '#dfbf7b',
                    400: '#d5a44e',
                    500: '#c58b2e',
                    600: '#a86d23',
                    700: '#87511e',
                    800: '#6f411e',
                    900: '#5c361c',
                },
                slate: {
                    850: '#172033',
                    950: '#0b1120',
                }
            }
        }
    }
};

// Simulator Logic
const kits = {
    imas: {
        name: "Kit Balcão: 9 Ímãs Decorativos",
        totalItems: 9,
        retailPrice: 15.00,
        payoutPrice: 10.00, // Fixed margin
        isCommission: false,
        commissionRate: 0,
        displayLabel: "Preço Consumidor: R$ 15,00 un | Repasse Líquido: R$ 10,00 un",
        explanation: "Modelo Margem Fixa: O parceiro retém R$ 5,00 por peça vendida e você recebe R$ 10,00 líquidos por unidade."
    },
    semijoias: {
        name: "Maleta Semijoias: 50 Peças",
        totalItems: 50,
        retailPrice: 40.00, // average
        payoutPrice: 26.00, // 35% commission model
        isCommission: true,
        commissionRate: 0.35,
        displayLabel: "Preço Médio Peça: R$ 40,00 | Comissão Revendedora: 35%",
        explanation: "Modelo Comissionado: A revendedora retém 35% do valor total das vendas e transfere 65% para a maleteira."
    }
};

// DataLayer Tracking Helper
function trackEvent(eventName, params = {}) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        event: eventName,
        ...params,
        timestamp: new Date().toISOString()
    });
}

let currentKitKey = 'imas';

function selectKit(key) {
    currentKitKey = key;
    const kit = kits[key];

    trackEvent('simulator_use', {
        action: 'select_kit',
        kit_key: key,
        kit_name: kit.name
    });

    // Update UI Tabs
    const imasBtn = document.getElementById('kit-imas-btn');
    const semiBtn = document.getElementById('kit-semijoias-btn');

    if (key === 'imas') {
        imasBtn.className = "flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all bg-white text-slate-900 shadow-sm flex items-center justify-center gap-2";
        semiBtn.className = "flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all text-slate-600 hover:text-slate-900 flex items-center justify-center gap-2";
    } else {
        semiBtn.className = "flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all bg-white text-slate-900 shadow-sm flex items-center justify-center gap-2";
        imasBtn.className = "flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all text-slate-600 hover:text-slate-900 flex items-center justify-center gap-2";
    }

    // Update texts & sliders
    document.getElementById('label-kit-name').textContent = kit.name;
    document.getElementById('badge-total-items').textContent = kit.totalItems + " peças";
    document.getElementById('label-pricing-info').textContent = kit.displayLabel;
    document.getElementById('model-explanation').textContent = kit.explanation;
    document.getElementById('max-sobras-label').textContent = `${kit.totalItems} (Nenhuma venda)`;

    const slider = document.getElementById('sobras-slider');
    slider.max = kit.totalItems;
    slider.value = Math.floor(kit.totalItems * 0.33); // set standard leftovers (approx 1/3)

    updateCalculation(slider.value);
}

function updateCalculation(leftovers) {
    const kit = kits[currentKitKey];
    const sobras = parseInt(leftovers, 10);
    const vendidas = kit.totalItems - sobras;

    // Update interactive labels
    document.getElementById('sobras-display').textContent = sobras + " un";
    document.getElementById('vendidas-badge').textContent = vendidas + " un";

    let grossRetail = 0;
    let partnerCut = 0;
    let netPayout = 0;

    if (!kit.isCommission) {
        grossRetail = vendidas * kit.retailPrice;
        netPayout = vendidas * kit.payoutPrice;
        partnerCut = grossRetail - netPayout;
    } else {
        grossRetail = vendidas * kit.retailPrice;
        partnerCut = grossRetail * kit.commissionRate;
        netPayout = grossRetail - partnerCut;
    }

    // Format currency
    document.getElementById('sim-bruto').textContent = formatBRL(grossRetail);
    document.getElementById('sim-parceiro').textContent = "- " + formatBRL(partnerCut);
    document.getElementById('sim-liquido').textContent = formatBRL(netPayout);
}

function formatBRL(amount) {
    return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function simulateCopyPix() {
    trackEvent('pix_copy', {
        kit_key: currentKitKey,
        kit_name: kits[currentKitKey].name
    });

    const btn = document.getElementById('copy-btn-text');
    const originalText = btn.textContent;

    // Fallback copy using execCommand
    const tempInput = document.createElement("input");
    tempInput.value = "00020126580014br.gov.bcb.pix0136mostruarioapp-chave-offline520400005303986540660.005802BR5915MOSTRUARIO APP6009SAO PAULO62070503***6304E85F";
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    btn.textContent = "Pix Copiado!";
    setTimeout(() => {
        btn.textContent = originalText;
    }, 2000);
}

function simulatePdfNotice() {
    trackEvent('simulator_pdf_preview', {
        kit_key: currentKitKey,
        kit_name: kits[currentKitKey].name
    });

    const feedback = document.getElementById('sim-feedback');
    feedback.classList.remove('hidden');
    setTimeout(() => {
        feedback.classList.add('hidden');
    }, 3500);
}

// Accordion Logic
function toggleFaq(index) {
    const answer = document.getElementById(`faq-answer-${index}`);
    const icon = document.getElementById(`faq-icon-${index}`);
    const isHidden = answer.classList.contains('hidden');

    // Close all
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`faq-answer-${i}`).classList.add('hidden');
        document.getElementById(`faq-icon-${i}`).style.transform = 'rotate(0deg)';
    }

    if (isHidden) {
        answer.classList.remove('hidden');
        icon.style.transform = 'rotate(180deg)';

        const questionBtn = document.querySelector(`button[onclick="toggleFaq(${index})"]`);
        const questionSpan = questionBtn ? questionBtn.querySelector('span') : null;
        const questionTitle = questionSpan ? questionSpan.textContent.trim() : `FAQ #${index}`;

        trackEvent('faq_open', {
            faq_index: index,
            question_title: questionTitle
        });
    }
}

// Modal legal content
function openModal(type) {
    trackEvent('legal_modal_open', {
        modal_type: type
    });

    const modal = document.getElementById('legal-modal');
    const content = document.getElementById('modal-content');

    if (type === 'privacy') {
        content.innerHTML = `
          <h3 class="font-heading font-bold text-xl text-slate-900 mb-2">Política de Privacidade</h3>
          <p class="text-xs text-slate-500 mb-4">Última atualização: 2026</p>
          <div class="space-y-3 text-xs text-slate-600 leading-relaxed">
            <p><strong>1. Princípio Offline-First:</strong> O aplicativo MostruárioApp foi desenvolvido para armazenar todos os dados exclusivamente no banco de dados SQLite nativo do seu dispositivo.</p>
            <p><strong>2. Ausência de Rastreamento:</strong> Não coletamos, vendemos ou transmitimos para servidores remotos os cadastros de seus clientes, catálogos de produtos, romaneios, relatórios financeiros ou assinaturas digitais.</p>
            <p><strong>3. Chaves Pix:</strong> Sua chave Pix é armazenada apenas em seu aparelho para possibilitar a montagem matemática do código QR padrão EMV sem necessidade de intermediários bancários.</p>
            <p><strong>4. Backups:</strong> Os backups são gerados em formato aberto no seu próprio telefone e você decide para onde compartilhá-los.</p>
          </div>
        `;
    } else {
        content.innerHTML = `
          <h3 class="font-heading font-bold text-xl text-slate-900 mb-2">Termos de Uso</h3>
          <p class="text-xs text-slate-500 mb-4">Última atualização: 2026</p>
          <div class="space-y-3 text-xs text-slate-600 leading-relaxed">
            <p><strong>1. Uso da Plataforma:</strong> O MostruárioApp concede ao usuário uma licença não exclusiva para controle de consignações e kits comerciais.</p>
            <p><strong>2. Modelo Freemium:</strong> O nível gratuito permite a gestão simultânea de até 3 pontos parceiros. O desbloqueio de capacidade ilimitada é realizado via compra no aplicativo na Google Play Store.</p>
            <p><strong>3. Responsabilidade Contábil:</strong> Os valores de comissão e repasses são calculados de acordo com os preços e percentuais inseridos pelo próprio usuário.</p>
          </div>
        `;
    }

    modal.classList.remove('hidden');
}

function closeModal() {
    document.getElementById('legal-modal').classList.add('hidden');
}

// Expose functions to global scope for HTML inline handlers
window.trackEvent = trackEvent;
window.selectKit = selectKit;
window.updateCalculation = updateCalculation;
window.formatBRL = formatBRL;
window.simulateCopyPix = simulateCopyPix;
window.simulatePdfNotice = simulatePdfNotice;
window.toggleFaq = toggleFaq;
window.openModal = openModal;
window.closeModal = closeModal;

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    // Mobile Navbar toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const menu = document.getElementById('mobile-menu');
            if (menu) menu.classList.toggle('hidden');
        });
    }

    // Initialize icons and initial calc
    if (window.lucide) {
        lucide.createIcons();
    }
    updateCalculation(3);

    // Track all CTA button clicks
    document.querySelectorAll('[data-track-cta]').forEach(cta => {
        cta.addEventListener('click', function () {
            const location = this.getAttribute('data-track-cta');
            trackEvent('download_click', {
                cta_location: location,
                destination_url: this.getAttribute('href') || 'https://play.google.com/store/apps/details?id=br.com.artcoder.mostruarioapp'
            });
        });
    });

    // Track simulator slider change upon release
    const slider = document.getElementById('sobras-slider');
    if (slider) {
        slider.addEventListener('change', (e) => {
            const kit = kits[currentKitKey];
            const sobras = parseInt(e.target.value, 10);
            const vendidas = kit.totalItems - sobras;
            trackEvent('simulator_use', {
                action: 'slider_change',
                kit_key: currentKitKey,
                kit_name: kit.name,
                pieces_sold: vendidas,
                pieces_leftover: sobras
            });
        });
    }
});
