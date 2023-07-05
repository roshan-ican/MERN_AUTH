import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import bgImage from '../../assets/background.png'
import logo from '../../assets/Logo1.svg';
import { Link, useNavigate } from "react-router-dom";
import { userSignUp } from '../../services/authServices';

export default function Register() {

    const securityQuestions = [
        "What is your favorite drink?",
        "What is your mother's maiden name?",
        "What is the name of your first pet?",
        // Add more questions here
    ];

    const [selectedSecurityQuestion, setSelectedSecurityQuestion] = useState("");


    const navigate = useNavigate()

    const initialData = {
        fullName: "",
        emailAddress: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
        phoneNumber: "",
        address: "",
        city: "",
        state: "",
        securityQuestion: '',
        securityAnswer: "",
        zipCode: "",
        country: "",
    };

    const [userData, setUserData] = useState(initialData);
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const onSubmit = async (data) => {
        try {

            const userData = {
                ...data,
                securityQuestion: selectedSecurityQuestion,
                // ...other form fields
            };
            const response = await userSignUp(userData);
            // Handle successful sign up response here
            navigate('/login');
        } catch (error) {
            // Handle sign up error here
            console.log('Sign up failed:', error);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };


    return (
        <>
            <div className="flex h-screen">
                <div
                    className="w-1/3 p-2 m-4 max-w-full rounded-lg bg-cover"
                    style={{
                        backgroundImage: `url(${bgImage})`,
                    }}
                >
                    <img src={logo} alt="" className="absolute" />
                </div>
                <div className="w-2/3 p-4 max-h-screen">
                    <div className="grid justify-items-start">
                        <h1 className="font-semibold text-[#7181A1] text-sm leading-normal">
                            Welcome
                        </h1>
                        <h1 className="font-bold text-3xl leading-10">Sign Up</h1>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 mt-2">
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex justify-between">
                                    <label className="font-normal text-base leading-normal text-gray-600">
                                        Full Name
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    className="p-1 w-2/3 font-medium border-solid border border-gray-300 rounded-md placeholder:opacity-60"
                                    onChange={handleChange}

                                    placeholder="Jhone Deo"
                                    {...register('fullName', {
                                        required: 'Full Name is required',
                                        pattern: {
                                            value: /^[A-Za-z ]+$/,
                                            message: 'Invalid full name',
                                        },
                                        maxLength: {
                                            value: 50,
                                            message: 'Full Name cannot exceed 50 characters',
                                        },
                                    })}
                                />
                                {errors.fullName && <p>{errors.fullName.message}</p>}

                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex justify-between">
                                    <label className="font-normal text- base leading-normal text-gray-600">
                                        Email
                                    </label>
                                </div>
                                <input
                                    type="email"
                                    className="p-1 w-2/3 font-medium border-solid border border-gray-300 rounded-md placeholder:opacity-60"
                                    placeholder="********"

                                    onChange={handleChange}
                                    {...register('emailAddress', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                />
                                {errors.email && <p>{errors.email.message}</p>}

                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex justify-between">
                                    <label className="font-normal text-base leading-normal text-gray-600">
                                        Date of Birth
                                    </label>
                                </div>
                                <input
                                    type="date"
                                    className="p-1 w-2/3 font-medium border-solid border border-gray-300 rounded-md placeholder:opacity-60"
                                    placeholder="mm/dd/yyyy"

                                    onChange={handleChange}
                                    {...register('dateOfBirth', {
                                        required: 'Date of Birth is required',

                                    })}
                                />
                                {errors.DOB && <p>{errors.DOB.message}</p>}

                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex justify-between">
                                    <label className="font-normal text-base leading-normal text-gray-600">
                                        Password
                                    </label>
                                </div>
                                <input
                                    type="password"
                                    className="p-1 w-2/3 font-medium border-solid border border-gray-300 rounded-md placeholder:opacity-60"
                                    placeholder="********"

                                    onChange={handleChange}
                                    {...register('password', {
                                        required: 'Password is required',
                                        minLength: {
                                            value: 8,
                                            message: 'Password must be at least 8 characters long',
                                        },
                                    })}
                                />
                                {errors.password && <p>{errors.password.message}</p>}
                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex justify-between">
                                    <label className="font-normal text-base leading-normal text-gray-600">
                                        Phone Number
                                    </label>
                                </div>
                                <input
                                    type="tel"
                                    className="p-1 w-2/3 font-medium border-solid border border-gray-300 rounded-md placeholder:opacity-60"
                                    placeholder="9562373406"
                                    onChange={handleChange}
                                    {...register('phoneNumber', {
                                        required: 'Phone number is required',
                                        pattern: {
                                            value: /^[6-9]\d{9}$/,
                                            message: 'Invalid phone number',
                                        },
                                    })}
                                />
                                {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}

                            </div>
                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex justify-between">
                                    <label className="font-normal text-base leading-normal text-gray-600">
                                        Confirm Password
                                    </label>
                                </div>
                                <input
                                    type="password"
                                    className="p-1 w-2/3 font-medium border-solid border border-gray-300 rounded-md placeholder:opacity-60"
                                    placeholder="********"

                                    // onChange={handleChange}
                                    {...register('confirmPassword', {
                                        required: 'Confirm password is required',
                                        validate: (value) => value === watch('password') || 'Passwords do not match',
                                    })}
                                />
                                {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

                            </div>
                        </div>
                        <div className="mt-2 flex flex-col items-start">
                            <p className="text-black-700 font-semibold ml-0">Security Question</p>
                            <div className="flex flex-col gap-2 w-full">
                                <div className="flex justify-between">
                                    <label className="font-normal text-base leading-normal text-gray-600">
                                        Select a security question <span className="text-red-600">*</span>
                                    </label>
                                </div>
                                <select
                                    className="p-1 w-1/3 font-medium border-solid border border-gray-300 rounded-md"
                                    {...register('securityQuestion', {
                                        required: 'Security question is required',
                                    })}
                                    value={selectedSecurityQuestion}
                                    onChange={(e) => setSelectedSecurityQuestion(e.target.value)}
                                >
                                    <option value="" disabled>Select a question</option>
                                    {securityQuestions.map((question, index) => (
                                        <option key={index} value={question}>{question}</option>
                                    ))}
                                </select>
                                {errors.securityQuestion && <p>{errors.securityQuestion.message}</p>}

                            </div>
                        </div>


                        <div className="mt-2 flex flex-col items-start">
                            <p className="text-black-700 font-semibold ml-0">Security Answer</p>
                            <div className="flex flex-col gap-2 w-full">
                                <div className="flex justify-between">
                                    <label className="font-normal text-base leading-normal text-gray-600">
                                        Answer to the security question <span className='text-red-600'>*</span>
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    className="p-1 w-1/3 font-medium border-solid border border-gray-300 rounded-md placeholder:opacity-60"
                                    placeholder="Your answer"
                                    onChange={(e) => handleChange("securityAnswer", e.target.value)}
                                    {...register('securityAnswer', {
                                        required: 'Security answer is required',
                                    })}
                                />
                                {errors.securityAnswer && <p>{errors.securityAnswer.message}</p>}
                            </div>
                        </div>

                        <div className="flex flex-col gap-1 w-full">
                            <div className="flex justify-between">
                                <label className="font-normal text-base leading-normal text-gray-600">
                                    Address
                                </label>
                            </div>
                            <input
                                type="text"
                                className="p-1 w-full font-medium border-solid border border-gray-300 rounded-md placeholder:opacity-60"
                                placeholder="Near Lankmark"

                                onChange={handleChange}
                                {...register('address', {
                                    required: 'Address is required',
                                })}
                            />
                            {errors.address && <p>{errors.address.message}</p>}

                        </div>
                        <div className="flex justify-start mt-2">
                            <div className="mr-4 flex flex-col gap-1 w-full">
                                <div className="flex justify-between">
                                    <label className="font-normal text-base leading-normal text-[#4D5E80]">
                                        City
                                    </label>
                                </div>
                                <select
                                    name="city"
                                    className="border-solid border border-gray-300 p-2 rounded"
                                    onChange={handleChange}
                                    {...register('city', {
                                        required: 'City is required',
                                    })}
                                >
                                    <option value="Select">Select</option>
                                    <option value="Gangtok">Gangtok</option>
                                    <option value="Siliguri">Siliguri</option>
                                    <option value="Banglore">Banglore</option>
                                </select>
                                {errors.city && <p>{errors.city.message}</p>}
                            </div>
                            <div className="mr-4 flex flex-col gap-1 w-full">
                                <div className="flex justify-between">
                                    <label className="font-normal text-base leading-normal text-[#4D5E80]">
                                        State
                                    </label>
                                </div>
                                <select
                                    name="state"
                                    className="border-solid border border-gray-300 p-2 rounded"
                                    onChange={handleChange}
                                    {...register('state', {
                                        required: 'State is required',
                                    })}
                                >
                                    <option value="Select">Select</option>
                                    <option value="Sikkim">Sikkim</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="West Bengal">West Bengal</option>
                                </select>
                                {errors.state && <p>{errors.state.message}</p>}
                            </div>

                            <div className="flex flex-col gap-1 w-full">
                                <div className="flex justify-between">
                                    <label className="font-normal text-base leading-normal text-gray-600">
                                        ZIP Code
                                    </label>
                                </div>
                                <input
                                    type="number"
                                    className="p-2 w-2/3 font-medium border-solid border border-gray-300 rounded-md placeholder-opacity-60"
                                    placeholder="******"
                                    name="zipCode"
                                    onChange={handleChange}
                                    {...register('zipCode', {
                                        required: 'ZIP Code is required',
                                        pattern: {
                                            value: /^\d{6}$/,
                                            message: 'Invalid ZIP Code',
                                        },
                                    })}
                                />
                                {errors.zipCode && <p>{errors.zipCode.message}</p>}
                            </div>

                            <div className="mr-4 flex flex-col gap-1 w-full">
                                <div className="flex justify-between">
                                    <label className="font-normal text-base leading-normal text-gray-600">
                                        Country
                                    </label>
                                </div>
                                <select
                                    name="country"
                                    className="border-solid border border-gray-300 p-2 rounded"
                                    onChange={(e) => setUserData({ ...userData, country: e.target.value })}
                                    placeholder="Country"
                                    {...register('country', {
                                        required: 'Country is required',
                                    })}
                                >
                                    <option value="Select">Select</option>
                                    <option value="India">India</option>
                                </select>
                                {errors.country && <p>{errors.country.message}</p>}
                            </div>

                        </div>

                        <div className="flex flex-col w-1/2 mt-4">
                            <button
                                className="flex w-full justify-center rounded-md bg-[#194DFF] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                type="submit"

                            >
                                Sign Up
                            </button>
                        </div>
                    </form>

                    <div className="flex mt-2">
                        <h1 className="font-normal text-sm leading-5 text-[#A0ABC0]">
                            Already have an Account?
                        </h1>
                        <Link to="/login" className="ml-2 text-[#3361FF] underline">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
