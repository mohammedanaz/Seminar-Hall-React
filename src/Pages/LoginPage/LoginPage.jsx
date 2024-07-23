import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import './LoginPage.css'
import { loginSuccess } from '../../Slices/Slice';
import login from '../../Api/login';
import { ClipLoader } from 'react-spinners';


export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
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
            setIsLoading(true)
            const response = await login(userData);

            const { access, refresh } = response.data.tokens;
            dispatch(loginSuccess({ access, refresh }));
            navigate('/home');
        } catch (error) {
            setIsLoading(false)
            setTimeout(() => {
                window.alert(`Error - ${error.response.data.detail}`);
            }, 100);
        }finally{
            setIsLoading(false)
        }
    }
    
  return (
    <div className='parentDiv d-flex justify-content-center align-items-center vh-100'>
        {isLoading ? 
            (
                <div className='d-flex justify-content-center align-items-center
                col-10 col-md-6 h-50 bg-info-subtle rounded-5 p-4'>
                    Loading...<ClipLoader size={50} color={"#123abc"} />
                </div>
            ) :
            (
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
            )
        }
    </div>
  )
}
