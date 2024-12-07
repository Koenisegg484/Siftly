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
  images: string;
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

interface product {
  productDetailItem: ProductDetailItem;
}

const ProductDetail: React.FC<product> = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

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

  console.log(product);
  return (
    <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:gap-20 lg:py-10">
      {/* Image Gallery */}
      <div className="mx-auto w-full lg:w-[100%]">
        <ReactImageGallery
          items={product.images.map((url) => ({
            original: url,
            thumbnail: url, // or modify to a smaller version of the image if necessary
          }))}
          showBullets={true}
          showFullscreenButton={false}
          showPlayButton={false}
          showThumbnails={true}
          additionalClass="image-gallery-container"
        />
      </div>

      {/* Description */}
      <div className="mx-auto px-5 lg:px-5">
        <h2 className="pt-3 text-2xl font-bold lg:pt-0">{product.name}</h2>
        <div className="mt-1">
          <div className="flex items-center">
            <Rater
              style={{ fontSize: "20px" }}
              total={5}
              interactive={false}
              rating={3.5} // You can change the rating to use the actual rating from your prop
            />
            <p className="ml-3 text-sm text-gray-400">({product.reviews})</p>
          </div>
        </div>
        <p className="mt-5 font-bold">
          Availability:{" "}
          {product.availability ? (
            <span className="text-red-600">Expired</span>
          ) : (
            <span className="text-green-600">In Stock</span>
          )}
        </p>
        <p className="font-bold">
        Category: <span className="font-normal">{product.category || 'electronics'}</span>
        </p>
        <p className="mt-4 text-4xl font-bold text-violet-900">
          ₹{product.price}{" "}
          <span className="text-xs text-gray-400 line-through">
            ₹{product.previousPrice}
          </span>
        </p>
        <p className="pt-5 text-sm leading-5 text-gray-500">
          {product.description}
        </p>

        {/* Size Selection */}
        {/* Uncomment to display size options */}
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
      </div>
    </section>
  );
};

export default ProductDetail;
