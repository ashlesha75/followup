'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const EmployeeLoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/employee/login', {
                email: email,
                password: password,
            });


            // Handle successful login here, e.g., store the token in localStorage or state.
            console.log('Authentication successful', response.data);
            const token = response.data.token;

            localStorage.setItem('authToken', token);
            localStorage.setItem('empUsername', email); // Save the email or any other user information

            router.push('/'); // Redirect to the employee dashboard or any other route

        } catch (error) {
            // Handle login error here, e.g., display an error message.
            console.error('Authentication failed', error);
        }
    };

    const backgroundImageUrl = 'https://exergic.in/wp-content/uploads/2018/04/Orange-Background-Vector-Wallpaper.jpg';


    return (
        <div className="min-h-screen flex items-center justify-center sm:px-6 lg:px-8"
            style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
            <div className="w-1/3 p-6 bg-white rounded-lg shadow-md mt-5">
                <div className="flex items-center justify-center">
                    <Image
                        src="/images/login.avif"
                        alt="img"
                        width={200}
                        height={200} // You can adjust the height as needed
                    />
                </div>
                <h2 className="text-2xl font-semibold text-center">Admin Login</h2>
                <form onSubmit={handleSubmit} className="mt-2 space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-400"
                        />
                    </div>


                    <button
                        type="submit"
                        className="w-full py-2 px-4 text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-400"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EmployeeLoginForm;
