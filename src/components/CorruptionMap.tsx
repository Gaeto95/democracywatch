import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, TrendingUp, AlertCircle, Shield, Users, Activity } from 'lucide-react';
import { RegionalData, CorruptionPattern } from '../services/openai';

interface CorruptionMapProps {
  regionalData?: RegionalData[];
  corruptionPatterns?: CorruptionPattern[];
}

const CorruptionMap: React.FC<CorruptionMapProps> = ({ 
  regionalData = [], 
  corruptionPatterns = [] 
}) => {
  // Fallback demo data
  const defaultRegions: RegionalData[] = [
    { name: 'Federal', risk: 67, alerts: 3, trend: 'up', population: '330M', keyIssues: ['Infrastructure', 'Healthcare'] },
    { name: 'California', risk: 45, alerts: 1, trend: 'stable', population: '39M', keyIssues: ['Housing', 'Climate'] },
    { name: 'Texas', risk: 52, alerts: 2, trend: 'up', population: '30M', keyIssues: ['Energy', 'Immigration'] },
    { name: 'New York', risk: 38, alerts: 1, trend: 'down', population: '19M', keyIssues: ['Finance', 'Transit'] },
    { name: 'Florida', risk: 61, alerts: 2, trend: 'up', population: '22M', keyIssues: ['Environment', 'Tourism'] }
  ];

  const defaultPatterns: CorruptionPattern[] = [
    {
      type: 'Midnight Legislation',
      description: 'Bills introduced outside normal hours to avoid scrutiny',
      severity: 'high',
      instances: 5,
      trend: 'increasing',
      examples: ['HR-4829 at 11:47 PM', 'S-2156 at 12:23 AM']
    },
    {
      type: 'Corporate Revolving Door',
      description: 'Officials moving between government and private sector',
      severity: 'medium',
      instances: 12,
      trend: 'stable',
      examples: ['Former EPA chief to oil company', 'Defense contractor to Pentagon']
    }
  ];

  const displayRegions = regionalData.length > 0 ? regionalData : defaultRegions;
  const displayPatterns = corruptionPatterns.length > 0 ? corruptionPatterns : defaultPatterns;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400';
      case 'medium': return 'text-amber-400';
      case 'low': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return '📈';
      case 'decreasing': return '📉';
      default: return '➡️';
    }
  };

  return (
    <div className="space-y-6">
      {/* Regional Corruption */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-blue-400" />
            <span>Regional Analysis</span>
          </h2>
          <div className="text-sm text-slate-400">{displayRegions.length} regions</div>
        </div>

        <div className="space-y-4">
          {displayRegions.map((region, index) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-slate-700/40 rounded-lg hover:bg-slate-700/60 transition-colors group"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    region.risk > 60 ? 'bg-red-400' :
                    region.risk > 40 ? 'bg-amber-400' : 'bg-green-400'
                  }`} />
                  <div>
                    <h3 className="text-white font-medium group-hover:text-blue-400 transition-colors">
                      {region.name}
                    </h3>
                    <div className="flex items-center space-x-3 text-xs text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3" />
                        <span>{region.population}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <AlertCircle className="h-3 w-3" />
                        <span>{region.alerts} alerts</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className={`text-lg font-bold ${
                      region.risk > 60 ? 'text-red-400' :
                      region.risk > 40 ? 'text-amber-400' : 'text-green-400'
                    }`}>
                      {region.risk}
                    </div>
                    <div className="text-xs text-slate-400">Risk</div>
                  </div>
                  
                  <div className={`p-1 rounded ${
                    region.trend === 'up' ? 'text-red-400' :
                    region.trend === 'down' ? 'text-green-400' : 'text-slate-400'
                  }`}>
                    <TrendingUp className={`h-4 w-4 ${
                      region.trend === 'down' ? 'transform rotate-180' : ''
                    }`} />
                  </div>
                </div>
              </div>

              {/* Key Issues */}
              <div className="flex flex-wrap gap-2">
                {region.keyIssues.map((issue, issueIndex) => (
                  <span
                    key={issueIndex}
                    className="px-2 py-1 bg-slate-600/40 text-slate-300 rounded text-xs"
                  >
                    {issue}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Corruption Patterns */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Activity className="h-5 w-5 text-amber-400" />
            <span>Corruption Patterns</span>
          </h2>
          <div className="text-sm text-slate-400">{displayPatterns.length} patterns</div>
        </div>

        <div className="space-y-4">
          {displayPatterns.map((pattern, index) => (
            <motion.div
              key={pattern.type}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border-l-4 ${
                pattern.severity === 'high' ? 'bg-red-900/20 border-red-500' :
                pattern.severity === 'medium' ? 'bg-amber-900/20 border-amber-500' :
                'bg-green-900/20 border-green-500'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`font-semibold ${getSeverityColor(pattern.severity)}`}>
                      {pattern.type}
                    </h3>
                    <span className="text-lg">{getTrendIcon(pattern.trend)}</span>
                  </div>
                  <p className="text-slate-300 text-sm mb-2">{pattern.description}</p>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${getSeverityColor(pattern.severity)}`}>
                    {pattern.instances}
                  </div>
                  <div className="text-xs text-slate-400">instances</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Trend:</span>
                  <span className={`font-medium ${
                    pattern.trend === 'increasing' ? 'text-red-400' :
                    pattern.trend === 'decreasing' ? 'text-green-400' : 'text-slate-400'
                  }`}>
                    {pattern.trend}
                  </span>
                </div>
                
                {pattern.examples.length > 0 && (
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Recent Examples:</div>
                    <div className="space-y-1">
                      {pattern.examples.slice(0, 2).map((example, exampleIndex) => (
                        <div key={exampleIndex} className="text-xs text-slate-300 bg-slate-600/20 px-2 py-1 rounded">
                          {example}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Global Pattern Alert */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-amber-600/10 rounded-lg border border-amber-600/20 p-4"
      >
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-amber-400 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-400 mb-1">Cross-Regional Pattern Alert</h4>
            <p className="text-slate-300 text-sm">
              Similar procurement language detected across multiple regions. 
              Potential coordinated lobbying effort involving infrastructure contracts.
              {displayPatterns.length > 0 && ` ${displayPatterns[0].instances} instances detected.`}
            </p>
          </div>
        </div>
      </motion.div>

      {!import.meta.env.VITE_OPENAI_API_KEY && regionalData.length === 0 && (
        <div className="p-3 bg-amber-900/20 border border-amber-600/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-amber-400" />
            <span className="text-amber-300 text-sm">
              Demo patterns shown - Add OpenAI API key for real corruption analysis
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CorruptionMap;