import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Provider, useDispatch, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from './store.js'
import HomePage from "./Pages/HomePage/Home.jsx"
import LoginPage from "./Pages/LoginPage/LoginPage.jsx"
import SignUpPage from "./Pages/SignUpPage/SignUpPage.jsx"


function PrivateRoute({ children }) {

  const isAuthenticated = useSelector(state => state.seminarHall.isAuthenticated)

  if (!isAuthenticated) {
    alert('Login required. Please login.');
    return <Navigate to="/login" />
  }
  return children;
}

function PreventAuthLogin({ children }) {
  const isAuthenticated = useSelector(state => state.seminarHall.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to="/home" />
  }
  return children;
}

function App() {

  return (
    <div className='v-100' style={{backgroundColor: '#5097A4'}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <Routes>
            <Route path="/login" element={<PreventAuthLogin><LoginPage /></PreventAuthLogin>} />
              <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
              <Route path="/signUp" element={<PreventAuthLogin><SignUpPage /></PreventAuthLogin>} />
              <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  )
}

export default App

