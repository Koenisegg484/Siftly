// CardOffer.tsx
import React from "react";

interface Offer {
  title: string;
  description: string;
  price: string;
  startDate: string;
  endDate: string;
  creditCardIcon: string;
  ecommerceIcon: string;
  backgroundImage: string; // Add this property for background image
}

const CardOffer: React.FC<Offer> = ({
  title,
  description,
  price,
  startDate,
  endDate,
  creditCardIcon,
  ecommerceIcon,
}) => {
  return (
    <div
      className={`flex flex-col rounded-3xl shadow-lg transition-transform duration-300 hover:scale-105 ${
        title === "Starter" ? "w-full md:w-1/2 lg:w-1/3" : "w-full md:w-1/4"
      }`}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
      />
      <div
        className="flex flex-col justify-center items-center p-6"
        style={{ position: "relative", zIndex: 1, opacity: 0.95 }} // Slightly higher opacity for text readability
      >
        <div className="text-center mb-4">
          {/* Semi-transparent background for better text visibility */}
          <div className="bg-black bg-opacity-40 p-4 rounded-3xl">
            <div className="flex items-center justify-center mb-4">
              <i
                className={`fas ${creditCardIcon} mr-2 text-white text-2xl`}
              ></i>
              <h2 className="text-2xl font-bold text-white lg:text-3xl">
                {title}
              </h2>
            </div>
            <p className="text-white text-sm mb-2">{description}</p>
            <p className="text-white text-sm mb-4">
              Valid from: <strong>{startDate}</strong> to{" "}
              <strong>{endDate}</strong>
            </p>
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="mt-2">
            {" "}
            {/* Add margin to create space for "Free" */}
            <span className="text-5xl font-bold text-white">{price}</span>
          </p>
          <div className="mt-2 flex items-center justify-center">
            <i className={`fas ${ecommerceIcon} mr-2 text-white text-2xl`}></i>
            <span className="text-sm text-white">eCommerce Plan</span>
          </div>
        </div>
        <div className="mt-2 text-center">
          {" "}
          {/* New container for "Free" */}
        </div>
      </div>
      <div className="flex px-6 pb-6 sm:px-8" style={{ position: "relative", zIndex: 1, opacity: 0.95 }}>
        <a
          aria-describedby="tier-company"
          className="flex items-center justify-center w-full px-6 py-3 text-center text-white duration-200 bg-black border-2 border-black rounded-full inline-flex hover:bg-white hover:text-black hover:border-transparent focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"
          href="#"
        >
          Visit
        </a>
      </div>
    </div>
  );
};

export default CardOffer;
