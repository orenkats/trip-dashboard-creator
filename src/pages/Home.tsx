import React from 'react'
import { Navigation } from '../components/dashboard/Navigation'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F8F8]">
      <Navigation />
      <main className="pt-20 pb-12 px-4">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-4xl font-bold">Welcome to TravelNotes</h1>
        </div>
      </main>
    </div>
  )
}

export default Home