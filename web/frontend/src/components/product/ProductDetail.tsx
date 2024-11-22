import React, { useState } from "react";
import ReactImageGallery from "react-image-gallery";
import Rater from "react-rater";
import "react-rater/lib/react-rater.css";
import "react-image-gallery/styles/css/image-gallery.css"; // Ensure you import the gallery CSS

type Image = {
  original: string;
  thumbnail: string;
};

type ProductDetailItem = {
  images: Image[];
  title: string;
  reviews: string;
  availability: boolean;
  brand: string;
  category: string;
  sku: string;
  price: number;
  previousPrice: number;
  description: string;
  size: string[];
  color: string[];
};

const ProductDetail: React.FC = () => {
  const [quantity, setQuantity] = useState(1);

  const productDetailItem: ProductDetailItem = {
    images: [
      {
        original:
          "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U29ueSUyMGhlYWRwaG9uZXN8ZW58MHx8MHx8fDA%3D",
        thumbnail:
          "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U29ueSUyMGhlYWRwaG9uZXN8ZW58MHx8MHx8fDA%3D",
      },
      {
        original:
          "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U29ueSUyMGhlYWRwaG9uZXN8ZW58MHx8MHx8fDA%3D",
        thumbnail:
          "https://plus.unsplash.com/premium_photo-1679513691474-73102089c117?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U29ueSUyMGhlYWRwaG9uZXN8ZW58MHx8MHx8fDA%3D",
      },
    ],
    title: "Sony WH-1000XM4",
    reviews: "150",
    availability: false,
    brand: "Apex",
    category: "Headphones",
    sku: "BE45VGTRK",
    price: 450,
    previousPrice: 599,
    description:
      "Industry-leading noise canceling with dual noise sensor technology",
    size: ["XS", "S", "M", "L", "XL"],
    color: ["gray", "violet", "red"],
  };

  const plusMinusButtonClasses =
    "flex h-8 w-8 cursor-pointer items-center justify-center border border-gray-300 duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500";

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Before: Using defaultProps
  const Rater = ({
    rating = 5,
    stars = 5,
  }: {
    rating?: number;
    stars?: number;
  }) => {
    return (
      <div>
        Rating: {rating} / {stars}
      </div>
    );
  };

  return (
    <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:gap-20 lg:py-10">
      {/* Image Gallery */}
      <div className="mx-auto w-full lg:w-[100%]">
        <ReactImageGallery
          items={productDetailItem.images}
          showBullets={true}
          showFullscreenButton={false}
          showPlayButton={false}
          showThumbnails={true}
          additionalClass="image-gallery-container"
        />
      </div>

      {/* Description */}
      <div className="mx-auto px-5 lg:px-5">
        <h2 className="pt-3 text-2xl font-bold lg:pt-0">
          {productDetailItem.title}
        </h2>
        <div className="mt-1">
          <div className="flex items-center">
            <Rater
              style={{ fontSize: "20px" }}
              total={5}
              interactive={false}
              rating={3.5}
            />
            <p className="ml-3 text-sm text-gray-400">
              ({productDetailItem.reviews})
            </p>
          </div>
        </div>
        <p className="mt-5 font-bold">
          Availability:{" "}
          {productDetailItem.availability ? (
            <span className="text-green-600">In Stock</span>
          ) : (
            <span className="text-red-600">Expired</span>
          )}
        </p>
        <p className="font-bold">
          Brand: <span className="font-normal">{productDetailItem.brand}</span>
        </p>
        <p className="font-bold">
          Category:{" "}
          <span className="font-normal">{productDetailItem.category}</span>
        </p>
        <p className="font-bold">
          SKU: <span className="font-normal">{productDetailItem.sku}</span>
        </p>
        <p className="mt-4 text-4xl font-bold text-violet-900">
          ₹{productDetailItem.price}{" "}
          <span className="text-xs text-gray-400 line-through">
            ₹{productDetailItem.previousPrice}
          </span>
        </p>
        <p className="pt-5 text-sm leading-5 text-gray-500">
          {productDetailItem.description}
        </p>

        {/* Size Selection */}
        {/* <div className="mt-6">
          <p className="pb-2 text-xs text-gray-500">Size</p>
          <div className="flex gap-1">
            {productDetailItem.size.map((size, index) => {
              return (
                <div
                  key={index}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center border duration-100 hover:bg-neutral-100 focus:ring-2 focus:ring-gray-500 active:ring-2 active:ring-gray-500"
                >
                  {size}
                </div>
              );
            })}
          </div>
        </div> */}

        {/* Action Buttons */}
        <div className="mt-7 flex flex-row items-center gap-6">
          <button className="flex h-12 w-1/3 items-center justify-center bg-violet-900 text-white duration-100 hover:bg-blue-800">
            <i className="fas fa-shopping-cart mx-2"></i>
            Buy Now
          </button>
          <button className="flex h-12 w-1/3 items-center justify-center bg-amber-400 duration-100 hover:bg-yellow-300">
            <i className="fas fa-heart mx-2"></i>
            Wishlist
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
