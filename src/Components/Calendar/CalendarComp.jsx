import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


export default function CalendarComp() {
  const today = new Date()
  const [selectedDate, setSelectedDate] = useState(today)

  function handleDateChange(date){
    const today = new Date()
    today.setHours(0,0,0,0);
    if (date < today){
      window.alert('cannot select past dates.')
      return
    }
    setSelectedDate(date)
  }
  return (
    <div className='mb-4'>
      <h2 className='text-center py-3'>Seminar Hall Booking</h2>
      <div className='d-flex justify-content-center py-3'>
        <DatePicker className='form-control'
        dateFormat= "dd/MM/yyyy"
        selected={selectedDate}
        placeholderText='Click to select a date'
        onChange={handleDateChange}
        />
      </div>
    </div>
  )
}
