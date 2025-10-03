import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function Center() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>个人中心</h1>
      <h2>center</h2>
      登录成功后 显示的内容
      <button onClick={() => {
        localStorage.removeItem('token')
        navigate('/login')
        console.log('退出登录');

      }}>退出登录</button>
    </div>
  )
}
