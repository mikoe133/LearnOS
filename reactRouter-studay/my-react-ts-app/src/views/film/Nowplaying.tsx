import React from 'react'

import { useNavigate,useParams,useLocation } from 'react-router-dom'
import { JSX } from 'react/jsx-runtime';

const  withRouter = (Component: React.ComponentType<any>) => {
  return (props: JSX.IntrinsicAttributes) => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    return <Component {...props} navigate={navigate} params={params} location={location} />
  }
}



export default function Nowplaying() {
  return (
    <div style={{
      maxWidth: '600px',
      margin: '40px auto',
      background: 'linear-gradient(135deg, #f9d423 0%, #ff4e50 100%)',
      borderRadius: '18px',
      boxShadow: '0 4px 24px rgba(255,78,80,0.12)',
      padding: '36px 28px',
      textAlign: 'center'
    }}>
      <h2 style={{
        color: '#ff4e50',
        fontWeight: 700,
        fontSize: '2rem',
        marginBottom: '18px',
        letterSpacing: '2px'
      }}>
        正在热映
      </h2>
      <p style={{
        color: '#555',
        fontSize: '1.15rem',
        marginBottom: '24px'
      }}>
        这里展示当前正在热映的电影，快来选一部喜欢的电影吧！
      </p>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(255,78,80,0.10)',
          padding: '16px',
          width: '140px'
        }}>
          <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80"
            alt="热映电影1"
            style={{
              width: '100%',
              height: '80px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '10px'
            }} />
          <div style={{ fontWeight: 600, color: '#ff4e50' }}>电影一</div>
        </div>
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(255,78,80,0.10)',
          padding: '16px',
          width: '140px'
        }}>
          <img src="https://images.unsplash.com/photo-1465101178521-c1a4c8a16d7d?auto=format&fit=crop&w=400&q=80"
            alt="热映电影2"
            style={{
              width: '100%',
              height: '80px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '10px'
            }} />
          <div style={{ fontWeight: 600, color: '#ff4e50' }}>电影二</div>
        </div>
      </div>
    </div>
  )
}
