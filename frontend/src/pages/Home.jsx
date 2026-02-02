import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeList from '../components/RecipeList';
import { getRecipes } from '../services/api';

export default function Home() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const response = await getRecipes();
        setRecipes(response.data);
      } catch (err) {
        setError('Failed to load recipes');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectRecipe = (id) => {
    navigate(`/recipes/${id}`);
  };

  return (
    <div className="page home-page">
      <header className="header">
        <h1>🍽️ Dinner Served</h1>
        <p>Discover delicious recipes</p>
      </header>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading && <p>Loading recipes...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <RecipeList 
          recipes={filteredRecipes}
          onSelectRecipe={handleSelectRecipe}
        />
      )}
    </div>
  );
}
