import React from 'react';
import priceData from './graph.json';  // Importing JSON data

const Lowhigh = () => {
  // Find the global lowest and highest prices
  const globalPrices = priceData.flatMap(platform => platform.prices);
  const globalLowestPrice = Math.min(...globalPrices);
  const globalHighestPrice = Math.max(...globalPrices);

  const getPriceInfo = (prices, dates) => {
    // Finding the lowest and highest prices along with their dates
    const lowestIndex = prices.indexOf(Math.min(...prices));
    const highestIndex = prices.indexOf(Math.max(...prices));

    return {
      lowestPrice: prices[lowestIndex],
      lowestDate: dates[lowestIndex],
      highestPrice: prices[highestIndex],
      highestDate: dates[highestIndex]
    };
  };

  return (
    <div className="container mx-auto max-w-[800px] py-5">
      <h2 className="text-2xl font-bold mb-4">Price Comparison</h2>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Platform</th>
            <th className="py-3 px-6 text-center">Lowest Price ($)</th>
            <th className="py-3 px-6 text-center">Lowest Date</th>
            <th className="py-3 px-6 text-center">Highest Price ($)</th>
            <th className="py-3 px-6 text-center">Highest Date</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm">
          {priceData.map((platform, index) => {
            const { lowestPrice, lowestDate, highestPrice, highestDate } = getPriceInfo(platform.prices, platform.dates);

            return (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-5 text-left">{platform.platform}</td>
                <td className={`py-3 px-5 text-center ${lowestPrice === globalLowestPrice ? 'bg-green-100' : ''}`}>
                  {lowestPrice}
                </td>
                <td className="py-3 px-5 text-center">{lowestDate}</td>
                <td className={`py-3 px-5 text-center ${highestPrice === globalHighestPrice ? 'bg-red-100' : ''}`}>
                  {highestPrice}
                </td>
                <td className="py-3 px-5 text-center">{highestDate}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Lowhigh;
