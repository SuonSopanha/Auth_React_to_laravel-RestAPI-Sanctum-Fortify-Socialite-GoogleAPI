import React, { useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Retrieve CSRF token
            await axios.get('http://localhost:8000/sanctum/csrf-cookie', { withCredentials: true });

            // Get XSRF token from cookie
            const xsrfToken = Cookies.get('XSRF-TOKEN');

            // Make login request
            const response = await axios.post(
                'http://localhost:8000/login',
                {
                    email,
                    password,
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-XSRF-TOKEN': xsrfToken, // Include XSRF token in request headers
                    },
                }
            );

            console.log('Login successful:', response.data);
            // Handle success, such as redirecting user to dashboard
        } catch (error) {
            console.error('Error logging in:', error);
            // Handle error, such as displaying error message to user
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
            <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
                <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">
                    Welcome Back!
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <a
                            href="#"
                            className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Forgot Password?
                        </a>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="remember"
                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none"
                                checked
                            />
                            <label
                                htmlFor="remember"
                                className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                            >
                                Remember me
                            </label>
                        </div>
                        <a
                            href="/register"
                            className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Create Account
                        </a>
                    </div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
