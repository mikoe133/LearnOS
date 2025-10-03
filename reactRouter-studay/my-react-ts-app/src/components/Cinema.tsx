import React, { useState } from 'react'
import './Cinema.css'

interface Cinema {
  id: number
  name: string
  location: string
  rating: number
  facilities: string[]
  image: string
}

interface Movie {
  id: number
  title: string
  duration: string
  showTimes: string[]
}

export default function Cinema() {
  
  const [selectedCinema, setSelectedCinema] = useState<Cinema | null>(null)

  // Mock data

  


  
  const cinemas: Cinema[] = [
    {
      id: 1,
      name: '万达影城（国贸店）',
      location: '朝阳区建国门外大街1号',
      rating: 4.8,
      facilities: ['IMAX', '杜比全景声', '4D', 'VIP厅'],
      image: 'https://images.unsplash.com/photo-1489185078527-794c41b9bc25?w=400&h=200&fit=crop'
    },
    {
      id: 2,
      name: 'CGV影城（蓝色港湾店）',
      location: '朝阳区朝阳公园路6号',
      rating: 4.6,
      facilities: ['ScreenX', '4DX', 'VIP厅'],
      image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=400&h=200&fit=crop'
    },
    {
      id: 3,
      name: '博纳国际影城',
      location: '海淀区中关村大街19号',
      rating: 4.7,
      facilities: ['IMAX', '激光厅', 'VIP厅'],
      image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=200&fit=crop'
    }
  ]

  const movies: Movie[] = [
    {
      id: 1,
      title: '流浪地球3',
      duration: '125分钟',
      showTimes: ['10:30', '13:20', '16:10', '19:00', '21:50']
    },
    {
      id: 2,
      title: '阿凡达：水之道',
      duration: '192分钟',
      showTimes: ['09:00', '12:30', '16:00', '19:30']
    },
    {
      id: 3,
      title: '满江红',
      duration: '159分钟',
      showTimes: ['11:00', '14:20', '17:40', '21:00']
    }
  ]

  return (
    <div className="cinema-container">
      <div className="cinema-header">
        <h1>🎬 影院选择</h1>
        <p>选择您心仪的影院，享受极致观影体验</p>
      </div>

      <div className="cinema-content">
        <div className="cinema-list">
          <h2>推荐影院</h2>
          <div className="cinema-grid">
            {cinemas.map(cinema => (
              <div 
                key={cinema.id} 
                className={`cinema-card ${selectedCinema?.id === cinema.id ? 'selected' : ''}`}
                onClick={() => setSelectedCinema(cinema)}
              >
                <div className="cinema-image">
                  <img src={cinema.image} alt={cinema.name} />
                  <div className="rating">
                    <span>⭐ {cinema.rating}</span>
                  </div>
                </div>
                <div className="cinema-info">
                  <h3>{cinema.name}</h3>
                  <p className="location">📍 {cinema.location}</p>
                  <div className="facilities">
                    {cinema.facilities.map((facility, index) => (
                      <span key={index} className="facility-tag">{facility}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {selectedCinema && (
          <div className="movie-schedule">
            <h2>🎭 {selectedCinema.name} - 排片表</h2>
            <div className="movies-grid">
              {movies.map(movie => (
                <div key={movie.id} className="movie-schedule-card">
                  <div className="movie-info">
                    <h3>{movie.title}</h3>
                    <p className="duration">⏱️ {movie.duration}</p>
                  </div>
                  <div className="show-times">
                    <h4>今日场次</h4>
                    <div className="time-slots">
                      {movie.showTimes.map((time, index) => (
                        <button key={index} className="time-slot">
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {!selectedCinema && (
        <div className="empty-state">
          <div className="empty-icon">🎪</div>
          <h3>请选择一家影院</h3>
          <p>点击上方影院卡片查看排片信息</p>
        </div>
      )}
    </div>
  )
}