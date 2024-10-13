import React from 'react'
import Header from './Components/Header'
import Home from './Page/Home'
import Category from './Page/Category'
import Product from './Page/Product'
import Login from './Page/Login'
import Cart from './Page/Cart'
import Footer from './Components/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import bannermens from './assets/bannermens.png'
import bannerwomens from './assets/bannerwomens.png'
import bannerkids from './assets/bannerkids.png'

const App = () => {
  return (
    <>
      <main className='bg-primary text-tertiary'>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/mens' element={<Category category='men' banner={bannermens} />} />
            <Route path='/womens' element={<Category category='women' banner={bannerwomens} />} />
            <Route path='/kids' element={<Category category='kid' banner={bannerkids} />} />
            <Route path='/product' element={<Product />}>
              <Route path='/product/:productId' element={<Product />} />
            </Route>
            <Route path='/cart-page' element={<Cart />} />
            <Route path='/login' element={<Login />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </main>
    </>
  )
}

export default App
