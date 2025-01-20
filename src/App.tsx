import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Profile from './pages/Profile'
import Home from '../app/page'
import Discover from '../app/discover/page'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/profile/:username" element={<Profile />} />
    </Routes>
  )
}