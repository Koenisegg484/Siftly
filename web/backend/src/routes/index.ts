// src/routes/index.ts
import express from 'express';
import authRoutes from "./authRoutes";
import productRoutes from "./productRoutes";
import landProductRoutes from "./landProductRoutes";
import helmet from 'helmet';
import healthCheckRoutes from "./healthCheck"; 

const router = express.Router();

// Centralized routing
router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/land-products', landProductRoutes);
router.use('/health', healthCheckRoutes);

export default router;