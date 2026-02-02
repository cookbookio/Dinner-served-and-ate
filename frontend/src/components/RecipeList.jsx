export default function RecipeList({ recipes, onSelectRecipe }) {
  if (!recipes || recipes.length === 0) {
    return <div className="recipe-list"><p>No recipes found.</p></div>;
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="recipe-card">
          <h3>{recipe.title}</h3>
          <p>⏱️ {recipe.time_minutes} minutes</p>
          <p>💰 ${recipe.price}</p>
          <div className="tags">
            {recipe.tags && recipe.tags.map((tag) => (
              <span key={tag.id} className="tag">
                {tag.name}
              </span>
            ))}
          </div>
          <button onClick={() => onSelectRecipe(recipe.id)}>
            View Recipe
          </button>
        </div>
      ))}
    </div>
  );
}
