import React from 'react'
import { NavLink } from 'react-router-dom'
import'@/css/Tabbar.css';

export default function Tabbar() {
  return (
    <div>
        <div>Tabbar</div>
        
        <NavLink className={({ isActive }) => isActive ? 'xyyactive' : ''} to={'/film'}>film </NavLink>
        <NavLink  className={({ isActive }) => isActive ? 'xyyactive' : ''} to={'/cinema'}>cinema </NavLink>
        <NavLink  className={({ isActive }) => isActive ? 'xyyactive' : ''} to={'/center'}>center</NavLink>
    </div>
  )
}
