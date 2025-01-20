import { Routes, Route } from 'react-router-dom'
import Profile from './pages/Profile'

export default function App() {
  return (
    <Routes>
      <Route path="/profile/:username" element={<Profile />} />
    </Routes>
  )
}