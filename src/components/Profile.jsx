import React, { useState } from 'react'
import EditProfile from './EditProfile'
import UserProfile from './UserProfile'
import GitHubSync from './GitHubSync'
import { useSelector } from 'react-redux';

const Profile = () => {
  const user = useSelector((state) => state.user);
  const [viewMode, setViewMode] = useState('view'); // 'view' or 'edit'
  
  if (!user) return null;

  if (viewMode === 'edit') {
    return (
      <div className="profile container min-h-screen flex items-center justify-center">
        <EditProfile user={user} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          {/* Simple Header with Edit Button */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <button 
              onClick={() => setViewMode('edit')} 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
            >
              ✏️ Edit Profile
            </button>
          </div>

          {/* Profile Section with DP, Info, Stats, Links */}
          <div className="bg-slate-800 rounded-xl p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <img 
                  src={user.photoUrl || '/api/placeholder/150/150'} 
                  alt={user.firstName} 
                  className="w-32 h-32 rounded-xl object-cover bg-slate-700" 
                />
              </div>
              
              {/* Info, Stats, Links */}
              <div className="flex-1 grid md:grid-cols-3 gap-6">
                {/* Basic Info */}
                <div>
                  <h2 className="text-2xl font-bold mb-2">{user.firstName} {user.lastName}</h2>
                  <p className="text-slate-300 mb-2">{user.location}</p>
                  <p className="text-slate-300 mb-4">{user.experience}</p>
                  <GitHubSync onSync={() => window.location.reload()} />
                </div>

                {/* Stats */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-blue-400">📊 Stats</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Projects</span>
                      <span className="font-semibold">{user.githubRepos?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Skills</span>
                      <span className="font-semibold">{user.skills?.length || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Member Since</span>
                      <span className="font-semibold">{new Date(user.createdAt).getFullYear()}</span>
                    </div>
                  </div>
                </div>

                {/* Links */}
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-semibold mb-3 text-blue-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
                    </svg>
                    Links
                  </h3>
                  <div className="space-y-2">
                    {user.github && (
                      <a href={user.github} target="_blank" rel="noopener noreferrer" 
                         className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                    {user.linkedin && (
                      <a href={user.linkedin} target="_blank" rel="noopener noreferrer" 
                         className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        LinkedIn
                      </a>
                    )}
                    {user.portfolio && (
                      <a href={user.portfolio} target="_blank" rel="noopener noreferrer" 
                         className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                        </svg>
                        Portfolio
                      </a>
                    )}
                    {user.instagram && (
                      <a href={user.instagram} target="_blank" rel="noopener noreferrer" 
                         className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        Instagram
                      </a>
                    )}
                    {user.twitter && (
                      <a href={user.twitter} target="_blank" rel="noopener noreferrer" 
                         className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                        </svg>
                        Twitter
                      </a>
                    )}
                    {user.youtube && (
                      <a href={user.youtube} target="_blank" rel="noopener noreferrer" 
                         className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                        YouTube
                      </a>
                    )}
                    {user.website && (
                      <a href={user.website} target="_blank" rel="noopener noreferrer" 
                         className="flex items-center gap-2 text-blue-400 hover:text-blue-300">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                        Website
                      </a>
                    )}
                    {!user.github && !user.linkedin && !user.portfolio && !user.instagram && !user.twitter && !user.youtube && !user.website && (
                      <p className="text-slate-400 text-sm">No links added</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="bg-slate-800 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">👋 About Me</h2>
            <p className="text-slate-300 leading-relaxed">
              {user.about || "No description available yet."}
            </p>
          </div>

          {/* Skills */}
          {user.skills?.length > 0 && (
            <div className="bg-slate-800 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">🛠️ Skills</h3>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill, i) => (
                  <span key={i} className="px-3 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-sm font-medium text-blue-300">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* GitHub Repositories */}
          {user.githubRepos?.length > 0 && (
            <div className="bg-slate-800 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-6">🚀 Featured Projects</h2>
              <div className="grid gap-4">
                {user.githubRepos.slice(0, 6).map((repo, i) => (
                  <a key={i} href={repo.url || `https://github.com/${user.github?.split('/').pop()}/${repo.name}`} target="_blank" rel="noopener noreferrer" className="bg-slate-700/50 rounded-xl p-4 border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] block">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-blue-400 text-lg hover:text-blue-300">
                        {repo.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span>⭐ {repo.stars || 0}</span>
                        <span>🍴 {repo.forks || 0}</span>
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm mb-3">
                      {repo.description || "No description available"}
                    </p>
                    <span className="px-3 py-1 bg-slate-600/50 rounded-full text-xs font-medium text-slate-300">
                      {repo.language || "Unknown"}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
  );
}

export default Profile