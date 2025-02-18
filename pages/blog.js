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

// Blog Posts Data
const blogPosts = [
    {
        id: 1,
        title: 'The Evolution of UI Design',
        excerpt: 'Exploring how user interface design has transformed over the years and what the future holds.',
        image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb',
        category: 'design',
        date: 'March 14, 2024'
    },
    {
        id: 2,
        title: 'Building Scalable Web Applications',
        excerpt: 'Best practices and patterns for creating maintainable and scalable web applications.',
        image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb',
        category: 'development',
        date: 'March 13, 2024'
    },
    {
        id: 3,
        title: 'The Impact of AI on Design',
        excerpt: 'How artificial intelligence is reshaping the design industry and empowering creators.',
        image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb',
        category: 'technology',
        date: 'March 12, 2024'
    }
];

// Load Blog Posts
function loadPosts(posts = blogPosts) {
    const postGrid = document.getElementById('postGrid');
    if (!postGrid) return;

    postGrid.innerHTML = posts.map(post => `
        <article class="post-card">
            <img src="${post.image}" alt="${post.title}" loading="lazy">
            <div class="post-card-content">
                <div class="post-meta">
                    <span class="category">${post.category}</span>
                    <span class="date">${post.date}</span>
                </div>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <a href="blog-post.html" class="learn-more">Read More →</a>
            </div>
        </article>
    `).join('');
}

// Search Functionality
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredPosts = blogPosts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm)
        );
        loadPosts(filteredPosts);
    });
}

// Category Filter
const categoryLinks = document.querySelectorAll('[data-category]');
categoryLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const category = e.target.dataset.category;
        
        // Update active state
        categoryLinks.forEach(l => l.classList.remove('active'));
        e.target.classList.add('active');

        // Filter posts
        const filteredPosts = category === 'all' 
            ? blogPosts 
            : blogPosts.filter(post => post.category === category);
        loadPosts(filteredPosts);
    });
});

// Comments System
const commentForm = document.getElementById('commentInput');
const submitComment = document.getElementById('submitComment');
const commentsList = document.getElementById('commentsList');

if (commentForm && submitComment && commentsList) {
    // Load existing comments from localStorage
    let comments = JSON.parse(localStorage.getItem('blogComments') || '[]');
    renderComments();

    submitComment.addEventListener('click', () => {
        const commentText = commentForm.value.trim();
        if (!commentText) return;

        const newComment = {
            id: Date.now(),
            text: commentText,
            author: 'Anonymous User',
            date: new Date().toLocaleDateString()
        };

        comments.unshift(newComment);
        localStorage.setItem('blogComments', JSON.stringify(comments));
        
        commentForm.value = '';
        renderComments();
    });

    function renderComments() {
        commentsList.innerHTML = comments.map(comment => `
            <div class="comment">
                <img src="https://api.iconify.design/ph:user-circle.svg" alt="User" class="user-avatar">
                <div class="comment-content">
                    <h4>${comment.author}</h4>
                    <span class="date">${comment.date}</span>
                    <p>${comment.text}</p>
                </div>
            </div>
        `).join('');
    }
}

// Initialize the blog
document.addEventListener('DOMContentLoaded', () => {
    loadPosts();
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Share Buttons
const shareButtons = document.querySelectorAll('.share-button');
shareButtons.forEach(button => {
    button.addEventListener('click', () => {
        const url = encodeURIComponent(window.location.href);
        const text = encodeURIComponent(document.title);
        
        if (button.classList.contains('twitter')) {
            window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
        } else if (button.classList.contains('linkedin')) {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
        }
    });
});