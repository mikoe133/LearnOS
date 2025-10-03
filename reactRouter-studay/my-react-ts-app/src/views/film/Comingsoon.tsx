import React from 'react'

export default function Comingsoon() {
  return (
    <div style={{
      maxWidth: '600px',
      margin: '40px auto',
      background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      borderRadius: '18px',
      boxShadow: '0 4px 24px rgba(168,237,234,0.12)',
      padding: '36px 28px',
      textAlign: 'center'
    }}>
      <h2 style={{
        color: '#ff6a88',
        fontWeight: 700,
        fontSize: '2rem',
        marginBottom: '18px',
        letterSpacing: '2px'
      }}>
        即将上映
      </h2>
      <p style={{
        color: '#555',
        fontSize: '1.15rem',
        marginBottom: '24px'
      }}>
        这些电影即将登陆影院，敬请期待精彩上映！
      </p>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(255,106,136,0.10)',
          padding: '16px',
          width: '140px'
        }}>
          <img src="https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=400&q=80"
            alt="即将上映1"
            style={{
              width: '100%',
              height: '80px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '10px'
            }} />
          <div style={{ fontWeight: 600, color: '#ff6a88' }}>电影三</div>
        </div>
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(255,106,136,0.10)',
          padding: '16px',
          width: '140px'
        }}>
          <img src="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=400&q=80"
            alt="即将上映2"
            style={{
              width: '100%',
              height: '80px',
              objectFit: 'cover',
              borderRadius: '8px',
              marginBottom: '10px'
            }} />
          <div style={{ fontWeight: 600, color: '#ff6a88' }}>电影四</div>
        </div>
      </div>
    </div>
  )
}
