import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Users, Building, TrendingUp, AlertTriangle, FileText, Clock } from 'lucide-react';
import { StateData, CityData } from '../types/geographic';
import { geographicAnalysisService } from '../services/geographicAnalysis';

const StateDashboard = () => {
  const { country, state } = useParams();
  const navigate = useNavigate();
  const [stateData, setStateData] = useState<StateData | null>(null);
  const [cities, setCities] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadStateData = async () => {
      if (!country || !state) return;

      const countryName = country.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const stateName = state.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

      try {
        setLoading(true);
        
        if (import.meta.env.VITE_OPENAI_API_KEY) {
          const [stateAnalysis, citiesData] = await Promise.all([
            geographicAnalysisService.analyzeState(countryName, stateName),
            geographicAnalysisService.getCitiesForState(countryName, stateName)
          ]);
          setStateData(stateAnalysis);
          setCities(citiesData);
        } else {
          // Demo data
          const demoState = geographicAnalysisService.generateDemoStateData(countryName, stateName);
          setStateData(demoState);
          
          const demoCities: CityData[] = [
            geographicAnalysisService.generateDemoCityData(countryName, stateName, 'Capital City'),
            geographicAnalysisService.generateDemoCityData(countryName, stateName, 'Metro City'),
            geographicAnalysisService.generateDemoCityData(countryName, stateName, 'Port City')
          ];
          setCities(demoCities);
        }
      } catch (err) {
        console.error('State analysis error:', err);
        setError('Failed to load state analysis');
      } finally {
        setLoading(false);
      }
    };

    loadStateData();
  }, [country, state]);

  const handleCityClick = (city: CityData) => {
    navigate(`/dashboard/${country}/${state}/${city.name.toLowerCase().replace(/\s+/g, '-')}`);
  };

  const getRiskColor = (risk: number) => {
    if (risk > 70) return 'text-red-400';
    if (risk > 40) return 'text-amber-400';
    return 'text-green-400';
  };

  const getRiskLevel = (risk: number) => {
    if (risk > 70) return 'High';
    if (risk > 40) return 'Medium';
    return 'Low';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Analyzing State Government</h2>
          <p className="text-slate-400">Loading comprehensive state analysis...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !stateData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Analysis Failed</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to {country?.replace(/-/g, ' ')}</span>
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {stateData.name} Government Analysis
            </h1>
            <div className="flex items-center space-x-4 text-slate-400">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{stateData.country}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>{stateData.population} residents</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4" />
                <span>{stateData.governmentLevel}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getRiskColor(stateData.corruptionRisk)}`}>
              {getRiskLevel(stateData.corruptionRisk)} Risk
            </div>
            <div className="text-sm text-slate-400">
              Score: {stateData.corruptionRisk}/100
            </div>
          </div>
        </div>
      </div>

      {/* State Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
          >
            <h2 className="text-xl font-bold text-white mb-4">State Government Overview</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-white mb-2">Leadership</h3>
                  <div className="space-y-1 text-sm">
                    <div className="text-slate-300">
                      <strong>Governor:</strong> {stateData.governor}
                    </div>
                    <div className="text-slate-300">
                      <strong>Legislature:</strong> {stateData.legislature}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-white mb-2">Key Statistics</h3>
                  <div className="space-y-1 text-sm">
                    <div className="text-slate-300">
                      <strong>Population:</strong> {stateData.population}
                    </div>
                    <div className="text-slate-300">
                      <strong>Major Cities:</strong> {stateData.majorCities.length}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Key Issues</h3>
                <div className="flex flex-wrap gap-2">
                  {stateData.keyIssues.map((issue, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm"
                    >
                      {issue}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-2">Recent Activity</h3>
                <div className="space-y-2">
                  {stateData.recentActivity.map((activity, index) => (
                    <div key={index} className="p-3 bg-slate-700/40 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-blue-400" />
                        <span className="text-slate-300 text-sm">{activity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-lg font-bold text-white mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Corruption Risk</span>
                <span className={`font-semibold ${getRiskColor(stateData.corruptionRisk)}`}>
                  {stateData.corruptionRisk}/100
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Major Cities</span>
                <span className="text-white font-semibold">{stateData.majorCities.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Population</span>
                <span className="text-white font-semibold">{stateData.population}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Government Level</span>
                <span className="text-white font-semibold capitalize">{stateData.governmentLevel}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Major Cities */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
      >
        <h2 className="text-xl font-bold text-white mb-6">Major Cities</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, index) => (
            <motion.button
              key={city.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              onClick={() => handleCityClick(city)}
              className="p-4 bg-slate-700/40 rounded-lg hover:bg-slate-700/60 transition-all duration-200 text-left group border border-slate-600 hover:border-slate-500"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {city.name}
                  </h3>
                  <p className="text-slate-400 text-sm">{city.population} residents</p>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getRiskColor(city.corruptionRisk)}`}>
                    {city.corruptionRisk}
                  </div>
                  <div className="text-xs text-slate-400">Risk</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-slate-300">
                  <Building className="h-3 w-3" />
                  <span>Budget: {city.budgetSize}</span>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {city.keyIssues.slice(0, 2).map((issue, issueIndex) => (
                    <span
                      key={issueIndex}
                      className="px-2 py-1 bg-slate-600/40 text-slate-300 rounded text-xs"
                    >
                      {issue}
                    </span>
                  ))}
                </div>

                <div className="text-xs text-slate-400">
                  Industries: {city.majorIndustries.join(', ')}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {!import.meta.env.VITE_OPENAI_API_KEY && (
        <div className="mt-6 p-4 bg-amber-900/20 border border-amber-600/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span className="text-amber-300 text-sm">
              Demo Mode: Add OpenAI API key for real-time state government analysis
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default StateDashboard;