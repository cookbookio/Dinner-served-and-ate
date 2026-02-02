import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initDB } from './db.js';
import { initializeDatabase } from './init-db.js';
import apiRoutes from './routes/api.js';
import userRoutes from './routes/users.js';
import recipeRoutes from './routes/recipes.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api', apiRoutes);
app.use('/api/user', userRoutes);
app.use('/api/recipe', recipeRoutes);

// Initialize database and start server
const startServer = async () => {
  try {
    await initDB();
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
