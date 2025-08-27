import axios from "axios";
import React, { useState, useRef } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, { withCredentials: true });
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error("Request failed:", err);
    }
  };

  const handleStart = (clientX, clientY) => {
    setIsDragging(true);
    setDragStart({ x: clientX, y: clientY });
    setDragOffset({ x: 0, y: 0 });
  };

  const handleMove = (clientX, clientY) => {
    if (!isDragging) return;
    
    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    const threshold = 100;
    
    if (Math.abs(dragOffset.x) > threshold) {
      if (dragOffset.x > 0) {
        // Swiped right - Like
        handleSendRequest("interested", user._id);
      } else {
        // Swiped left - Pass
        handleSendRequest("ignored", user._id);
      }
    }
    
    // Reset
    setIsDragging(false);
    setDragOffset({ x: 0, y: 0 });
  };

  // Mouse events
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
    
    const handleMouseMoveGlobal = (e) => handleMove(e.clientX, e.clientY);
    const handleMouseUpGlobal = () => {
      handleEnd();
      document.removeEventListener('mousemove', handleMouseMoveGlobal);
      document.removeEventListener('mouseup', handleMouseUpGlobal);
    };
    
    document.addEventListener('mousemove', handleMouseMoveGlobal);
    document.addEventListener('mouseup', handleMouseUpGlobal);
  };

  // Touch events
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };
  
  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };
  
  const handleTouchEnd = (e) => {
    e.preventDefault();
    handleEnd();
  };

  const rotation = dragOffset.x * 0.1;
  const opacity = 1 - Math.abs(dragOffset.x) * 0.002;

  return (
    <div className="max-w-sm mx-auto">
      <div 
        ref={cardRef}
        className="bg-gray-800 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300 cursor-grab active:cursor-grabbing select-none"
        style={{
          transform: `translateX(${dragOffset.x}px) translateY(${dragOffset.y * 0.1}px) rotate(${rotation}deg)`,
          opacity: opacity,
          transition: isDragging ? 'none' : 'all 0.3s ease'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* Swipe Indicators */}
        {isDragging && (
          <>
            <div 
              className={`absolute top-8 left-8 z-10 px-4 py-2 rounded-lg font-bold text-lg transition-opacity ${
                dragOffset.x < -50 ? 'opacity-100 bg-red-500 text-white' : 'opacity-30 bg-gray-600 text-gray-300'
              }`}
            >
              PASS
            </div>
            <div 
              className={`absolute top-8 right-8 z-10 px-4 py-2 rounded-lg font-bold text-lg transition-opacity ${
                dragOffset.x > 50 ? 'opacity-100 bg-green-500 text-white' : 'opacity-30 bg-gray-600 text-gray-300'
              }`}
            >
              LIKE
            </div>
          </>
        )}
        
        {/* Profile Image */}
        <div className="relative">
          <div className="h-80 bg-gradient-to-b from-gray-300 to-gray-400 overflow-hidden">
            {user.photoUrl ? (
              <img 
                src={user.photoUrl} 
                alt={user.firstName}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-500 flex items-center justify-center">
                <span className="text-6xl text-white/70">👤</span>
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-white">
          
          {/* Name and Verification */}
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-xl font-semibold">
              {user.firstName || "Unknown"} {user.lastName || "User"}
            </h2>
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-4 line-clamp-2">
            {user.about || `${user.gender || "Developer"} who focuses on creating amazing experiences.`}
          </p>

          {/* Stats and Action */}
          <div className="flex items-center justify-end">
            <div className="flex gap-2">
              <button 
                onClick={() => handleSendRequest("ignored", user._id)}
                className="w-10 h-10 bg-gray-700 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <span className="text-white">✕</span>
              </button>
              
              <button 
                onClick={() => handleSendRequest("interested", user._id)}
                className="bg-white hover:bg-gray-100 text-gray-800 px-6 py-2 rounded-full font-medium text-sm transition-colors duration-200"
              >
                Like ♥
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;