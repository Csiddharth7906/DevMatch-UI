import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();

  const handleSendRequest = async (status,userId) => {
    try{
         const res = await axios.post(BASE_URL+"/request/send/"+status+"/"+userId,{},{withCredentials:true});
          dispatch(removeUserFromFeed(userId));
    }catch(err){

    }
  };
  // Check if user data exists


  return (
    <div >
      <div className="max-w-5xl w-full mx-4 md:mx-0 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl rounded-2xl md:rounded-3xl border border-white/20 shadow-2xl overflow-hidden hover:shadow-purple-500/25 hover:shadow-2xl transition-all duration-500 hover:scale-[1.01]">
        <div className="flex flex-col md:flex-row">
          {/* Profile Image Section */}
          <div className="relative md:w-80 w-full h-64 md:h-auto overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: user.photoUrl 
                  ? `url(${user.photoUrl})` 
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}
            />
            {!user.photoUrl && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl text-white/70">👤</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 via-transparent to-blue-900/20" />
            
            {/* Floating elements */}
            <div className="absolute top-4 right-4 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
            <div className="absolute bottom-4 left-4 w-2 h-2 bg-yellow-400 rounded-full animate-bounce" />
          </div>

          {/* Content Section */}
          <div className="flex-1 p-4 md:p-8 text-white">
            {/* Header */}
            <div className="mb-3 md:mb-4">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  {user.firstName || "Unknown"} {user.lastName || "User"}
                </h1>
                <div className="flex items-center gap-1 text-sm md:text-base text-purple-300 bg-purple-500/20 px-2 md:px-3 py-1 md:py-2 rounded-full">
                  <span>●</span>
                  <span className="capitalize">{user.gender || "N/A"}</span>
                  <span>•</span>
                  <span>{user.age || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="mb-4 md:mb-5">
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {user.about || "No description available."}
              </p>
            </div>

            {/* Skills */}
            <div className="mb-4 md:mb-6">
                              <h3 className="text-sm md:text-base font-semibold text-purple-200 mb-2 md:mb-4">Skills & Tech</h3>
                              <div className="flex flex-wrap gap-2 md:gap-3">
                {user.skills && user.skills.length > 0 ? (
                  user.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="group relative text-xs md:text-sm font-medium bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-400/30 text-purple-100 px-2 md:px-4 py-1 md:py-2 rounded-lg hover:from-purple-500/40 hover:to-blue-500/40 hover:border-purple-300/50 transition-all duration-300 cursor-pointer hover:scale-105"
                    >
                      {skill}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm md:text-base italic">No skills listed</span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 md:gap-4">
              <button onClick={()=>handleSendRequest("ignored",user._id)} className="group flex-1 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 text-red-300 py-3 md:py-4 px-4 md:px-6 rounded-xl hover:from-red-500 hover:to-pink-500 hover:text-white hover:border-red-300 transition-all duration-300 font-medium text-sm md:text-base hover:shadow-lg hover:shadow-red-500/25 hover:scale-[1.02]">
                <span className="flex items-center justify-center gap-2">
                  <span className="text-lg group-hover:animate-pulse">×</span>
                  Pass
                </span>
              </button>
              
              <button onClick={()=>handleSendRequest("interested",user._id)} className="group flex-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 text-green-300 py-3 md:py-4 px-4 md:px-6 rounded-xl hover:from-green-500 hover:to-emerald-500 hover:text-white hover:border-green-300 transition-all duration-300 font-medium text-sm md:text-base hover:shadow-lg hover:shadow-green-500/25 hover:scale-[1.02]">
                <span className="flex items-center justify-center gap-2">
                  <span className="text-lg group-hover:animate-pulse">♥</span>
                  Like
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;