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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="p-3 bg-blue-600/20 rounded-xl">
                            <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                            Your Network
                        </h1>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-slate-300">
                        <span className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm font-medium">
                            {connections.length} connection{connections.length !== 1 ? 's' : ''}
                        </span>
                        <span className="text-slate-500">•</span>
                        <span className="text-sm">Growing your professional circle</span>
                    </div>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <div className="relative max-w-md mx-auto">
                        <input
                            type="text"
                            placeholder="Search by name, skills, or bio..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-xl py-4 px-5 pl-12 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-200"
                        />
                        <svg className="absolute left-4 top-4.5 h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>

                {filteredConnections.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-20 h-20 bg-slate-700/50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">No matches found</h3>
                        <p className="text-slate-400">No connections found matching "{searchTerm}"</p>
                        <button 
                            onClick={() => setSearchTerm('')}
                            className="mt-4 px-4 py-2 bg-blue-600/20 text-blue-300 rounded-lg hover:bg-blue-600/30 transition-colors duration-200"
                        >
                            Clear search
                        </button>
                    </div>
                ) : (

                <div className="grid gap-6">
                    {filteredConnections.map((connection) => {
                        const { _id, firstName, lastName, photoUrl, age, gender, about, skills } = connection;
                        return (
                            <div 
                                key={_id} 
                                className="group bg-slate-800/60 backdrop-blur-sm hover:bg-slate-700/70 rounded-2xl p-6 border border-slate-600/30 hover:border-blue-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
                            >
                                <div className="flex flex-col sm:flex-row gap-6">
                                    {/* Profile Section */}
                                    <div className="flex items-start gap-4">
                                        <div className="relative">
                                            <img 
                                                src={photoUrl || '/api/placeholder/80/80'} 
                                                alt={`${firstName} ${lastName}`}
                                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover bg-slate-600 ring-2 ring-slate-600/50 group-hover:ring-blue-500/30 transition-all duration-300"
                                                onError={(e) => e.target.src = '/api/placeholder/80/80'}
                                            />
                                            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-3 border-slate-800 shadow-lg"></div>
                                        </div>
                                        
                                        <div className="flex-1 min-w-0">
                                            <h3 
                                                className="text-xl font-bold text-white mb-2 cursor-pointer hover:text-blue-300 transition-colors duration-200 group-hover:text-blue-200" 
                                                onClick={() => window.location.href = `/profile/${_id}`}
                                            >
                                                {firstName} {lastName}
                                            </h3>
                                            {(age || gender) && (
                                                <div className="flex items-center gap-2 text-slate-400 text-sm mb-3">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                    </svg>
                                                    {age && `${age} years old`} {age && gender && " • "} {gender}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Content Section */}
                                    <div className="flex-1 space-y-4">
                                        {about && (
                                            <div>
                                                <p className="text-slate-300 leading-relaxed line-clamp-2">
                                                    {about}
                                                </p>
                                            </div>
                                        )}
                                        
                                        {skills && skills.length > 0 && (
                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <span className="text-sm font-medium text-slate-400">Skills</span>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {skills.slice(0, 4).map((skill, index) => (
                                                        <span 
                                                            key={index} 
                                                            className="px-3 py-1.5 bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-blue-300 rounded-lg text-sm font-medium border border-blue-500/20"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                    {skills.length > 4 && (
                                                        <span className="px-3 py-1.5 bg-slate-700/50 text-slate-300 rounded-lg text-sm border border-slate-600/30">
                                                            +{skills.length - 4} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    
                                    {/* Action Section */}
                                    <div className="flex flex-col gap-3 sm:items-end">
                                        <Link 
                                            to={`/chat/${_id}`} 
                                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-medium transition-all duration-200 text-center shadow-lg hover:shadow-blue-500/25 hover:scale-105 flex items-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                            </svg>
                                            Message
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