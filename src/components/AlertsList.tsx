import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, Eye, ExternalLink, Shield, TrendingUp, Search } from 'lucide-react';
import { Alert } from '../services/openai';

interface AlertsListProps {
  alerts?: Alert[];
  onAlertClick?: (alert: Alert) => void;
  onViewAll?: () => void;
}

const AlertsList: React.FC<AlertsListProps> = ({ alerts = [], onAlertClick, onViewAll }) => {
  // Fallback demo data if no alerts provided
  const defaultAlerts: Alert[] = [
    {
      id: 1,
      type: 'critical',
      title: 'Midnight Infrastructure Bill',
      description: 'H.R. 4829 introduced at 11:47 PM with unusual contractor provisions',
      time: '2 hours ago',
      confidence: 89,
      source: 'Legislative tracking',
      actionRequired: true,
      relatedBills: ['HR-2024-4829']
    },
    {
      id: 2,
      type: 'warning',
      title: 'Voting Pattern Anomaly',
      description: 'Senator Johnson reversed position on 3 bills after private meetings',
      time: '6 hours ago',
      confidence: 76,
      source: 'Pattern detection',
      actionRequired: false,
      relatedBills: []
    },
    {
      id: 3,
      type: 'info',
      title: 'Lobbying Spike Detected',
      description: 'Defense contractors increased spending 340% this quarter',
      time: '1 day ago',
      confidence: 82,
      source: 'Financial analysis',
      actionRequired: false,
      relatedBills: []
    }
  ];

  const displayAlerts = alerts.length > 0 ? alerts : defaultAlerts;
  const criticalCount = displayAlerts.filter(alert => alert.type === 'critical').length;

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'red';
      case 'warning': return 'amber';
      default: return 'blue';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return AlertTriangle;
      case 'warning': return TrendingUp;
      default: return Shield;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Active Alerts</h2>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-slate-400">{displayAlerts.length} total</div>
          {criticalCount > 0 && (
            <div className="px-2 py-1 bg-red-600/20 text-red-400 rounded-full text-xs font-medium">
              {criticalCount} critical
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {displayAlerts.map((alert, index) => {
          const AlertIcon = getAlertIcon(alert.type);
          const color = getAlertColor(alert.type);
          
          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg border-l-4 ${
                alert.type === 'critical' 
                  ? 'bg-red-900/20 border-red-500' 
                  : alert.type === 'warning'
                  ? 'bg-amber-900/20 border-amber-500'
                  : 'bg-blue-900/20 border-blue-500'
              } hover:bg-opacity-80 transition-all duration-200 cursor-pointer group`}
              onClick={() => onAlertClick?.(alert)}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-1 rounded ${
                  alert.type === 'critical' ? 'bg-red-600/20' :
                  alert.type === 'warning' ? 'bg-amber-600/20' : 'bg-blue-600/20'
                }`}>
                  <AlertIcon className={`h-4 w-4 ${
                    alert.type === 'critical' ? 'text-red-400' :
                    alert.type === 'warning' ? 'text-amber-400' : 'text-blue-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {alert.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      {alert.actionRequired && (
                        <div className="px-2 py-1 bg-red-600/20 text-red-400 rounded text-xs font-medium">
                          Action Required
                        </div>
                      )}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAlertClick?.(alert);
                        }}
                        className="p-1 bg-blue-600/20 hover:bg-blue-600/30 rounded transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Search className="h-3 w-3 text-blue-400" />
                      </button>
                    </div>
                  </div>
                  <p className="text-slate-300 text-sm mb-3">{alert.description}</p>
                  
                  {alert.relatedBills.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-slate-400 mb-1">Related Bills:</p>
                      <div className="flex flex-wrap gap-1">
                        {alert.relatedBills.map((bill, billIndex) => (
                          <span key={billIndex} className="px-2 py-1 bg-slate-600/40 text-slate-300 rounded text-xs">
                            {bill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-slate-400">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{alert.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{alert.confidence}% confidence</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Shield className="h-3 w-3" />
                        <span>{alert.source}</span>
                      </div>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onAlertClick?.(alert);
                      }}
                      className="text-blue-400 hover:text-blue-300 text-xs flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span>Deep Dive</span>
                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button 
          onClick={onViewAll}
          className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors flex items-center space-x-1"
        >
          <span>View All Alerts</span>
          <ExternalLink className="h-3 w-3" />
        </button>
        <div className="text-xs text-slate-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {!import.meta.env.VITE_OPENAI_API_KEY && alerts.length === 0 && (
        <div className="mt-4 p-3 bg-amber-900/20 border border-amber-600/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span className="text-amber-300 text-sm">
              Demo alerts shown - Add OpenAI API key for real-time monitoring
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default AlertsList;