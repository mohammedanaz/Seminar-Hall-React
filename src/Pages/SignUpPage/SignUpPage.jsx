import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';


export default function SignUpPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const navigate = useNavigate()


    function handleUsernameInput(e){
        setUsername(e.target.value)
    }
    function handlePasswordInput(e){
        setPassword(e.target.value)
    }
    function handleConfirmPasswordInput(e){
        setConfirmPassword(e.target.value)
    }

    async function handleCreateUser() {
    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const userData = {
      username: username,
      password: password,
    };

    try {
      const response = await axios.post('http://localhost:8000/signup/', userData);
      
      console.log('response data- ', response.data);
      const username = response.data.user.username
      window.alert(`User successfully created with Username - ${username}. Please login.`)
      navigate('/login')
      setUsername('')
      setPassword('')
      setConfirmPassword('')
    } catch (error) {
      console.error('Error signing up:', error.response.data);
      window.alert(`Error is - ${error.response.data.username}`)
    }
  }

  return (
    <div className='parentDiv d-flex justify-content-center align-items-center vh-100'>
        <div className='col-10 col-md-6 h-50 bg-info-subtle rounded-5 p-4'>
            <h2 className='text-center'>Sign Up Page</h2>
            <input type="text" className='form-control mb-4'
                placeholder='Enter User Name' 
                value={username}
                onChange={(e)=> handleUsernameInput(e)}
            />
            <input type="password" className='form-control mb-4'
                placeholder='Enter Password' 
                value={password}
                onChange={(e)=> handlePasswordInput(e)}
            />
            <input type="password" className='form-control mb-4'
                placeholder='Confirm Password' 
                value={confirmPassword}
                onChange={(e)=> handleConfirmPasswordInput(e)}
            />
            <button className='btn btn-outline-primary w-100 mb-4'
                onClick={handleCreateUser}
                >
                Creat Account
            </button>
            <p>If existing user please  
                <span><Link to='/login'> Click Here to login</Link></span>
            </p>
        </div>
    </div>
  )
}
