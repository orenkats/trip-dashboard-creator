import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Discover from './pages/Discover'
import Profile from './pages/Profile'

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F8F8]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  )
}