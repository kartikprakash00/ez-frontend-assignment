import React from 'react'
import CapabilityCarousel from './components/CapabilityCarousel'
import USPSection from './components/USPSection'

const App = () => {
  return (
    <div className='bg-gradient-to-b from-[#0c223f] to-[#0a1625] min-h-screen'>
      <CapabilityCarousel />
      <USPSection />
    </div>
  )
}

export default App
