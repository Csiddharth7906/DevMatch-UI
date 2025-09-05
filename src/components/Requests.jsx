import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { addRequest, removeRequest } from '../utils/requestSlice';

const Requests = () => {  
    const dispatch = useDispatch();
    const requests = useSelector((store) => store.requests);

    const reviewRequest = async (status, _id) => {
        try {
            await axios.post(`${BASE_URL}/request/review/${status}/${_id}`, {}, {withCredentials: true});
            dispatch(removeRequest(_id));
        } catch (err) {
            console.log(err.message);
        }
    }

    const fetchRequests = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/user/requests/received`, {withCredentials: true});
            dispatch(addRequest(res?.data?.data));
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        fetchRequests();
    }, []);

    if (!requests || requests.length === 0) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center bg-slate-900 px-4">
                <div className="text-center">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-slate-700 rounded-full flex items-center justify-center">
                        <svg className="w-10 h-10 sm:w-12 sm:h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8L12 9 5 5" />
                        </svg>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-white mb-2">No Requests Found</h1>
                    <p className="text-sm sm:text-base text-slate-400">You don't have any pending connection requests</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 py-4 sm:py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Connection Requests</h1>
                    <p className="text-sm sm:text-base text-slate-400">Review and manage your pending requests</p>
                </div>
                
                <div className="space-y-4">
                    {requests.map((request) => {
                        const { firstName, lastName, photoUrl, age, gender, about, skills } = request.fromUserId;
                        
                        return (
                            <div key={request._id} className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700 hover:border-slate-600 transition-colors">
                                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                                    {/* Profile Section */}
                                    <div className="flex items-center sm:items-start gap-3 sm:gap-4">
                                        <img 
                                            src={photoUrl || '/api/placeholder/60/60'} 
                                            alt={`${firstName} ${lastName}`}
                                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl object-cover bg-slate-700 flex-shrink-0"
                                            onError={(e) => e.target.src = '/api/placeholder/60/60'}
                                        />
                                        <div className="flex-1 sm:flex-none min-w-0">
                                            <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 truncate sm:overflow-visible cursor-pointer hover:text-blue-300" onClick={() => window.location.href = `/profile/${request.fromUserId._id}`}>
                                                {firstName} {lastName}
                                            </h3>
                                            {(age || gender) && (
                                                <div className="text-slate-300 text-xs sm:text-sm mb-2">
                                                    {age && `${age} years old`} {age && gender && "•"} {gender}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Content & Actions */}
                                    <div className="flex-1 space-y-3">
                                        {about && (
                                            <p className="text-slate-400 text-sm line-clamp-2 sm:line-clamp-2">
                                                {about}
                                            </p>
                                        )}
                                        
                                        {skills && skills.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                                {skills.slice(0, window.innerWidth < 640 ? 2 : 3).map((skill, index) => (
                                                    <span key={index} className="px-2 sm:px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-xs font-medium">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {skills.length > (window.innerWidth < 640 ? 2 : 3) && (
                                                    <span className="px-2 sm:px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">
                                                        +{skills.length - (window.innerWidth < 640 ? 2 : 3)} more
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                        
                                        {/* Action Buttons */}
                                        <div className="flex gap-2 sm:gap-3 sm:justify-end">
                                            <button 
                                                onClick={() => reviewRequest("rejected", request._id)}
                                                className="flex-1 sm:flex-none bg-slate-700 hover:bg-red-500 text-white px-3 sm:px-5 py-2 sm:py-2 rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 active:scale-95 text-sm sm:hover:shadow-lg"
                                            >
                                                ✕ Reject
                                            </button>
                                            
                                            <button 
                                                onClick={() => reviewRequest("accepted", request._id)}
                                                className="flex-1 sm:flex-none bg-slate-700 hover:bg-green-500 text-white px-3 sm:px-5 py-2 sm:py-2 rounded-lg font-medium transition-all duration-300 hover:scale-[1.02] sm:hover:scale-105 active:scale-95 text-sm sm:hover:shadow-lg"
                                            >
                                                ✓ Accept
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-6 sm:mt-8 text-center">
                    <p className="text-slate-400 text-sm">
                        {requests.length} pending request{requests.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Requests