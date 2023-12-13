// Now the App.jsx is our Home page

import React from 'react'
import './App.css'
import { BrowserRouter, Navigate, Link, Route, Routes } from 'react-router-dom'
import Layout from '../Layout'
import { Cart, Categories, Home, Products, SingleCategory, SingleProduct } from './pages'
import { Contact, Footer, Header, Login, Signup } from './components'
import { useCart } from './context/Context'

const App = () => {

  const { userState: { user } } = useCart();

  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {
            user.status ? (
              <>
                <Route path='/' element={<Home />} />
                <Route path='/products' element={<Products />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/products/:productId' element={<SingleProduct />} />
                <Route path='/categories' element={<Categories />} />
                <Route path='/category/:categoryName' element={<SingleCategory />} />
                <Route path="*" element={<Navigate to="/" replace={true} />} />
              </>
            ) : (
              <>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/products' element={<Products />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/products/:productId' element={<SingleProduct />} />
                <Route path='/category/:categoryName' element={<SingleCategory />} />
                <Route path='/categories' element={<Categories />} />
                <Route path="*" element={<Navigate to="/login" replace={true} />} />
              </>
            )
          }
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App