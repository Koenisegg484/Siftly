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
          "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
        thumbnail:
          "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        original:
          "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=600",
        thumbnail:
          "https://images.pexels.com/photos/1667088/pexels-photo-1667088.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        original:
          "https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&w=600",
        thumbnail:
          "https://images.pexels.com/photos/2697787/pexels-photo-2697787.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
      {
        original:
          "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        thumbnail:
          "https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      },
      {
        original:
          "https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=600",
        thumbnail:
          "https://images.pexels.com/photos/3910071/pexels-photo-3910071.jpeg?auto=compress&cs=tinysrgb&w=600",
      },
    ],
    title: "BIG ITALIAN SOFA",
    reviews: "150",
    availability: true,
    brand: "Apex",
    category: "Sofa",
    sku: "BE45VGTRK",
    price: 450,
    previousPrice: 599,
    description:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quidem exercitationem voluptate sint eius ea assumenda provident eos repellendus qui neque! Velit ratione illo maiores voluptates commodi eaque illum, laudantium non!",
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
const Rater = ({ rating = 5, stars = 5 }: { rating?: number; stars?: number }) => {
  return <div>Rating: {rating} / {stars}</div>;
};


  return (
    <section className="container flex-grow mx-auto max-w-[1200px] border-b py-5 lg:grid lg:grid-cols-2 lg:gap-10 lg:py-10">
      {/* Image Gallery */}
      <div className="mx-auto w-full lg:w-[80%]">
        <ReactImageGallery
          items={productDetailItem.images}
          showBullets={false}
          showFullscreenButton={false}
          showPlayButton={false}
          showThumbnails={true}
          additionalClass="image-gallery-container" // Additional class for image gallery
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
        <div className="mt-6">
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
        </div>

        {/* Color Selection */}
        <div className="mt-6">
          <p className="pb-2 text-xs text-gray-500">Color</p>
          <div className="flex gap-1">
            {productDetailItem.color.map((color, index) => {
              return (
                <div
                  key={index}
                  className={`h-8 w-8 cursor-pointer border bg-${color}-600`}
                />
              );
            })}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mt-6">
          <p className="pb-2 text-xs text-gray-500">Quantity</p>
          <div className="flex items-center">
            <button className={plusMinusButtonClasses} onClick={decrementQuantity}>
              −
            </button>
            <div className="flex h-8 w-8 items-center justify-center border-t border-b">
              {quantity}
            </div>
            <button className={plusMinusButtonClasses} onClick={incrementQuantity}>
              +
            </button>
          </div>
        </div>

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
