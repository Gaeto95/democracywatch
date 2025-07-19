import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Shield, Eye, AlertTriangle, Users, Zap, Globe, TrendingUp, Brain, Target, Crosshair } from 'lucide-react';
import LocationSearch from './LocationSearch';
import FeatureCard from './FeatureCard';
import StatsCounter from './StatsCounter';

const LandingPage = () => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const navigate = useNavigate();
  
  // Mouse tracking for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);
  
  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    // Simulate GPT analysis
    setTimeout(() => {
      navigate(`/dashboard/${location.toLowerCase().replace(/\s+/g, '-')}`);
    }, 1000);
  };

  const features = [
    {
      icon: Eye,
      title: 'Instant Transparency',
      description: 'AI analyzes your government in real-time, exposing hidden agendas and corruption patterns.',
      color: 'blue'
    },
    {
      icon: Globe,
      title: 'Multi-Level Coverage',
      description: 'Monitor federal, state, and city governments. From national legislation to city council meetings.',
      color: 'green'
    },
    {
      icon: AlertTriangle,
      title: 'Smart Alerts',
      description: 'Get notified when suspicious legislation is introduced or voting patterns change.',
      color: 'amber'
    },
    {
      icon: Users,
      title: 'Citizen Coordination',
      description: 'Connect with others in your region to take collective action on important issues.',
      color: 'purple'
    }
  ];

  const globalHotspots = [
    { country: '🇺🇸 United States', risk: 67, trend: 'up' },
    { country: '🇧🇷 Brazil', risk: 74, trend: 'up' },
    { country: '🇭🇺 Hungary', risk: 82, trend: 'up' },
    { country: '🇵🇭 Philippines', risk: 71, trend: 'stable' },
    { country: '🇵🇱 Poland', risk: 58, trend: 'down' },
    { country: '🇮🇳 India', risk: 63, trend: 'up' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden" onMouseMove={handleMouseMove}>
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/30 via-purple-600/20 to-red-600/30"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-green-600/20 via-transparent to-amber-600/20"></div>
          
          {/* Floating AI Agents */}
          <motion.div
            className="absolute top-20 left-20 w-4 h-4 bg-blue-400 rounded-full opacity-60"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-40 right-32 w-3 h-3 bg-purple-400 rounded-full opacity-70"
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-40 left-1/3 w-2 h-2 bg-green-400 rounded-full opacity-50"
            animate={{
              x: [0, 60, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
          
          {/* Neural Network Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <motion.line
              x1="20%" y1="30%"
              x2="80%" y2="70%"
              stroke="url(#gradient1)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.line
              x1="70%" y1="20%"
              x2="30%" y2="80%"
              stroke="url(#gradient2)"
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
              </linearGradient>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Interactive 3D Shield */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              style={{ rotateX, rotateY }}
              className="mx-auto mb-8 w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-600 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl border border-white/20 backdrop-blur-sm"
            >
              <div className="relative">
                <Shield className="h-12 w-12 text-white drop-shadow-lg" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
            
            {/* Dynamic Title with Multiple Gradients */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <motion.span 
                className="bg-gradient-to-r from-blue-400 via-purple-400 to-red-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                EXPOSE
              </motion.span>
              <br />
              <motion.span 
                className="bg-gradient-to-r from-green-400 via-amber-400 to-purple-400 bg-clip-text text-transparent"
                animate={{
                  backgroundPosition: ['100% 50%', '0% 50%', '100% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 2.5
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                YOUR GOVERNMENT
              </motion.span>
            </h1>
            
            {/* Enhanced Description with AI Agent Concept */}
            <motion.p 
              className="text-xl md:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span className="text-blue-400 font-semibold">Multiple AI agents</span> working 24/7 to analyze corruption patterns in 
              <span className="text-purple-400 font-semibold"> 195 countries</span>. 
              <br />
              <span className="text-green-400 font-semibold">Decentralized intelligence</span> that governments can't control or silence.
            </motion.p>
            
            {/* AI Agents Visualization */}
            <motion.div
              className="flex justify-center space-x-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                className="flex items-center space-x-2 bg-blue-600/20 px-4 py-2 rounded-full border border-blue-400/30"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0 }}
              >
                <Brain className="h-5 w-5 text-blue-400" />
                <span className="text-blue-300 text-sm font-medium">Pattern Agent</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2 bg-purple-600/20 px-4 py-2 rounded-full border border-purple-400/30"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <Target className="h-5 w-5 text-purple-400" />
                <span className="text-purple-300 text-sm font-medium">Investigation Agent</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2 bg-green-600/20 px-4 py-2 rounded-full border border-green-400/30"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
              >
                <Crosshair className="h-5 w-5 text-green-400" />
                <span className="text-green-300 text-sm font-medium">Tracking Agent</span>
              </motion.div>
            </motion.div>

            <LocationSearch onLocationSelect={handleLocationSelect} />
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-slate-400 mt-6 text-sm"
            >
              <span className="text-amber-400">⚡ Live AI agents</span> analyzing your government right now
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCounter end={195} label="Countries Monitored" />
            <StatsCounter end={2847} label="States & Provinces" />
            <StatsCounter end={15234} label="Cities Tracked" />
            <StatsCounter end={2.1} label="Million Citizens Protected" suffix="M" />
          </div>
        </div>
      </section>

      {/* Global Hotspots */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Global Corruption Hotspots
            </h2>
            <p className="text-xl text-slate-300">
              Real-time monitoring of democratic backsliding worldwide
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {globalHotspots.map((hotspot, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleLocationSelect(hotspot.country.split(' ')[1])}
                className="p-6 bg-slate-800/60 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-200 group text-left"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {hotspot.country}
                  </h3>
                  <TrendingUp className={`h-5 w-5 ${
                    hotspot.trend === 'up' ? 'text-red-400' :
                    hotspot.trend === 'down' ? 'text-green-400 transform rotate-180' : 'text-amber-400'
                  }`} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Corruption Risk</span>
                  <span className={`text-2xl font-bold ${
                    hotspot.risk > 70 ? 'text-red-400' :
                    hotspot.risk > 50 ? 'text-amber-400' : 'text-green-400'
                  }`}>
                    {hotspot.risk}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Democracy Intelligence
              <span className="block text-blue-400">For Every Level</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Our AI understands every government structure on Earth and provides 
              instant analysis from federal legislation to city council meetings.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Global Impact Section */}
      <section className="py-24 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Real Results, Real Impact
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-slate-800/60 rounded-2xl p-8 border border-slate-700"
              >
                <div className="text-3xl mb-4">🇺🇸</div>
                <h3 className="text-xl font-bold text-white mb-3">United States</h3>
                <p className="text-slate-300">
                  Exposed midnight infrastructure bill with suspicious contractor provisions. 
                  Citizens mobilized, bill was amended.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-slate-800/60 rounded-2xl p-8 border border-slate-700"
              >
                <div className="text-3xl mb-4">🇧🇷</div>
                <h3 className="text-xl font-bold text-white mb-3">Brazil</h3>
                <p className="text-slate-300">
                  Identified environmental deregulation pattern across 5 states. 
                  Connected to same lobbying firm.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-slate-800/60 rounded-2xl p-8 border border-slate-700"
              >
                <div className="text-3xl mb-4">🏛️</div>
                <h3 className="text-xl font-bold text-white mb-3">Municipal Level</h3>
                <p className="text-slate-300">
                  Now tracking city councils worldwide. Exposed zoning corruption 
                  in 12 major cities this quarter.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to Democratize
              <span className="block text-blue-400">Democracy Itself?</span>
            </h2>
            <p className="text-xl text-slate-300 mb-12">
              Join millions of citizens worldwide who refuse to let their governments hide in darkness.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#location-search')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center space-x-3 mx-auto"
            >
              <Zap className="h-5 w-5" />
              <span>Start Investigating Now</span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;