import React from 'react'
import './Seats.css'

export default function Seats() {
    const numbers = Array.from({ length: 30 }, (_, i) => i + 1)
    console.log(numbers);
  return (
    <div className='d-flex justify-content-center'>
        <div className='grid-container col-11 col-md-8 col-lg-6 bg-info mt-4 rounded-4'>
            {numbers.map((seat) => (
                <div className='grid-item'>
                    <button key={seat} className='btn btn-success '>
                    Seat-{seat}
                </button>
                </div>
            ))}
        </div>
    </div>
  )
}
