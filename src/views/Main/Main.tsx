import React, { useState } from 'react'
import "./Main.scss"
import { Navbar } from '../../components/Navbar'
import { Hero } from '../../components/Hero'
import { HeroCategories } from '../../components/HeroCategories'
import { HeroBlogs } from '../../components/HeroBlogs'

export const Main = () => {
  const [activeCategories, setActiveCategories] = useState<string[]>([]);

  return (
    <div className='main-wrapper'>
      <Navbar />
      <Hero />
      <HeroCategories activeCategories={activeCategories} setActiveCategories={setActiveCategories}/>
      <HeroBlogs activeCategories={activeCategories}/>
    </div>
  )
}
