import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Loader, AlertCircle, Building, Globe } from 'lucide-react';
import { openaiService, LocationSearchResult } from '../services/openai';

interface LocationSearchProps {
  onLocationSelect: (location: string) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [suggestions, setSuggestions] = useState<LocationSearchResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  const popularLocations = [
    { name: '🇺🇸 United States', searchTerm: 'United States', level: 'country' },
    { name: '🇧🇷 Brazil', searchTerm: 'Brazil', level: 'country' },
    { name: '🇷🇸 Serbia', searchTerm: 'Serbia', level: 'country' },
    { name: '🇳🇬 Nigeria', searchTerm: 'Nigeria', level: 'country' },
    { name: '🇮🇳 India', searchTerm: 'India', level: 'country' },
    { name: '🇵🇭 Philippines', searchTerm: 'Philippines', level: 'country' },
    { name: '🏛️ California', searchTerm: 'California', level: 'state' },
    { name: '🏛️ Texas', searchTerm: 'Texas', level: 'state' },
    { name: '🏙️ New York City', searchTerm: 'New York City', level: 'city' },
    { name: '🏙️ Los Angeles', searchTerm: 'Los Angeles', level: 'city' },
    { name: '🏙️ London', searchTerm: 'London', level: 'city' },
    { name: '🏙️ São Paulo', searchTerm: 'São Paulo', level: 'city' }
  ];

  const handleInputChange = async (value: string) => {
    setQuery(value);
    setError(null);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    // Debounce the search
    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await openaiService.searchLocations(value);
        setSuggestions(results);
      } catch (err) {
        console.error('Search error:', err);
        setError('Search temporarily unavailable. Please try a popular location below.');
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 500);
  };

  const handleLocationClick = (location: string) => {
    setQuery(location);
    setSuggestions([]);
    onLocationSelect(location);
  };

  const getLocationIcon = (level: string) => {
    switch (level) {
      case 'country': return Globe;
      case 'state': return Building;
      case 'city': return MapPin;
      default: return MapPin;
    }
  };

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div id="location-search" className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative"
      >
        <div className="relative">
          <Search className="absolute left-4 top-4 h-6 w-6 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Enter any country, state, or city..."
            className="w-full pl-12 pr-4 py-4 bg-slate-800/80 backdrop-blur-md border-2 border-slate-600 rounded-2xl text-white placeholder-slate-400 text-lg focus:border-blue-500 focus:outline-none transition-all duration-300"
          />
          {isSearching && (
            <div className="absolute right-4 top-4">
              <Loader className="h-6 w-6 text-blue-400 animate-spin" />
            </div>
          )}
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 p-3 bg-amber-900/20 border border-amber-600/20 rounded-lg flex items-center space-x-2"
          >
            <AlertCircle className="h-4 w-4 text-amber-400" />
            <span className="text-amber-300 text-sm">{error}</span>
          </motion.div>
        )}

        <AnimatePresence>
          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full mt-2 w-full bg-slate-800/95 backdrop-blur-md rounded-xl border border-slate-600 overflow-hidden z-10 max-h-80 overflow-y-auto"
            >
              {suggestions.map((location, index) => {
                const LocationIcon = getLocationIcon(location.governmentLevel);
                
                return (
                  <motion.button
                    key={`${location.country}-${location.name}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => handleLocationClick(location.name)}
                    className="w-full px-4 py-3 text-left text-white hover:bg-slate-700 transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{location.flag}</span>
                      <div>
                        <div className="font-medium">{location.name}</div>
                        {location.region && (
                          <div className="text-sm text-slate-400">{location.region}</div>
                        )}
                        <div className="text-xs text-slate-500 capitalize flex items-center space-x-1">
                          <LocationIcon className="h-3 w-3" />
                          <span>{location.governmentLevel} government</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-xs text-slate-400">
                        {Math.round(location.confidence * 100)}% match
                      </div>
                      <MapPin className="h-4 w-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Popular Locations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <p className="text-slate-400 text-sm mb-4 text-center">
          {suggestions.length === 0 && !isSearching ? 'Popular locations:' : 'Or try these popular locations:'}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {popularLocations.slice(0, 12).map((location, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + index * 0.05 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleLocationClick(location.searchTerm)}
              className="px-4 py-2 bg-slate-700/60 hover:bg-slate-600/60 text-slate-300 hover:text-white rounded-lg text-sm transition-all duration-200 border border-slate-600"
            >
              {location.name}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Enhanced Features Notice */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="mt-6 p-4 bg-blue-900/20 border border-blue-600/20 rounded-lg"
      >
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-400 mb-1">Multi-Level Government Analysis</h4>
            <p className="text-slate-300 text-sm">
              Democracy Watch now monitors governments at every level - from federal legislation 
              to city council meetings. Search for any country, state, or city to get started.
              {!import.meta.env.VITE_OPENAI_API_KEY && ' Add your OpenAI API key for enhanced search capabilities.'}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LocationSearch;