import React from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'

const carouselImages = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80'
]

export default function Film() {
  const navigate = useNavigate();
  return (
    <div style={{
      maxWidth: '600px',
      margin: '40px auto',
      background: 'linear-gradient(135deg, #f8ffae 0%, #43c6ac 100%)',
      borderRadius: '18px',
      boxShadow: '0 4px 24px rgba(67,198,172,0.12)',
      padding: '32px 24px'
    }}>
      <h2 style={{
        textAlign: 'center',
        color: '#43c6ac',
        fontWeight: 700,
        fontSize: '2rem',
        marginBottom: '24px',
        letterSpacing: '1px'
      }}>
        电影轮播图
      </h2>
      <div style={{
        display: 'flex',
        gap: '16px',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        {carouselImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`电影${idx + 1}`}
            onClick={() => {
              navigate(`/detail?id=${idx + 1}`);
            }}
            style={{
              width: '160px',
              height: '100px',
              objectFit: 'cover',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(67,198,172,0.18)',
              border: '2px solid #fff'
            }}
          />
        ))}
      </div>
      <p style={{
        textAlign: 'center',
        color: '#555',
        fontSize: '1.1rem'
      }}>
        精选电影轮播展示，点击图片可查看更多详情（仅展示效果）。
      </p>

      <Outlet></Outlet>
      <NavLink className={({ isActive }) => isActive ? 'xyyactive' : ''}
        to={'/film/nowplaying'}>nowplaying </NavLink>
      <NavLink className={({ isActive }) => isActive ? 'xyyactive' : ''}
        to={'/film/comingsoon'}>comingsoon </NavLink>
      {/* <Outlet></Outlet> */}
    </div>
  )
}
