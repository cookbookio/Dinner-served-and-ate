export default function RecipeDetail({ recipe, onBack }) {
  if (!recipe) {
    return (
      <div className="recipe-detail">
        <p>Recipe not found.</p>
      </div>
    );
  }

  return (
    <div className="recipe-detail">
      <button onClick={onBack} className="back-button">← Back</button>
      
      <h1>{recipe.title}</h1>
      
      <div className="recipe-info">
        <p><strong>⏱️ Time:</strong> {recipe.time_minutes} minutes</p>
        <p><strong>💰 Price:</strong> ${recipe.price}</p>
        {recipe.link && (
          <p><strong>Link:</strong> <a href={recipe.link} target="_blank" rel="noopener noreferrer">View original</a></p>
        )}
      </div>

      <div className="recipe-section">
        <h2>Ingredients</h2>
        {recipe.ingredients && recipe.ingredients.length > 0 ? (
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li key={ingredient.id}>
                {ingredient.amount} {ingredient.unit} - {ingredient.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No ingredients listed.</p>
        )}
      </div>

      <div className="recipe-section">
        <h2>Tags</h2>
        <div className="tags">
          {recipe.tags && recipe.tags.map((tag) => (
            <span key={tag.id} className="tag">
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      <div className="recipe-section">
        <h2>Description</h2>
        <p>{recipe.description || 'No description available.'}</p>
      </div>
    </div>
  );
}
