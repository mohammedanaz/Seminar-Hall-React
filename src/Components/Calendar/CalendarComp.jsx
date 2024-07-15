import React, { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  createBooking, 
  refreshSeats, 
  changeSelectedDate, 
  initializeDate,
  loadBookedData
} from '../../Slices/Slice'
import fetchBookedData from '../../Api/fetchBookedData'
import axiosCreateBooking from '../../Api/axiosCeateBooking'


export default function CalendarComp() {

  const [inputName, setInputName] = useState('')
  const [inputPhoneNumber, setinputPhoneNumber] = useState('')
  const selectedDate = useSelector(state=> state.seminarHall.selectedDate)
  const seatNumbers = useSelector(state=> state.seminarHall.seatNumbers)
  const bookedData = useSelector(state=> state.seminarHall.bookedData)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('use effect didMount only inside calendar comp');

    async function getBookedData(){
      try {
        const response = await fetchBookedData();
        const fetchedData = response.data.map(item=> ({
          name: item.name,
          phoneNumber: item.phone_number,
          bookedDate: item.booked_date,
          seats: item.seats
        }));
        dispatch(loadBookedData(fetchedData));

        console.log('fetched data is - ', fetchedData);
      } catch (error) {
        console.log('Error while fetching booked data - ', error);
      }
    }

    dispatch(initializeDate());
    getBookedData();
  }, []);

  useEffect(()=>{
    console.log('use effect to refresh seat inside calendar comp');
    dispatch(refreshSeats())
    },[selectedDate, bookedData])

  function handleInputName(e){
    setInputName(e.target.value)
  }
  function handleInputPhoneNumber(e){
    setinputPhoneNumber(e.target.value)
  }
  function handleDateChange(date){
    const formattedDate = date.toISOString().split('T')[0];
        const today = new Date().toISOString().split('T')[0];
        if (formattedDate < today) {
      window.alert('cannot select past dates.')
      return
    }
    dispatch(changeSelectedDate(formattedDate));
  }

  async function handleBooking() {
    console.log('inside handle booking');
    if (inputName === '' || inputPhoneNumber === '') {
        window.alert('Either Name or Phone number not entered.');
        return;
    }
    const selectedSeats = seatNumbers.filter(seat => seat.clicked === true && seat.isBooked === false);

    if (selectedSeats.length === 0) {
        window.alert('No seats selected.');
        return;
    }

    const seats = selectedSeats.map(seat => seat.seatNumber);
    const newData = {
          name: inputName,
          phoneNumber: inputPhoneNumber,
          bookedDate: selectedDate,
          seats: seats
      }

    try {
        const response = await axiosCreateBooking(newData);

        console.log('booking created success.');
        dispatch(createBooking({
            seats: seats,
            selectedDate: selectedDate,
            name: inputName,
            phoneNumber: inputPhoneNumber
        }));

        setInputName('');
        setinputPhoneNumber('');
    } catch (error) {
        console.error('Error creating booking:', error);
        window.alert('Error creating booking. Please try again.');
    }
  }
  return (
    <div className='mb-4'>
      <h2 className='text-center py-3'>Seminar Hall Booking</h2>
      <div className='d-flex flex-column flex-md-row justify-content-center
        align-items-center py-3'>
        <div className='d-flex flex-column flex-md-row justify-content-center 
          align-items-center flex-grow-1 mb-4 mb-md-0 border border-3 p-4 rounded-4 mx-md-1'>
          <label htmlFor="date" className='fs-4'>
            Select Date:&nbsp;&nbsp;
          </label><br />
          <DatePicker className='form-control' 
          id='date'
          dateFormat="yyyy-MM-dd"
          selected={new Date(selectedDate)} 
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
