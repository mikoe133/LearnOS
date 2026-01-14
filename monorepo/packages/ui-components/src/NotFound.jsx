import React from 'react';

const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#f8f9fa',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    }}>
      <h1 style={{
        fontSize: '6rem',
        fontWeight: 'bold',
        color: '#6c757d',
        margin: '0 0 1rem 0'
      }}>
        404
      </h1>
      <h2 style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#495057',
        marginBottom: '1rem'
      }}>
        页面未找到
      </h2>
      <p style={{
        fontSize: '1rem',
        color: '#6c757d',
        maxWidth: '500px',
        lineHeight: '1.6'
      }}>
        抱歉，您访问的页面不存在或已被移除。请检查URL是否正确，或返回首页继续浏览。
      </p>
      <button style={{
        marginTop: '1.5rem',
        padding: '0.5rem 1.5rem',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem'
      }}
      onClick={() => window.location.href = '/'}>
        返回首页
      </button>
    </div>
  );
};

export default NotFound;