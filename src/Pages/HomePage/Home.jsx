import React from 'react'
import Seats from '../../Components/Seats/Seats'
import CalendarComp from '../../Components/Calendar/CalendarComp'
import Header from '../../Components/Header/Header'

export default function Home() {
  return (
    <div>
      <Header />
      <CalendarComp />
      <Seats />
    </div>
  )
}
