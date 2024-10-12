import React from 'react'
import { NavLink } from 'react-router-dom'
import { MdHomeFilled } from 'react-icons/md'

const Navbar = ({containerStyles}) => {
    return (
        <nav className={`${containerStyles}`}>
            <NavLink>
                <div><MdHomeFilled/>Home</div>
            </NavLink>
        </nav>
    )
}

export default Navbar
