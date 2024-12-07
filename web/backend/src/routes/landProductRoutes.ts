// src/routes/landProduct.route.ts
import { Router } from 'express'; // Import Router, not express
import {
  createLandProduct, 
  deleteLandProduct, 
  getAllLandProducts, 
  getLandProductById, 
  updateLandProduct 
} from '../controllers/landProductController';

const router = Router(); // Use Router() instead of express.Router()

// Create a new product
router.post('/', createLandProduct);

// Get all products
router.get('/', getAllLandProducts);

// Get product by ID
router.get('/:id', getLandProductById);

// Update a product
router.put('/:id', updateLandProduct);

// Delete a product
router.delete('/:id', deleteLandProduct);

export default router;