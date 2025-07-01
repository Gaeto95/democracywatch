import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, AlertTriangle, Users, FileText, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { DeepDiveResult } from '../services/deepDiveService';
import SourceLinks from './SourceLinks';
import DeepDivePrompts from './DeepDivePrompts';

interface DeepDiveResultsProps {
  result: DeepDiveResult;
  onNewDeepDive: (topic: string) => void;
  onSourceClick?: (source: any) => void;
}

const DeepDiveResults: React.FC<DeepDiveResultsProps> = ({ 
  result, 
  onNewDeepDive, 
  onSourceClick 
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['analysis']));

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-red-400';
      case 'medium': return 'text-amber-400';
      case 'low': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  const getRiskBgColor = (level: string) => {
    switch (level) {
      case 'critical': return 'bg-red-900/20 border-red-600/20';
      case 'high': return 'bg-red-900/20 border-red-600/20';
      case 'medium': return 'bg-amber-900/20 border-amber-600/20';
      case 'low': return 'bg-green-900/20 border-green-600/20';
      default: return 'bg-slate-900/20 border-slate-600/20';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 rounded-xl p-6 border border-slate-600"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Deep Dive: {result.topic}
            </h2>
            <p className="text-slate-400">Investigation results for {result.location}</p>
          </div>
          <div className={`text-right p-3 rounded-lg ${getRiskBgColor(result.riskAssessment.level)}`}>
            <div className={`text-lg font-bold ${getRiskColor(result.riskAssessment.level)}`}>
              {result.riskAssessment.level.toUpperCase()}
            </div>
            <div className="text-sm text-slate-400">
              Risk: {result.riskAssessment.score}/100
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/60 rounded-xl border border-slate-700"
      >
        <button
          onClick={() => toggleSection('analysis')}
          className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-700/40 transition-colors"
        >
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <Target className="h-5 w-5 text-blue-400" />
            <span>Investigation Analysis</span>
          </h3>
          {expandedSections.has('analysis') ? 
            <ChevronUp className="h-5 w-5 text-slate-400" /> : 
            <ChevronDown className="h-5 w-5 text-slate-400" />
          }
        </button>
        
        {expandedSections.has('analysis') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 pb-6"
          >
            <div className="prose prose-slate prose-invert max-w-none">
              <p className="text-slate-300 leading-relaxed">
                {result.analysis}
              </p>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Key Findings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/60 rounded-xl border border-slate-700"
      >
        <button
          onClick={() => toggleSection('findings')}
          className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-700/40 transition-colors"
        >
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <span>Key Findings</span>
          </h3>
          {expandedSections.has('findings') ? 
            <ChevronUp className="h-5 w-5 text-slate-400" /> : 
            <ChevronDown className="h-5 w-5 text-slate-400" />
          }
        </button>
        
        {expandedSections.has('findings') && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 pb-6"
          >
            <div className="space-y-3">
              {result.keyFindings.map((finding, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-3 p-3 bg-slate-700/40 rounded-lg"
                >
                  <div className="w-6 h-6 bg-blue-600/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-400 text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="text-slate-300">{finding}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Risk Assessment */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`rounded-xl border p-6 ${getRiskBgColor(result.riskAssessment.level)}`}
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <AlertTriangle className={`h-5 w-5 ${getRiskColor(result.riskAssessment.level)}`} />
          <span>Risk Assessment</span>
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-white mb-2">Risk Factors:</h4>
            <div className="space-y-2">
              {result.riskAssessment.factors.map((factor, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${getRiskColor(result.riskAssessment.level).replace('text-', 'bg-')}`}></div>
                  <span className="text-slate-300 text-sm">{factor}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-2">Actionable Insights:</h4>
            <div className="space-y-2">
              {result.actionableInsights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <Users className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{insight}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <SourceLinks
          sources={result.sources}
          topic={result.topic}
          location={result.location}
          onSourceClick={onSourceClick}
        />
      </motion.div>

      {/* Follow-up Prompts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
      >
        <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
          <FileText className="h-5 w-5 text-purple-400" />
          <span>Continue Investigation</span>
        </h3>
        
        <div className="space-y-3 mb-6">
          {result.followUpPrompts.map((prompt, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onNewDeepDive(prompt)}
              className="w-full p-3 bg-slate-700/40 rounded-lg hover:bg-slate-700/60 transition-colors text-left group border border-slate-600 hover:border-purple-500"
            >
              <div className="flex items-center justify-between">
                <span className="text-slate-300 group-hover:text-white transition-colors">
                  {prompt}
                </span>
                <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-purple-400 transition-colors" />
              </div>
            </motion.button>
          ))}
        </div>

        <div className="border-t border-slate-600 pt-4">
          <h4 className="font-semibold text-white mb-2">Related Topics:</h4>
          <div className="flex flex-wrap gap-2">
            {result.relatedTopics.map((topic, index) => (
              <button
                key={index}
                onClick={() => onNewDeepDive(topic)}
                className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm hover:bg-purple-600/30 transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* New Deep Dive Prompts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <DeepDivePrompts
          location={result.location}
          governmentLevel="city" // This would be dynamic based on context
          currentTopic={result.topic}
          onPromptSelect={(prompt) => onNewDeepDive(prompt.title)}
        />
      </motion.div>
    </div>
  );
};

export default DeepDiveResults;