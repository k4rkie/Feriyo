import { useState } from 'react'
import Navbar from '../components/Navbar'
import ListingCard from '../components/ListingCard'
import Sidebar from '../components/Sidebar'
import CreateListing from '../components/CreateListing'
import { Outlet } from 'react-router-dom'

function AppLayout() {
  const [isCreateListingOpen, setIsCreateListingOpen] = useState(false)

  const openCreateListing = () => setIsCreateListingOpen(true)
  const closeCreateListing = () => setIsCreateListingOpen(false)

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar onOpenSellModal={openCreateListing} />
        <main className="flex-1 overflow-y-auto bg-[#1A1A1A] p-6">
          <Outlet />
        </main>
      </div>
      {isCreateListingOpen && (
        <CreateListing isOpen={isCreateListingOpen} onClose={closeCreateListing} />
      )}
    </div>
  )
}

export default AppLayout