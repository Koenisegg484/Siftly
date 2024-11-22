import express from 'express';

const router = express.Router();

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({
    message: 'Server is running',
    status: 'OK',
    timestamp: new Date().toISOString(),
  });
});

export default router;
