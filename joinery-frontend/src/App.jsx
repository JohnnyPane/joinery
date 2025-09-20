import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { AuthProvider } from "./context/AuthContext.jsx";

import LoginSignupToggle from "./components/auth/LoginSignupToggle.jsx";

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginSignupToggle />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
