import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import logo from '../../assets/Logo1.svg';
import bgImage from '../../assets/background.png'
import axios from 'axios';
import Cookies from 'js-cookie';
import { userLogin } from '../../services/authServices';
import {Link, useNavigate} from 'react-router-dom'


export default function Login() {

    const navigate = useNavigate()
    const { register, formState: { errors }, handleSubmit } = useForm();

    const defaultValues = { emailAddress: "", password: "" };
    const [formInput, setFormInput] = useState(defaultValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormInput((prevFormInput) => ({
            ...prevFormInput,
            [name]: value,
        }));
    };

    const onSubmit = async (data) => {
        try {
            const response = await userLogin(data);
            console.log(response, 'data');
            // Handle successful login response here
            console.log('Login successful:', response);
            navigate('/profile');
        } catch (error) {
            // Handle login error here
            console.log('Login failed:', error);
        }
    };

    return (
        <>
            <div className="flex h-screen">
                {/* The Image */}
                <div
                    className="w-1/2 p-5 m-5 max-w-full rounded-lg bg-cover"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                    }}
                >
                    <img src={logo} alt="" className="absolute" />
                </div>

                {/* The form */}
                <div className='flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24'>
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-start">
                            <p className="text-sm font-bold leading-9 tracking-tight text-gray-400">
                                Welcome
                            </p>
                            <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Login
                            </h2>
                        </div>

                        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
                            <div className="space-y-6">
                                <div className='text-start'>
                                    <label htmlFor="email" className=" text-sm font-medium leading-6 text-gray-600">
                                        Email <span className='text-red-600'>*</span>
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="email"
                                            name="emailAddress" // Updated name attribute
                                            placeholder='john.show@gmail.com'
                                            type="email"
                                            {...register('emailAddress', {
                                                required: 'Email is required',
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: 'Invalid email address'
                                                }
                                            })}
                                            onChange={handleChange}
                                            required
                                            className="p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />

                                        {errors.email && <p>{errors.email.message}</p>}
                                    </div>
                                </div>

                                <div>
                                    <div className="text-start">
                                        <label htmlFor="password" className=" text-sm font-medium leading-6 text-gray-600">
                                            Password
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            id="password"
                                            name="password"
                                            type="password"
                                            placeholder='********'
                                            onChange={handleChange}
                                            required
                                            {...register('password', {
                                                required: 'Password is required',
                                                minLength: {
                                                    value: 8,
                                                    message: 'Password must be at least 8 characters long',
                                                },
                                            })}
                                            className=" p-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        />
                                        {errors.password && <p>{errors.password.message}</p>}
                                    </div>
                                </div>

                                <div className="text-sm text-right" >
                                    <a href="#" className="font-semibold mb-2 text-[#194DFF] hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>


                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-[#194DFF] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>

                        <p className="mt-10 text-start text-sm text-gray-500">
                            Don't have an account?{' '}
                            <Link to="/register" className="ml-2 text-[#3361FF] underline">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
