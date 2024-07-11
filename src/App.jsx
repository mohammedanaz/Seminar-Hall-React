import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./Pages/HomePage/Home.jsx"
import LoginPage from "./Pages/LoginPage/LoginPage.jsx"
import SignUpPage from "./Pages/SignUpPage/SignUpPage.jsx"


function App() {


  return (
    <div className='v-100' style={{backgroundColor: '#5097A4'}}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
