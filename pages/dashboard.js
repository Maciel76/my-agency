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

// Navigation
const navItems = document.querySelectorAll('.nav-item');
const views = document.querySelectorAll('.dashboard-view');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const viewId = item.getAttribute('data-view');
        
        // Update active state
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Show selected view
        views.forEach(view => {
            view.classList.add('hidden');
            if (view.id === viewId + 'View') {
                view.classList.remove('hidden');
            }
        });
    });
});

// Posts Data
let posts = JSON.parse(localStorage.getItem('posts')) || [
    {
        id: 1,
        title: 'The Future of Digital Design',
        excerpt: 'Exploring how AI and automation are shaping the future of design.',
        category: 'Design',
        status: 'published',
        date: '2024-03-15'
    },
    {
        id: 2,
        title: 'Web Development Trends 2024',
        excerpt: 'Latest trends and technologies in web development.',
        category: 'Development',
        status: 'draft',
        date: '2024-03-14'
    }
];

// Load Posts Table
function loadPostsTable() {
    const tableBody = document.getElementById('postsTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = posts.map(post => `
        <tr>
            <td>${post.title}</td>
            <td>${post.category}</td>
            <td><span class="status-badge status-${post.status.toLowerCase()}">${post.status}</span></td>
            <td>${new Date(post.date).toLocaleDateString()}</td>
            <td class="row-actions">
                <button class="action-button edit" data-id="${post.id}">
                    <img src="https://api.iconify.design/heroicons:pencil-square.svg" alt="Edit">
                </button>
                <button class="action-button delete" data-id="${post.id}">
                    <img src="https://api.iconify.design/heroicons:trash.svg" alt="Delete">
                </button>
            </td>
        </tr>
    `).join('');

    // Add event listeners for edit and delete buttons
    attachPostActionListeners();
}

// Filter Posts
const statusFilter = document.getElementById('statusFilter');
const sortPosts = document.getElementById('sortPosts');

if (statusFilter) {
    statusFilter.addEventListener('change', filterPosts);
}

if (sortPosts) {
    sortPosts.addEventListener('change', filterPosts);
}

function filterPosts() {
    let filteredPosts = [...posts];

    // Filter by status
    if (statusFilter.value !== 'all') {
        filteredPosts = filteredPosts.filter(post => 
            post.status.toLowerCase() === statusFilter.value
        );
    }

    // Sort posts
    switch (sortPosts.value) {
        case 'newest':
            filteredPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'oldest':
            filteredPosts.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'title':
            filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }

    posts = filteredPosts;
    loadPostsTable();
}

// Post Actions
function attachPostActionListeners() {
    // Edit buttons
    document.querySelectorAll('.action-button.edit').forEach(button => {
        button.addEventListener('click', () => {
            const postId = parseInt(button.dataset.id);
            editPost(postId);
        });
    });

    // Delete buttons
    document.querySelectorAll('.action-button.delete').forEach(button => {
        button.addEventListener('click', () => {
            const postId = parseInt(button.dataset.id);
            showDeleteModal(postId);
        });
    });
}

// Edit Post
function editPost(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    // Show editor view
    document.querySelectorAll('.dashboard-view').forEach(view => view.classList.add('hidden'));
    document.getElementById('postEditorView').classList.remove('hidden');

    // Populate editor
    document.getElementById('postTitle').value = post.title;
    tinymce.get('postContent').setContent(post.excerpt);
    
    // Update categories
    document.querySelectorAll('.categories-list input').forEach(input => {
        input.checked = post.category === input.value;
    });
}

// Delete Post
function showDeleteModal(postId) {
    const modal = document.getElementById('deleteConfirmModal');
    modal.classList.add('active');

    const confirmButton = document.getElementById('confirmDelete');
    const cancelButton = document.getElementById('cancelDelete');

    confirmButton.onclick = () => {
        deletePost(postId);
        modal.classList.remove('active');
    };

    cancelButton.onclick = () => {
        modal.classList.remove('active');
    };
}

function deletePost(postId) {
    posts = posts.filter(post => post.id !== postId);
    localStorage.setItem('posts', JSON.stringify(posts));
    loadPostsTable();
}

// New Post
const newPostButton = document.getElementById('newPostButton');
if (newPostButton) {
    newPostButton.addEventListener('click', () => {
        // Reset form
        document.getElementById('postTitle').value = '';
        tinymce.get('postContent').setContent('');
        document.querySelectorAll('.categories-list input').forEach(input => {
            input.checked = false;
        });

        // Show editor view
        document.querySelectorAll('.dashboard-view').forEach(view => view.classList.add('hidden'));
        document.getElementById('postEditorView').classList.remove('hidden');
    });
}

// Save/Publish Post
const saveDraft = document.getElementById('saveDraft');
const publishPost = document.getElementById('publishPost');

if (saveDraft) {
    saveDraft.addEventListener('click', () => savePost('draft'));
}

if (publishPost) {
    publishPost.addEventListener('click', () => savePost('published'));
}

function savePost(status) {
    const title = document.getElementById('postTitle').value;
    const content = tinymce.get('postContent').getContent();
    const category = Array.from(document.querySelectorAll('.categories-list input:checked'))
        .map(input => input.value)[0] || 'Uncategorized';

    const newPost = {
        id: Date.now(),
        title,
        excerpt: content,
        category,
        status,
        date: new Date().toISOString().split('T')[0]
    };

    posts.unshift(newPost);
    localStorage.setItem('posts', JSON.stringify(posts));

    // Show posts view
    document.querySelectorAll('.dashboard-view').forEach(view => view.classList.add('hidden'));
    document.getElementById('postsView').classList.remove('hidden');
    
    loadPostsTable();
}

// Search Posts
const searchPosts = document.getElementById('searchPosts');
if (searchPosts) {
    searchPosts.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredPosts = posts.filter(post => 
            post.title.toLowerCase().includes(searchTerm) ||
            post.excerpt.toLowerCase().includes(searchTerm)
        );
        posts = filteredPosts;
        loadPostsTable();
    });
}

// Settings
const saveSettings = document.getElementById('saveSettings');
if (saveSettings) {
    saveSettings.addEventListener('click', () => {
        const settings = {
            blogTitle: document.getElementById('blogTitle').value,
            blogDescription: document.getElementById('blogDescription').value,
            postsPerPage: document.getElementById('postsPerPage').value,
            theme: document.getElementById('themeSelect').value
        };

        localStorage.setItem('blogSettings', JSON.stringify(settings));
        alert('Settings saved successfully!');
    });

    // Load saved settings
    const savedSettings = JSON.parse(localStorage.getItem('blogSettings') || '{}');
    if (savedSettings.blogTitle) {
        document.getElementById('blogTitle').value = savedSettings.blogTitle;
        document.getElementById('blogDescription').value = savedSettings.blogDescription;
        document.getElementById('postsPerPage').value = savedSettings.postsPerPage;
        document.getElementById('themeSelect').value = savedSettings.theme;
    }
}

// Featured Image Upload
const featuredImageUpload = document.getElementById('featuredImageUpload');
if (featuredImageUpload) {
    featuredImageUpload.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    document.getElementById('featuredImagePreview').src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        };

        input.click();
    });
}

// Initialize TinyMCE
if (typeof tinymce !== 'undefined') {
    tinymce.init({
        selector: '#postContent',
        height: 500,
        menubar: true,
        plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | bold italic backcolor | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | removeformat | help'
    });
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    loadPostsTable();
});