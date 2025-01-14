import React from 'react'
import Sidebar from '../../Sidebar/Sidebar'
import Feed from '../../feed/Feed'
import "./Home.css"

const Home = ({category,setCategory,sideBar}) => {
  return (
    <div className='home'>
        <div className="container">
        <Sidebar setCategory={setCategory} sideBar={sideBar}/>
        </div>
        <Feed category ={category}setCategory={setCategory}/>
    </div>
  )
}

export default Home
