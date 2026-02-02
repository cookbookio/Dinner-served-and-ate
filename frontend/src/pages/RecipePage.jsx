import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RecipeDetail from '../components/RecipeDetail';
import { getRecipeById } from '../services/api';

export default function RecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        const response = await getRecipeById(id);
        setRecipe(response.data);
      } catch (err) {
        setError('Failed to load recipe');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) return <div className="page"><p>Loading...</p></div>;
  if (error) return <div className="page"><p>{error}</p></div>;

  return (
    <div className="page">
      <RecipeDetail 
        recipe={recipe} 
        onBack={() => navigate('/')}
      />
    </div>
  );
}
