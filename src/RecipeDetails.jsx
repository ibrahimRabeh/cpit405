import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const apiKey = import.meta.env.VITE_SPOONACULAR_API_KEY;
        if (!apiKey) {
          throw new Error('Spoonacular API Key is missing. Please add it to your .env file.');
        }

        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch recipe details.');
        }

        const data = await response.json();
        setRecipe(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return <div className="loading-state">Loading recipe details...</div>;
  }

  if (error) {
    return (
      <div className="error-state">
        <div className="error-message card">{error}</div>
        <Link to="/" className="btn secondary-btn" style={{marginTop: '1rem'}}>Back to Search</Link>
      </div>
    );
  }

  if (!recipe) return null;

  return (
    <div className="recipe-details-container">
      <Link to="/" className="back-link">&larr; Back to Search</Link>
      
      <div className="recipe-header">
        <h1 className="hero-title">{recipe.title}</h1>
        <div className="recipe-meta">
          <span>⏱️ Ready in {recipe.readyInMinutes} mins</span>
          <span>🍽️ Servings: {recipe.servings}</span>
          {recipe.vegetarian && <span className="tag veg">Vegetarian</span>}
          {recipe.vegan && <span className="tag vegan">Vegan</span>}
          {recipe.glutenFree && <span className="tag gf">Gluten Free</span>}
        </div>
      </div>

      <div className="details-grid">
        <div className="recipe-image-container">
          <img src={recipe.image} alt={recipe.title} className="detail-img" />
        </div>

        <div className="ingredients-card card">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id || ingredient.original}>
                {ingredient.original}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="instructions-card card">
        <h2>Instructions</h2>
        {recipe.instructions ? (
          <div 
            className="instructions-content" 
            dangerouslySetInnerHTML={{ __html: recipe.instructions }} 
          />
        ) : (
          <p>No instructions available for this recipe.</p>
        )}
      </div>
    </div>
  );
}

export default RecipeDetails;
