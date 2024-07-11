import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

export default function Header({username}) {

  return (
    <div className='header d-flex justify-content-center align-items-center'>
        <div className='d-flex justify-content-between col-10 col-md-6 border rounded-3'>
          <h2 className='headerText mx-4 text-white'>
            Welcome - {username ? username : 'Guest'}
          </h2>
          <Link to='' className='headerText mx-4 text-white'>Logout</Link>
        </div>
    </div>
  )
}
