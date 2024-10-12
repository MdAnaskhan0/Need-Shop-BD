import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import Navbar from './Navbar'

const Header = () => {
    return (
        <header className='fixed top-0 left-0 m-auto max_padd_container w-full bg-white ring-slate-900/5 z-10'>
            <div className='px-4 flexBetween py-3 max-xs:px-2'>
                <div>
                    <Link><img src={logo} alt="" className='h-10'/></Link>
                </div>
                <Navbar />
                <div>
                    button
                </div>
            </div>
        </header>
    )
}

export default Header
