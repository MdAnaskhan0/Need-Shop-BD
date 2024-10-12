import React from 'react'
import Header from './Components/Header'
import Home from './Page/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
      <main className='bg-primary text-tertiary'>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' element={<Home />}/>
          </Routes>
        </BrowserRouter>
      </main>
    </>
  )
}

export default App
