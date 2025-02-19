// Load posts from localStorage
const posts = JSON.parse(localStorage.getItem('blogPosts')) || [];

// Load posts into the grid
function loadPosts(postsToLoad = posts) {
    const postGrid = document.getElementById('postGrid');
    if (!postGrid) return;

    const publishedPosts = postsToLoad.filter(post => post.status === 'published');

    postGrid.innerHTML = publishedPosts.map(post => `
        <article class="post-card">
            <img src="${post.featuredImage}" alt="${post.title}" loading="lazy">
            <div class="post-card-content">
                <div class="post-meta">
                    <span class="category">${post.category}</span>
                    <span class="date">${post.date}</span>
                </div>
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <a href="blog-post.html?id=${post.id}" class="learn-more">Read More →</a>
            </div>
        </article>
    `).join('');
}

// Load single post
function loadSinglePost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'));
    
    if (!postId) return;

    const post = posts.find(p => p.id === postId);
    if (!post) return;

    // Update page title
    document.title = `${post.title} - Sisyphus Blog`;

    // Update post content
    const postContent = document.querySelector('.post-content');
    if (postContent) {
        const postHeader = postContent.querySelector('.post-header');
        if (postHeader) {
            postHeader.innerHTML = `
                <div class="post-meta">
                    <span class="category">${post.category}</span>
                    <span class="date">${post.date}</span>
                </div>
                <h1>${post.title}</h1>
                <div class="author-info">
                    <img src="https://api.iconify.design/ph:user-circle.svg" alt="Author" class="author-avatar">
                    <div>
                        <h3>${post.author}</h3>
                        <p>Lead Designer at Sisyphus</p>
                    </div>
                </div>
            `;
        }

        const postBody = postContent.querySelector('.post-body');
        if (postBody) {
            postBody.innerHTML = `
                <img src="${post.featuredImage}" alt="${post.title}" class="post-hero-image">
                ${post.content}
            `;
        }

        // Update tags
        const tagsContainer = postContent.querySelector('.tags');
        if (tagsContainer && post.tags) {
            tagsContainer.innerHTML = post.tags.map(tag => `
                <a href="#" class="tag">${tag}</a>
            `).join('');
        }
    }

    // Load related posts
    loadRelatedPosts(post);
}

// Load related posts
function loadRelatedPosts(currentPost) {
    const relatedPosts = posts
        .filter(post => 
            post.status === 'published' && 
            post.id !== currentPost.id && 
            (post.category === currentPost.category || 
             post.tags.some(tag => currentPost.tags.includes(tag)))
        )
        .slice(0, 3);

    const relatedPostsGrid = document.querySelector('.related-posts .post-grid');
    if (relatedPostsGrid) {
        relatedPostsGrid.innerHTML = relatedPosts.map(post => `
            <article class="post-card">
                <img src="${post.featuredImage}" alt="${post.title}" loading="lazy">
                <div class="post-card-content">
                    <div class="post-meta">
                        <span class="category">${post.category}</span>
                        <span class="date">${post.date}</span>
                    </div>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <a href="blog-post.html?id=${post.id}" class="learn-more">Read More →</a>
                </div>
            </article>
        `).join('');
    }
}

// Initialize the blog
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on a single post page
    if (window.location.pathname.includes('blog-post.html')) {
        loadSinglePost();
    } else {
        loadPosts();
    }

    // Initialize search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const filteredPosts = posts.filter(post => 
                post.title.toLowerCase().includes(searchTerm) ||
                post.content.toLowerCase().includes(searchTerm)
            );
            loadPosts(filteredPosts);
        });
    }

    // Initialize category filter
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
                ? posts 
                : posts.filter(post => post.category === category);
            loadPosts(filteredPosts);
        });
    });
});