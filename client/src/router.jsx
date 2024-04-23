import { Navigate, useRoutes } from 'react-router-dom';

import BlogPage from './pages/BlogPage';
import UserPage from './pages/AdminPanel/user/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/AdminPanel/product/ProductsPage';
import DashboardAppPage from './pages/AdminPanel/DashboardAppPage';
import DashboardLayout from './layout/dashboard/DashboardLayout';
import SimpleLayout from './layout/simple/SimpleLayout';
import HomePage from './pages/HomePage';
import ReviewPage from './pages/AdminPanel/rating/ReviewPage';
import OrderPage from './pages/AdminPanel/order/OrderPage';
import PaymentSuccess from './components/payments/PaymentSuccess';
import Payments from './components/payments/Payments';
import PaymentPortal from './components/payments/PaymentPortal';
import SignInSide from './pages/SignUp';
import ProductManage from './pages/AdminPanel/product/ProductManage';
import ProductCategoryManage from './pages/AdminPanel/product/ProductCategoryManage';
// import ProductViewPage from './pages/ProductViewPage';

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
                { path: 'manageproducts', element: <ProductManage /> },
                { path: 'managecategories', element: <ProductCategoryManage /> },
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
            path: 'signup',
            element: <SignInSide />,
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
                    element: <HomePage />,
                },
                {
                    path: '/productview/:id',
                    element: <HomePage />,
                },
                {
                    path: '/shop',
                    element: <HomePage />,
                },
                {
                    path: '/track',
                    element: <HomePage />,
                },
                {
                    path: '/paymentsuccess',
                    element: <HomePage />,
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
