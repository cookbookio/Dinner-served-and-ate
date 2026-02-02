export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    // TODO: Verify JWT token in production
    req.user = { id: 1, email: 'user@example.com' };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
