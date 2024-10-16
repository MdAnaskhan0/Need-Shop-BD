import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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

    const onSubmit = async (data) => {
        const endpoint = state === 'Registration' ? 'registration' : 'login';
        console.log(`${state} Function`, data);
        let responseData;

        await fetch(`http://localhost:4000/${endpoint}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => res.json()).then((data) => responseData = data);

        if (responseData.success) {
            localStorage.setItem('auth-token', responseData.token);
            window.location.replace('/');
        } else {
            alert(responseData.errors);
        }
    };

    return (
        <section className='max_padd_container flexCenter flex-col pt-32'>
            <div className='max-w-[555px] h-[670px] bg-white m-auto px-14 py-10 rounded-md'>
                <h3 className='h3'>{state}</h3>
                <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 mt-7'>
                    {state === 'Registration' &&
                        <input
                            type="text"
                            {...register('username')}
                            placeholder='Your Name'
                            className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl'
                        />
                    }
                    <p className='text-red-500'>{errors.username?.message}</p>

                    <input
                        type="email"
                        {...register('email')}
                        placeholder='Your Email'
                        className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl'
                    />
                    <p className='text-red-500'>{errors.email?.message}</p>

                    <input
                        type="password"
                        {...register('password')}
                        placeholder='Password'
                        className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl'
                    />
                    <p className='text-red-500'>{errors.password?.message}</p>

                    {state === 'Registration' &&
                        <>
                            <input
                                type="text"
                                {...register('phone')}
                                placeholder='Phone No'
                                className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl'
                            />
                            <p className='text-red-500'>{errors.phone?.message}</p>

                            <input
                                type="text"
                                {...register('address')}
                                placeholder='Address'
                                className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl'
                            />
                            <p className='text-red-500'>{errors.address?.message}</p>
                        </>
                    }

                    <button type="submit" className='btn_dark_rounded my-5 w-full !rounded-md'>
                        Continue
                    </button>
                </form>

                {state === 'Registration' ?
                    <p className='text-black font-bold'>Already have an account?
                        <span onClick={() => setState("login")} className='text-secondary hover:underline cursor-pointer'> Login</span>
                    </p>
                    :
                    <p className='text-black font-bold'>Create an account?
                        <span onClick={() => setState("Registration")} className='text-secondary hover:underline cursor-pointer'> Sign UP</span>
                    </p>
                }
                <div className='flexCenter mt-6 gap-3'>
                    <input type="checkbox" name='' id='' />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
            </div>
        </section>
    )
}

export default Login;
