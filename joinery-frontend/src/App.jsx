import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'

import { AuthProvider } from "./context/AuthContext.jsx";

import Home from "./components/home/Home.jsx";
import LoginSignupToggle from "./components/auth/LoginSignupToggle.jsx";
import StoreForm from "./components/store/StoreForm.jsx";
import ProductForm from "./components/ProductForm.jsx";
import JoineryNavbar from "./components/ui/JoineryNavbar.jsx";

function App() {

  return (
    <>
      <Router>
        <AuthProvider>

          <JoineryNavbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginSignupToggle />} />
            <Route path="/store" element={<StoreForm />} />
            <Route path="/products" element={<ProductForm />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
