import React from 'react'
import { Navigation } from '../components/dashboard/Navigation'
import { Input } from '../components/ui/input'
import { useSearch } from '../features/search/hooks/useSearch'

const Discover = () => {
  const { searchQuery, setSearchQuery, filteredResults } = useSearch()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[#F8F8F8]">
      <Navigation />
      <main className="pt-20 pb-12 px-4">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-xl mx-auto">
            <Input
              type="search"
              placeholder="Search places, users, or posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
          </div>
          {/* Search results would go here */}
        </div>
      </main>
    </div>
  )
}

export default Discover