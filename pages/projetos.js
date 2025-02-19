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

// Projects Data
const projects = [
    {
        id: 1,
        title: "E-commerce Platform Redesign",
        category: "websites",
        description: "Complete redesign and development of a modern e-commerce platform focusing on user experience and conversion optimization.",
        image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBwfGVufDB8fDB8fHww",
        technologies: ["React", "Node.js", "MongoDB", "AWS"],
        client: "TechStore Inc.",
        duration: "4 months",
        year: "2024",
        gallery: [
            "https://images.unsplash.com/photo-1625036790671-0d11ed8a7927",
            "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8",
            "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e",
            "https://images.unsplash.com/photo-1611162617474-5b21e879e113"
        ],
        testimonial: {
            content: "The team at Sisyphus delivered beyond our expectations. The new platform has significantly improved our conversion rates and customer satisfaction.",
            author: "John Smith",
            position: "CEO, TechStore Inc.",
            avatar: "https://api.iconify.design/ph:user-circle.svg"
        }
    },
    {
        id: 2,
        title: "E-commerce Platform Redesign",
        category: "websites",
        description: "Complete redesign and development of a modern e-commerce platform focusing on user experience and conversion optimization.",
        image: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBwfGVufDB8fDB8fHww",
        technologies: ["React", "Node.js", "MongoDB", "AWS"],
        client: "TechStore Inc.",
        duration: "4 months",
        year: "2024",
        gallery: [
            "https://images.unsplash.com/photo-1625036790671-0d11ed8a7927",
            "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8",
            "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e",
            "https://images.unsplash.com/photo-1611162617474-5b21e879e113"
        ],
        testimonial: {
            content: "The team at Sisyphus delivered beyond our expectations. The new platform has significantly improved our conversion rates and customer satisfaction.",
            author: "John Smith",
            position: "CEO, TechStore Inc.",
            avatar: "https://api.iconify.design/ph:user-circle.svg"
        }
    },
    {
        id: 3,
        title: "Planejamento Estratégico",
        category: "apps",
        description: "Modern banking application with focus on security and user experience.",
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        technologies: ["html-5", "css-3", "javascript", "nodejs", "vue"],
        client: "Global Bank",
        duration: "6 months",
        year: "2024",
        gallery: [
            "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8",
            "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e",
            "https://images.unsplash.com/photo-1611162617474-5b21e879e113",
            "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8",
            
        ],
        testimonial: {
            content: "Outstanding work on our mobile banking app. The attention to detail and security measures implemented are impressive.",
            author: "Sarah Johnson",
            position: "CTO, Global Bank",
            avatar: "../public/img/user3.png"
        }
    }
];

// Load Projects Grid
function loadProjects(projectsToLoad = projects) {
    const projectsGrid = document.getElementById('projectsGrid');
    if (!projectsGrid) return;

    projectsGrid.innerHTML = projectsToLoad.map(project => `
        <article class="project-card">
            <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
            <div class="project-content">
                <span class="project-category">${project.category}</span>
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech">
                    ${project.technologies.map(tech => `
                        <span class="tech-tag">${tech}</span>
                    `).join('')}
                </div>
                <a href="projeto-detalhe.html?id=${project.id}" class="cta-button">View Project</a>
            </div>
        </article>
    `).join('');
}

// Load Single Project
function loadProjectDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = parseInt(urlParams.get('id'));
    
    if (!projectId) return;

    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    // Update page title
    document.title = `${project.title} - Sisyphus Projects`;

    // Update hero section
    const projectHero = document.getElementById('projectHero');
    if (projectHero) {
        projectHero.style.backgroundImage = `url(${project.image})`;
        projectHero.innerHTML = `
            <div class="hero-content">
                <h1>${project.title}</h1>
                <p>${project.description}</p>
            </div>
        `;
    }

    // Update project description
    const projectDescription = document.getElementById('projectDescription');
    if (projectDescription) {
        projectDescription.innerHTML = `
            <h2>About the Project</h2>
            <p>${project.description}</p>
        `;
    }

    // Update tech stack
    const projectTechStack = document.getElementById('projectTechStack');
    if (projectTechStack) {
        projectTechStack.innerHTML = `
            <h2>Technologies Used</h2>
            <div class="tech-grid">
                ${project.technologies.map(tech => `
                    <div class="tech-item">
                        <img src="https://api.iconify.design/logos:${tech.toLowerCase()}.svg" alt="${tech}">
                        <span>${tech}</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Update gallery
    const projectGallery = document.getElementById('projectGallery');
    if (projectGallery) {
        projectGallery.innerHTML = `
            <h2>Project Gallery</h2>
            <div class="gallery-grid">
                ${project.gallery.map(image => `
                    <div class="gallery-item">
                        <img src="${image}" alt="${project.title}" loading="lazy">
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Update testimonial
    const projectTestimonial = document.getElementById('projectTestimonial');
    if (projectTestimonial && project.testimonial) {
        projectTestimonial.innerHTML = `
            <div class="testimonial-content">
                "${project.testimonial.content}"
            </div>
            <div class="testimonial-author">
                <img src="${project.testimonial.avatar}" alt="${project.testimonial.author}" class="author-avatar">
                <div>
                    <h4>${project.testimonial.author}</h4>
                    <p>${project.testimonial.position}</p>
                </div>
            </div>
        `;
    }

    // Update meta information
    const projectMeta = document.getElementById('projectMeta');
    if (projectMeta) {
        projectMeta.innerHTML = `
            <div class="meta-item">
                <span>Client</span>
                <strong>${project.client}</strong>
            </div>
            <div class="meta-item">
                <span>Duration</span>
                <strong>${project.duration}</strong>
            </div>
            <div class="meta-item">
                <span>Year</span>
                <strong>${project.year}</strong>
            </div>
            <div class="meta-item">
                <span>Category</span>
                <strong>${project.category}</strong>
            </div>
        `;
    }

    // Load related projects
    loadRelatedProjects(project);
}

// Load Related Projects
function loadRelatedProjects(currentProject) {
    const relatedProjects = projects
        .filter(project => 
            project.id !== currentProject.id && 
            (project.category === currentProject.category || 
             project.technologies.some(tech => currentProject.technologies.includes(tech)))
        )
        .slice(0, 3);

    const relatedGrid = document.getElementById('relatedProjects');
    if (relatedGrid) {
        relatedGrid.innerHTML = relatedProjects.map(project => `
            <article class="project-card">
                <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
                <div class="project-content">
                    <span class="project-category">${project.category}</span>
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `
                            <span class="tech-tag">${tech}</span>
                        `).join('')}
                    </div>
                    <a href="projeto-detalhe.html?id=${project.id}" class="cta-button">View Project</a>
                </div>
            </article>
        `).join('');
    }
}

// Filter Projects
const filterButtons = document.querySelectorAll('.filter-button');
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        
        // Update active state
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Filter projects
        const filteredProjects = category === 'all' 
            ? projects 
            : projects.filter(project => project.category === category);
        
        loadProjects(filteredProjects);
    });
});

// Share Buttons
const shareButtons = document.querySelectorAll('.share-button');
shareButtons.forEach(button => {
    button.addEventListener('click', () => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        
        if (button.classList.contains('twitter')) {
            window.open(`https://twitter.com/intent/tweet?url=${url}&text=${title}`, '_blank');
        } else if (button.classList.contains('linkedin')) {
            window.open(`https://www. linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        }
    });
});

// Initialize the projects page
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on a single project page
    if (window.location.pathname.includes('projeto-detalhe.html')) {
        loadProjectDetails();
    } else {
        loadProjects();
    }

    // Initialize gallery lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const image = item.querySelector('img');
            if (image) {
                // Create lightbox
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                lightbox.innerHTML = `
                    <div class="lightbox-content">
                        <img src="${image.src}" alt="${image.alt}">
                        <button class="close-lightbox">&times;</button>
                    </div>
                `;

                // Add lightbox to body
                document.body.appendChild(lightbox);

                // Close lightbox on click
                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox || e.target.className === 'close-lightbox') {
                        lightbox.remove();
                    }
                });
            }
        });
    });
});