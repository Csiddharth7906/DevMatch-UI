import React, { useState } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { addRequest } from '../utils/requestSlice';

const Requests = () => {
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);
    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/requests/received", {withCredentials: true});
             dispatch(addRequest(res?.data?.data));
             console.log(res?.data?.data); // This will log the requests data
        }catch(err){
            // Handle error
           
        }
    }
    useState(() => {
        fetchRequests();
    }, []);
    if (!requests || requests.length === 0) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <h1 className="text-2xl font-semibold">No requests found.</h1>
            </div>
        );
    }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-[gilroy] font-semibold text-white text-center mb-8">
                    Request Recieved
                </h1>
                
                {/* Desktop Grid Layout */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {requests.map((requests, index) => {
                        const {firstName, lastName, photoUrl, age, gender, about, skills} = requests.fromUserId;
                        return (
                            <div key={index} className="bg-slate-700/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
                                <div className="flex flex-col items-center">
                                    <div className="relative mb-4">
                                        <img 
                                            src={photoUrl || '/api/placeholder/120/120'} 
                                            alt={`${firstName} ${lastName}`}
                                            className="w-24 h-24 rounded-full object-cover bg-slate-600"
                                            onError={(e) => {
                                                e.target.src = '/api/placeholder/120/120';
                                            }}
                                        />
                                    </div>
                                    
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        {firstName} {lastName}
                                    </h3>
                                    
                                    <div className="text-slate-300 text-sm mb-3">
                                        {age && `Age: ${age}`} {age && gender && "|"} {gender && `Gender: ${gender}`}
                                    </div>
                                    
                                    {about && (
                                        <p className="text-slate-400 text-sm text-center mb-4 line-clamp-3">
                                            {about}
                                        </p>
                                    )}
                                    
                                    {skills && skills.length > 0 && (
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            {skills.slice(0, 3).map((skill, skillIndex) => (
                                                <span key={skillIndex} className="px-3 py-1 bg-blue-600/30 text-blue-300 rounded-full text-xs">
                                                    {skill}
                                                </span>
                                            ))}
                                            {skills.length > 3 && (
                                                <span className="px-3 py-1 bg-slate-600/50 text-slate-300 rounded-full text-xs">
                                                    +{skills.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    )}
                                    
                                    <div className='flex gap-4 mt-4'>
                                        <button className="group flex-1 bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 text-red-300 py-3 md:py-4 px-4 md:px-6 rounded-xl hover:from-red-500 hover:to-pink-500 hover:text-white hover:border-red-300 transition-all duration-300 font-medium text-sm md:text-base hover:shadow-lg hover:shadow-red-500/25 hover:scale-[1.02]">
                                            <span className="flex items-center justify-center gap-2">
                                            <span className="text-lg group-hover:animate-pulse">×</span>
                                            Reject
                                            </span>
                                        </button>
                                        
                                        <button className="group flex-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 text-green-300 py-3 md:py-4 px-4 md:px-6 rounded-xl hover:from-green-500 hover:to-emerald-500 hover:text-white hover:border-green-300 transition-all duration-300 font-medium text-sm md:text-base hover:shadow-lg hover:shadow-green-500/25 hover:scale-[1.02]">
                                            <span className="flex items-center justify-center gap-2">
                                            <span className="text-lg group-hover:animate-pulse">♥</span>
                                            Accept
                                            </span>
                                        </button>
                                        </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                
                {/* Mobile List Layout */}
                <div className="md:hidden space-y-3">
                    {requests.map((requests, index) => {
                        const {firstName, lastName, photoUrl, age, gender, about, skills} = requests.fromUserId;
                        return (
                            <div key={index} className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-4 border border-slate-600/30">
                                <div className="flex items-center space-x-4">
                                    <img 
                                        src={photoUrl || '/api/placeholder/60/60'} 
                                        alt={`${firstName} ${lastName}`}
                                        className="w-12 h-12 rounded-full object-cover bg-slate-600 flex-shrink-0"
                                        onError={(e) => {
                                            e.target.src = '/api/placeholder/60/60';
                                        }}
                                    />
                                    
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-white truncate">
                                            {firstName} {lastName}
                                        </h3>
                                        
                                        <div className="text-slate-300 text-sm">
                                            {age && `${age}`} {age && gender && "•"} {gender}
                                        </div>
                                        
                                        {about && (
                                            <p className="text-slate-400 text-sm mt-1 line-clamp-2">
                                                {about}
                                            </p>
                                        )}
                                        
                                        {skills && skills.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {skills.slice(0, 2).map((skill, skillIndex) => (
                                                    <span key={skillIndex} className="px-2 py-1 bg-blue-600/30 text-blue-300 rounded-md text-xs">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {skills.length > 2 && (
                                                    <span className="px-2 py-1 bg-slate-600/50 text-slate-300 rounded-md text-xs">
                                                        +{skills.length - 2}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    
                                   <button className="group  bg-gradient-to-r from-red-500/20 to-pink-500/20 border border-red-400/30 text-red-300 py-3 md:py-4 px-4 md:px-6 rounded-xl hover:from-red-500 hover:to-pink-500 hover:text-white hover:border-red-300 transition-all duration-300 font-medium text-sm md:text-base hover:shadow-lg hover:shadow-red-500/25 hover:scale-[1.02]">
                                            <span className="flex items-center justify-center gap-2">
                                            <span className="text-lg group-hover:animate-pulse">×</span>
                                            Reject
                                            </span>
                                        </button>
                                        
                                        <button className="group  bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-400/30 text-green-300 py-3 md:py-4 px-4 md:px-6 rounded-xl hover:from-green-500 hover:to-emerald-500 hover:text-white hover:border-green-300 transition-all duration-300 font-medium text-sm md:text-base hover:shadow-lg hover:shadow-green-500/25 hover:scale-[1.02]">
                                            <span className="flex items-center justify-center gap-2">
                                            <span className="text-lg group-hover:animate-pulse">♥</span>
                                            Accept
                                            </span>
                                        </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>  
  )
}

export default Requests