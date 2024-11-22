import { Request, Response } from 'express';
import { Product } from '../models/product';
import { IProduct } from '../interfaces/product.interface';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const productData: IProduct = req.body;
    const product = new Product(productData);
    
    await product.save();
    
    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating product',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    
    res.status(200).json({
      message: 'Products retrieved successfully',
      products,
      count: products.length
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving products',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }
    
    res.status(200).json({
      message: 'Product retrieved successfully',
      product
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving product',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const updateData: Partial<IProduct> = req.body;
    
    const product = await Product.findByIdAndUpdate(
      productId, 
      updateData, 
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }
    
    res.status(200).json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating product',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }
    
    res.status(200).json({
      message: 'Product deleted successfully',
      product
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting product',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};