import React, { useState } from 'react'
import UserCard from './UserCard'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { ToastContainer , toast , Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const EditProfile = ({user}) => {
    // State variables for user profile fields
    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl || '');
    const [age, setAge] = useState(user.age || '');
    const [gender, setGender] = useState(user.gender || ''  );
    const [about, setAbout] = useState(user.about || '');
    const [skills, setSkills] = useState(user.skills || []);
    const [error, setError] = useState('');
    const [image, setImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSave = async() => {
        try{
            setError('');
            setIsUploading(true);

            // Create FormData for file upload
            const formData = new FormData();
            
            // Add the image file if selected
            if (image) {
                formData.append('photo', image);
                console.log('File selected:', image.name, image.type, image.size);
            }
            
            // Add other form fields
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            if (!image && photoUrl) {
                formData.append('photoUrl', photoUrl);
            }
            formData.append('age', age.toString()); // Ensure it's a string
            formData.append('gender', gender);
            formData.append('about', about);
            formData.append('skills', JSON.stringify(skills));

            // Debug: Log what we're sending
            console.log('FormData contents:');
            for (let [key, value] of formData.entries()) {
                console.log(key, ':', value);
            }

           const res = await axios.patch(BASE_URL + "/profile/edit", formData, {
            withCredentials: true,
            // Remove Content-Type header - let browser set it automatically
           });

           dispatch(addUser(res?.data?.user)); // Note: your backend sends 'user' not 'data.data'
           
           toast.success('Profile Updated', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
            navigate("/");
            window.location.reload()
        }
        catch (err) {
            setError(err.response?.data || 'An error occurred');
        } finally {
            setIsUploading(false);
        }
    }

    const handleCancel = () => {
        setFirstName(user.firstName || '');
        setLastName(user.lastName || '');
        setPhotoUrl(user.photoUrl || '');
        setAge(user.age || '');
        setGender(user.gender || '');
        setAbout(user.about || '');
        setSkills(user.skills || []);
        setImage(null);
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            // Create a preview URL
            const previewUrl = URL.createObjectURL(file);
            setPhotoUrl(previewUrl);
        }
    }

    return (
        <div className="edit-profile container p-10 flex  justify-center relative">
             <Link to="/" className="px-4 md:py-2 rounded-full absolute top-2 md:top-10 text-white font-medium bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200">
                    Go to Feed
                 </Link>
                          <ToastContainer
                                position="top-center"
                                autoClose={5000}
                                hideProgressBar
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="dark"
                                transition={Bounce}
                                />
            <div className="max-w-lg min-h-screen mx-auto">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50">
                    {/* Header */}
                    <div className="p-4 border-b border-slate-700/50">
                        <h1 className="text-lg font-bold text-white text-center">Edit Profile</h1>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-4">
                        {/* Profile Photo */}
                        <div className="text-center">
                            {/* Hidden file input */}
                            <input
                                ref={(input) => { window.fileInputRef = input; }}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                id="photo-upload"
                            />
                            
                            {/* Mobile Profile Photo with Edit Icon */}
                            <div className="relative inline-block sm:hidden">
                                <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center overflow-hidden shadow-lg">
                                    {photoUrl ? (
                                        <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <svg className="w-10 h-10 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                                <button 
                                    onClick={() => document.getElementById('photo-upload').click()}
                                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-pink-600 border-2 border-slate-800 rounded-full flex items-center justify-center hover:bg-pink-500 transition-all duration-200 shadow-lg active:scale-95"
                                >
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Desktop/Tablet File Upload */}
                            <div className="hidden sm:block">
                                <div className="relative inline-block">
                                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center overflow-hidden shadow-xl">
                                        {photoUrl ? (
                                            <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
                                        ) : (
                                            <svg className="w-12 h-12 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </div>
                                    <button 
                                        onClick={() => document.getElementById('photo-upload').click()}
                                        className="absolute -bottom-2 -right-2 w-10 h-10 bg-pink-600 border-2 border-slate-800 rounded-full flex items-center justify-center hover:bg-pink-500 transition-all duration-200 shadow-lg active:scale-95"
                                    >
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                            {/* File Upload Status and URL Input */}
                            <div className="mt-4 space-y-3">
                                {/* File Status */}
                                {image && (
                                    <div className="bg-green-600/20 border border-green-500/30 rounded-lg px-4 py-3">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                                <div>
                                                    <p className="text-green-400 text-sm font-medium">{image.name}</p>
                                                    <p className="text-green-400/70 text-xs">{(image.size / 1024).toFixed(1)} KB</p>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => {
                                                    setImage(null);
                                                    setPhotoUrl(user.photoUrl || '');
                                                }}
                                                className="text-red-400 hover:text-red-300 p-1"
                                            >
                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Alternative: URL Input */}
                                {!image && (
                                    <div>
                                        <label className="block text-xs font-medium text-gray-400 mb-2">
                                            Or paste image URL:
                                        </label>
                                        <input
                                            type="url"
                                            value={photoUrl}
                                            onChange={(e) => setPhotoUrl(e.target.value)}
                                            placeholder="https://example.com/image.jpg"
                                            className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                        />
                                    </div>
                                )}

                                {/* Upload Button (Alternative) */}
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('photo-upload').click()}
                                    className="w-full py-3 px-4 bg-slate-700/30 border border-slate-600/50 rounded-lg text-gray-300 text-sm hover:bg-slate-700/50 hover:border-pink-500/50 transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                    {image ? 'Change Photo' : 'Upload Photo'}
                                </button>
                            </div>
                        </div>

                        {/* Name Fields */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-300 mb-1">First Name</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First name"
                                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-300 mb-1">Last Name</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last name"
                                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                />
                            </div>
                        </div>

                        {/* Age and Gender */}
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-medium text-gray-300 mb-1">Age</label>
                                <input
                                    type="number"
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                    placeholder="Age"
                                    min="18"
                                    max="100"
                                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-300 mb-1">Gender</label>
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                                >
                                    <option value="" className="bg-slate-700">Select</option>
                                    <option value="male" className="bg-slate-700">Male</option>
                                    <option value="female" className="bg-slate-700">Female</option>
                                    <option value="other" className="bg-slate-700">Other</option>
                                    <option value="prefer-not-to-say" className="bg-slate-700">Prefer not to say</option>
                                </select>
                            </div>
                        </div>

                        {/* About Section */}
                        <div>
                            <label className="block text-xs font-medium text-gray-300 mb-1">About Me</label>
                            <textarea
                                value={about}
                                onChange={(e) => setAbout(e.target.value)}
                                placeholder="Tell us about yourself..."
                                rows="3"
                                maxLength="200"
                                className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all resize-none"
                            />
                            <p className="text-xs text-gray-500 mt-1">{about.length}/200</p>
                        </div>

                      {/* Skills Section */}
                    <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Skills & Tech</label>

                    {/* Input to Add Skills */}
                    <input
                        type="text"
                        placeholder="Type a skill and press Enter"
                        onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.value.trim()) {
                            const newSkill = e.target.value.trim();
                            if (!skills.includes(newSkill)) {
                            setSkills([...skills, newSkill]);
                            }
                            e.target.value = '';
                        }
                        }}
                        className="w-full px-3 py-2 mb-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                    />

                    {/* Display Skills with Remove Option */}
                    {skills.length === 0 ? (
                        <div className="text-gray-400 text-xs italic bg-slate-700/30 px-3 py-2 rounded-lg">
                        No skills added yet
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                        {skills.map((skill, idx) => (
                            <span
                            key={idx}
                            className="flex items-center gap-1 bg-pink-600/20 text-pink-300 border border-pink-500/30 text-xs px-3 py-1 rounded-full hover:bg-pink-600/30 transition"
                            >
                            {skill}
                            <button
                                onClick={() => {
                                const updated = skills.filter((_, i) => i !== idx);
                                setSkills(updated);
                                }}
                                className="text-pink-400 hover:text-white"
                            >
                                ✕
                            </button>
                            </span>
                        ))}
                        </div>
                    )}
                    </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-4 border-t border-slate-700/50">
                    <p className="text-red-500">{error}</p>
                        <div className="grid grid-cols-2 gap-3">
                            <button 
                                onClick={handleCancel} 
                                disabled={isUploading}
                                className="bg-red-600/20 border border-red-500/50 text-red-400 py-2 px-4 rounded-lg hover:bg-red-600/30 transition-all text-sm font-medium flex items-center justify-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <span>✕</span>
                                <span>Cancel</span>
                            </button>
                            <button 
                                onClick={handleSave} 
                                disabled={isUploading}
                                className="bg-green-600/20 border border-green-500/50 text-green-400 py-2 px-4 rounded-lg hover:bg-green-600/30 transition-all text-sm font-medium flex items-center justify-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isUploading ? (
                                    <>
                                        <span className="animate-spin">⟳</span>
                                        <span>Uploading...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>♥</span>
                                        <span>Save</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className=' hidden lg:block my-30 ml-10'>
                <UserCard user={{firstName,lastName,photoUrl,age,gender,about,skills}} showButtons={false}   />
            </div>
        </div>
    )
}

export default EditProfile