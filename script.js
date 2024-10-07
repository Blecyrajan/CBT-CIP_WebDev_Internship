// JavaScript code to manage blog posts and comments
document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const postsSection = document.getElementById('posts-section');
    const newPostSection = document.getElementById('new-post-section');
    const homeLink = document.getElementById('home-link');
    const newPostLink = document.getElementById('new-post-link');
    const postForm = document.getElementById('post-form');
    const postsContainer = document.getElementById('posts');

    // Array to store blog posts with comments
    let posts = [];

    // Function to display the home page (list of posts)
    function showHomePage() {
        postsSection.classList.remove('hidden');
        newPostSection.classList.add('hidden');
    }

    // Function to display the new post form
    function showNewPostPage() {
        postsSection.classList.add('hidden');
        newPostSection.classList.remove('hidden');
    }

    // Function to render posts and comments to the DOM
    function renderPosts() {
        // Clear the posts container
        postsContainer.innerHTML = '';

        // Loop through posts array and add each post to the container
        posts.forEach((post, index) => {
            const postElement = document.createElement('div');
            postElement.classList.add('post');

            // Create post title and content elements
            const postTitle = document.createElement('h3');
            postTitle.textContent = post.title;

            const postContent = document.createElement('p');
            postContent.textContent = post.content;

            // Comment Section
            const commentSection = document.createElement('div');
            commentSection.classList.add('comments-section');

            const commentHeader = document.createElement('h4');
            commentHeader.textContent = 'Comments';

            // Comment List
            const commentList = document.createElement('div');
            post.comments.forEach(comment => {
                const commentElement = document.createElement('div');
                commentElement.classList.add('comment');
                commentElement.textContent = comment;
                commentList.appendChild(commentElement);
            });

            // Comment Form
            const commentForm = document.createElement('div');
            commentForm.classList.add('comment-form');

            const commentInput = document.createElement('textarea');
            commentInput.placeholder = 'Write a comment...';
            commentInput.rows = 3;

            const commentButton = document.createElement('button');
            commentButton.textContent = 'Add Comment';
            commentButton.addEventListener('click', () => {
                if (commentInput.value) {
                    post.comments.push(commentInput.value);
                    commentInput.value = '';
                    renderPosts(); // Re-render posts to show new comments
                }
            });

            commentForm.appendChild(commentInput);
            commentForm.appendChild(commentButton);

            // Assemble comment section
            commentSection.appendChild(commentHeader);
            commentSection.appendChild(commentList);
            commentSection.appendChild(commentForm);

            // Add the title, content, and comment section to the post element
            postElement.appendChild(postTitle);
            postElement.appendChild(postContent);
            postElement.appendChild(commentSection);

            // Append the post element to the container
            postsContainer.appendChild(postElement);
        });
    }

    // Handle navigation to the home page
    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        showHomePage();
    });

    // Handle navigation to the new post page
    newPostLink.addEventListener('click', (e) => {
        e.preventDefault();
        showNewPostPage();
    });

    // Handle form submission to add a new post
    postForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        // Create a new post object with an empty comments array
        const newPost = { title, content, comments: [] };
        posts.push(newPost);

        // Clear the form inputs
        postForm.reset();

        // Render posts and navigate to home page
        renderPosts();
        showHomePage();
    });

    // Initially show the home page
    showHomePage();
});
