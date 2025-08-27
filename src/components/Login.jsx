
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [isLoginForm, setIsLoginForm] = useState(true);   
    const [error, setError] = useState('');
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLogin = async () => {
        try {
            const res = await axios.post(BASE_URL+"/login", {
                email,
                password
            }, {withCredentials:true});
            dispatch(addUser(res.data));
            navigate("/");
        } catch (error) {
            setError(error?.response?.data || "Login failed. Please try again.");
        }
    }
    
    const handleSignup = async () => {
        try {
            const res = await axios.post(BASE_URL+"/signup", {
                firstName,
                lastName,
                email,
                password
            }, {withCredentials:true});
            dispatch(addUser(res.data.data));
            navigate("/profile");
        } catch (error) {
            setError(error?.response?.data || "Signup failed. Please try again.");
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-gray-900 to-indigo-900">
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-700/50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-1">
                            <span className="text-xl font-bold text-white">Dev</span>
                            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                                Match
                            </span>
                        </div>

                        {/* Login/Signup Toggle for Desktop */}
                        <div className="hidden md:flex items-center space-x-4">
                            <span className="text-gray-400 text-sm">
                                {isLoginForm ? "Don't have an account?" : "Already have an account?"}
                            </span>
                            <button 
                                onClick={() => setIsLoginForm(!isLoginForm)}
                                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-medium"
                            >
                                {isLoginForm ? "Sign Up" : "Login"}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl"></div>
                
                <div className="relative z-10 w-full max-w-6xl mx-4 flex">
                    {/* Left Side - Welcome Text */}
                    <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 text-white">
                        <h1 className="text-6xl font-bold mb-6 text-gray-300">
                            {isLoginForm ? 'LOGIN' : 'SIGN UP'}
                        </h1>
                        <p className="text-xl text-gray-400 mb-4">
                            {isLoginForm ? 'Hey welcome back!' : 'Welcome to our platform!'}
                        </p>
                        <p className="text-gray-500 mb-12">
                            {isLoginForm ? 'We hope you had a great day' : 'Create your account to get started'}
                        </p>
                        
                        {/* Google Login Button */}
                        <button className="flex items-center justify-center gap-3 bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 rounded-full px-8 py-4 text-gray-300 hover:bg-gray-700/50 transition-all duration-300 mb-8 w-fit">
                            <div className="w-6 h-6 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">G</span>
                            </div>
                            Login with google
                        </button>
                        
                        <div className="text-gray-500">
                            {isLoginForm ? 'Not yet a member?' : 'Already have an account?'}{' '}
                            <button 
                                onClick={() => setIsLoginForm(!isLoginForm)}
                                className="text-gray-300 hover:text-white underline underline-offset-4 font-medium"
                            >
                                {isLoginForm ? 'Sign Up' : 'Login'}
                            </button>
                        </div>
                    </div>

                    {/* Right Side - Login Form */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                        <div className="w-full max-w-md bg-gray-800/40 backdrop-blur-xl rounded-3xl p-8 border border-gray-600/30">
                            <div className="space-y-6">
                                {!isLoginForm && (
                                    <>
                                        <div>
                                            <label className="block text-gray-300 text-sm mb-2">First Name</label>
                                            <input
                                                type="text"
                                                value={firstName}
                                                placeholder="E.g. John"
                                                className="w-full bg-gray-700/50 backdrop-blur-sm border-0 rounded-full px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-300 text-sm mb-2">Last Name</label>
                                            <input
                                                type="text"
                                                value={lastName}
                                                placeholder="E.g. Doe"
                                                className="w-full bg-gray-700/50 backdrop-blur-sm border-0 rounded-full px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                        </div>
                                    </>
                                )}
                                
                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">E-Mail</label>
                                    <input
                                        type="email"
                                        value={email}
                                        placeholder="E.g. coursecrates@gmail.com"
                                        className="w-full bg-gray-700/50 backdrop-blur-sm border-0 rounded-full px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 text-sm mb-2">Password</label>
                                    <input
                                        type="password"
                                        value={password}
                                        placeholder="Enter your password"
                                        className="w-full bg-gray-700/50 backdrop-blur-sm border-0 rounded-full px-6 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                
                                {error && (
                                    <p className='text-red-400 text-center bg-red-500/10 border border-red-500/20 rounded-full py-2 px-4 text-sm'>
                                        {error}
                                    </p>
                                )}
                                
                                <button
                                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-full py-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                                    onClick={isLoginForm ? handleLogin : handleSignup} 
                                >
                                    {isLoginForm ? "LOGIN" : "SIGN UP"}
                                </button>

                                {/* Mobile Toggle */}
                                <div className="md:hidden text-center text-gray-500 text-sm">
                                    {isLoginForm ? 'Not yet a member?' : 'Already have an account?'}{' '}
                                    <button 
                                        onClick={() => setIsLoginForm(!isLoginForm)}
                                        className="text-gray-300 hover:text-white underline underline-offset-4 font-medium"
                                    >
                                        {isLoginForm ? 'Sign Up' : 'Login'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Copyright */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-gray-500 text-sm">
                    © Copyright 2023
                </div>
            </div>
        </div>
    );
}
    

export default Login;