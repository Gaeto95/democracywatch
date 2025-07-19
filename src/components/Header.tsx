import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Search } from 'lucide-react';

const Header = () => {
  const location = useLocation();
  
  return (
    <motion.header 
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Watchdog</h1>
              <p className="text-xs text-slate-400">Global Legislative Transparency</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/dashboard" 
              className={`text-sm font-medium transition-colors flex items-center space-x-2 ${
                location.pathname.includes('/dashboard') 
                  ? 'text-blue-400' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <AlertTriangle className="h-4 w-4" />
              <span>Government Analysis</span>
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs text-slate-400">Monitoring</p>
              <p className="text-sm font-semibold text-green-400">195 Countries</p>
            </div>
            <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
              <div className="h-2 w-2 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}

export default Header;