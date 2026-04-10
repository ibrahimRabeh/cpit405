/**
 * Cookie Helper Functions
 */

function setCookie(name, value, days = 7) {
    // Set cookie (lab requirement)
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";

    // Also set in localStorage for file:// compatibility
    localStorage.setItem(name, value);
}

function getCookie(name) {
    // Try cookie first
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }

    // Fallback to localStorage (especially for file:// protocols)
    return localStorage.getItem(name);
}

function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999; path=/';
    localStorage.removeItem(name);
}

/**
 * State Management
 */

// Initialize from cookies/localStorage or defaults
let likes = parseInt(getCookie('likes')) || 100;
let dislikes = parseInt(getCookie('dislikes')) || 20;
let comments = [];
try {
    const savedComments = getCookie('comments');
    comments = savedComments ? JSON.parse(savedComments) : [];
} catch (e) {
    comments = [];
}

let hasVoted = getCookie('voted') !== null;
let hasCommented = getCookie('commented') !== null;

/**
 * UI Elements
 */
const likeBtn = document.getElementById('like-btn');
const dislikeBtn = document.getElementById('dislike-btn');
const likeCountSpan = document.getElementById('like-count');
const dislikeCountSpan = document.getElementById('dislike-count');
const commentInput = document.getElementById('comment-input');
const submitBtn = document.getElementById('submit-btn');
const clearBtn = document.getElementById('clear-btn');
const commentList = document.getElementById('comment-list');

/**
 * UI Functions
 */

function updateUI() {
    likeCountSpan.textContent = likes;
    dislikeCountSpan.textContent = dislikes;
    
    // Manage Voting State
    if (hasVoted) {
        likeBtn.disabled = true;
        dislikeBtn.disabled = true;
        const vote = getCookie('voted');
        if (vote === 'like') {
            likeBtn.style.borderColor = "#3b82f6";
            likeBtn.style.backgroundColor = "#eff6ff";
        } else if (vote === 'dislike') {
            dislikeBtn.style.borderColor = "#3b82f6";
            dislikeBtn.style.backgroundColor = "#eff6ff";
        }
    } else {
        likeBtn.disabled = false;
        dislikeBtn.disabled = false;
        likeBtn.style.borderColor = "";
        likeBtn.style.backgroundColor = "";
        dislikeBtn.style.borderColor = "";
        dislikeBtn.style.backgroundColor = "";
    }

    // Manage Commenting State
    if (hasCommented) {
        submitBtn.disabled = true;
        commentInput.disabled = true;
        commentInput.placeholder = "You have already left a comment.";
    } else {
        submitBtn.disabled = false;
        commentInput.disabled = false;
        commentInput.placeholder = "Write a comment...";
    }

    // Render Comments
    commentList.innerHTML = '';
    comments.forEach(text => {
        const div = document.createElement('div');
        div.className = 'comment-item';
        div.textContent = text;
        commentList.appendChild(div);
    });
}

/**
 * Event Listeners
 */

likeBtn.addEventListener('click', () => {
    if (hasVoted) return;
    likes++;
    hasVoted = true;
    setCookie('likes', likes);
    setCookie('voted', 'like');
    updateUI();
});

dislikeBtn.addEventListener('click', () => {
    if (hasVoted) return;
    dislikes++;
    hasVoted = true;
    setCookie('dislikes', dislikes);
    setCookie('voted', 'dislike');
    updateUI();
});

submitBtn.addEventListener('click', () => {
    const text = commentInput.value.trim();
    if (!text || hasCommented) return;
    
    comments.push(text);
    hasCommented = true;
    setCookie('comments', JSON.stringify(comments));
    setCookie('commented', 'true');
    commentInput.value = '';
    updateUI();
});

clearBtn.addEventListener('click', () => {
    // Reset state to defaults
    likes = 100;
    dislikes = 20;
    comments = [];
    hasVoted = false;
    hasCommented = false;

    // Erase all cookies
    eraseCookie('likes');
    eraseCookie('dislikes');
    eraseCookie('comments');
    eraseCookie('voted');
    eraseCookie('commented');

    // Update UI
    updateUI();
});

/**
 * Initialize
 */
updateUI();
