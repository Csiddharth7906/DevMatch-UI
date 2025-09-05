
import React, { useState, useEffect, useRef } from 'react';
import { Heart, Code2, Github, Linkedin, Twitter, ArrowRight, Users, MessageCircle, Star, Rocket, Terminal, GitBranch } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DevMatchLanding = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const statsRef = useRef(null);
const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login', { state: { isLogin: true } });
  };

  const handleGetStarted = () => {
    navigate('/login');
  };


  useEffect(() => {
    const timer = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoading(false);
            // Initialize GSAP animations after loading
            initAnimations();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  const initAnimations = () => {
    // Wait for DOM to be ready
    gsap.set('*', { visibility: 'visible' });
    
    // Hero animations with existence check
    if (document.querySelector('.hero-title')) {
      gsap.fromTo('.hero-title', 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', stagger: 0.15 }
      );
    }
    
    if (document.querySelector('.hero-subtitle')) {
      gsap.fromTo('.hero-subtitle', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: 'power3.out' }
      );
    }
    
    if (document.querySelector('.hero-buttons')) {
      gsap.fromTo('.hero-buttons', 
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.6, ease: 'power3.out' }
      );
    }

    // Floating elements subtle animation
    if (document.querySelector('.floating-element')) {
      gsap.to('.floating-element', {
        y: -15,
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'power2.inOut',
        stagger: 0.8
      });
    }

    // Section headers scroll animation
    if (document.querySelector('.section-header')) {
      gsap.fromTo('.section-header', 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.section-header',
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Features staggered animation
    if (document.querySelector('.feature-card') && document.querySelector('.features-section')) {
      gsap.fromTo('.feature-card', 
        { y: 60, opacity: 0, scale: 0.95 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.features-section',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Community cards animation
    if (document.querySelector('.community-card') && document.querySelector('#community')) {
      gsap.fromTo('.community-card', 
        { y: 40, opacity: 0 },
        { 
          y: 0, 
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '#community',
            start: 'top 75%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // How it works steps animation
    if (document.querySelector('.step-card') && document.querySelector('#how-it-works')) {
      gsap.fromTo('.step-card', 
        { y: 50, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: 'back.out(1.7)',
          stagger: 0.2,
          scrollTrigger: {
            trigger: '#how-it-works',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }

    // Stats counter animation
    if (document.querySelector('.stat-number') && document.querySelector('.stats-section')) {
      gsap.fromTo('.stat-number', 
        { textContent: 0 },
        { 
          textContent: (i, target) => target.getAttribute('data-count'),
          duration: 2,
          ease: 'power2.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: '.stats-section',
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    // Parallax effect for floating elements
    if (document.querySelector('.floating-element')) {
      gsap.to('.floating-element', {
        yPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: 'body',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  };

  // Initialize animations after component mounts
  useEffect(() => {
    if (!isLoading) {
      initAnimations();
    }
  }, [isLoading]);

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
      description: "Find developers who complement your skills and share your passion for coding.",
      gradient: "from-pink-500 to-red-500"
    },
    {
      icon: Code2,
      title: "Tech Stack Profiles",
      description: "Showcase your programming languages, frameworks, and project experience.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Developer Network",
      description: "Connect with like-minded developers for collaboration and knowledge sharing.",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: Terminal,
      title: "Project Collaboration",
      description: "Find teammates for hackathons, open source projects, and startup ideas.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: GitBranch,
      title: "Code Reviews",
      description: "Get feedback on your code and help others improve their programming skills.",
      gradient: "from-orange-500 to-yellow-500"
    },
    {
      icon: Rocket,
      title: "Career Growth",
      description: "Find mentors, mentees, and peers to accelerate your development journey.",
      gradient: "from-violet-500 to-purple-500"
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
    { number: "500", label: "Real Users", suffix: "+" },
    { number: "100", label: "LinkedIn Impressions", suffix: "K+" },
    { number: "50", label: "Active Connections", suffix: "+" },
    { number: "98", label: "User Satisfaction", suffix: "%" }
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
              <a href="#community" className="text-sm hover:text-pink-400 transition-colors">Community</a>
              <a href="#how-it-works" className="text-sm hover:text-pink-400 transition-colors">How It Works</a>
            </div>

            <div className="flex items-center space-x-3 md:space-x-4">
              <button className="text-sm hover:text-pink-400 transition-colors hidden md:block" onClick={handleLogin}>Login</button>
              <button className="px-4 py-2 md:px-6 text-xs md:text-sm bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-medium hover:shadow-lg hover:shadow-pink-500/25 transition-all" onClick={handleGetStarted}>
                Get Started
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
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block hero-title">Connect</span>
                <span className="block hero-title text-pink-400">
                  Code
                </span>
                <span className="block hero-title">Collaborate</span>
              </h1>
            </div>

            <p className="hero-subtitle text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed px-4">
              The social network for developers. Connect with like-minded programmers, 
              collaborate on projects, share knowledge, and build the future together.
            </p>

            <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 px-4">
              <button 
                onClick={handleGetStarted}
                className="w-full sm:w-auto group px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-base md:text-lg font-semibold hover:shadow-xl hover:shadow-pink-500/25 transition-all"
              >
                Join DevMatch
                <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </button>
              
              <button className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 border-2 border-gray-600 rounded-full text-base md:text-lg font-semibold hover:border-pink-400 hover:text-pink-400 transition-all">
                Explore Features
              </button>
            </div>
          </div>
        </div>

        {/* Floating Code Elements */}
        <div className="hidden lg:block absolute top-1/4 left-20 floating-element">
          <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Heart className="text-white" size={24} />
          </div>
        </div>
        
        <div className="hidden lg:block absolute top-1/3 right-20 floating-element">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Code2 className="text-white" size={24} />
          </div>
        </div>
        
        <div className="hidden lg:block absolute bottom-1/4 left-32 floating-element">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Terminal className="text-white" size={18} />
          </div>
        </div>
        
        <div className="hidden lg:block absolute bottom-1/3 right-32 floating-element">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg">
            <GitBranch className="text-white" size={18} />
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="stats-section py-20 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join the Growing <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">Developer Community</span>
            </h2>
            <p className="text-gray-400 text-lg">Trusted by developers worldwide</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                  <span className="stat-number" data-count={stat.number}>0</span>{stat.suffix}
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
      <section id="features" className="features-section py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-header text-center mb-20">
            <div className="text-sm text-pink-400 font-medium tracking-wide mb-4">
              02 — POWERFUL FEATURES
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
              Everything You Need
              <br />
              <span className="text-pink-400">
                To Connect
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Discover, connect, and collaborate with developers who share your passion for coding
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="feature-card group p-8 bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-800 hover:border-pink-500/50 transition-all hover:transform hover:scale-105"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-pink-500/25 transition-all`}>
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="py-32 bg-gradient-to-br from-gray-900/50 to-black/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="section-header text-center mb-20">
            <div className="text-sm text-pink-400 font-medium tracking-wide mb-4">
              03 — DEVELOPER COMMUNITY
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
              Built By Developers
              <br />
              <span className="text-pink-400">
                For Developers
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Join a thriving community where code meets collaboration. No premium barriers, just pure developer networking.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="community-card text-center p-8 bg-gray-800/30 rounded-2xl border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Open Source Spirit</h3>
              <p className="text-gray-400">Free to use, built with transparency and community feedback at its core.</p>
            </div>

            <div className="community-card text-center p-8 bg-gray-800/30 rounded-2xl border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Code2 className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Skill-First Matching</h3>
              <p className="text-gray-400">Connect based on technical skills, project interests, and coding philosophy.</p>
            </div>

            <div className="community-card text-center p-8 bg-gray-800/30 rounded-2xl border border-gray-700 hover:border-gray-600 transition-colors">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Genuine Connections</h3>
              <p className="text-gray-400">Focus on meaningful relationships and collaborative opportunities.</p>
            </div>
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">
              Simple As
              <br />
              <span className="text-pink-400">
                Code, Connect, Create
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="step-card text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Code2 className="text-white" size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">Showcase Your Code</h3>
              <p className="text-gray-400 leading-relaxed">
                Create a profile highlighting your tech stack, GitHub projects, and development interests
              </p>
            </div>

            <div className="step-card text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">Discover Developers</h3>
              <p className="text-gray-400 leading-relaxed">
                Browse profiles of developers with complementary skills and shared interests
              </p>
            </div>

            <div className="step-card text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Rocket className="text-white" size={32} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4">Build Together</h3>
              <p className="text-gray-400 leading-relaxed">
                Connect, collaborate, and create amazing projects with your new developer network
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="text-sm text-pink-400 font-medium tracking-wide mb-4">
            05 — JOIN THE COMMUNITY
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            <span className="block">Ready To</span>
            <span className="block text-pink-400">
              Connect?
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of developers building the future together. 
            Start connecting with your coding community today - completely free.
          </p>
          
          <button 
            onClick={handleGetStarted}
            className="group px-12 py-6 bg-gradient-to-r from-pink-500 via-purple-600 to-blue-600 rounded-full text-xl font-bold hover:shadow-2xl hover:shadow-pink-500/25 transition-all transform hover:scale-105"
          >
            Join DevMatch Now
            <ArrowRight className="inline-block ml-3 group-hover:translate-x-2 transition-transform" size={24} />
          </button>
          
          <p className="text-gray-500 text-sm mt-6">
            Free forever • No premium tiers • Built by developers, for developers
          </p>
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
