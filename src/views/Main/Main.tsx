import React from 'react'
import "./Main.scss"
import { Navbar } from '../../components/Navbar'
import { Hero } from '../../components/Hero'
import { HeroCategories } from '../../components/HeroCategories'
import { HeroBlogs } from '../../components/HeroBlogs'

export const Main = () => {
  return (
    <div className='main-wrapper'>
      <Navbar />
      <Hero />
      <HeroCategories />
      <HeroBlogs />
    </div>
  )
}
