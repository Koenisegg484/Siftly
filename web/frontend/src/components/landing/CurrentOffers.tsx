// CurrentOffers.tsx
import React, { useEffect, useState } from "react";
import offersData from "../../constants/offers.json"; // Adjust the path as necessary
import CardOffer from "../../utils/OfferCard";

interface Offer {
  title: string;
  description: string;
  price: string;
  startDate: string;
  endDate: string;
  creditCardIcon: string;
  ecommerceIcon: string;
}

const CurrentOffers: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data: Offer[] = offersData; // Simulated fetch
        setOffers(data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
     <div className="py-10 dark:bg-gray-800 mt-4">
      <h2 className="text-3xl font-bold text-center mb-4 dark:bg-gray-800 dark:text-white">Ongoing & Upcoming Sales</h2>
      <div className="flex flex-wrap justify-center gap-8 p-8 dark:bg-gray-800">
        {offers.map((offer, index) => (
          <CardOffer
            key={index}
            title={offer.title}
            description={offer.description}
            price={offer.price}
            startDate={offer.startDate}
            endDate={offer.endDate}
            creditCardIcon={offer.creditCardIcon}
            ecommerceIcon={offer.ecommerceIcon}
          />
        ))}
      </div>
      </div>
    </>
  );
};

export default CurrentOffers;
