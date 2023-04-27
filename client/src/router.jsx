import { Navigate, useRoutes } from 'react-router-dom';

import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import DashboardLayout from './layout/dashboard/DashboardLayout';
import SimpleLayout from './layout/simple/SimpleLayout';
import HomePage from './pages/HomePage';
import Cart from './common/Cart/Cart';
import ReviewPage from './pages/ReviewPage';
import OrderPage from './pages/OrderPage';
import PaymentPortalHome from './components/payments/PaymentPortalHome';
import Payments from './components/payments/Payments';
import PaymentPortal from './components/payments/PaymentPortal';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'users', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blogs', element: <BlogPage /> },
        { path: 'ratings', element: <ReviewPage /> },
        { path: 'orders', element: <OrderPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '/',
      element: <SimpleLayout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/cart',
          element: <Cart />,
        },
        {
          path: '/paymentportal',
          element: <PaymentPortalHome />,
        },
        {
          path: '/paymentportal/pay',
          element: <PaymentPortal />,
        },
        {
          path: '/payments',
          element: <Payments />,
        },

        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },

    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
