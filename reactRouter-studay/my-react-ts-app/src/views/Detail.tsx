import React from 'react'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'

export default function Detail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [id, setId] = React.useState(searchParams.get('id') || '');
  const [src, setSrc] = React.useState(() => {
    const encodedSrc = searchParams.get('src');
    return encodedSrc ? decodeURIComponent(encodedSrc) : '';
  });
  const navigator = useNavigate();
  return (
    <div style={{
      maxWidth: '520px',
      margin: '60px auto',
      background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
      borderRadius: '20px',
      boxShadow: '0 6px 32px rgba(253,160,133,0.15)',
      padding: '40px 32px',
      textAlign: 'center'
    }}>

      <h2 style={{
        color: '#f76b1c',
        fontWeight: 700,
        fontSize: '2.2rem',
        marginBottom: '18px',
        letterSpacing: '2px'
      }}>
        电影详情
      </h2>
      <img
        src={src}
        alt="电影海报"
        style={{
          width: '180px',
          height: '110px',
          objectFit: 'cover',
          borderRadius: '12px',
          marginBottom: '18px',
          boxShadow: '0 2px 12px rgba(247,107,28,0.10)'
        }}
        onClick={() => {
          navigator(`/detailrouter/${id}`);
        }
        }
      />
      <p style={{
        color: '#555',
        fontSize: '1.15rem',
        marginBottom: '24px'
      }}>
        这里是电影的详细介绍页面。你可以在这里展示电影的名称、简介、上映时间、主演等详细信息。
      </p>
      <div style={{
        background: '#fff7e6',
        borderRadius: '10px',
        padding: '18px',
        color: '#f76b1c',
        fontWeight: 600,
        fontSize: '1.05rem',
        marginBottom: '18px',
        boxShadow: '0 1px 4px rgba(247,107,28,0.06)'
      }}>
        <div>电影名称：示例电影</div>
        <div>上映时间：2025-10-01</div>
        <div>主演：张三、李四、王五</div>
        <div>电影ID：{id}</div>
      </div>

      <NavLink
        style={{
          display: 'inline-block',
          padding: '10px 28px',
          background: 'linear-gradient(90deg, #f76b1c 0%, #fad961 100%)',
          color: '#fff',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 600,
          boxShadow: '0 2px 8px rgba(247,107,28,0.13)',
          transition: 'background 0.2s'
        }}
        className={({ isActive }) => isActive ? 'xyyactive' : ''}
        to={'/film'}>返回电影列表 </NavLink>

    </div>
  )
}
