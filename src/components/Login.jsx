import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
    const [email, setEmail] = useState('siddharthchauhan@gmail.com');
    const [password, setPassword] = useState('Siddharth@1');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogin = async ()=>{
        try {
            const res = await axios.post(BASE_URL+"/login",{
            email,
            password
        },{withCredentials:true});
        
        dispatch(addUser(res.data));
        navigate("/");
        } catch (error) {
            console.error("Login failed:", error);
        }
    }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 px-4 ">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row">
        
        {/* Image Section - Hidden on mobile */}
        <div className="hidden md:block md:w-1/2 h-64 md:h-auto overflow-hidden bg-base-200">
          <img
            src="https://i.pinimg.com/736x/81/e0/b1/81e0b19c873d53534dade9ea9bbecbe2.jpg"
            className="object-cover w-full h-full"
            alt="Login Visual"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            Hello! <br /> Welcome Back
          </h2>

          <div className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Enter Email
              </label>
              <input
                type="email"
                value={email}
                id="email"
                placeholder="you@example.com"
                className="input input-bordered w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                placeholder="••••••••"
                className="input input-bordered w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
              
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full text-white font-semibold"
              onClick={handleLogin}
            >
              Sign In
            </button>

            <p className="text-center text-sm mt-4 text-gray-500 dark:text-gray-400">
              Don’t have an account?{' '}
              <a href="#" className="font-semibold text-blue-500 hover:underline">
                Create Account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
