import express from 'express';
import { runQuery } from '../db.js';

const router = express.Router();

router.post('/create/', async (req, res) => {
  console.log('Route invoked: POST /api/user/create/');
  try {
    const { email, password, name } = req.body;
    
    const result = await runQuery(
      'INSERT INTO users (email, password, name) VALUES (?, ?, ?)',
      [email, password, name]
    );
    
    res.status(201).json({
      id: result.id,
      email,
      name
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/me/', (req, res) => {
  console.log('Route invoked: GET /api/user/me/');
  res.status(200).json({
    email: 'user@example.com',
    name: 'Example User'
  });
});

router.put('/me/', (req, res) => {
  console.log('Route invoked: PUT /api/user/me/');
  const { email, name, password } = req.body;
  
  res.status(200).json({
    email,
    name
  });
});

router.patch('/me/', (req, res) => {
  console.log('Route invoked: PATCH /api/user/me/');
  const { email, name } = req.body;
  
  res.status(200).json({
    email: email || 'user@example.com',
    name: name || 'Example User'
  });
});

router.post('/token/', (req, res) => {
  console.log('Route invoked: POST /api/user/token/');
  const { email, password } = req.body;
  
  res.status(200).json({
    email,
    password
  });
});

export default router;
