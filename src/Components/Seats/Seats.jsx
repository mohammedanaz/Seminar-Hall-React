import React, { useEffect, useState } from 'react'
import './Seats.css'
import { useDispatch, useSelector } from 'react-redux'
import {seatClicked,} from '../../Slices/Slice'

export default function Seats() {

    const seatNumbers = useSelector((state)=> state.seminarHall.seatNumbers)
    const dispatch = useDispatch()

    function handleSeatClick(seatNumber){
        const tempArray = seatNumbers.map(seat=> (
            seat.seatNumber === seatNumber ? {...seat, clicked:!seat.clicked} : {...seat}
        ))
        dispatch(seatClicked(tempArray))
    }
    

  return (
    <div className='d-flex justify-content-center'>
        <div className='grid-container col-11 col-md-8 col-lg-6 bg-info mt-4 rounded-4'>
            {seatNumbers.map((seat) => (
                <div key={seat.seatNumber} className='grid-item'>
                    <button  
                        className={`btn ${ seat.isBooked ? 'btn-danger' : seat.clicked?'btn-warning':'btn-success' }`}
                        disabled={seat.isBooked}
                        onClick={()=> handleSeatClick(seat.seatNumber)}
                        >
                        Seat-{seat.seatNumber}
                    </button>
                </div>
            ))}
        </div>
    </div>
  )
}
