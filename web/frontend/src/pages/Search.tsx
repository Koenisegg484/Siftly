import { useLocation, Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

const Search = () => {
  const location = useLocation();
  const { products } = location.state || {}; // Destructure products from state
  console.log(products);
  return (
    <div>
        <div className="mb-5"><Navbar/></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 dark:bg-gray-800 pt-3">
          {products ? (
            products.products.map((product) => (
              <div
                className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-full"
                key={product.id}
              >
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-64">
                  <img
                    src={product.image || "/placeholder-image.jpg"}
                    alt={product.title}
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                      {product.title}
                    </p>
                  </div>
                  <div className="flex justify-around">
                    <p className="block font-sans text-sm antialiased font-bold leading-normal text-black opacity-75">
                     ₹ {product.price || "No description available."}
                    </p>
                    <p className="block font-sans text-sm antialiased font-bold leading-normal text-black opacity-75">
                     {product.platform || "No description available."}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link
                    to={{ pathname: `/product/`, state: product }}
                    className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
    </div>
  );
};

export default Search;
