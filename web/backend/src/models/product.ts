import mongoose from 'mongoose';
import { IProduct } from '../interfaces/product.interface';

const ProductSchema = new mongoose.Schema<IProduct>({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  description: { 
    type: String, 
    trim: true 
  },
  price: { 
    type: Number, 
    required: true, 
    min: 0 
  },
  category: { 
    type: String, 
    required: true 
  },
  stock: { 
    type: Number, 
    required: true, 
    min: 0 
  }
}, {
  timestamps: true
});

export const Product = mongoose.model<IProduct>('Product', ProductSchema);