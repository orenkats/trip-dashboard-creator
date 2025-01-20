import { Routes, Route } from 'react-router-dom'
import Profile from './app/profile/[username]/page'

export default function App() {
  return (
    <Routes>
      <Route path="/profile/:username" element={<Profile />} />
    </Routes>
  )
}