import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUser } from '../utils/userSlice';
import { clearFeed } from '../utils/feedSlice';

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(clearFeed());
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navItems = [
    { path: '/', label: 'Home', icon: 'ri-home-line' },
    { path: '/explore', label: 'Explore', icon: 'ri-search-line' }, // Added Explore
    { path: '/connection', label: 'Connections', icon: 'ri-group-line' },
    { path: '/request', label: 'Requests', icon: 'ri-notification-line' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1 hover:opacity-80 transition-opacity">
            <span className="text-xl font-bold text-white">Dev</span>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Match
            </span>
          </Link>

          {user && (
            <div className="flex items-center space-x-6">
              {/* Desktop Nav */}
              <div className="hidden md:flex items-center space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      location.pathname === item.path
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <i className={item.icon}></i>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <img
                    src={user.photoUrl}
                    alt={user.firstName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="hidden sm:block text-white text-sm">{user.firstName}</span>
                  <i className="ri-arrow-down-s-line text-gray-400"></i>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-xl border border-gray-700">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center justify-between px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        <span>Profile</span>
                        <span className="text-xs bg-pink-500 px-2 py-1 rounded">New</span>
                      </Link>
                      
                      {/* Mobile nav items */}
                      <div className="md:hidden border-t border-gray-700 mt-1 pt-1">
                        {navItems.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setShowDropdown(false)}
                            className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                          >
                            <i className={item.icon}></i>
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>

                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white border-t border-gray-700 mt-1"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;