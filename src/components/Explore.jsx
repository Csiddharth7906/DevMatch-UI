import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExploreContent from "./ExploreContent"; // ← ADD THIS IMPORT

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const res = await axios.get(
        BASE_URL + `/user/search?name=${searchQuery}`,
        {
          withCredentials: true,
        }
      );
      setSearchResults(res?.data?.data || []);
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewProfile = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Explore Developers</h1>
          <p className="text-gray-400">Search and connect with developers worldwide</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search by name..."
              className="w-full bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl text-white px-6 py-4 rounded-xl outline-none border border-white/20 focus:border-blue-500 transition-all placeholder-gray-400"
            />
            <button
              onClick={handleSearch}
              className="absolute right-2 top-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold transition-all"
            >
              Search
            </button>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-20">
            <div className="text-white text-lg">Searching...</div>
          </div>
        )}

        {/* No Results */}
        {hasSearched && !isLoading && searchResults.length === 0 && (
          <div className="flex justify-center py-20">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-500/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No users found</h3>
              <p className="text-gray-400">Try searching with a different name</p>
            </div>
          </div>
        )}

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="space-y-4 mb-12">
            {searchResults.map((user) => (
              <div
                key={user._id}
                className="bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl overflow-hidden hover:border-white/40 transition-all"
              >
                <div className="p-6">
                  <div className="flex items-start gap-6">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={user.photoUrl || "/default-avatar.png"}
                        alt={user.firstName}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white/20"
                      />
                    </div>

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <h2 className="text-2xl font-bold text-white mb-1">
                        {user.firstName} {user.lastName}
                      </h2>
                      
                      <div className="flex flex-wrap gap-4 text-sm text-gray-300 mb-3">
                        {user.age && (
                          <span className="flex items-center gap-1">
                            <span>🎂</span> {user.age} years
                          </span>
                        )}
                        {user.gender && (
                          <span className="flex items-center gap-1">
                            <span>👤</span> {user.gender}
                          </span>
                        )}
                      </div>

                      {user.about && (
                        <p className="text-gray-400 line-clamp-2 mb-4">
                          {user.about}
                        </p>
                      )}

                      {/* Skills */}
                      {user.skills && user.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {user.skills.slice(0, 5).map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
                            >
                              {skill}
                            </span>
                          ))}
                          {user.skills.length > 5 && (
                            <span className="px-3 py-1 text-gray-400 text-sm">
                              +{user.skills.length - 5} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="flex-shrink-0">
                      <button 
                        onClick={() => handleViewProfile(user._id)}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-all shadow-lg"
                      >
                        View Profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Divider - only show if there are search results */}
        {searchResults.length > 0 && (
          <div className="border-t border-white/10 my-12"></div>
        )}

        {/* ExploreContent - GitHub, Dev.to, Hacker News */}
        {!hasSearched && <ExploreContent />}  {/* ← ADD THIS LINE */}
        
      </div>
    </div>
  );
};

export default Explore;