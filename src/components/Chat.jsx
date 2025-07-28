import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {
    const { targetUserId } = useParams();
    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = useSelector(store => store.user);
    const userId = user?._id;
    const firstName = user?.firstName;

    const messagesEndRef = useRef(null);

    const fetchChatMessages = async () => {
        const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, { withCredentials: true });

        const chatMessages = chat?.data?.messages.map(msg => {
            const { senderId, text } = msg;
            return { firstName: senderId?.firstName, lastName: senderId?.lastName, text: text };
        });
        setMessage(chatMessages);
    };

    useEffect(() => {
        fetchChatMessages()
    }, []);

    useEffect(() => {
        if (!userId) return;

        const socket = createSocketConnection();
        socket.emit("joinChat", { firstName, userId, targetUserId });

        socket.on("messageReceived", ({ firstName, lastName, text }) => {
            setMessage((prev) => [...prev, { firstName, lastName, text }])
        });

        return () => {
            socket.disconnect();
        }
    }, [userId, targetUserId]);


    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    const socket = createSocketConnection();
    const sendMessage = () => {
        socket.emit("sendMessage", { firstName, lastName: user.lastName, userId, targetUserId, text: newMessage });
        setNewMessage("");
    }

    return (
        <div className='flex justify-center items-start min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4'>
            <div className='w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20'>

                {/* Chat Header */}
                <div className='flex items-center justify-between p-6 border-b border-white/10 bg-gradient-to-r from-purple-600/20 to-blue-600/20'>
                    <div className='flex items-center space-x-3'>
                        <div className='relative'></div>
                        <div>
                            <h2 className='font-semibold text-xl text-white'>Chat</h2>
                            <p className='text-sm text-green-300 flex items-center'>
                                <span className='w-2 h-2 bg-green-400 rounded-full mr-2'></span>
                                online
                            </p>
                        </div>
                    </div>
                </div>

           
                <div className='h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-slate-900/50 to-purple-900/30'>
                    {message.map((msg, index) => (
                        <div key={index} className={"flex flex-col mb-6 " + (user.firstName === msg.firstName ? "items-end" : "items-start")}>
                            <div className="text-xs opacity-80 mb-2 text-slate-300 font-medium">
                                {`${msg.firstName} ${msg.lastName}`}
                                <time className='ml-2 opacity-50'>2 hour ago</time>
                            </div>
                            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-lg backdrop-blur-sm ${
                                user.firstName === msg.firstName
                                    ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-br-md'
                                    : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-bl-md'
                            }`}>
                                <div className='text-sm leading-relaxed'>{msg.text}</div>
                            </div>
                            <div className={`text-xs opacity-60 mt-2 text-slate-400 ${
                                user.firstName === msg.firstName ? 'text-right' : 'text-left'
                            }`}>
                                Seen
                            </div>
                        </div>
                    ))}
                    
                    <div ref={messagesEndRef} />
                </div>

               
                <div className='border-t border-white/10 p-6 bg-gradient-to-r from-purple-600/10 to-blue-600/10'>
                    <div className='flex items-center space-x-4'>
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className='flex-1 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-300 border border-white/20 transition-all duration-200'
                        />
                        <button
                            onClick={sendMessage}
                            className='bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 p-3 rounded-full transition-all duration-300 text-white shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 active:scale-95'
                        >
                            <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                                <path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z' />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;
