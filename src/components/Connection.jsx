import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';
import { Link } from 'react-router-dom';

const Connection = () => {
    const dispatch = useDispatch();
    const connections = useSelector((store) => store.connection);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchConnections = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${BASE_URL}/user/connections`, {
                withCredentials: true
            });
            dispatch(addConnection(res?.data?.data));
        } catch (err) {
            console.error('Error fetching connections:', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchConnections();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-slate-400">Loading connections...</p>
                </div>
            </div>
        );
    }

    // Filter connections based on search
    const filteredConnections = connections.filter(connection => {
        const { firstName, lastName, skills, about } = connection;
        const searchLower = searchTerm.toLowerCase();
        return (
            firstName.toLowerCase().includes(searchLower) ||
            lastName.toLowerCase().includes(searchLower) ||
            (skills && skills.some(skill => skill.toLowerCase().includes(searchLower))) ||
            (about && about.toLowerCase().includes(searchLower))
        );
    });

    if (!connections || connections.length === 0) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold text-white mb-3">No Connections Yet</h2>
                    <p className="text-slate-400 mb-6">Start building your professional network.</p>
                    <Link 
                        to="/feed" 
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                    >
                        Discover People
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 py-6 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">Your Network</h1>
                    <p className="text-slate-400">{connections.length} connection{connections.length !== 1 ? 's' : ''}</p>
                </div>

                {/* Search */}
                <div className="mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search connections..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-800 border border-slate-700 rounded-lg py-3 px-4 pl-10 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <svg className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {filteredConnections.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-slate-400">No connections found matching "{searchTerm}"</p>
                    </div>
                ) : (

                <div className="grid gap-4">
                    {filteredConnections.map((connection) => {
                        const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = connection;
                        return (
                            <div 
                                key={_id} 
                                className="bg-slate-800 hover:bg-slate-700/50 rounded-xl p-4 sm:p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300 hover:shadow-lg"
                            >
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <img 
                                                src={photoUrl || '/api/placeholder/60/60'} 
                                                alt={`${firstName} ${lastName}`}
                                                className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover bg-slate-600"
                                                onError={(e) => e.target.src = '/api/placeholder/60/60'}
                                            />
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-800"></div>
                                        </div>
                                        
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-white">
                                                {firstName} {lastName}
                                            </h3>
                                            {(age || gender) && (
                                                <p className="text-slate-400 text-sm">
                                                    {age && `${age} years old`} {age && gender && " • "} {gender}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className="flex-1 space-y-3">
                                        {about && (
                                            <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">
                                                {about}
                                            </p>
                                        )}
                                        
                                        {skills && skills.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {skills.slice(0, 3).map((skill, index) => (
                                                    <span 
                                                        key={index} 
                                                        className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-xs font-medium"
                                                    >
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
                                    
                                    <div className="   flex justify-center md:flex-col">
                                        <Link 
                                            to={`/chat/${_id}`} 
                                            className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-200 hover:scale-105 text-center"
                                        >
                                            💬 Chat
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                )}
            </div>
        </div>
    );
}

export default Connection