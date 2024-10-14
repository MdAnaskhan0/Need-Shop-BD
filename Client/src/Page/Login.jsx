import React, { useState } from 'react'

const Login = () => {

    const [state, setState] = useState('login')
    const [fromData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    })

    const changeHandler = (e) => {
        setFormData({ ...fromData, [e.target.name]: e.target.value });
    }


    const registration = async () => {
        console.log("Registration Function");
        try {
            const userData = {
                username: fromData.name,  // Use the state variable to capture input values
                email: fromData.email,
                password: fromData.password,
                phone: fromData.phone,
                address: fromData.address
            };

            const response = await fetch('http://localhost:4000/registration', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();
            if (result.success) {
                console.log("Registration Successful!", result.token);
                localStorage.setItem('auth-token', result.token);
                window.location.replace('/login')
            } else {
                console.error("Registration Failed:", result.errors);
            }
        } catch (error) {
            console.error("Error in Registration:", error);
        }
    };

    const login = async () => {
        console.log("Login Function");
        try {
            const loginData = {
                email: fromData.email,
                password: fromData.password
            };

            const response = await fetch('http://localhost:4000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            const result = await response.json();
            if (result.success) {
                console.log("Login Successful!", result.token);
                localStorage.setItem('auth-token', result.token);
                window.location.replace('/')
            } else {
                console.error("Login Failed:", result.error);
            }
        } catch (error) {
            console.error("Error in Login:", error);
        }
    };




    return (
        <section className='max_padd_container flexCenter flex-col pt-32'>
            <div className='max-w-[555px] h-[670px] bg-white m-auto px-14 py-10 rounded-md'>
                <h3 className='h3'>{state}</h3>
                <div className='flex flex-col gap-4 mt-7'>
                    {state === 'Registration' ? <input type="text" name='username' value={FormData.username} onChange={changeHandler} placeholder='Your Name' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' /> : ''}

                    <input type="email" name='email' value={FormData.email} onChange={changeHandler} placeholder='Your Email' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' />

                    <input type="password" name='password' value={FormData.password} onChange={changeHandler} placeholder='Password' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' />

                    {state === 'Registration' ? <input type="text" name='phone' value={FormData.phone} onChange={changeHandler} placeholder='Phone No' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' /> : ''}

                    {state === 'Registration' ? <input type="text" name='address' value={FormData.address} onChange={changeHandler} placeholder='Address' className='h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl' /> : ''}
                </div>
                <button onClick={() => { state === "login" ? login() : registration() }} className='btn_dark_rounded my-5 w-full !rounded-md'>Continue</button>
                {state === 'Registration' ? <p className='text-black font-bold'>Already have an account? <span onClick={() => { setState("Login") }} className='text-secondary hover:underline cursor-pointer'>Login</span></p> : <p className='text-black font-bold'>Create an account? <span onClick={() => { setState("Registration") }} className='text-secondary hover:underline cursor-pointer'>Sign UP</span></p>}
                <div className='flexCenter mt-6 gap-3'>
                    <input type="checkbox" name='' id='' />
                    <p>By continuing, i agree to the terms od use & privacy policy.</p>
                </div>
            </div>
        </section>
    )
}

export default Login
