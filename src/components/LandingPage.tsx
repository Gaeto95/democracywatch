import React, { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Shield, Eye, AlertTriangle, Users, Zap, Globe, TrendingUp, Brain, Target, Crosshair } from 'lucide-react';
import LocationSearch from './LocationSearch';
import FeatureCard from './FeatureCard';
import StatsCounter from './StatsCounter';
import ParticlesBackground from './ParticlesBackground';

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
      <section className="relative overflow-hidden z-10 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900" onMouseMove={handleMouseMove}>
        {/* Animated Background Overlay */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
          <div 
            className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10"
            style={{
              animation: 'gradientShift 8s ease-in-out infinite alternate'
            }}
          ></div>
          <div 
            className="absolute inset-0 bg-gradient-to-tl from-purple-600/15 via-pink-600/15 to-red-600/15"
            style={{
              animation: 'gradientShift 12s ease-in-out infinite alternate-reverse'
            }}
          ></div>
        </div>
        
        {/* Particles.js Background */}
        <ParticlesBackground />
        
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
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
              className="mx-auto mb-8 w-24 h-24 bg-gradient-to-br from-blue-400 via-cyan-400 to-white rounded-2xl flex items-center justify-center shadow-2xl border border-white/30 backdrop-blur-sm"
            >
              <div className="relative">
                <Shield className="h-12 w-12 text-blue-900 drop-shadow-lg" />
                <motion.div
                  className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-300 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
            
            {/* Dynamic Title with Multiple Gradients */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <motion.span 
                className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-400 bg-clip-text text-transparent drop-shadow-2xl"
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
                className="bg-gradient-to-r from-orange-200 via-yellow-200 to-orange-300 bg-clip-text text-transparent drop-shadow-2xl"
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
              className="text-xl md:text-2xl text-white mb-8 max-w-4xl mx-auto leading-relaxed drop-shadow-lg bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span className="text-yellow-300 font-semibold">Multiple AI agents</span> working 24/7 to analyze corruption patterns in 
              <span className="text-white font-semibold"> any location</span>. 
              <br />
              <span className="text-orange-200 font-semibold">Decentralized intelligence</span> that governments can't control or silence.
            </motion.p>
            
            {/* AI Agents Visualization */}
            <motion.div
              className="flex justify-center space-x-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div
                className="flex items-center space-x-2 bg-black/30 px-4 py-2 rounded-full border border-yellow-400/60 backdrop-blur-sm"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0 }}
              >
                <Brain className="h-5 w-5 text-yellow-300" />
                <span className="text-white text-sm font-medium">Pattern Agent</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2 bg-black/30 px-4 py-2 rounded-full border border-orange-400/60 backdrop-blur-sm"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <Target className="h-5 w-5 text-orange-300" />
                <span className="text-white text-sm font-medium">Investigation Agent</span>
              </motion.div>
              <motion.div
                className="flex items-center space-x-2 bg-black/30 px-4 py-2 rounded-full border border-red-400/60 backdrop-blur-sm"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
              >
                <Crosshair className="h-5 w-5 text-red-300" />
                <span className="text-white text-sm font-medium">Tracking Agent</span>
              </motion.div>
            </motion.div>

            <LocationSearch onLocationSelect={handleLocationSelect} />
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-white mt-6 text-sm bg-black/40 backdrop-blur-sm rounded-lg px-4 py-2 border border-orange-400/30"
            >
              <span className="text-orange-400">⚡ Live AI agents</span> analyzing your government right now
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 bg-black/40 backdrop-blur-md border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Current Capabilities
            </h2>
            <p className="text-xl text-blue-100">
              What Democracy Watch can analyze today
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-black/20 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="text-3xl md:text-4xl font-bold text-cyan-300 mb-2 group-hover:scale-110 transition-transform duration-300">
                <span className="text-yellow-300">Any</span>
              </div>
              <div className="text-blue-100 text-sm font-medium">Country Analysis</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center group"
            >
              <div className="text-3xl md:text-4xl font-bold text-blue-200 mb-2 group-hover:scale-110 transition-transform duration-300">
                <span className="text-orange-300">Multi-Level</span>
              </div>
              <div className="text-blue-100 text-sm font-medium">Government Coverage</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center group"
            >
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                <span className="text-red-300">Deep</span>
              </div>
              <div className="text-blue-100 text-sm font-medium">AI Investigation</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-center group"
            >
              <div className="text-3xl md:text-4xl font-bold text-cyan-200 mb-2 group-hover:scale-110 transition-transform duration-300">
                <span className="text-yellow-200">Open</span>
              </div>
              <div className="text-blue-100 text-sm font-medium">Source Platform</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Hotspots */}
      <section className="relative z-10 py-16 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Example Analysis Targets
            </h2>
            <p className="text-xl text-blue-100">
              Countries where transparency analysis could be valuable
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
                className="p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-orange-400/30 hover:border-yellow-400/70 transition-all duration-200 group text-left"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white group-hover:text-yellow-300 transition-colors">
                    {hotspot.country}
                  </h3>
                  <TrendingUp className={`h-5 w-5 ${
                    hotspot.trend === 'up' ? 'text-red-400' :
                    hotspot.trend === 'down' ? 'text-green-400 transform rotate-180' : 'text-amber-400'
                  }`} />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-orange-200">Corruption Risk</span>
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
      <section className="relative z-10 py-24 bg-black/30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Democracy Intelligence
              <span className="block text-yellow-300">For Every Level</span>
            </h2>
            <p className="text-xl text-white max-w-3xl mx-auto bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
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
      <section className="relative z-10 py-24 bg-black/50 backdrop-blur-md border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              The Vision: Real Results, Real Impact
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-black/60 rounded-2xl p-8 border border-orange-400/30 backdrop-blur-sm"
              >
                <div className="text-3xl mb-4">🇺🇸</div>
                <h3 className="text-xl font-bold text-white mb-3">Multi-Agent Vision</h3>
                <p className="text-orange-100">
                  Multiple AI agents could work together to detect corruption patterns 
                  that single systems might miss.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-black/60 rounded-2xl p-8 border border-yellow-400/30 backdrop-blur-sm"
              >
                <div className="text-3xl mb-4">🇧🇷</div>
                <h3 className="text-xl font-bold text-white mb-3">Global Network</h3>
                <p className="text-yellow-100">
                  A decentralized network could monitor governments worldwide, 
                  resistant to interference or shutdown.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-black/60 rounded-2xl p-8 border border-red-400/30 backdrop-blur-sm"
              >
                <div className="text-3xl mb-4">🏛️</div>
                <h3 className="text-xl font-bold text-white mb-3">Behavioral Change</h3>
                <p className="text-red-100">
                  When governments know they're being watched by incorruptible AI, 
                  they might start thinking differently.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-24 bg-black/40 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Ready to Explore
              <span className="block text-yellow-300">AI-Powered Transparency?</span>
            </h2>
            <p className="text-xl text-white mb-12 bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
              Explore how AI could help citizens understand and monitor their governments.
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.querySelector('#location-search')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-12 py-4 rounded-xl text-lg font-semibold shadow-2xl hover:shadow-orange-400/25 transition-all duration-300 flex items-center space-x-3 mx-auto"
            >
              <Zap className="h-5 w-5" />
              <span>Try AI Analysis Now</span>
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;