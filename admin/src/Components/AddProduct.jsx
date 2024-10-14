import React, { useState } from 'react'
import { MdAdd, MdCloudUpload } from "react-icons/md";

const AddProduct = () => {

    const { image, setImage } = useState(false);
    const imageHandler = (e) => {
        setImage(e.target.files[0])
    }

    return (
        <div className='p-8 box-border bg-white w-full rounded-sm mt-4 lg:m-7'>
            <div className='mb-3'>
                <h4 className='text-[17px] font-semibold pb-2'>Product Title: </h4>
                <input className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md' type="text" name='name' placeholder='Type here..' />
            </div>

            <div className='mb-3'>
                <h4 className='text-[17px] font-semibold pb-2'>Old Price: </h4>
                <input className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md' type="text" name='old_price' placeholder='Type here..' />
            </div>

            <div className='mb-3'>
                <h4 className='text-[17px] font-semibold pb-2'>New Price: </h4>
                <input className='bg-primary outline-none max-w-80 w-full py-3 px-4 rounded-md' type="text" name='new_price' placeholder='Type here..' />
            </div>
            <div className='mb-3 flex items-center gap-x-4'>
                <h4 className='text-[17px] font-semibold pb-2'>Product Category: </h4>
                <select name="category" id="" className='bg-primary ring-1 ring-slate-900/20 medium-16 rounded-sm outline-none'>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kid">Kid</option>
                </select>
            </div>
            <div>
                <label htmlFor="file-input">
                    <div className='bg-primary w-[120px] h-[120px] flex flex-col justify-center items-center border border-dotted border-gray-700 rounded-lg'>
                        <MdCloudUpload className='w-[50px] h-[50px] text-gray-20' />
                        <p className='text-base text-gray-50'>Upload</p>
                    </div>
                </label>
                <input type="file" name='image' id='file-input' hidden className='bg-primary max-w-80 w-full py-3 px-4' />
            </div>
            <button onChange={imageHandler} className='btn_dark_rounded mt-6 flexCenter gap-x-1'><MdAdd /> Add Product</button>

        </div>
    )
}

export default AddProduct
