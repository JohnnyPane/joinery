import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'

import { AuthProvider } from "./context/AuthContext.jsx";

import Home from "./components/home/Home.jsx";
import LoginSignupToggle from "./components/auth/LoginSignupToggle.jsx";
import Store from "./components/store/Store.jsx";
import StoreForm from "./components/store/StoreForm.jsx";
import ProductForm from "./components/products/ProductForm.jsx";
import Product from "./components/products/Product.jsx";
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
            <Route path="/stores" element={<StoreForm />} />
            <Route path="/stores/:id" element={<Store />} />
            <Route path="/products" element={<ProductForm />} />
            <Route path="/products/:id" element={<Product />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
