import React from 'react';
import { motion } from 'framer-motion';
import { Building, Users, Calendar, TrendingDown, AlertCircle } from 'lucide-react';
import { GovernmentStructure } from '../services/openai';

interface GovernmentAnalysisProps {
  governmentData: GovernmentStructure;
}

const GovernmentAnalysis: React.FC<GovernmentAnalysisProps> = ({ governmentData }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
    >
      <h2 className="text-xl font-bold text-white mb-6">AI Government Analysis</h2>
      
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <Building className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">Government Structure</h3>
            <p className="text-slate-300 text-sm mb-2">
              {governmentData.governmentType} with {governmentData.legislativeBodies.length} main legislative bodies.
            </p>
            <div className="flex flex-wrap gap-2">
              {governmentData.legislativeBodies.map((body, index) => (
                <span key={index} className="px-2 py-1 bg-slate-600/40 text-slate-300 rounded text-xs">
                  {body}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="p-2 bg-green-600/20 rounded-lg">
            <Users className="h-5 w-5 text-green-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">Current Leadership</h3>
            <div className="space-y-1 text-slate-300 text-sm">
              <p><strong>Head of State:</strong> {governmentData.currentLeaders.head_of_state}</p>
              <p><strong>Head of Government:</strong> {governmentData.currentLeaders.head_of_government}</p>
              <p><strong>Legislature Leader:</strong> {governmentData.currentLeaders.legislature_leader}</p>
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="p-2 bg-amber-600/20 rounded-lg">
            <Calendar className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">Upcoming Elections</h3>
            <p className="text-slate-300 text-sm">
              {governmentData.upcomingElections}
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="p-2 bg-purple-600/20 rounded-lg">
            <TrendingDown className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">Key Issues</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {governmentData.keyIssues.map((issue, index) => (
                <span key={index} className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs">
                  {issue}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-start space-x-4">
          <div className="p-2 bg-red-600/20 rounded-lg">
            <AlertCircle className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">Recent Legislative Activity</h3>
            <div className="space-y-2 mt-2">
              {governmentData.recentActivity.map((activity, index) => (
                <div key={index} className="p-2 bg-slate-700/40 rounded text-slate-300 text-sm">
                  {activity}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-600/10 rounded-lg border border-blue-600/20">
        <h4 className="font-semibold text-blue-400 mb-2">Political Context</h4>
        <p className="text-slate-300 text-sm">
          {governmentData.politicalContext}
        </p>
      </div>

      {!import.meta.env.VITE_OPENAI_API_KEY && (
        <div className="mt-4 p-3 bg-amber-900/20 border border-amber-600/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-4 w-4 text-amber-400" />
            <span className="text-amber-300 text-sm">
              Demo Mode: Add OpenAI API key for real-time analysis
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default GovernmentAnalysis;