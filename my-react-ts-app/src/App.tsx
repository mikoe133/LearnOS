import React, { useEffect } from 'react'
import style from './css/App.module.scss'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'
import AppsRoutes from '@/router/indexRouter'
import { message } from 'antd';
import '@/App.css'

import useCounterStore from '@/store/useStore';

export default function App() {
  const [messageApi, contextHolder] = message.useMessage();

  const setMessageApi = useCounterStore((state) => state.setMessageApi);
  // App.tsx
  useEffect(() => {
    setMessageApi(messageApi);
  }, [messageApi]); // ✅ 依赖 messageApi，而不是 setMessageApi

  return (
    <BrowserRouter>
      {contextHolder}
      <AppsRoutes />
    </BrowserRouter>
  )
}
