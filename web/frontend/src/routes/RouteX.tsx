import { Routes, Route } from 'react-router-dom'; // Ensure correct imports
import LandingPage from '../pages/LandingPage';
import Product from '../pages/Product';
import Auth from '../pages/Auth';

// Define the type for each route object
type RouteConfig = {
  route: string;
  element: JSX.Element;
};

const RouteX: React.FC = () => {
  // Define routes with type annotations
  const routes: RouteConfig[] = [
    {
      route: '/',
      element: <LandingPage />,
    },
    {
      route: '/product',
      element: <Product />,
    },
    {
      route: '/auth',
      element: <Auth />,
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
