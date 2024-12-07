import { Routes, Route } from "react-router-dom"; // Ensure correct imports
import LandingPage from "../pages/LandingPage";
import Product from "../pages/Product";
import Auth from "../pages/Auth";
import About from "../pages/menuPages/About";
import FAQ from "../pages/menuPages/FAQ";
import Contact from "../pages/menuPages/Contact";
import Info from "../pages/menuPages/Info";
import Categories from "../pages/Categories";
import Search from "../pages/Search";

// Define the type for each route object
type RouteConfig = {
  route: string;
  element: JSX.Element;
};

const RouteX: React.FC = () => {
  // Define routes with type annotations
  const routes: RouteConfig[] = [
    {
      route: "/",
      element: <LandingPage />,
    },
    {
      route: "/products/:productId",
      element: <Product />,
    },
    {
      route: "/land-product/:productId",
      element: <Product />,
    },
    {
      route: "/category/:categoryName",
      element: <Categories />,
    },
    {
      route: "/search",
      element: <Search />,
    },
    // auth routes
    {
      route: "/auth",
      element: <Auth />,
    },
    // menu routes
    {
      route: "/about",
      element: <About />,
    },
    {
      route: "/faq",
      element: <FAQ />,
    },
    {
      route: "/contact",
      element: <Contact />,
    },
    {
      route: "/info",
      element: <Info />,
    },
  ];

  return (
    <Routes>
      {routes.map((item, i) => (
        <Route key={i} path={item.route} element={item.element} />
      ))}
    </Routes>
  );
};

export default RouteX;
