import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import Discover from '@/pages/Discover'
import Profile from '@/pages/Profile'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/profile/:username" element={<Profile />} />
    </Routes>
  )
}

export default App