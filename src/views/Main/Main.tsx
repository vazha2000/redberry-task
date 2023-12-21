import React from 'react'
import "./Main.scss"
import { Navbar } from '../../components/Navbar'
import { Hero } from '../../components/Hero'

export const Main = () => {
  return (
    <div className='main-wrapper'>
      <Navbar />
      <Hero />
    </div>
  )
}
