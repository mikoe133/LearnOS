import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate, } from 'react-router-dom';

// 假设这三个组件在同级目录下的 components 文件夹中
import Film from '../components/Film';
// import Cinema from '../components/Cinema'; // Ensure this path is correct and the Cinema component is properly exported
import Center from '../components/Center';
import Login from '../components/Default'; // Ensure this path is correct and the Default component is properly exported
import Notfound from '@/views/Notfound';
import Search from '@/views/Search';
import Nowplaying from '@/views/film/Nowplaying';
import Comingsoon from '@/views/film/Comingsoon';
import Detail from '@/views/Detail';
import Detailrouter from '@/views/Detailrouter';

export default function Index() {

  // 重定向方式2
  const Redirectcpt = ({ to }: { to: string }) => {
    const navigate = useNavigate();

    useEffect(() => {
      navigate(to, { replace: true });
      return (() => {

      })
    }, [navigate, to]);
    return null

  }



  return (
    <Routes>
      <Route element={<Film />} />
      {/* 嵌套路由 */}
      <Route path='/film' element={<Film />} > {/* 函数路由 */}
        {/* 默认子路由 */}
        <Route index element={<Redirectcpt to='/film/nowplaying' />} />
        {/* <Route index element={<Nowplaying />} /> */}
        <Route path='nowplaying' element={<Nowplaying />} />
        <Route path='/film/comingsoon' element={<Comingsoon />} />
      </Route>
      <Route path='/detail' element={<Detail />} />
      {/* 动态路由 */}
      <Route path='/detailrouter/:myid' element={<Detailrouter />} />
      <Route path='/cinema' element={lazyLoad('../components/Cinema')} />
      {/* 非嵌套而是兄弟 */}
      <Route path='/cinema/search' element={<Search />} />

      {/* 路由拦截 */}
      <Route path='/center' element={
        <AuthCpt>
          <Center />
        </AuthCpt>
      } />
      <Route path='/login' element={<Login />} />


      {/*重定向方式1 */}
      <Route path='*' element={<Navigate to='/film' replace />} />
      {/* 重定向方式2 */}
      <Route path='*' element={<Redirectcpt to='/login' />} />


    </Routes>
  );
}
const AuthCpt = ({ children }: { children:any }) => {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to='/login' replace />
  }
  return children
}

const lazyLoad = (path: string) => {
  const Component = React.lazy(() => import(path));
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Component />
    </React.Suspense>
  )
}