import React from 'react'
import { MdOutlineLocalOffer} from 'react-icons/md'
import { FaCartShopping } from "react-icons/fa6";
import { FaStar } from 'react-icons/fa6'
import { NavLink } from 'react-router-dom'

const Hero = () => {
    return (
        <section className='relative bg-hero bg-cover bg-center bg-no-repeat h-screen w-full'>
            <div className='max_padd_container relative top-32 xs:top-52'>
                <h1 className='h1 text-white capitalize max-w-[37rem]'>Digital Shopping Hub Junction</h1>
                <p className='text-gray-300 regular-16 mt-6 max-w-[33rem] text-base tracking-normal	'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi voluptatum id consequuntur expedita repudiandae quae rerum dignissimos, nobis, inventore deserunt ut sequi molestiae aperiam et fuga! Corrupti suscipit nulla nesciunt.</p>
                <div className='flexStart !items-center gap-x-4 my-10'>
                    <div className='!regular-24 flexCenter gap-x-3'>
                        <FaStar className='text-white text-xl' />
                        <FaStar className='text-white text-xl' />
                        <FaStar className='text-white text-xl' />
                        <FaStar className='text-white text-xl' />
                    </div>
                    <div className='bold-16 sm:bold-20 text-white'>
                        176K <span className='regular-16 sm:regular-20'>Excellent Reviews</span>
                    </div>
                </div>
                <div className='max-xs:flex-col flex gap-2'>
                    <NavLink to={''} className={'btn_white_rounded hover:btn_dark_rounded'}>Shop now</NavLink>
                    <NavLink to={''} className={'btn_white_rounded hover:btn_dark_rounded flexCenter gap-x-2'}><MdOutlineLocalOffer className='text-2xl'/>Offer</NavLink>
                </div>
            </div>
        </section>
    )
}

export default Hero
