import { useState } from 'react';

function Home() {
  const [url, setUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [shortenedUrls, setShortenedUrls] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!url) {
      setError('Please enter a valid URL');
      return;
    }

    // Basic URL validation
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
    } catch (_) {
      setError('Invalid URL format');
      return;
    }

    // Generate short URL (use custom alias if provided, else random string)
    let alias = customAlias.trim();
    if (!alias) {
      alias = Math.random().toString(36).substring(2, 8);
    }

    // Check if custom alias is already used
    if (shortenedUrls.some(item => item.short === alias)) {
      setError('Custom alias is already in use. Please choose another one.');
      return;
    }

    const newShortUrl = {
      original: url.startsWith('http') ? url : `https://${url}`,
      short: alias,
      createdAt: new Date().toLocaleDateString()
    };

    setShortenedUrls([newShortUrl, ...shortenedUrls]);
    setUrl('');
    setCustomAlias('');
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Shorten Your Links</h1>
        <p className="hero-subtitle">Create concise, shareable URLs in seconds.</p>
      </div>

      <div className="card form-card">
        <form onSubmit={handleSubmit} className="shorten-form">
          <div className="form-group">
            <label htmlFor="url">Original URL</label>
            <input
              type="text"
              id="url"
              placeholder="https://example.com/very/long/url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="customAlias">Custom Alias (Optional)</label>
            <div className="input-with-prefix">
              <span className="prefix">linkshrink.io/</span>
              <input
                type="text"
                id="customAlias"
                placeholder="my-custom-link"
                value={customAlias}
                onChange={(e) => setCustomAlias(e.target.value)}
              />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn primary-btn">Shorten URL</button>
        </form>
      </div>

      {shortenedUrls.length > 0 && (
        <div className="results-section">
          <h2>Your Recent Links</h2>
          <div className="links-list">
            {shortenedUrls.map((item, index) => (
              <div key={index} className="card link-card">
                <div className="link-details">
                  <p className="original-url" title={item.original}>{item.original}</p>
                  <a href={item.original} target="_blank" rel="noopener noreferrer" className="short-url">
                    linkshrink.io/<span>{item.short}</span>
                  </a>
                </div>
                <button 
                  className="btn secondary-btn"
                  onClick={() => navigator.clipboard.writeText(`https://linkshrink.io/${item.short}`)}
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
