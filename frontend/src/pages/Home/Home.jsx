import React from 'react'
import Navbar from '../../components/Navbar'
import HeroSection from './HeroSection'
import Categories from './Categories'
import ChefSpecials from './ChefSpecials'
import Footer from '../../components/Footer'
import Dishes from '../Dishes/Dishes'


function Home() {
  return (
    <div>
      <HeroSection />
      <Categories />
      <ChefSpecials />
    </div>
  )
}

export default Home