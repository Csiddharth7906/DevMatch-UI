import { useState, useEffect } from "react";
import axios from "axios";

const ExploreContent = () => {
  const [githubTrending, setGithubTrending] = useState([]);
  const [devArticles, setDevArticles] = useState([]);
  const [techNews, setTechNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // ===============================
  // Fetch all content
  // ===============================
  useEffect(() => {
    fetchAllContent();
  }, []);

  const fetchAllContent = async () => {
    setLoading(true);

    try {
      await Promise.all([
        fetchGithubTrending(),
        fetchDevArticles(),
        fetchHackerNews(),
      ]);
    } catch (error) {
      console.error("Error fetching content:", error);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // GitHub Trending
  // ===============================
  const fetchGithubTrending = async () => {
    try {
      const res = await axios.get("https://gh-trending-api.herokuapp.com/repositories");
      setGithubTrending(res.data.slice(0, 6));
    } catch (error) {
      console.error("GitHub trending error:", error);
      try {
        const fallback = await axios.get("https://api.github.com/search/repositories?q=stars:>1000&sort=stars&order=desc&per_page=6");
        setGithubTrending(fallback.data.items);
      } catch (err) {
        console.error("Fallback also failed:", err);
      }
    }
  };

  // ===============================
  // Dev.to Articles
  // ===============================
  const fetchDevArticles = async () => {
    try {
      const res = await axios.get(
        "https://dev.to/api/articles?per_page=6&top=7"
      );
      setDevArticles(res.data);
    } catch (error) {
      console.error("Dev.to error:", error);
    }
  };

  // ===============================
  // Hacker News
  // ===============================
  const fetchHackerNews = async () => {
    try {
      const topStories = await axios.get(
        "https://hacker-news.firebaseio.com/v0/topstories.json"
      );

      const stories = await Promise.all(
        topStories.data.slice(0, 6).map(async (id) => {
          const story = await axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json`
          );
          return story.data;
        })
      );

      setTechNews(stories);
    } catch (error) {
      console.error("Hacker News error:", error);
    }
  };

  // ===============================
  // Helper: Get color gradient for cards
  // ===============================
  const getGradient = (index) => {
    const gradients = [
      "from-blue-500/20 to-purple-500/20",
      "from-purple-500/20 to-pink-500/20",
      "from-pink-500/20 to-orange-500/20",
      "from-orange-500/20 to-yellow-500/20",
      "from-green-500/20 to-teal-500/20",
      "from-teal-500/20 to-blue-500/20",
    ];
    return gradients[index % gradients.length];
  };

  // ===============================
  // Helper: Get icon background gradient
  // ===============================
  const getIconGradient = (type) => {
    const gradients = {
      github: "from-purple-500 to-blue-600",
      dev: "from-pink-500 to-purple-600",
      news: "from-orange-500 to-red-600"
    };
    return gradients[type];
  };

  // ===============================
  // Loading
  // ===============================
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-white mt-4 text-center">Loading awesome content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 px-4 pb-12">

      {/* ===================================== */}
      {/* 🔥 GitHub Trending - CARD GRID */}
      {/* ===================================== */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className={`w-14 h-14 bg-gradient-to-br ${getIconGradient('github')} rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30`}>
            <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Trending on GitHub
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {githubTrending.map((repo, index) => (
            <a
              key={index}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative bg-gradient-to-br ${getGradient(index)} backdrop-blur-xl rounded-2xl border border-white/20 p-6 hover:scale-105 hover:border-white/40 transition-all duration-300 overflow-hidden`}
            >
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative z-10">
                {/* Repo avatar/icon */}
                <div className={`w-12 h-12 bg-gradient-to-br ${getIconGradient('github')} rounded-xl flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all`}>
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"/>
                  </svg>
                </div>

                <h3 className="text-white font-bold text-lg mb-2 line-clamp-1">
                  {repo.name}
                </h3>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2 min-h-[40px]">
                  {repo.description || "No description available"}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    {repo.stars || 0}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    {repo.forks || 0}
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ===================================== */}
      {/* 📰 Dev Articles - IMAGE CARDS */}
      {/* ===================================== */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className={`w-14 h-14 bg-gradient-to-br ${getIconGradient('dev')} rounded-2xl flex items-center justify-center shadow-lg shadow-pink-500/30`}>
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Latest Dev Articles
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {devArticles.map((article, index) => (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden hover:border-purple-500/50 hover:scale-105 transition-all duration-300"
            >
              {/* Article cover image */}
              <div className="relative h-48 bg-gradient-to-br from-purple-600/30 to-blue-600/30 overflow-hidden">
                {article.cover_image ? (
                  <img 
                    src={article.cover_image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-600/40 to-pink-600/40">
                    <svg className="w-16 h-16 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                )}
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                
                {/* Reading time badge */}
                <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-xs text-white">
                  {article.reading_time_minutes || 5} min read
                </div>
              </div>

              <div className="p-5">
                <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 group-hover:text-purple-400 transition">
                  {article.title}
                </h3>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {article.description}
                </p>

                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 bg-gradient-to-br ${getIconGradient('dev')} rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md`}>
                    {article.user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-sm flex-1">
                    <p className="text-gray-300 font-medium truncate">{article.user.name}</p>
                    <p className="text-gray-500 text-xs flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/>
                      </svg>
                      {article.public_reactions_count || 0}
                    </p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ===================================== */}
      {/* 📡 Hacker News - MODERN GRID */}
      {/* ===================================== */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <div className={`w-14 h-14 bg-gradient-to-br ${getIconGradient('news')} rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30`}>
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Tech News
          </h2>
        </div>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
          {techNews.map((story, index) => (
            <a
              key={story.id}
              href={
                story.url ||
                `https://news.ycombinator.com/item?id=${story.id}`
              }
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative bg-gradient-to-br ${getGradient(index)} backdrop-blur-xl rounded-2xl border border-white/20 p-5 md:p-6 hover:border-orange-500/50 hover:scale-105 transition-all duration-300 overflow-hidden`}
            >
              {/* Rank badge */}
              <div className="absolute top-4 left-4 w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                <span className="text-white font-bold text-sm">#{index + 1}</span>
              </div>

              <div className="relative z-10 pl-14">
                <h3 className="text-white font-bold text-base md:text-lg mb-3 line-clamp-2 group-hover:text-orange-300 transition leading-snug">
                  {story.title}
                </h3>

                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-400">
                  <span className="flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                    </svg>
                    <span className="truncate max-w-[100px]">{story.by}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-orange-400">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z"/>
                    </svg>
                    {story.score}
                  </span>
                  {story.descendants && (
                    <span className="flex items-center gap-1.5">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                      </svg>
                      {story.descendants}
                    </span>
                  )}
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </a>
          ))}
        </div>
      </section>

    </div>
  );
};

export default ExploreContent;