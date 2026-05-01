import { useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchRecipes = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError('');

    try {
      const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
      if (!apiKey) {
        throw new Error('Spoonacular API Key is missing. Please add it to your .env file.');
      }

      const response = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&number=12`
      );

      if (!response.ok) {
        if (response.status === 401 || response.status === 402) {
          throw new Error('API Key is invalid or quota exceeded.');
        }
        throw new Error('Failed to fetch recipes.');
      }

      const data = await response.json();
      setRecipes(data.results);
      
      if (data.results.length === 0) {
        setError('No recipes found for your search.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Find Your Next Meal</h1>
        <p className="hero-subtitle">Search through thousands of delicious recipes.</p>
      </div>

      <div className="search-section">
        <form onSubmit={searchRecipes} className="search-form">
          <input
            type="text"
            placeholder="Search for pasta, chicken, etc..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="btn primary-btn search-btn" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {error && <div className="error-message card">{error}</div>}

      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card card">
            <img src={recipe.image} alt={recipe.title} className="recipe-img" />
            <div className="recipe-content">
              <h3>{recipe.title}</h3>
              <Link to={`/recipe/${recipe.id}`} className="btn secondary-btn view-btn">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
