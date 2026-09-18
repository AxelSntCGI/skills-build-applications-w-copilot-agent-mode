import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink className="brand" to="/activities"><span className="brand-mark">O</span><span>Octofit <em>Tracker</em></span></NavLink>
        <nav className="main-nav" aria-label="Primary navigation">
          <NavLink to="/activities">Activities</NavLink><NavLink to="/leaderboard">Leaderboard</NavLink><NavLink to="/teams">Teams</NavLink><NavLink to="/users">Users</NavLink><NavLink to="/workouts">Workouts</NavLink>
        </nav>
        <div className="status-pill"><span /> API online</div>
      </header>
      <main className="page-content"><Routes><Route path="/" element={<Activities />} /><Route path="/activities" element={<Activities />} /><Route path="/leaderboard" element={<Leaderboard />} /><Route path="/teams" element={<Teams />} /><Route path="/users" element={<Users />} /><Route path="/workouts" element={<Workouts />} /></Routes></main>
    </div>
  )
}

export default App
