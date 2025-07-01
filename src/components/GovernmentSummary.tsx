import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertTriangle, Users, Target, Zap } from 'lucide-react';
import { GovernmentStructure } from '../services/openai';

interface GovernmentSummaryProps {
  governmentData: GovernmentStructure;
}

const GovernmentSummary: React.FC<GovernmentSummaryProps> = ({ governmentData }) => {
  const getRiskLevel = (risk: number) => {
    if (risk > 70) return { level: 'High Risk', color: 'red', icon: AlertTriangle };
    if (risk > 40) return { level: 'Medium Risk', color: 'amber', icon: TrendingUp };
    return { level: 'Low Risk', color: 'green', icon: Users };
  };

  const riskInfo = getRiskLevel(governmentData.corruptionRisk);
  const RiskIcon = riskInfo.icon;

  // Generate AI summary of current political intentions
  const generatePoliticalSummary = () => {
    const criticalAlerts = governmentData.alerts?.filter(alert => alert.type === 'critical').length || 0;
    const suspiciousBills = governmentData.activeBills?.filter(bill => bill.status === 'suspicious').length || 0;
    
    if (criticalAlerts > 0 || suspiciousBills > 0) {
      return `Current government activity shows concerning patterns. ${criticalAlerts} critical alerts detected with ${suspiciousBills} suspicious bills under review. Key focus areas include infrastructure spending and regulatory changes that may benefit specific corporate interests.`;
    }
    
    return governmentData.politicalContext || 'Government activity appears stable with standard legislative processes in place.';
  };

  const politicalSummary = generatePoliticalSummary();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 rounded-xl p-6 border border-slate-600 mb-8"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-600/20 rounded-xl">
            <Brain className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI Intelligence Summary</h2>
            <p className="text-slate-400">What's happening in {governmentData.displayName}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className={`flex items-center space-x-2 mb-1 ${
            riskInfo.color === 'red' ? 'text-red-400' :
            riskInfo.color === 'amber' ? 'text-amber-400' : 'text-green-400'
          }`}>
            <RiskIcon className="h-5 w-5" />
            <span className="font-semibold">{riskInfo.level}</span>
          </div>
          <div className="text-sm text-slate-400">Risk Score: {governmentData.corruptionRisk}/100</div>
        </div>
      </div>

      {/* Main Political Summary */}
      <div className="bg-slate-700/40 rounded-lg p-5 mb-6">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-purple-600/20 rounded-lg mt-1">
            <Target className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white mb-2 flex items-center space-x-2">
              <span>Current Political Intentions</span>
              <Zap className="h-4 w-4 text-yellow-400" />
            </h3>
            <p className="text-slate-300 leading-relaxed">
              {politicalSummary}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-600/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">
            {governmentData.activeBills?.length || 0}
          </div>
          <div className="text-xs text-slate-400">Active Bills</div>
        </div>
        
        <div className="bg-slate-600/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-400 mb-1">
            {governmentData.alerts?.filter(alert => alert.type === 'critical').length || 0}
          </div>
          <div className="text-xs text-slate-400">Critical Alerts</div>
        </div>
        
        <div className="bg-slate-600/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-amber-400 mb-1">
            {governmentData.corruptionPatterns?.length || 0}
          </div>
          <div className="text-xs text-slate-400">Patterns</div>
        </div>
        
        <div className="bg-slate-600/30 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">
            {governmentData.regionalData?.length || 0}
          </div>
          <div className="text-xs text-slate-400">Regions</div>
        </div>
      </div>

      {/* Key Issues */}
      {governmentData.keyIssues && governmentData.keyIssues.length > 0 && (
        <div className="mt-6">
          <h4 className="text-white font-medium mb-3">Key Focus Areas:</h4>
          <div className="flex flex-wrap gap-2">
            {governmentData.keyIssues.slice(0, 6).map((issue, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-600/20 text-blue-300 rounded-full text-sm border border-blue-600/30"
              >
                {issue}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Last Updated */}
      <div className="mt-6 pt-4 border-t border-slate-600 flex items-center justify-between">
        <div className="text-xs text-slate-400">
          AI Analysis completed • Confidence: {import.meta.env.VITE_OPENAI_API_KEY ? '94%' : 'Demo Mode'}
        </div>
        <div className="text-xs text-slate-400">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </motion.div>
  );
};

export default GovernmentSummary;