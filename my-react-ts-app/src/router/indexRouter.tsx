import React, { Suspense, lazy } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'

const Login = lazy(() => import('@/views/login/Login'))
const NewsSandbox = lazy(() => import('../views/sandbox/NewsSandbox'))
const Home = lazy(() => import('@/views/sandbox/home/Home'))
const UserList = lazy(() => import('@/views/sandbox/user-manage/UserList'))
const RoleList = lazy(() => import('@/views/sandbox/right-manage/RoleList'))
const RightList = lazy(() => import('@/views/sandbox/right-manage/RightList'))
const NotFound = lazy(() => import('@/views/NotFound'))



const Authcpt = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token11')
  return token ? children : <Navigate to="/login" replace />
}

export default function IndexRouter() {
  const routes = useRoutes([
    {
      path: '/',
      element:
        <Authcpt>
          <Suspense fallback={<div>Loading...</div>}>
            <NewsSandbox />
          </Suspense>
        </Authcpt>

      ,
      children: [
        {
          index: true, // 👈 默认子路由
          element: <Navigate to="home" replace />
        },
        {
          path: '/home',
          element: <Suspense fallback={<div>Loading...</div>}>
            <Home />
          </Suspense>

        },
        {
          path: '/user-manage/list',
          element: <Suspense fallback={<div>Loading...</div>}>
            <UserList />
          </Suspense>
        },
        {
          path: '/right-manage/role/list',
          element: <Suspense fallback={<div>Loading...</div>}>
            <RoleList />
          </Suspense>
        },
        {
          path: '/right-manage/right/list',
          element: <Suspense fallback={<div>Loading...</div>}>
            <RightList />
          </Suspense>
        }

      ]
    },
    {
      path: '/login',
      element: <Suspense fallback={<div>Loading...</div>}><Login /></Suspense>,
      children: []
    },
    // 👇 404 路由：必须放在最后
    {
      path: '*',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <NotFound />
        </Suspense>
      )
    }
  ])
  return routes
}
