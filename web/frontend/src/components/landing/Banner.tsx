import React, { useState } from "react";
import bannerData from "../../constants/banner.json"; // Import the JSON data directly
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";


// Import Swiper core and required modules directly from 'swiper'
import { Navigation, Pagination, Autoplay } from "swiper/modules";

type BannerItem = {
  title: string;
  subtitle: string;
  discount: string;
  imageUrls: string[]; // Array of image URLs
  buttonText: string;
  buttonLink: string;
};

const Banner: React.FC = () => {
  const [bannerItems] = useState<BannerItem[]>(bannerData); // Use the imported JSON data

  return (
    <div className="container mx-auto max-w-[1800px] py-5 md:py-6 px-2 md:px-1">
      <Swiper
        spaceBetween={30}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        modules={[Navigation, Pagination, Autoplay]}
        className="w-full"
      >
        {bannerItems.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="flex items-stretch justify-center flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 lg:space-x-8">
              {/* Main Banner Section */}
              <div className="flex flex-col md:flex-row items-stretch justify-between bg-gray-100 dark:bg-gray-800 transition-colors py-6 px-6 md:py-12 lg:px-12 md:w-8/12 lg:w-7/12 xl:w-8/12 2xl:w-9/12">
                <div className="flex flex-col justify-center md:w-1/2">
                  <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">
                    {item.title}
                  </h1>
                  <p className="text-base lg:text-xl text-gray-800 dark:text-white mt-2">
                    {item.subtitle}{" "}
                    <span className="font-bold">{item.discount}</span>
                  </p>
                  <div className="mt-4">
                    <a
                      href={item.buttonLink}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 inline-block"
                    >
                      {item.buttonText}
                    </a>
                  </div>
                </div>

                <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end">
                  <img
                    src={item.imageUrls[0]} // First image
                    alt={`${item.title} Image 1`}
                    className="h-auto max-h-[200px] object-contain"
                  />
                </div>
              </div>

              {/* Secondary Banner Section */}
              <div className="md:w-4/12 lg:w-5/12 xl:w-4/12 2xl:w-3/12 bg-gray-100 dark:bg-gray-800 py-6 px-6 md:py-0 md:px-4 lg:px-6 flex flex-col justify-center relative">
                <div className="flex flex-col justify-center">
                  <h1 className="text-3xl lg:text-4xl font-semibold text-gray-800 dark:text-white">
                    {item.secondary.title}
                  </h1>
                  <p className="text-base lg:text-xl text-gray-800 dark:text-white">
                    {item.secondary.subtitle}{" "}
                    <span className="font-bold">{item.secondary.discount}</span>
                  </p>
                  <div className="mt-4">
                    <a
                      href={item.secondary.buttonLink}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 inline-block"
                    >
                      {item.secondary.buttonText}
                    </a>
                  </div>
                </div>

                <div className="flex justify-end md:absolute md:bottom-4 md:right-4 lg:bottom-0 lg:right-0">
                  <img
                    src={item.imageUrls[1]} // Second image
                    alt={`${item.title} Image 2`}
                    className="md:w-20 md:h-20 lg:w-full lg:h-full"
                  />
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
