// src/models/landProduct.model.ts
import mongoose from "mongoose";
import { IProduct } from "../interfaces/product.interface";

interface IPriceHistory {
  platform: string;
  prices: number[];
  dates: string[];
  photos: string;
}
const landProductSchema = new mongoose.Schema<
  IProduct & { priceHistory: IPriceHistory[] }
>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    priceHistory: [
      {
        platform: {
          type: String,
          required: true,
        },
        prices: {
          type: [Number],
          required: true,
          validate: {
            validator: (v: number[]) => v.every((price) => price >= 0),
            message: "Prices should be non-negative numbers.",
          },
        },
        dates: {
          type: [String],
          required: true,
          validate: {
            validator: (v: string[]) =>
              v.every((date) => !isNaN(Date.parse(date))),
            message: "Dates should be valid date strings.",
          },
        },
      },
    ],
    images: {
      type: [String],
      validate: {
        validator: (v: string[]) =>
          v.every((url) => /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/.test(url)),
        message: "Each photo must be a valid URL linking to an image.",
      },
    },
  },
  {
    timestamps: true,
  }
);

const LandProduct = mongoose.model<IProduct>("LandProduct", landProductSchema);

export default LandProduct;
