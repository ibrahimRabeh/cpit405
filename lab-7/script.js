/**
 * Lab 7: Asynchronous JavaScript (Ajax programming)
 * API: Unsplash Search
 * Student: Ibrahim Aljohani
 */

const ACCESS_KEY = 'fbwNQVaS7AlGJbOjRIKax3VSbT4Ne08J-GXkvM_juE0';
const API_URL = 'https://api.unsplash.com/search/photos';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const imageGrid = document.getElementById('imageGrid');
const statusMessage = document.getElementById('statusMessage');
const statusText = document.getElementById('statusText');
const methodRadios = document.getElementsByName('fetchMethod');

/**
 * Main search handler
 */
function handleSearch() {
    const query = searchInput.value.trim();
    if (!query) return;

    // Get selected method
    let method = 'xhr';
    for (const radio of methodRadios) {
        if (radio.checked) {
            method = radio.value;
            break;
        }
    }

    // Prepare UI
    clearGallery();
    showStatus(`Searching for "${query}" using ${method.toUpperCase()}...`);

    // Route to appropriate fetch function
    switch (method) {
        case 'xhr':
            fetchWithXHR(query);
            break;
        case 'promises':
            fetchWithPromises(query);
            break;
        case 'async':
            fetchWithAsyncAwait(query);
            break;
    }
}

/**
 * 1. Fetch using XMLHttpRequest (XHR)
 */
function fetchWithXHR(query) {
    const xhr = new XMLHttpRequest();
    const url = `${API_URL}?query=${encodeURIComponent(query)}&per_page=12`;
    
    xhr.open('GET', url);
    xhr.setRequestHeader('Authorization', `Client-ID ${ACCESS_KEY}`);

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            const data = JSON.parse(xhr.responseText);
            displayResults(data.results);
        } else {
            handleError(`XHR Error: ${xhr.status} ${xhr.statusText}`);
        }
    };

    xhr.onerror = function() {
        handleError('XHR Network Error');
    };

    xhr.send();
}

/**
 * 2. Fetch using Fetch API with Promises (.then)
 */
function fetchWithPromises(query) {
    const url = `${API_URL}?query=${encodeURIComponent(query)}&per_page=12`;
    
    fetch(url, {
        headers: {
            'Authorization': `Client-ID ${ACCESS_KEY}`
        }
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
    })
    .then(data => {
        displayResults(data.results);
    })
    .catch(error => {
        handleError(`Fetch Promises Error: ${error.message}`);
    });
}

/**
 * 3. Fetch using Fetch API with Async/Await
 */
async function fetchWithAsyncAwait(query) {
    const url = `${API_URL}?query=${encodeURIComponent(query)}&per_page=12`;
    
    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': `Client-ID ${ACCESS_KEY}`
            }
        });
        
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const data = await response.json();
        displayResults(data.results);
    } catch (error) {
        handleError(`Async/Await Error: ${error.message}`);
    }
}

/**
 * Dynamically create and render image cards
 */
function displayResults(images) {
    hideStatus();
    
    if (images.length === 0) {
        imageGrid.innerHTML = `
            <div class="empty-state">
                <p>No results found for your search. Try another keyword!</p>
            </div>`;
        return;
    }

    images.forEach((img, index) => {
        const card = document.createElement('div');
        card.className = 'image-card';
        card.style.animationDelay = `${index * 0.05}s`; // Staggered reveal effect
        
        card.innerHTML = `
            <img src="${img.urls.regular}" alt="${img.alt_description || 'Unsplash Image'}" loading="lazy">
            <div class="image-info">
                <span class="author-name">📸 ${img.user.name}</span>
                <p class="image-desc">${img.description || img.alt_description || 'Click to view'}</p>
            </div>
        `;

        // Handle mouse click on card (Open in new tab)
        card.addEventListener('click', () => {
            window.open(img.links.html, '_blank');
        });

        imageGrid.appendChild(card);
    });
}

/**
 * UI Helper functions
 */
function clearGallery() {
    imageGrid.innerHTML = '';
}

function showStatus(text) {
    statusText.innerText = text;
    statusMessage.classList.remove('status-hidden');
}

function hideStatus() {
    statusMessage.classList.add('status-hidden');
}

function handleError(msg) {
    hideStatus();
    console.error(msg);
    imageGrid.innerHTML = `
        <div class="empty-state" style="border-color: #ef4444; color: #ef4444;">
            <p>⚠️ ${msg}</p>
        </div>`;
}

// --- Event Listeners ---

// Mouse Click Event
searchBtn.addEventListener('click', handleSearch);

// Keyboard Event (Enter Key)
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Clear Button Mouse Event
clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearGallery();
    imageGrid.innerHTML = `
        <div class="empty-state">
            <p>Enter a keyword to start exploring.</p>
        </div>`;
    hideStatus();
    searchInput.focus();
});

// Focus input on load
window.addEventListener('load', () => {
    searchInput.focus();
});
