import React, { useState } from 'react'
import Home from './components/pages/home/Home'
import { Route, Routes, useParams } from 'react-router-dom'
import PlayVideo from './components/pages/playvideo/PlayVideo'
import Navbar from './components/Navbar/Navbar'

const App = () => {
 const [sideBar,setSideBar] = useState(false)
 const [category,setCategory] =useState(0)
  return (
    <div className='app'>
      <Navbar setSideBar={setSideBar} sideBar={sideBar}/>
    <Routes>
      <Route path='/play/:categoryId/:videoId' element={<PlayVideo  category={category} setCategory={setCategory}/>}/>

<Route path='/' element={<Home category={category}setCategory={setCategory} sideBar={sideBar}/>}/>
    </Routes>
    </div>
  )
}

export default App
