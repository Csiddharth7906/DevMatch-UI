import React, { useState } from 'react'
import UserCard from './UserCard'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl || '');
    const [age, setAge] = useState(user.age || '');
    const [gender, setGender] = useState(user.gender || '');
    const [about, setAbout] = useState(user.about || '');
    const [skills, setSkills] = useState(user.skills || []);
    const [error, setError] = useState('');
    const [image, setImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSave = async () => {
        try {
            setError('');
            setIsUploading(true);

            const formData = new FormData();

            if (image) {
                formData.append('photo', image);
            }

            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            if (!image && photoUrl) {
                formData.append('photoUrl', photoUrl);
            }
            formData.append('age', age.toString());
            formData.append('gender', gender);
            formData.append('about', about);
            formData.append('skills', JSON.stringify(skills));

            const res = await axios.patch(BASE_URL + "/profile/edit", formData, {
                withCredentials: true,
            });

            dispatch(addUser(res?.data?.user));

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
            const previewUrl = URL.createObjectURL(file);
            setPhotoUrl(previewUrl);
        }
    }

    return (
        <div className="min-h-screen bg-slate-900 py-8 px-4">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
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

                {/* Main Edit Form */}
                <div className="flex-1 max-w-lg mx-auto lg:mx-0">
                    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50">
                        {/* Header */}
                        <div className="p-6 border-b border-slate-700/50">
                            <h1 className="text-2xl font-bold text-white text-center">Edit Profile</h1>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            {/* Profile Photo */}
                            <div className="text-center">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    id="photo-upload"
                                />

                                <div className="relative inline-block">
                                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden shadow-xl">
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
                                        className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 border-2 border-slate-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors shadow-lg"
                                    >
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="mt-4 space-y-3">
                                    {image && (
                                        <div className="bg-green-900/20 border border-green-700 rounded-lg px-4 py-3">
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

                                    {!image && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                                Or paste image URL:
                                            </label>
                                            <input
                                                type="url"
                                                value={photoUrl}
                                                onChange={(e) => setPhotoUrl(e.target.value)}
                                                placeholder="https://example.com/image.jpg"
                                                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="First name"
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Last name"
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Age and Gender */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Age</label>
                                    <input
                                        type="number"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        placeholder="Age"
                                        min="18"
                                        max="100"
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Gender</label>
                                    <select
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                        <option value="prefer-not-to-say">Prefer not to say</option>
                                    </select>
                                </div>
                            </div>

                            {/* About Section */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">About Me</label>
                                <textarea
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    placeholder="Tell us about yourself..."
                                    rows="4"
                                    maxLength="200"
                                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                />
                                <p className="text-sm text-gray-400 mt-1">{about.length}/200</p>
                            </div>

                            {/* Skills Section */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Skills & Tech</label>
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
                                    className="w-full px-4 py-3 mb-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />

                                {skills.length === 0 ? (
                                    <div className="text-gray-400 text-sm italic bg-slate-700/50 px-4 py-3 rounded-lg">
                                        No skills added yet
                                    </div>
                                ) : (
                                    <div className="flex flex-wrap gap-2">
                                        {skills.map((skill, idx) => (
                                            <span
                                                key={idx}
                                                className="flex items-center gap-2 bg-blue-600/20 text-blue-300 border border-blue-500/30 text-sm px-3 py-2 rounded-full"
                                            >
                                                {skill}
                                                <button
                                                    onClick={() => {
                                                        const updated = skills.filter((_, i) => i !== idx);
                                                        setSkills(updated);
                                                    }}
                                                    className="text-blue-400 hover:text-white text-lg leading-none"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="p-6 border-t border-slate-700/50">
                            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
                            <div className="flex gap-4">
                                <button
                                    onClick={handleCancel}
                                    disabled={isUploading}
                                    className="flex-1 bg-slate-600 hover:bg-slate-500 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={isUploading}
                                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isUploading ? 'Saving...' : 'Save Profile'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Preview Card - Hidden on mobile, visible on desktop */}
                <div className="hidden lg:block lg:w-80">
                    <div className="sticky top-8">
                        <h2 className="text-lg font-semibold text-white mb-4">Preview</h2>
                        <UserCard
                            user={{ firstName, lastName, photoUrl, age, gender, about, skills }}
                            showButtons={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile