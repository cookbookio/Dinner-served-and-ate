# Dinner Served - Recipe Application

A full-stack recipe application built with **Node.js/Express** backend and **React** frontend.

## Project Structure

```
.
├── backend/                 # Node.js/Express API server
│   ├── src/
│   │   ├── server.js       # Express app setup
│   │   ├── db.js           # SQLite connection utilities
│   │   ├── init-db.js      # Database initialization and seeding
│   │   ├── middleware/
│   │   │   └── auth.js     # Authentication middleware
│   │   ├── routes/
│   │   │   ├── api.js      # API overview routes
│   │   │   ├── users.js    # User endpoints
│   │   │   └── recipes.js  # Recipe endpoints
│   │   └── models/
│   │       ├── User.js     # User model
│   │       ├── Recipe.js   # Recipe model
│   │       └── Ingredient.js # Ingredient model
│   └── package.json
│
└── frontend/                # React app
    ├── src/
    │   ├── components/
    │   │   ├── RecipeList.jsx
    │   │   ├── RecipeDetail.jsx
    │   │   └── UserProfile.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   └── RecipePage.jsx
    │   ├── services/
    │   │   └── api.js       # API client
    │   ├── App.jsx          # Main app with routing
    │   ├── App.css
    │   ├── index.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── package.json
    └── .env
```

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
npm install
```

2. Start the backend server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## API Endpoints

### User Routes
- `POST /api/user/create/` - Create new user
- `GET /api/user/me/` - Get current user
- `PUT /api/user/me/` - Update user
- `PATCH /api/user/me/` - Partially update user
- `POST /api/user/token/` - Get user token

### Recipe Routes
- `GET /api/recipe/recipes/` - Get all recipes
- `POST /api/recipe/recipes/` - Create recipe
- `GET /api/recipe/recipes/:id/` - Get recipe by ID
- `PUT /api/recipe/recipes/:id/` - Update recipe
- `PATCH /api/recipe/recipes/:id/` - Partially update recipe
- `DELETE /api/recipe/recipes/:id/` - Delete recipe
- `POST /api/recipe/recipes/:id/upload-image/` - Upload recipe image

### Ingredient Routes
- `GET /api/recipe/ingredients/` - Get all ingredients
- `PUT /api/recipe/ingredients/:id/` - Update ingredient
- `PATCH /api/recipe/ingredients/:id/` - Partially update ingredient
- `DELETE /api/recipe/ingredients/:id/` - Delete ingredient

### Tag Routes
- `GET /api/recipe/tags/` - Get all tags
- `PUT /api/recipe/tags/:id/` - Update tag
- `PATCH /api/recipe/tags/:id/` - Partially update tag
- `DELETE /api/recipe/tags/:id/` - Delete tag

## Features

- ✅ Browse recipes with search functionality
- ✅ View detailed recipe information
- ✅ See ingredients and tags for each recipe
- ✅ Responsive design for mobile and desktop
- ✅ RESTful API for CRUD operations
- ✅ SQLite database with pre-seeded data

## Technology Stack

**Backend:**
- Express.js - Web framework
- SQLite3 - Database
- CORS - Cross-origin resource sharing

**Frontend:**
- React 18 - UI library
- React Router v6 - Routing
- Axios - HTTP client
- Vite - Build tool
- CSS3 - Styling

## Development Notes

- The backend initializes the SQLite database automatically on startup
- The frontend uses environment variables (`.env`) to configure the API URL
- Both frontend and backend use ES6 modules (`"type": "module"` in package.json)

## Future Enhancements

- [ ] User authentication with JWT
- [ ] Recipe creation/editing UI
- [ ] Image upload functionality
- [ ] Favorite recipes feature
- [ ] Recipe ratings and reviews
- [ ] Shopping list generation
- [ ] Meal planning calendar
