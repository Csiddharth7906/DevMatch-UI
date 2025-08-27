import React, { useState, useEffect } from 'react';
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
    const [isloginForm, setIsLoginForm] = useState(true);   
    const [error, setError] = useState('');
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const dispatch = useDispatch();
const navigate = useNavigate();
    
    
    const handleLogin = async () => {
        try {
            
            const res = await axios.post(BASE_URL+"/login",{
                email,
                password
            },{withCredentials:true});
            dispatch(addUser(res.data));
            navigate("/"); 
        } catch (error) {
            setError(error?.response?.data || "Login failed. Please try again.");
        }
    }
    
    const handleSignup = async () => {
        try {
           
            
            const res = await axios.post(BASE_URL+"/signup",{
                firstName,
                lastName,
                email,
                password
            },{withCredentials:true});
            dispatch(addUser(res.data.data));
            navigate("/profile"); 
        } catch (error) {
            setError(error?.response?.data || "Signup failed. Please try again.");
        }
    }

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden bg-black">
           
            <div className="absolute inset-0">
               
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-pink-900/30"></div>
                
                
                <div className="absolute inset-0">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-40 animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${4 + Math.random() * 4}s`
                            }}
                        ></div>
                    ))}
                </div>

              
                <div 
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px'
                    }}
                ></div>

              
                <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-pink-600/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

               
                <div 
                    className="absolute w-80 h-80 rounded-full pointer-events-none transition-all duration-500 ease-out"
                    style={{
                        left: mousePosition.x - 160,
                        top: mousePosition.y - 160,
                        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.03) 0%, transparent 70%)'
                    }}
                ></div>
            </div>

           
            <div className="w-full max-w-4xl bg-gray-900/90 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-gray-700/50 relative z-10 animate-fade-in-up">
                
                
                <div className="hidden md:block md:w-1/2 h-64 md:h-auto overflow-hidden bg-gray-900 relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10"></div>
                    <img
                        src="https://i.pinimg.com/736x/81/e0/b1/81e0b19c873d53534dade9ea9bbecbe2.jpg"
                        className="object-cover w-full h-full opacity-80 transition-transform duration-700 group-hover:scale-105"
                        alt="Login Visual"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent z-20"></div>
                    
                   
                    <div className="absolute top-8 left-8 w-3 h-3 bg-blue-400 rounded-full opacity-60 animate-pulse z-30"></div>
                    <div className="absolute bottom-12 right-12 w-2 h-2 bg-purple-400 rounded-full opacity-60 animate-pulse z-30" style={{ animationDelay: '1s' }}></div>
                    <div className="absolute top-1/2 right-8 w-1 h-1 bg-pink-400 rounded-full opacity-60 animate-pulse z-30" style={{ animationDelay: '2s' }}></div>
                </div>

               
                <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center bg-gray-900/95 backdrop-blur-lg relative">
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-600/5 to-purple-600/5 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-pink-600/5 to-blue-600/5 rounded-full blur-2xl"></div>

                    <div className="relative z-10">
                        <h2 className="text-3xl font-bold mb-6 text-center text-white animate-fade-in-up">
                            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                                {isloginForm ? "Hello! " : "Create Account"}
                            </span>
                            <br />
                            <span className="text-gray-300 text-2xl">
                                {isloginForm ? "Welcome Back!" : "Join Us!"}
                            </span>
                        </h2>

                        <div className="space-y-5">
                            {!isloginForm && (
                                <>
                                    <div className="animate-slide-in-left" style={{ animationDelay: '0.1s' }}>
                                        <label
                                            htmlFor="firstName"
                                            className="block mb-2 text-sm font-medium text-gray-300"
                                        >
                                            Enter First Name
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                value={firstName}
                                                id="firstName"
                                                placeholder="john"
                                                className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-gray-500/50"
                                                onChange={(e) => setFirstName(e.target.value)}
                                            />
                                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/0 via-purple-600/0 to-pink-600/0 group-focus-within:from-blue-600/10 group-focus-within:via-purple-600/10 group-focus-within:to-pink-600/10 transition-all duration-300 pointer-events-none"></div>
                                        </div>
                                    </div>
                                    
                                    <div className="animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
                                        <label
                                            htmlFor="lastName"
                                            className="block mb-2 text-sm font-medium text-gray-300"
                                        >
                                            Enter Last Name
                                        </label>
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                value={lastName}
                                                id="lastName"
                                                placeholder="dua"
                                                className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-gray-500/50"
                                                onChange={(e) => setLastName(e.target.value)}
                                            />
                                            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/0 via-purple-600/0 to-pink-600/0 group-focus-within:from-blue-600/10 group-focus-within:via-purple-600/10 group-focus-within:to-pink-600/10 transition-all duration-300 pointer-events-none"></div>
                                        </div>
                                    </div>
                                </>
                            )}
                            
                            <div className="animate-slide-in-left" style={{ animationDelay: isloginForm ? '0.1s' : '0.3s' }}>
                                <label
                                    htmlFor="email"
                                    className="block mb-2 text-sm font-medium text-gray-300"
                                >
                                    Enter Email
                                </label>
                                <div className="relative group">
                                    <input
                                        type="email"
                                        value={email}
                                        id="email"
                                        placeholder="you@example.com"
                                        className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-gray-500/50"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/0 via-purple-600/0 to-pink-600/0 group-focus-within:from-blue-600/10 group-focus-within:via-purple-600/10 group-focus-within:to-pink-600/10 transition-all duration-300 pointer-events-none"></div>
                                </div>
                            </div>

                            <div className="animate-slide-in-right" style={{ animationDelay: isloginForm ? '0.2s' : '0.4s' }}>
                                <label
                                    htmlFor="password"
                                    className="block mb-2 text-sm font-medium text-gray-300"
                                >
                                    Password
                                </label>
                                <div className="relative group">
                                    <input
                                        type="password"
                                        id="password"
                                        value={password}
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 bg-gray-800/80 backdrop-blur-sm border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 group-hover:border-gray-500/50"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600/0 via-purple-600/0 to-pink-600/0 group-focus-within:from-blue-600/10 group-focus-within:via-purple-600/10 group-focus-within:to-pink-600/10 transition-all duration-300 pointer-events-none"></div>
                                </div>
                            </div>
                            
                            {error && (
                                <p className='text-red-400 animate-shake text-center bg-red-500/10 border border-red-500/20 rounded-lg py-2 px-4'>
                                    {error}
                                </p>
                            )}
                            
                            <button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25 relative overflow-hidden group animate-fade-in-up"
                                style={{ animationDelay: isloginForm ? '0.3s' : '0.5s' }}
                                onClick={isloginForm ? handleLogin : handleSignup} 
                            >
                                <span className="relative z-10">
                                    {isloginForm ? "Sign In" : "Create Account"}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </button>

                            <p className="text-center text-sm mt-4 text-gray-400 animate-fade-in-up" style={{ animationDelay: isloginForm ? '0.4s' : '0.6s' }}>
                                {isloginForm ? "Don't have an account?" : "Existing User?"}{' '}
                                <button 
                                    onClick={() => setIsLoginForm((value) => !value)} 
                                    className="font-semibold text-blue-400 hover:text-blue-300 hover:underline transition-all duration-200 transform hover:scale-105"
                                >
                                    {isloginForm ? "Create Account" : "Login"}
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

         
        </div>
    );
}

export default Login;
