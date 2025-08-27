import React, { useEffect, useState, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { addConnection } from '../utils/connectionSlice';

const Chat = () => {
    const { targetUserId } = useParams();
    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const connections = useSelector(store => store.connection);
    const userId = user?._id;
    const firstName = user?.firstName;

    const messagesEndRef = useRef(null);

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true
            });
            dispatch(addConnection(res?.data?.data));
        } catch (error) {
            console.error("Error fetching connections:", error);
        }
    };

    const fetchChatMessages = async () => {
        if (!targetUserId) return;
        
        try {
            const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, { withCredentials: true });
            const chatMessages = chat?.data?.messages?.map(msg => {
                const { senderId, text } = msg;
                return { firstName: senderId?.firstName, lastName: senderId?.lastName, text: text };
            }) || [];
            setMessage(chatMessages);
        } catch (error) {
            console.error("Error fetching messages:", error);
            setMessage([]);
        }
    };

    // Fetch connections on mount
    useEffect(() => {
        fetchConnections();
    }, []);

    // Fetch messages when targetUserId changes
    useEffect(() => {
        if (targetUserId) {
            fetchChatMessages();
        } else {
            setMessage([]);
        }
    }, [targetUserId]);

    // Socket connection for real-time messages
    useEffect(() => {
        if (!userId || !targetUserId) return;

        const socket = createSocketConnection();
        socket.emit("joinChat", { firstName, userId, targetUserId });

        socket.on("messageReceived", ({ firstName, lastName, text }) => {
            setMessage((prev) => [...prev, { firstName, lastName, text }]);
        });

        return () => {
            socket.disconnect();
        };
    }, [userId, targetUserId, firstName]);

    // Auto scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    const sendMessage = () => {
        if (!newMessage.trim() || !targetUserId) return;

        const socket = createSocketConnection();
        socket.emit("sendMessage", { 
            firstName, 
            lastName: user.lastName, 
            userId, 
            targetUserId, 
            text: newMessage.trim() 
        });
        setNewMessage("");
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const getCurrentChatUser = () => {
        if (!targetUserId || !connections) return null;
        return connections.find(conn => conn._id === targetUserId);
    };

    const currentChatUser = getCurrentChatUser();

    return (
        <div className='flex h-screen bg-gray-900 overflow-hidden'>
            {/* Sidebar */}
            <div className='w-80 bg-gray-800 border-r border-gray-700 flex flex-col'>
                {/* Sidebar Header */}
                <div className='p-4 border-b border-gray-700 flex-shrink-0'>
                    <div className='flex items-center space-x-2 text-white'>
                        <div className='w-4 h-4 bg-white rounded-sm flex items-center justify-center'>
                            <div className='w-2 h-2 bg-gray-800 rounded-sm'></div>
                        </div>
                        <h1 className='font-medium'>Simple Chat</h1>
                    </div>
                </div>

                {/* Connections Section */}
                <div className='p-4 flex-1 flex flex-col overflow-hidden'>
                    <div className='flex items-center justify-between mb-4 flex-shrink-0'>
                        <div className='flex items-center space-x-2 text-gray-400'>
                            <div className='w-4 h-4 rounded-full border border-gray-500 flex items-center justify-center'>
                                <div className='w-1 h-1 bg-gray-500 rounded-full'></div>
                            </div>
                            <span className='text-sm font-medium'>CONNECTIONS</span>
                            <span className='bg-gray-700 text-xs px-1.5 py-0.5 rounded text-gray-300'>
                                {connections?.length || 0}
                            </span>
                        </div>
                    </div>

                    {/* Connections List */}
                    <div className='space-y-1 flex-1 overflow-y-auto'>
                        {connections && connections.length > 0 ? connections.map((connection, index) => {
                            const { _id, firstName, lastName, photoUrl } = connection;
                            const isActive = targetUserId === _id;
                            
                            return (
                                <Link 
                                    key={_id || index} 
                                    to={`/chat/${_id}`}
                                    className={`flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer group transition-colors ${
                                        isActive ? 'bg-gray-700 border border-blue-500' : ''
                                    }`}
                                >
                                    <div className='relative'>
                                        {photoUrl ? (
                                            <img 
                                                src={photoUrl} 
                                                alt={`${firstName} ${lastName}`}
                                                className="w-10 h-10 rounded-full object-cover bg-gray-600"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}
                                        <div className={`w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white text-sm font-medium ${photoUrl ? 'hidden' : ''}`}>
                                            {firstName?.charAt(0) || 'U'}{lastName?.charAt(0) || ''}
                                        </div>
                                        <div className='absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800'></div>
                                    </div>
                                    <div className='flex-1 min-w-0'>
                                        <div className='flex items-center justify-between'>
                                            <h3 className='text-white text-sm font-medium truncate'>
                                                {firstName} {lastName}
                                            </h3>
                                            <span className='text-xs text-gray-400'>online</span>
                                        </div>
                                        <p className='text-gray-400 text-sm truncate'>Click to start chat</p>
                                    </div>
                                </Link>
                            );
                        }) : (
                            <div className='text-gray-500 text-sm p-4 text-center'>
                                {connections === null ? 'Loading connections...' : 'No connections found'}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Chat Area */}
            <div className='flex-1 flex flex-col'>
                {/* Chat Header */}
                <div className='flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800'>
                    <div className='flex items-center space-x-3'>
                        <div className='text-white'>
                            <span className='text-sm text-gray-400'>To: </span>
                            <span className='font-medium'>
                                {currentChatUser 
                                    ? `${currentChatUser.firstName} ${currentChatUser.lastName}` 
                                    : (targetUserId ? 'Loading...' : 'Select a connection to chat')
                                }
                            </span>
                        </div>
                    </div>
                    {targetUserId && (
                        <div className='flex items-center space-x-3'>
                            <button className='p-2 text-gray-400 hover:text-white transition-colors'>
                                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                    <path d='M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z' />
                                </svg>
                            </button>
                            <button className='p-2 text-gray-400 hover:text-white transition-colors'>
                                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                    <path d='M15 10l4.553-2.276A1 1 0 0121 8.618v2.764a1 1 0 01-1.447.894L15 10zM13 10a4 4 0 11-8 0 4 4 0 018 0z' />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>

                {/* Today Separator - only show if there are messages */}
                {targetUserId && message.length > 0 && (
                    <div className='flex justify-center py-4'>
                        <span className='bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full'>TODAY</span>
                    </div>
                )}

                {/* Messages Container */}
                <div className='flex-1 overflow-y-auto px-6 pb-4 space-y-4'>
                    {!targetUserId ? (
                        <div className='flex justify-center items-center h-full'>
                            <div className='text-gray-500 text-center'>
                                <div className='w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4'>
                                    <svg className='w-8 h-8' fill='currentColor' viewBox='0 0 20 20'>
                                        <path fillRule='evenodd' d='M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z' clipRule='evenodd' />
                                    </svg>
                                </div>
                                <p className='text-lg mb-2'>Welcome to Simple Chat</p>
                                <p className='text-sm'>Select a connection from the sidebar to start chatting!</p>
                            </div>
                        </div>
                    ) : message.length > 0 ? (
                        message.map((msg, index) => (
                            <div key={index} className={`flex ${user.firstName === msg.firstName ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex items-end space-x-2 max-w-md ${user.firstName === msg.firstName ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                    <div className='w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white text-xs font-medium flex-shrink-0'>
                                        {msg.firstName?.charAt(0) || 'U'}{msg.lastName?.charAt(0) || ''}
                                    </div>
                                    <div className={`px-4 py-2 rounded-2xl ${
                                        user.firstName === msg.firstName
                                            ? 'bg-blue-600 text-white rounded-br-md'
                                            : 'bg-gray-700 text-white rounded-bl-md'
                                    }`}>
                                        <div className='text-sm'>{msg.text}</div>
                                        <div className='text-xs opacity-70 mt-1'>2 hours ago</div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='flex justify-center items-center h-full'>
                            <div className='text-gray-500 text-center'>
                                <p className='text-lg mb-2'>No messages yet</p>
                                <p className='text-sm'>Start a conversation with {currentChatUser?.firstName}!</p>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className='p-4 border-t border-gray-700 bg-gray-800'>
                    {targetUserId ? (
                        <div className='flex items-center space-x-3'>
                            <button className='p-2 text-gray-400 hover:text-white transition-colors'>
                                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                    <path fillRule='evenodd' d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z' clipRule='evenodd' />
                                </svg>
                            </button>
                            <div className='flex-1 relative'>
                                <input
                                    type="text"
                                    placeholder="Type something..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className='w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 border-none'
                                />
                            </div>
                            <button
                                onClick={sendMessage}
                                disabled={!newMessage.trim()}
                                className='bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition-colors duration-200 text-white font-medium text-sm'
                            >
                                Send
                            </button>
                        </div>
                    ) : (
                        <div className='text-center text-gray-500 py-4'>
                            Select a connection to start messaging
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Chat;