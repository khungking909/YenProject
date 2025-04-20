import { Home } from '@pages/Home';
import Product from '@pages/Product/Product';
import { ProductDetail } from '@pages/ProductDetail';
import SignIn from '@pages/SignIn/SignIn';
import SignUp from '@pages/SignUp/SignUp';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from 'src/common/layouts';
import ProtectedRoute from 'src/common/layouts/Layout/ProtectedRoute';
import { ScreenPath } from 'src/constants/screen';

const CartPage = lazy(() => import('@pages/Cart/Cart'));

const router = createBrowserRouter(
  [
    {
      path: ScreenPath.HOME,
      element: <Layout></Layout>,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          element: <Product />,
          path: ScreenPath.PRODUCT,
        },
        {
          element: <ProductDetail />,
          path: ScreenPath.PRODUCT_DETAIL,
        },
        {
          element: <ProtectedRoute />,
          children: [
            {
              path: '',
              element: <CartPage />,
            },
          ],
          path: ScreenPath.CART,
        },
        {
          element: <SignIn />,
          path: ScreenPath.SIGN_IN,
        },
        {
          element: <SignUp />,
          path: ScreenPath.SIGN_UP,
        },
      ],
    },
  ],
  {
    future: {
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_fetcherPersist: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  },
);

export default router;
