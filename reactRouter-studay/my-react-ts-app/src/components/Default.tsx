import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function Default() {
  const navigate= useNavigate()
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
      borderRadius: '16px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      margin: '40px auto',
      maxWidth: '500px',
      padding: '48px 32px'
    }}>
      <h1 style={{
        color: '#3a7bd5',
        fontSize: '2.5rem',
        marginBottom: '16px',
        fontWeight: 700,
        letterSpacing: '2px'
      }}>
        欢迎来到登录页面
      </h1>
      <p style={{
        color: '#555',
        fontSize: '1.2rem',
        marginBottom: '32px',
        textAlign: 'center'
      }}>
        这是一个美化后的默认路由页面。<br />
        请通过导航栏选择其他页面进行访问。
        <button onClick={() => {
          localStorage.setItem('token', 'your_token_value');
          navigate('/center')
        }
        }>快速登录</button>
      </p>
      <a
        href="/"
        style={{
          display: 'inline-block',
          padding: '10px 28px',
          background: 'linear-gradient(90deg, #3a7bd5 0%, #00d2ff 100%)',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600,
          boxShadow: '0 2px 8px rgba(58,123,213,0.15)',
          transition: 'background 0.2s'
        }}
      >
        返回首页
      </a>
    </div>
  )
}
