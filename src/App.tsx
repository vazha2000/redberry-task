import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Main } from './views/Main'
import { AddBlog2 } from './views/AddBlog'
import { BlogPage } from './views/BlogPage'

function App() {

  return (
    <Routes>
      <Route path="/" element={<Main />}/>
      <Route path="/add-blog" element={<AddBlog2 />}/>
      <Route path="/blog/:id" element={<BlogPage />}/>
    </Routes>
  )
}

export default App
