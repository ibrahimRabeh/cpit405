import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import RecipeDetails from './RecipeDetails';

function App() {
  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="logo">
          <Link to="/">🍽️ RecipeFinder</Link>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
        </div>
      </nav>
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </main>

      <footer className="footer">
        <p>&copy; 2026 RecipeFinder (Lab 9). All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
