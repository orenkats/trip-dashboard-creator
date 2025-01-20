import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Profile from './pages/Profile'
import Home from './pages/Home'
import Discover from './pages/Discover'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F8F8]">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </div>
  )
}