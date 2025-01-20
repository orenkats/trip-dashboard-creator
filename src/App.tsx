import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Discover from './pages/Discover'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/discover" element={<Discover />} />
    </Routes>
  )
}

export default App