import React from 'react'

const ProductDescription = () => {
    return (
        <div className='mt-20'>
            <div className='flex gap-3 mb-4'>
                <button className='btn_dark_rounded !rounded-none !text-xs !py-[6px] w-36 h-10'>Description</button>
                <button className='btn_light_rounded !rounded-none !text-xs !py-[6px] w-36 hover:btn_dark_rounded'>Care Guide</button>
                <button className='btn_light_rounded !rounded-none !text-xs !py-[6px] w-36 hover:btn_dark_rounded'>Size Guide</button>
            </div>
            <div className='flex flex-col pb-16'>
                <p className='text-sm pr-20 text-gray-400 tracking-wide'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos quaerat odit, eaque repellendus accusamus saepe quae similique dolore, ea, cum excepturi aliquid at recusandae a repudiandae quisquam quidem ipsum! Eveniet, voluptate similique cum quam libero dicta mollitia perspiciatis! Eos vitae eum culpa quae in similique nemo architecto error tempore, deleniti magni aspernatur officiis, harum quam libero quia ducimus? Nisi architecto porro quibusdam optio cupiditate distinctio nostrum culpa voluptates ad a.</p> <br />
                <p className='text-sm pr-20 text-gray-400 tracking-wide'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Provident rem quis sit, nam corporis odit inventore atque laborum porro consequuntur similique ex quo sunt saepe libero suscipit laboriosam. Qui molestiae quas rerum cumque eaque optio! Quidem possimus eveniet quisquam eos eligendi. Explicabo temporibus iste veniam.</p>
            </div>
        </div>
    )
}

export default ProductDescription
