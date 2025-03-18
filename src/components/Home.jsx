import React from 'react'
import MyCalendar from './MyCalendar'
import RoomSelect from './Home/RoomSelect'
import Navbar from './Layouts/Navbar'

function Home() {


 console.log("hell")
  return (
    <div className=' '>
        <Navbar/>
        <RoomSelect/>
    </div>
  )
}

export default Home