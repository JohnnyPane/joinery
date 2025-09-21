import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'

import { AuthProvider } from "./context/AuthContext.jsx";

import Home from "./components/home/Home.jsx";
import LoginSignupToggle from "./components/auth/LoginSignupToggle.jsx";
import StoreForm from "./components/store/StoreForm.jsx";

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginSignupToggle />} />
            <Route path="/store" element={<StoreForm />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
