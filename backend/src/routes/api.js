import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  console.log('Route invoked: GET /api');
  const routes = {
    create_user_url: 'http://localhost:3000/api/user/create/',
    current_user_url: 'http://localhost:3000/api/user/me/',
    user_token_url: 'http://localhost:3000/api/user/token/',
    recipes_url: 'http://localhost:3000/api/recipe/recipes/{?ingredients,tags}',
    recipe_url: 'http://localhost:3000/api/recipe/recipes/{id}/',
    recipe_image_url: 'http://localhost:3000/api/recipe/recipes/{id}/upload-image/',
    ingredients_url: 'http://localhost:3000/api/recipe/ingredients/{?assigned_only}',
    ingredient_url: 'http://localhost:3000/api/recipe/ingredients/{id}/',
    tags_url: 'http://localhost:3000/api/recipe/tags/{?assigned_only}',
    tag_url: 'http://localhost:3000/api/recipe/tags/{id}/'
  };
  res.status(200).json(routes);
});

export default router;
