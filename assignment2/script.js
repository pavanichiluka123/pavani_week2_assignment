document.addEventListener('DOMContentLoaded', loadPosts);

document.getElementById('post-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const id = document.getElementById('post-id').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;

    if (id) {
        updatePost(id, title, content);
    } else {
        createPost(title, content);
    }

    loadPosts();
    this.reset();
});

function loadPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];

    const postsContainer = document.getElementById('posts');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postDiv = document.createElement('div');
        postDiv.classList.add('post');
        postDiv.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
    
            <button onclick="editPost('${post.id}')">Edit</button><br>
            <button onclick="deletePost('${post.id}')">Delete</button>
        `;
        postsContainer.appendChild(postDiv);

    });
}

function createPost(title, content) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const id = new Date().getTime().toString();
    posts.push({ id, title, content });
    localStorage.setItem('posts', JSON.stringify(posts));
}

function updatePost(id, title, content) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postIndex = posts.findIndex(post => post.id === id);
    posts[postIndex] = { id, title, content };
    localStorage.setItem('posts', JSON.stringify(posts));
}

function deletePost(id) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const updatedPosts = posts.filter(post => post.id !== id);
    localStorage.setItem('posts', JSON.stringify(updatedPosts));
    loadPosts();
}

function editPost(id) {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts.find(post => post.id === id);

    document.getElementById('post-id').value = post.id;
    document.getElementById('title').value = post.title;
    document.getElementById('content').value = post.content;
}
