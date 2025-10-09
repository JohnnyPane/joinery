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
import StripeProvider from "./context/StripeContext.jsx";
import Checkout from "./components/cart/Checkout.jsx";
import ShippingOptionsForm from "./components/cart/ShippingOptionsForm.jsx";

function App() {

  return (
    <>
      <Router>
        <AuthProvider>

          <JoineryNavbar />

          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/checkout" element={
              <StripeProvider>
                <Checkout />
              </StripeProvider>
            }/>

            <Route path="/checkout/shipping_options" element={<ShippingOptionsForm />} />

            <Route path="/login" element={<LoginSignupToggle />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/products/:id" element={<Product />} />
            <Route path="/stores/new" element={<StoreForm />} />
            <Route path="/stores/:id" element={<Store />} />

          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
