import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import axios from 'axios';
import './LoginPage.css'
import { loginSuccess } from '../../Slices/Slice';
import { seminarHallAxios } from '../../axiosInterceptors';


export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleUsernameInput(e){
        setUsername(e.target.value)
    }
    function handlePasswordInput(e){
        setPassword(e.target.value)
    }

    async function handleLogin() {
        const userData = {
            username: username,
            password: password,
        };

        try {
            const response = await seminarHallAxios.post('/login/', userData);

            const { access, refresh } = response.data.tokens;
            dispatch(loginSuccess({ access, refresh }));
            navigate('/home');
        } catch (error) {
            window.alert(`Error - ${error.response.data.detail}`);
        }
    }
    
  return (
    <div className='parentDiv d-flex justify-content-center align-items-center vh-100'>
        <div className='col-10 col-md-6 h-50 bg-info-subtle rounded-5 p-4'>
            <h2 className='text-center'>Login Page</h2>
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
            <button className='btn btn-outline-primary w-100 mb-4'
                onClick={handleLogin}
            >
                Login
            </button>
            <p>To sign up please 
                <span><Link to='/signup'> Click Here</Link></span>
            </p>
        </div>
    </div>
  )
}
