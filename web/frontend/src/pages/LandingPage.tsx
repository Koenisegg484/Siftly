import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Banner from "../components/landing/Banner";
import Categories from "../components/landing/Categories";
import LandProducts from "../components/landing/LandProducts";
import CurrentOffers from "../components/landing/CurrentOffers";
import Cookie from "../utils/Cookie";
import Footer from "../components/footer/Footer";

const LandingPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const handleAccept = () => {
    console.log("Cookies accepted");
    // Handle accept logic here
  };

  const handleDecline = () => {
    console.log("Cookies declined");
    // Handle decline logic here
  };
  return (
    <>
      <Cookie onAccept={handleAccept} onDecline={handleDecline} />
      <Navbar />
      <Banner />
      <Categories />
      <LandProducts />
      <CurrentOffers />
      {/* <Footer/> */}
    </>
  );
};

export default LandingPage;
