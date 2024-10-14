import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import Navbar from './Navbar'
import { MdClose, MdMenu } from 'react-icons/md'
import { FaOpencart } from 'react-icons/fa6'
import { BiUser } from 'react-icons/bi'
import { ShopContext } from '../Context/ShopContext'

const Header = () => {
    const [menuOpened, setMenuOpened] = useState(false);
    const toggleMenu = () => setMenuOpened(!menuOpened);
    const {getTotalCartItem} = useContext(ShopContext)

    return (
        <header className='fixed top-0 left-0 w-full bg-white ring-slate-900/5 z-50'>
            <div className='max-w-screen-3xl m-auto px-6 py-3 flexBetween max-xs:px-2'>
                {/* Logo */}
                <div>
                    <Link to="/">
                        <img src={logo} alt="Logo" className='h-12' />
                    </Link>
                </div>

                {/* Desktop Navbar */}
                <Navbar containerStyles={'hidden md:flex gap-x-5 xl:gap-x-10 medium-15'} />

                {/* Mobile Menu */}
                <Navbar 
                    containerStyles={`${menuOpened
                        ? 'flex items-start flex-col gap-y-12 fixed top-20 right-8 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-slate-900/5 transition-all duration-300'
                        : 'fixed -right-[100%] top-20 p-12 bg-white rounded-3xl shadow-md w-64 medium-16 ring-slate-900/5 transition-all duration-300'
                        }`}
                />

                {/* Header Right Section (Icons & Login) */}
                <div className='flexBetween sm:gap-x-2 bold-16'>
                    {/* Hamburger / Close Menu Icon */}
                    {!menuOpened ? (
                        <MdMenu
                            className='md:hidden cursor-pointer hover:text-secondary mr-2 p-1 ring-1 ring-slate-900/30 h-8 w-8 rounded-full hover:ring-secondary'
                            onClick={toggleMenu}
                        />
                    ) : (
                        <MdClose
                            className='md:hidden cursor-pointer hover:text-secondary mr-2 p-1 ring-1 ring-slate-900/30 h-8 w-8 rounded-full hover:ring-secondary'
                            onClick={toggleMenu}
                        />
                    )}

                    <div className='flexBetween sm:gap-x-6'>
                        {/* Cart Icon */}
                        <NavLink to="cart-page" className="flex">
                            <FaOpencart className='p-1 h-8 w-8 ring-1 ring-slate-900/30 rounded-full' />
                            <span className='relative flexCenter w-5 h-5 rounded-full bg-secondary text-white medium-14 -top-2'>{getTotalCartItem()}</span>
                        </NavLink>

                        {/* Login / Logout Button */}
                        <NavLink
                            to="login"
                            className="btn_second_rounded flexCenter gap-x-2 medium-16 bg-secondary px-5 py-2 rounded-full text-white text-base"
                        >
                            <BiUser className='w-5 h-5' /> Login
                        </NavLink>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
