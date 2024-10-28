import React from 'react'
import Navbars from '../../components/navbar'
import FooterAdmin from '../../components/footer'

export default function Bookings() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbars />
      <main className="flex-grow">
        {/* Add your dashboard content here */}
      </main>
      <FooterAdmin />
    </div>
  )
}
