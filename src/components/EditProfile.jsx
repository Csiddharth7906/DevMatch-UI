import React, { useState } from 'react'
import UserCard from './UserCard'
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { ToastContainer , toast , Bounce} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const dispatch = useDispatch();

    const handleSave = async() => {
        try{
            setError('');
           const res = await axios.patch(BASE_URL + "/profile/edit",{
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
            about,
            skills
           },{withCredentials:true,})
           dispatch(addUser(res?.data?.data));
        //    toast.success("Product Added Successfully! ^^");
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
        
        }
        catch (err) {
            setError(err.response.data);
          
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
    }



    return (

        
        <div className="edit-profile container p-10 flex  justify-center">
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
                            <div className="relative inline-block sm:hidden">
                                <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 flex items-center justify-center overflow-hidden">
                                    {photoUrl ? (
                                        <img src={photoUrl} alt="Profile" className="w-full h-full object-cover" />
                                    ) : (
                                        <svg className="w-8 h-8 text-white/80" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                        </svg>
                                    )}
                                </div>
                                <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-700 border border-slate-600 rounded-full flex items-center justify-center hover:bg-slate-600 transition-colors">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                </button>
                            </div>
                            <input
                                type="url"
                                value={photoUrl}
                                onChange={(e) => setPhotoUrl(e.target.value)}
                                placeholder="Photo URL"
                                className="mt-2 w-full px-3 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                            />
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
                            <button onClick={handleCancel} className="bg-red-600/20 border border-red-500/50 text-red-400 py-2 px-4 rounded-lg hover:bg-red-600/30 transition-all text-sm font-medium flex items-center justify-center space-x-1">
                                <span>✕</span>
                                <span>Cancel</span>
                            </button>
                            <button onClick={handleSave} className="bg-green-600/20 border border-green-500/50 text-green-400 py-2 px-4 rounded-lg hover:bg-green-600/30 transition-all text-sm font-medium flex items-center justify-center space-x-1">
                                <span>♥</span>
                                <span>Save</span>
                            </button>
                           
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className='my-30 ml-10  hidden lg:block my-30 ml-10'>

            <UserCard user={{firstName,lastName,photoUrl,age,gender,about,skills}} showButtons={false}   />
            </div>
        </div>
    )
}

export default EditProfile