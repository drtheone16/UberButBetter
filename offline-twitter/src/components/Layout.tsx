import type React from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'

export const Layout: React.FC = () => {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <Link to="/">Offline Tweeter</Link>
        </div>
        <nav className="nav">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>Home</NavLink>
          <NavLink to="/profile/alex" className={({ isActive }) => (isActive ? 'active' : '')}>My Profile</NavLink>
        </nav>
      </aside>
      <main className="content">
        <Outlet />
      </main>
    </div>
  )
}