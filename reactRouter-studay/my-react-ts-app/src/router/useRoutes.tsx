import React, { lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// Lazy components
const Film = lazy(() => import('../components/Film'));
const Cinema = lazy(() => import('../components/Cinema'));
const Center = lazy(() => import('../components/Center'));
const Login = lazy(() => import('../components/Default')); // 建议改名
const Search = lazy(() => import('@/views/Search'));
const Detail = lazy(() => import('@/views/Detail'));
const Detailrouter = lazy(() => import('@/views/Detailrouter'));
const Notfound = lazy(() => import('@/views/Notfound'));
const Nowplaying = lazy(() => import('@/views/film/Nowplaying'));
const Comingsoon = lazy(() => import('@/views/film/Comingsoon'));

const AuthCpt = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: '/film',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Film />
        </Suspense>
      ),
      children: [
        {
          path: '',
          element: <Navigate to="/film/nowplaying" replace />
        },
        {
          path: 'nowplaying',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Nowplaying />
            </Suspense>
          )
        },
        {
          path: 'comingsoon',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Comingsoon />
            </Suspense>
          )
        },
        {
          path: 'detail/:id',
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Detail />
            </Suspense>
          )
        }
      ]

    },
    {
      path: '/cinema',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Cinema />
        </Suspense>
      ),
    },
    {
      path: '/center',
      element: (
        <AuthCpt>
          <Suspense fallback={<div>Loading...</div>}>
            <Center />
          </Suspense>
        </AuthCpt>
      ),
    },
    {
      path: '/login',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: '/search',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Search />
        </Suspense>
      ),
    },
    {
      path: '/detail/:id',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Detail />
        </Suspense>
      ),
    },
    {
      path: '/detailrouter',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Detailrouter />
        </Suspense>
      ),
    },
    {
      path: '/',
      element: <Navigate to="/film  `" replace />,
    },
    {
      path: '*',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <Notfound />
        </Suspense>
      ),
    },
  ]);

  return routes;
};

export default AppRoutes;