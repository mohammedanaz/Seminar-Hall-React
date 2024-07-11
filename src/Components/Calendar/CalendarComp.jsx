import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import {createBooking, refreshSeats, changeSelectedDate} from '../../Slices/Slice'


export default function CalendarComp() {

  const [inputName, setInputName] = useState('')
  const [inputPhoneNumber, setinputPhoneNumber] = useState('')
  const selectedDate = useSelector(state=> state.seminarHall.selectedDate)
  const seatNumbers = useSelector(state=> state.seminarHall.seatNumbers)
  const bookedData = useSelector(state=> state.seminarHall.bookedData)
  const dispatch = useDispatch()

  useEffect(()=>{
    console.log('use effect inside calendar comp');
    dispatch(refreshSeats())
    },[selectedDate, bookedData])

  function handleInputName(e){
    setInputName(e.target.value)
  }
  function handleInputPhoneNumber(e){
    setinputPhoneNumber(e.target.value)
  }
  function handleDateChange(date){
    const today = new Date()
    today.setHours(0,0,0,0);
    if (date < today){
      window.alert('cannot select past dates.')
      return
    }
    dispatch(changeSelectedDate(date.toDateString()))
  }
  function handleBooking(){
    if(inputName === '' || inputPhoneNumber === null){
      window.alert('Either Name or Phone number not entered.')
      return
    }
    const selectedSeats = seatNumbers.filter(seat=> seat.clicked === true && seat.isBooked === false)
    if (selectedSeats.length === 0){
      window.alert('No seats selected.')
      return
    }
    dispatch(createBooking({
      selectedSeats: selectedSeats, 
      selectedDate: selectedDate,
      name: inputName,
      phoneNumber: inputPhoneNumber
    }))
    setInputName('')
    setinputPhoneNumber('')
  }
  return (
    <div className='mb-4'>
      <h2 className='text-center py-3'>Seminar Hall Booking</h2>
      <div className='d-flex flex-column flex-md-row justify-content-center
        align-items-center py-3'>
        <div className='d-flex flex-column flex-md-row justify-content-center 
          align-items-center flex-grow-1 mb-4 mb-md-0 border border-3 p-4 rounded-4 mx-md-1'>
          <label htmlFor="date">Select Date: </label><br />
          <DatePicker className='form-control' 
          id='date'
          dateFormat= "dd/MM/yyyy"
          selected={selectedDate}
          placeholderText='Click to select a date'
          onChange={handleDateChange}
          />
        </div>
        <div className='d-flex flex-column flex-md-row flex-grow-1 
          border border-3 p-4 rounded-4 mx-md-1'>
          <input type="text" 
          className='form-control mb-2 mb-md-0 mx-md-2'
          placeholder='Enter Your Name'
          value={inputName}
          onChange={handleInputName}
          />
          <input type="number" 
          className='form-control mb-2 mb-md-0 mx-md-2'
          placeholder='Enter Your Phone Number'
          value={inputPhoneNumber}
          onChange={handleInputPhoneNumber}
          />
          <button className='btn btn-primary mx-md-2 w-50'
            onClick={handleBooking}
            >
            Book
          </button>
        </div>
      </div>
    </div>
  )
}
