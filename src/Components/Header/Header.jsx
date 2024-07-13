import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import { logout } from '../../Slices/Slice'
import { useDispatch } from 'react-redux'

export default function Header({username}) {

    const navigate = useNavigate()
    const dispatch = useDispatch()
  function handleLogout(){
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className='header d-flex justify-content-center align-items-center'>
        <div className='d-flex justify-content-between col-10 col-md-6 border rounded-3'>
          <h2 className='headerText mx-4 text-white'>
            Welcome - {username ? username : 'Guest'}
          </h2>
          <button className='btn'
          onClick={handleLogout}>
            <Link to='' className='headerText mx-4 text-white'>Logout</Link>
          </button>
        </div>
    </div>
  )
}
