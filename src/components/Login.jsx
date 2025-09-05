
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
                        
                        {/* OAuth Buttons */}
                        <div className="space-y-4 mb-8">
                            <button 
                                onClick={() => window.location.href = `${BASE_URL}/auth/google`}
                                className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm border border-gray-600/50 rounded-full px-8 py-4 text-gray-300 hover:bg-white/20 transition-all duration-300 w-full group"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                </svg>
                                <span className="group-hover:text-white transition-colors">Continue with Google</span>
                            </button>
                            
                            <button 
                                onClick={() => window.location.href = `${BASE_URL}/auth/github`}
                                className="flex items-center justify-center gap-3 bg-gray-900/50 backdrop-blur-sm border border-gray-600/50 rounded-full px-8 py-4 text-gray-300 hover:bg-gray-800/70 transition-all duration-300 w-full group"
                            >
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                <span className="group-hover:text-white transition-colors">Continue with GitHub</span>
                            </button>
                        </div>
                        
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