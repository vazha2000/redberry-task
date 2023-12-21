import React from 'react'
import "./Main.scss"
import { Navbar } from '../../components/Navbar'
import { Hero } from '../../components/Hero'
import { HeroCategories } from '../../components/HeroCategories'

export const Main = () => {
  return (
    <div className='main-wrapper'>
      <Navbar />
      <Hero />
      <HeroCategories />
    </div>
  )
}
