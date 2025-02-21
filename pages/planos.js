// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const savedTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('img');
    icon.src = `https://api.iconify.design/heroicons:${theme === 'light' ? 'moon' : 'sun'}.svg`;
}

// Pricing Data
const pricingData = {
    websites: [
        {
            name: 'Plano Básico',
            price: 'R$ 500',
            period: 'One Page',
            features: [
                'Design Responsivo',
                'Otimização para SEO',
                'Formulário de Contato',
                'Integração com Redes Sociais',
                'Hospedagem por 1 ano'
            ],
            description: 'Ideal para profissionais liberais e pequenos negócios que precisam de uma presença online profissional.'
        },
        {
            name: 'Plano Intermediário',
            price: 'R$ 1.200',
            period: 'Site Institucional',
            features: [
                'Até 5 páginas personalizadas',
                'Blog integrado',
                'Painel administrativo',
                'Otimização avançada SEO',
                'Suporte técnico prioritário',
                'Hospedagem por 1 ano'
            ],
            description: 'Perfeito para empresas que precisam de um site completo com mais funcionalidades e conteúdo dinâmico.'
        },
        {
            name: 'Plano Avançado',
            price: 'R$ 2.500',
            period: 'Site Personalizado',
            features: [
                'Páginas ilimitadas',
                'Design exclusivo',
                'Sistema de gestão de conteúdo',
                'Integrações personalizadas',
                'Relatórios de performance',
                'Suporte 24/7',
                'Hospedagem premium'
            ],
            description: 'Solução completa para grandes empresas que necessitam de um site robusto e totalmente personalizado.'
        }
    ],
    apps: [
        {
            name: 'Plano Essencial',
            price: 'R$ 3.000',
            period: 'App Simples',
            features: [
                'Design intuitivo',
                'Desenvolvimento nativo',
                'Funcionalidades básicas',
                'Publicação nas lojas',
                'Suporte técnico'
            ],
            description: 'Ideal para MVP e aplicativos com funcionalidades essenciais.'
        },
        {
            name: 'Plano Completo',
            price: 'R$ 7.000',
            period: 'App com Painel',
            features: [
                'Design premium',
                'Desenvolvimento avançado',
                'Painel administrativo',
                'APIs personalizadas',
                'Análise de dados',
                'Suporte prioritário'
            ],
            description: 'Perfeito para aplicativos complexos que necessitam de backend robusto e funcionalidades avançadas.'
        }
    ],
    design: [
        {
            name: 'Plano Start',
            price: 'R$ 800',
            period: 'Landing Page',
            features: [
                'Design responsivo',
                'Protótipo interativo',
                'Até 2 revisões',
                'Arquivos fonte',
                'Guia de estilo'
            ],
            description: 'Perfeito para landing pages e sites simples que precisam de um design profissional e atraente.'
        },
        {
            name: 'Plano Pro',
            price: 'R$ 2.000',
            period: 'Design Completo',
            features: [
                'UX Research',
                'Wireframes',
                'Design System',
                'Protótipo avançado',
                'Até 5 revisões',
                'Documentação completa'
            ],
            description: 'Ideal para projetos complexos que necessitam de pesquisa de usuário e design system completo.'
        }
    ],
    illustration: [
        {
            name: 'Pacote Básico',
            price: 'R$ 300',
            period: 'Por ilustração',
            features: [
                'Ilustração vetorial',
                'Até 2 revisões',
                'Arquivos editáveis',
                'Uso comercial',
                'Entrega em 5 dias'
            ],
            description: 'Ideal para empresas que precisam de ilustrações pontuais para seu conteúdo digital.'
        },
        {
            name: 'Pacote Premium',
            price: 'R$ 1.500',
            period: 'Kit com 6 ilustrações',
            features: [
                'Ilustrações personalizadas',
                'Estilo consistente',
                'Até 3 revisões por peça',
                'Arquivos em alta resolução',
                'Uso comercial ilimitado',
                'Entrega em 15 dias'
            ],
            description: 'Perfeito para empresas que precisam de um conjunto de ilustrações com identidade visual consistente.'
        }
    ],
    ecommerce: [
        {
            name: 'Plano Básico',
            price: 'R$ 2.000',
            period: 'Loja Virtual Padrão',
            features: [
                'Até 100 produtos',
                'Integração com PagSeguro/Mercado Pago',
                'Painel administrativo',
                'Relatórios básicos',
                'Certificado SSL',
                'Suporte por 3 meses'
            ],
            description: 'Ideal para pequenos negócios que estão começando no e-commerce.'
        },
        {
            name: 'Plano Avançado',
            price: 'R$ 4.500',
            period: 'Loja Personalizada',
            features: [
                'Produtos ilimitados',
                'Design exclusivo',
                'Múltiplas formas de pagamento',
                'Integração com ERP',
                'Marketplace multivendedor',
                'Relatórios avançados',
                'Suporte prioritário'
            ],
            description: 'Solução completa para empresas que precisam de uma plataforma robusta de e-commerce.'
        }
    ],
    consultoria: [
        {
            name: 'Consultoria Pontual',
            price: 'R$ 300',
            period: 'Por hora',
            features: [
                'Análise de problemas',
                'Recomendações técnicas',
                'Relatório detalhado',
                'Suporte por email',
                'Follow-up em 30 dias'
            ],
            description: 'Ideal para empresas que precisam de orientação específica em projetos digitais.'
        },
        {
            name: 'Consultoria Mensal',
            price: 'R$ 2.000',
            period: 'Por mês',
            features: [
                'Até 10 horas mensais',
                'Reuniões semanais',
                'Análise de métricas',
                'Planejamento estratégico',
                'Suporte prioritário',
                'Relatórios mensais'
            ],
            description: 'Perfeito para empresas que precisam de acompanhamento contínuo em seus projetos digitais.'
        }
    ]
};

// Load Plans
function loadPlans(category) {
    const plansContainer = document.getElementById('pricingPlans');
    const plans = pricingData[category];
    
    if (!plans) return;

    plansContainer.innerHTML = plans.map(plan => `
        <div class="plan-card">
            <div class="plan-header">
                <h3 class="plan-name">${plan.name}</h3>
                <div class="plan-price">${plan.price}</div>
                <div class="plan-period">${plan.period}</div>
            </div>
            <div class="plan-features">
                ${plan.features.map(feature => `
                    <div class="feature-item">
                        <img src="https://api.iconify.design/heroicons:check-circle.svg" alt="Incluído">
                        <span>${feature}</span>
                    </div>
                `).join('')}
            </div>
            <button class="cta-button" onclick="showPlanDetails(${JSON.stringify(plan).replace(/"/g, '&quot;')})">
                Contratar Agora
            </button>
        </div>
    `).join('');
}

// Category Navigation
const categoryButtons = document.querySelectorAll('.category-button');
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        
        // Update active state
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Load plans for selected category
        loadPlans(category);
    });
});

// Modal Functions
function showPlanDetails(plan) {
    const modal = document.getElementById('planModal');
    const modalContent = document.getElementById('modalContent');

    modalContent.innerHTML = `
        <h2>${plan.name}</h2>
        <div class="plan-price">${plan.price}</div>
        <p class="plan-description">${plan.description}</p>
        <div class="plan-features">
            <h3>Recursos Inclusos:</h3>
            ${plan.features.map(feature => `
                <div class="feature-item">
                    <img src="https://api.iconify.design/heroicons:check-circle.svg" alt="Incluído">
                    <span>${feature}</span>
                </div>
            `).join('')}
        </div>
        <button class="cta-button">Solicitar Orçamento</button>
    `;

    modal.classList.add('active');
}

// Close Modal
document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('planModal').classList.remove('active');
});

// Close modal when clicking outside
document.getElementById('planModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        e.target.classList.remove('active');
    }
});

// Initialize with websites category
document.addEventListener('DOMContentLoaded', () => {
    loadPlans('websites');
});