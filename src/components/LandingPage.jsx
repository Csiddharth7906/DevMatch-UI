
import React, { useState, useEffect, useRef } from 'react';
import { Heart, Code2, Github, Linkedin, Twitter, ArrowRight, Play, Users, MessageCircle, Star, Zap, Coffee } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const DevMatchLanding = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const videoRef = useRef(null);
const navigate = useNavigate();
const handleLogin = () => {
    navigate('/login', { state: { isLogin: true } });
  };


  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

//
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Testimonial rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: Heart,
      title: "Smart Matching",
      description: "AI-powered algorithm matches developers based on skills, interests, and collaboration goals."
    },
    {
      icon: Code2,
      title: "Skill-Based Profiles",
      description: "Showcase your tech stack, projects, and coding preferences to find perfect collaborators."
    },
    {
      icon: Users,
      title: "Developer Community",
      description: "Connect with 5k+ developers worldwide for mentorship, projects, and friendships."
    },
    {
      icon: MessageCircle,
      title: "Seamless Chat",
      description: "Built-in messaging with code sharing, screen sharing, and project collaboration tools."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Full Stack Developer",
      company: "Google",
      text: "Found my perfect coding partner through DevMatch. We've built 3 successful projects together!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Alex Rivera",
      role: "DevOps Engineer", 
      company: "Netflix",
      text: "DevMatch helped me find an amazing mentor who guided my career to the next level.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      rating: 5
    },
    {
      name: "Maya Patel",
      role: "UI/UX Designer",
      company: "Airbnb", 
      text: "The best platform for finding creative collaborators. Love the developer community here!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      rating: 5
    }
  ];

  const stats = [
    { number: "5K+", label: "Active Developers" },
    { number: "1.2K+", label: "Successful Matches" },
    { number: "350+", label: "Projects Created" },
    { number: "94%", label: "Match Satisfaction" }
  ];

  const handleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="text-white text-6xl font-bold overflow-hidden">
              <div className="animate-pulse">
                DevMatch
              </div>
            </div>
            <div className="text-gray-400 text-lg">
              Connecting Developers
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-white text-sm">
              <span>{loadingProgress < 100 ? '00' : loadingProgress}</span>
              <span>- 100</span>
            </div>
            <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all duration-100"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Custom Cursor */}
      <div 
        className="fixed w-4 h-4 border-2 border-white bg-white mix-blend-difference rounded-full pointer-events-none z-50 transition-transform duration-100"
        style={{ 
          left: mousePosition.x - 8, 
          top: mousePosition.y - 8,
          transform: 'scale(2)'
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 backdrop-blur-sm bg-black/20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Heart className="text-pink-500" size={24} />
                <Code2 className="absolute -top-1 -right-1 text-blue-400" size={16} />
              </div>
              <h1 className="text-xl md:text-2xl font-bold">DevMatch</h1>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#features" className="text-sm hover:text-pink-400 transition-colors">Features</a>
              <a href="#pricing" className="text-sm hover:text-pink-400 transition-colors">Pricing</a>
              <a href="#how-it-works" className="text-sm hover:text-pink-400 transition-colors">How It Works</a>
            </div>

            <div className="flex items-center space-x-3 md:space-x-4">
              <button className="text-sm hover:text-pink-400 transition-colors hidden md:block" onClick={handleLogin}>Login</button>
              <button className="px-4 py-2 md:px-6 text-xs md:text-sm bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-medium hover:shadow-lg hover:shadow-pink-500/25 transition-all" onClick={handleLogin}>
                Join Now
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-blue-900/20" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 text-center">
          <div className="space-y-6 md:space-y-8">
            <div className="space-y-3 md:space-y-4">
              <div className="text-xs md:text-sm text-pink-400 font-medium tracking-wide">
                01 — THE FUTURE OF DEVELOPER NETWORKING
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none">
                <span className="block">Find Your</span>
                <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Code
                </span>
                <span className="block">Partner</span>
              </h1>
            </div>

            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              Swipe right on developers who share your passion. Build amazing projects, 
              find mentors, or discover your next co-founder in the world's first 
              developer dating platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 px-4">
              <button className="w-full sm:w-auto group px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-base md:text-lg font-semibold hover:shadow-xl hover:shadow-pink-500/25 transition-all">
                Start Matching
                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              
              <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border-2 border-gray-600 rounded-full text-base md:text-lg font-semibold hover:border-pink-400 hover:text-pink-400 transition-all">
                Watch Demo
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements - Hidden on mobile */}
        <div className="hidden lg:block absolute top-1/4 left-20 animate-bounce">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Heart className="text-white" size={24} />
          </div>
        </div>
        
        <div className="hidden lg:block absolute top-1/3 right-20 animate-bounce delay-1000">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center">
            <Code2 className="text-white" size={24} />
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="relative py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="relative">
            <div 
              className="relative aspect-video bg-gray-900 rounded-2xl md:rounded-3xl overflow-hidden cursor-pointer group"
              onClick={handleVideoPlay}
            >
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop"
                alt="DevMatch Demo"
                className="w-full h-full object-cover"
              />
              
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="text-white ml-1" size={24} />
                </div>
              </div>
              
              <video 
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-cover opacity-0"
                style={{ opacity: isVideoPlaying ? 1 : 0 }}
              >
                {/* Add your video source here */}
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="text-sm text-pink-400 font-medium tracking-wide mb-4">
              02 — FEATURES THAT MATTER
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Built For
              <br />
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Developers
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group p-8 bg-gray-900/50 rounded-2xl border border-gray-800 hover:border-pink-500/50 transition-all hover:transform hover:scale-105"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-pink-500/25 transition-all">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16 md:mb-20">
            <div className="text-xs md:text-sm text-pink-400 font-medium tracking-wide mb-4">
              03 — CHOOSE YOUR PLAN
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
              Find Your
              <br />
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Perfect Plan
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
              Choose the membership that fits your coding journey and networking goals
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Silver Plan */}
            <div className="relative p-8 bg-gray-900/50 rounded-2xl border border-gray-700 hover:border-gray-500 transition-all group">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-300 mb-2">Silver</h3>
                <div className="text-4xl font-bold text-white mb-4">
                  $9<span className="text-lg text-gray-400">/month</span>
                </div>
                <p className="text-gray-400">Perfect for getting started</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                  20 matches per day
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                  Basic profile customization
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                  Standard chat features
                </li>
                <li className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                  Community access
                </li>
              </ul>

              <button className="w-full py-3 bg-gray-700 hover:bg-gray-600 rounded-full font-semibold transition-all">
                Start Silver
              </button>
            </div>

            {/* Gold Plan - Popular */}
            <div className="relative p-8 bg-gradient-to-br from-yellow-900/20 to-orange-900/20 rounded-2xl border-2 border-yellow-500 group transform scale-105">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              </div>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Zap className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">Gold</h3>
                <div className="text-4xl font-bold text-white mb-4">
                  $19<span className="text-lg text-gray-400">/month</span>
                </div>
                <p className="text-gray-300">For serious collaborators</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-white">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  Unlimited matches
                </li>
                <li className="flex items-center text-white">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  Advanced profile features
                </li>
                <li className="flex items-center text-white">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  Priority matching algorithm
                </li>
                <li className="flex items-center text-white">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  Enhanced chat & video calls
                </li>
                <li className="flex items-center text-white">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></div>
                  Project collaboration tools
                </li>
              </ul>

              <button className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full font-semibold hover:shadow-lg hover:shadow-yellow-500/25 transition-all">
                Start Gold
              </button>
            </div>

            {/* Diamond Plan */}
            <div className="relative p-8 bg-gradient-to-br from-blue-900/20 to-purple-900/20 rounded-2xl border border-blue-500 hover:border-blue-400 transition-all group">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Coffee className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-blue-400 mb-2">Diamond</h3>
                <div className="text-4xl font-bold text-white mb-4">
                  $39<span className="text-lg text-gray-400">/month</span>
                </div>
                <p className="text-gray-300">For elite developers</p>
              </div>

              <ul className="space-y-4 mb-8">
                <li className="flex items-center text-white">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  Everything in Gold
                </li>
                <li className="flex items-center text-white">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  VIP profile badge
                </li>
                <li className="flex items-center text-white">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  Personal matchmaking
                </li>
                <li className="flex items-center text-white">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  Exclusive events access
                </li>
                <li className="flex items-center text-white">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  Premium support
                </li>
              </ul>

              <button className="w-full py-3 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all">
                Start Diamond
              </button>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-400 mb-4">All plans include a 7-day free trial</p>
            <p className="text-sm text-gray-500">Cancel anytime • No hidden fees • Secure payments</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-32 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16 md:mb-20">
            <div className="text-xs md:text-sm text-pink-400 font-medium tracking-wide mb-4">
              04 — HOW IT WORKS
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
              Simple As
              <br />
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                1-2-3
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl md:text-3xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">Create Profile</h3>
              <p className="text-gray-400 leading-relaxed">
                Set up your developer profile with skills, projects, and what you're looking for
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl md:text-3xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">Start Swiping</h3>
              <p className="text-gray-400 leading-relaxed">
                Browse through developer profiles and swipe right on those you'd like to connect with
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl md:text-3xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">Start Building</h3>
              <p className="text-gray-400 leading-relaxed">
                Match, chat, and start collaborating on amazing projects together
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-sm text-pink-400 font-medium tracking-wide mb-4">
            05 — JOIN THE REVOLUTION
          </div>
          <h2 className="text-6xl md:text-7xl font-bold mb-8">
            <span className="block">Ready To</span>
            <span className="block bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Match?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of developers who found their perfect coding companions. 
            Start your journey today with a 7-day free trial.
          </p>
          
          <button className="group px-12 py-6 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 rounded-full text-xl font-bold hover:shadow-2xl hover:shadow-pink-500/25 transition-all transform hover:scale-105">
            Start Matching Now
            <ArrowRight className="inline-block ml-3 group-hover:translate-x-2 transition-transform" size={24} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Heart className="text-pink-500" size={24} />
                <span className="text-xl font-bold">DevMatch</span>
              </div>
              <p className="text-gray-400 mb-6">
                The world's first developer dating platform. Find your code soulmate.
              </p>
              <div className="flex space-x-4">
                <Github className="text-gray-400 hover:text-white cursor-pointer" size={20} />
                <Twitter className="text-gray-400 hover:text-white cursor-pointer" size={20} />
                <Linkedin className="text-gray-400 hover:text-white cursor-pointer" size={20} />
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6">Product</h4>
              <div className="space-y-3">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Features</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">How It Works</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Pricing</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Success Stories</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6">Company</h4>
              <div className="space-y-3">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">About</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Careers</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Blog</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-6">Support</h4>
              <div className="space-y-3">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Help Center</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Safety</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Privacy</a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors">Terms</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400">
            <p>© 2024 DevMatch. All rights reserved. Made with ❤️ for developers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DevMatchLanding;