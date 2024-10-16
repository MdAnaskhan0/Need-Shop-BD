import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import styles

// Define validation schema using Zod
const schema = z.object({
    username: z.string().min(1, { message: "Username is required" }).optional(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    phone: z.string().optional(),
    address: z.string().optional(),
});

const Login = () => {
    const [state, setState] = useState('login');
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema),
    });

    const notify = (message, type = 'success') => {
        if (type === 'success') {
            toast.success(message);
        } else {
            toast.error(message);
        }
    };

    const onSubmit = async (data) => {
        const endpoint = state === 'Registration' ? 'registration' : 'login';
        console.log(`${state} Function`, data);
        let responseData;

        try {
            const response = await fetch(`http://localhost:4000/${endpoint}`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            // Check if response is OK
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            responseData = await response.json();
        } catch (error) {
            notify('Network error occurred', 'error');
            console.error('Error fetching:', error);
            return; // Exit if there was an error
        }

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            notify(`${state} successful!`, 'success'); // Notify on success
            window.location.replace('/');
        } else {
            notify(responseData.errors || 'An error occurred', 'error'); // Notify on error
        }
    };

    return (
        <section className='max_padd_container flexCenter flex-col pt-32'>
            <div className='max-w-[555px] h-[720px] bg-white m-auto px-14 py-10 rounded-md'>
                <h3 className='h3'>{state}</h3>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-7'>
                    {state === 'Registration' && (
                        <input
                            type="text"
                            {...register('username')}
                            placeholder='Your Name'
                            className='h-12 w-full pl-5 bg-slate-900/5 outline-none rounded-md'
                        />
                    )}
                    <p className='text-gray-500'>{errors.username?.message}</p>

                    <input
                        type="email"
                        {...register('email')}
                        placeholder='Your Email'
                        className='h-12 w-full pl-5 bg-slate-900/5 outline-none rounded-md'
                    />
                    <p className='text-gray-500'>{errors.email?.message}</p>

                    <input
                        type="password"
                        {...register('password')}
                        placeholder='Password'
                        className='h-12 w-full pl-5 bg-slate-900/5 outline-none rounded-md'
                    />
                    <p className='text-gray-500'>{errors.password?.message}</p>

                    {state === 'Registration' && (
                        <>
                            <input
                                type="text"
                                {...register('phone')}
                                placeholder='Phone No'
                                className='h-12 w-full pl-5 bg-slate-900/5 outline-none rounded-md'
                            />
                            <p className='text-gray-500'>{errors.phone?.message}</p>

                            <input
                                type="text"
                                {...register('address')}
                                placeholder='Address'
                                className='h-12 w-full pl-5 bg-slate-900/5 outline-none rounded-md'
                            />
                            <p className='text-gray-500'>{errors.address?.message}</p>
                        </>
                    )}

                    <button type="submit" className='btn_dark_rounded my-5 w-full !rounded-md'>
                        Continue
                    </button>
                </form>

                {state === 'Registration' ? (
                    <p className='text-black font-bold'>Already have an account?
                        <span onClick={() => setState("login")} className='text-secondary hover:underline cursor-pointer'> Login</span>
                    </p>
                ) : (
                    <p className='text-black font-bold'>Create an account?
                        <span onClick={() => setState("Registration")} className='text-secondary hover:underline cursor-pointer'> Sign UP</span>
                    </p>
                )}
                <div className='flexCenter mt-6 gap-3'>
                    <input type="checkbox" name='' id='' />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
            </div>
            <ToastContainer />
        </section>
    )
}

export default Login;
