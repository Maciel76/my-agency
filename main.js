// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate stats when they come into view
const stats = document.querySelectorAll('.stat-card h2');
const animateStats = () => {
    stats.forEach(stat => {
        const value = parseInt(stat.textContent);
        let current = 0;
        const increment = value / 50;
        const updateCount = () => {
            if (current < value) {
                current += increment;
                stat.textContent = Math.ceil(current) + (stat.textContent.includes('+') ? '+' : '');
                requestAnimationFrame(updateCount);
            } else {
                stat.textContent = value + (stat.textContent.includes('+') ? '+' : '');
            }
        };
        updateCount();
    });
};

// Trigger animation when stats section is in view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}
 // Função para carregar componentes HTML
 function loadComponent(id, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => document.getElementById(id).innerHTML = data)
        .catch(error => console.error(`Erro ao carregar ${url}:`, error));
}

// Carregar o header e footer
loadComponent("header", "header.html");
loadComponent("footer", "footer.html");s