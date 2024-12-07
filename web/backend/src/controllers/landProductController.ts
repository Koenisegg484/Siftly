// src/controllers/landProduct.controller.ts
import { Request, Response } from 'express';
import { IProduct } from '../interfaces/product.interface';
import LandProduct from '../models/landProduct';

export const createLandProduct = async (req: Request, res: Response) => {
  try {
    const landProductData: IProduct = req.body;
    const newLandProduct = new LandProduct(landProductData);
    
    await newLandProduct.save();
    
    res.status(201).json({
      message: 'Land product created successfully',
      landProduct: newLandProduct
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating land product',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getAllLandProducts = async (req: Request, res: Response) => {
  try {
    const landProducts = await LandProduct.find();
    
    res.status(200).json({
      message: 'Land products retrieved successfully',
      landProducts,
      count: landProducts.length
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving land products',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getLandProductById = async (req: Request, res: Response) => {
  try {
    const product = await LandProduct.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        message: 'Land product not found'
      });
    }
    
    res.status(200).json({
      message: 'Land product retrieved successfully',
      landProduct: product
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving land product',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const updateLandProduct = async (req: Request, res: Response) => {
  try {
    const landProductId = req.params.id;
    const updateData: Partial<IProduct> = req.body;
    
    const updatedLandProduct = await LandProduct.findByIdAndUpdate(
      landProductId, 
      updateData, 
      { new: true, runValidators: true }
    );
    
    if (!updatedLandProduct) {
      return res.status(404).json({
        message: 'Land product not found'
      });
    }
    
    res.status(200).json({
      message: 'Land product updated successfully',
      landProduct: updatedLandProduct
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating land product',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const deleteLandProduct = async (req: Request, res: Response) => {
  try {
    const deletedLandProduct = await LandProduct.findByIdAndDelete(req.params.id);
    
    if (!deletedLandProduct) {
      return res.status(404).json({
        message: 'Land product not found'
      });
    }
    
    res.status(200).json({
      message: 'Land product deleted successfully',
      landProduct: deletedLandProduct
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting land product',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};