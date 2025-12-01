// @/views/NotFound.tsx
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h2>404 - 页面未找到</h2>
      <p>你访问的页面不存在。</p>
      <Link to="/home">返回首页</Link>
    </div>
  )
}

export default NotFound