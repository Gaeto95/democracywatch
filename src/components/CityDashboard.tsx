import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MapPin, Users, Building, DollarSign, AlertTriangle, FileText, Calendar, Clock, TrendingUp, Eye, Search } from 'lucide-react';
import { CityData, LocalActivity, LocalPolicy } from '../types/geographic';
import { geographicAnalysisService } from '../services/geographicAnalysis';
import { deepDiveService, DeepDiveResult } from '../services/deepDiveService';
import DeepDiveResults from './DeepDiveResults';
import DeepDivePrompts from './DeepDivePrompts';

const CityDashboard = () => {
  const { country, state, city } = useParams();
  const navigate = useNavigate();
  const [cityData, setCityData] = useState<CityData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deepDiveResult, setDeepDiveResult] = useState<DeepDiveResult | null>(null);
  const [deepDiveLoading, setDeepDiveLoading] = useState(false);
  const [showDeepDive, setShowDeepDive] = useState(false);

  useEffect(() => {
    const loadCityData = async () => {
      if (!country || !state || !city) return;

      const countryName = country.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const stateName = state.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      const cityName = city.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

      try {
        setLoading(true);
        
        if (import.meta.env.VITE_OPENAI_API_KEY) {
          const analysis = await geographicAnalysisService.analyzeCity(countryName, stateName, cityName);
          setCityData(analysis);
        } else {
          // Enhanced demo data
          const demoCity = geographicAnalysisService.generateDemoCityData(countryName, stateName, cityName);
          setCityData(demoCity);
        }
      } catch (err) {
        console.error('City analysis error:', err);
        setError('Failed to load city analysis');
      } finally {
        setLoading(false);
      }
    };

    loadCityData();
  }, [country, state, city]);

  const handleDeepDive = async (topic: string) => {
    if (!cityData) return;

    setDeepDiveLoading(true);
    try {
      if (import.meta.env.VITE_OPENAI_API_KEY) {
        const result = await deepDiveService.conductDeepDive(
          cityData.name,
          topic,
          'city',
          deepDiveResult?.analysis
        );
        setDeepDiveResult(result);
      } else {
        // Demo deep dive result
        const demoResult = deepDiveService.generateDemoDeepDive(cityData.name, topic);
        setDeepDiveResult(demoResult);
      }
      setShowDeepDive(true);
    } catch (err) {
      console.error('Deep dive error:', err);
    } finally {
      setDeepDiveLoading(false);
    }
  };

  const handleActivityDeepDive = (activity: LocalActivity) => {
    handleDeepDive(`${activity.type} activity: ${activity.title}`);
  };

  const handlePolicyDeepDive = (policy: LocalPolicy) => {
    handleDeepDive(`Municipal policy: ${policy.title}`);
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'zoning': return Building;
      case 'budget': return DollarSign;
      case 'contract': return FileText;
      case 'ordinance': return FileText;
      case 'permit': return FileText;
      case 'meeting': return Users;
      default: return FileText;
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
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
          <h2 className="text-2xl font-bold text-white mb-2">Analyzing Municipal Government</h2>
          <p className="text-slate-400">Loading comprehensive city analysis...</p>
        </motion.div>
      </div>
    );
  }

  if (error || !cityData) {
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

  if (showDeepDive && deepDiveResult) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        <div className="mb-8">
          <button
            onClick={() => setShowDeepDive(false)}
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to {cityData.name} Dashboard</span>
          </button>
        </div>

        <DeepDiveResults
          result={deepDiveResult}
          onNewDeepDive={handleDeepDive}
          onSourceClick={(source) => {
            // Track source clicks for analytics
            console.log('Source clicked:', source);
          }}
        />
      </motion.div>
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
          <span>Back to {state?.replace(/-/g, ' ')}</span>
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {cityData.name} Municipal Government
            </h1>
            <div className="flex items-center space-x-4 text-slate-400">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>{cityData.state}, {cityData.country}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4" />
                <span>{cityData.population} residents</span>
              </div>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4" />
                <span>{cityData.budgetSize} budget</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-2xl font-bold ${getRiskColor(cityData.corruptionRisk)}`}>
              {getRiskLevel(cityData.corruptionRisk)} Risk
            </div>
            <div className="text-sm text-slate-400">
              Score: {cityData.corruptionRisk}/100
            </div>
          </div>
        </div>
      </div>

      {/* Deep Dive Prompts */}
      <div className="mb-8">
        <DeepDivePrompts
          location={cityData.name}
          governmentLevel="city"
          onPromptSelect={(prompt) => handleDeepDive(prompt.title)}
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Active Policies</p>
              <p className="text-2xl font-bold text-white">{cityData.activePolicies.length}</p>
            </div>
            <FileText className="h-8 w-8 text-blue-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Recent Activities</p>
              <p className="text-2xl font-bold text-white">{cityData.recentActivity.length}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Local Officials</p>
              <p className="text-2xl font-bold text-white">{cityData.localOfficials.length}</p>
            </div>
            <Users className="h-8 w-8 text-purple-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm">Budget Size</p>
              <p className="text-2xl font-bold text-amber-400">{cityData.budgetSize}</p>
            </div>
            <DollarSign className="h-8 w-8 text-amber-400" />
          </div>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Recent Municipal Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
          >
            <h2 className="text-xl font-bold text-white mb-6">Recent Municipal Activity</h2>
            
            <div className="space-y-4">
              {cityData.recentActivity.map((activity, index) => {
                const ActivityIcon = getActivityIcon(activity.type);
                
                return (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-slate-700/40 rounded-lg border border-slate-600 hover:border-slate-500 transition-colors group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${
                        activity.riskScore > 50 ? 'bg-red-600/20' :
                        activity.riskScore > 25 ? 'bg-amber-600/20' : 'bg-green-600/20'
                      }`}>
                        <ActivityIcon className={`h-5 w-5 ${
                          activity.riskScore > 50 ? 'text-red-400' :
                          activity.riskScore > 25 ? 'text-amber-400' : 'text-green-400'
                        }`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-white">{activity.title}</h3>
                          <div className="flex items-center space-x-2">
                            <div className="text-right">
                              <div className={`text-lg font-bold ${
                                activity.riskScore > 50 ? 'text-red-400' :
                                activity.riskScore > 25 ? 'text-amber-400' : 'text-green-400'
                              }`}>
                                {activity.riskScore}
                              </div>
                              <div className="text-xs text-slate-400">Risk</div>
                            </div>
                            <button
                              onClick={() => handleActivityDeepDive(activity)}
                              disabled={deepDiveLoading}
                              className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors group-hover:opacity-100 opacity-0"
                            >
                              <Search className="h-4 w-4 text-blue-400" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-slate-300 text-sm mb-3">{activity.description}</p>
                        
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{activity.date}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <span className="capitalize">{activity.type}</span>
                            </div>
                            {activity.amount && (
                              <div className="flex items-center space-x-1">
                                <DollarSign className="h-3 w-3" />
                                <span>{formatCurrency(activity.amount)}</span>
                              </div>
                            )}
                          </div>
                          
                          {activity.beneficiary && (
                            <div className="text-slate-300">
                              Beneficiary: {activity.beneficiary}
                            </div>
                          )}
                        </div>

                        {activity.votingRecord && activity.votingRecord.length > 0 && (
                          <div className="mt-3 p-2 bg-slate-600/20 rounded">
                            <div className="text-xs text-slate-400 mb-1">Council Votes:</div>
                            <div className="space-y-1">
                              {activity.votingRecord.map((vote, voteIndex) => (
                                <div key={voteIndex} className="flex items-center justify-between text-xs">
                                  <span className="text-slate-300">{vote.member}</span>
                                  <span className={`font-medium ${
                                    vote.vote === 'yes' ? 'text-green-400' :
                                    vote.vote === 'no' ? 'text-red-400' : 'text-amber-400'
                                  }`}>
                                    {vote.vote.toUpperCase()}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Active Policies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
          >
            <h2 className="text-xl font-bold text-white mb-6">Active Municipal Policies</h2>
            
            <div className="space-y-4">
              {cityData.activePolicies.map((policy, index) => (
                <motion.div
                  key={policy.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-slate-700/40 rounded-lg border border-slate-600 group"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-white mb-1">{policy.title}</h3>
                      <p className="text-slate-300 text-sm">{policy.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <div className={`text-lg font-bold ${
                          policy.riskScore > 50 ? 'text-red-400' :
                          policy.riskScore > 25 ? 'text-amber-400' : 'text-green-400'
                        }`}>
                          {policy.riskScore}
                        </div>
                        <div className="text-xs text-slate-400">Risk</div>
                      </div>
                      <button
                        onClick={() => handlePolicyDeepDive(policy)}
                        disabled={deepDiveLoading}
                        className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors group-hover:opacity-100 opacity-0"
                      >
                        <Search className="h-4 w-4 text-blue-400" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <div className="flex items-center space-x-4">
                      <span>Status: <span className="text-white capitalize">{policy.status.replace('_', ' ')}</span></span>
                      <span>Sponsor: <span className="text-white">{policy.sponsor}</span></span>
                    </div>
                    <span>Support: <span className="text-green-400">{policy.publicSupport}%</span></span>
                  </div>
                  
                  {policy.estimatedCost && (
                    <div className="text-xs text-slate-400">
                      Estimated Cost: <span className="text-amber-400">{formatCurrency(policy.estimatedCost)}</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Local Officials */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-lg font-bold text-white mb-4">Local Officials</h3>
            
            <div className="space-y-4">
              {cityData.localOfficials.map((official, index) => (
                <div key={index} className="p-3 bg-slate-700/40 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-white">{official.name}</h4>
                      <p className="text-slate-400 text-sm">{official.position}</p>
                      {official.party && (
                        <p className="text-slate-500 text-xs">{official.party}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-xs text-slate-400 mb-2">
                    Term: {official.termStart} - {official.termEnd}
                  </div>
                  
                  {official.recentActions.length > 0 && (
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Recent Actions:</div>
                      <div className="space-y-1">
                        {official.recentActions.slice(0, 2).map((action, actionIndex) => (
                          <div key={actionIndex} className="text-xs text-slate-300 bg-slate-600/20 px-2 py-1 rounded">
                            {action}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* City Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
          >
            <h3 className="text-lg font-bold text-white mb-4">City Overview</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-white mb-2">Key Issues</h4>
                <div className="flex flex-wrap gap-2">
                  {cityData.keyIssues.map((issue, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-600/20 text-blue-300 rounded text-xs"
                    >
                      {issue}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-2">Major Industries</h4>
                <div className="flex flex-wrap gap-2">
                  {cityData.majorIndustries.map((industry, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded text-xs"
                    >
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="pt-4 border-t border-slate-600">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Population</span>
                    <span className="text-white">{cityData.population}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Budget</span>
                    <span className="text-white">{cityData.budgetSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Government Level</span>
                    <span className="text-white capitalize">{cityData.governmentLevel}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Loading overlay for deep dive */}
      {deepDiveLoading && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 rounded-xl p-8 border border-slate-700 text-center"
          >
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h3 className="text-xl font-bold text-white mb-2">Conducting Deep Investigation</h3>
            <p className="text-slate-400">AI is analyzing sources and patterns...</p>
          </motion.div>
        </div>
      )}

      {!import.meta.env.VITE_OPENAI_API_KEY && (
        <div className="mt-8 p-4 bg-amber-900/20 border border-amber-600/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span className="text-amber-300 text-sm">
              Demo Mode: Add OpenAI API key for real-time municipal government analysis and deep-dive investigations
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CityDashboard;