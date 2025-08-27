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
            <div className="min-h-screen flex flex-col justify-center items-center bg-slate-900">
                <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-6 bg-slate-700 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8L12 9 5 5" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-semibold text-white mb-2">No Requests Found</h1>
                    <p className="text-slate-400">You don't have any pending connection requests</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Connection Requests</h1>
                    <p className="text-slate-400">Review and manage your pending requests</p>
                </div>
                
                <div className="space-y-4">
                    {requests.map((request) => {
                        const { firstName, lastName, photoUrl, age, gender, about, skills } = request.fromUserId;
                        
                        return (
                            <div key={request._id} className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-colors">
                                <div className="flex items-start gap-4">
                                    {/* Profile Image */}
                                    <div className="flex-shrink-0">
                                        <img 
                                            src={photoUrl || '/api/placeholder/60/60'} 
                                            alt={`${firstName} ${lastName}`}
                                            className="w-16 h-16 rounded-xl object-cover bg-slate-700"
                                            onError={(e) => e.target.src = '/api/placeholder/60/60'}
                                        />
                                    </div>
                                    
                                    {/* User Info */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xl font-semibold text-white mb-1">
                                            {firstName} {lastName}
                                        </h3>
                                        
                                        {(age || gender) && (
                                            <div className="text-slate-300 text-sm mb-2">
                                                {age && `${age} years old`} {age && gender && "•"} {gender}
                                            </div>
                                        )}
                                        
                                        {about && (
                                            <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                                                {about}
                                            </p>
                                        )}
                                        
                                        {skills && skills.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {skills.slice(0, 3).map((skill, index) => (
                                                    <span key={index} className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-xs font-medium">
                                                        {skill}
                                                    </span>
                                                ))}
                                                {skills.length > 3 && (
                                                    <span className="px-3 py-1 bg-slate-700 text-slate-300 rounded-full text-xs">
                                                        +{skills.length - 3} more
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Action Buttons */}
                                    <div className="flex gap-3 ml-4">
                                        <button 
                                            onClick={() => reviewRequest("rejected", request._id)}
                                            className="bg-slate-700 hover:bg-red-500 text-white px-5 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                                        >
                                            ✕ Reject
                                        </button>
                                        
                                        <button 
                                            onClick={() => reviewRequest("accepted", request._id)}
                                            className="bg-slate-700 hover:bg-green-500 text-white px-5 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
                                        >
                                            ✓ Accept
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Statistics */}
                <div className="mt-8 text-center">
                    <p className="text-slate-400 text-sm">
                        {requests.length} pending request{requests.length !== 1 ? 's' : ''}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Requests