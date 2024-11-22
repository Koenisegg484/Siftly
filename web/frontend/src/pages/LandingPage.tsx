import React, { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import Banner from "../components/landing/Banner";
import CategorySection from "../components/landing/CategorySection";
import LandProducts from "../components/landing/LandProducts";
import CurrentOffers from "../components/landing/CurrentOffers";
import Cookie from "../components/Cookie";

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
      <CategorySection />
      <LandProducts />
      <CurrentOffers />
      {/* <Footer/> */}
    </>
  );
};

export default LandingPage;
