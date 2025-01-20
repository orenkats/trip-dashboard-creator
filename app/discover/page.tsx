'use client'

import { Navigation } from "@/components/dashboard/Navigation"

export default function Discover() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F8F8]">
      <Navigation />
      <main className="pt-20 pb-12 px-4">
        <div className="max-w-screen-xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Discover</h1>
          {/* Discover page content will go here */}
        </div>
      </main>
    </div>
  )
}