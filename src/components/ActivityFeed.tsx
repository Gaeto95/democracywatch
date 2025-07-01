import React from 'react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle, FileText, TrendingUp, ExternalLink, Eye, Calendar, Search } from 'lucide-react';
import { Alert, Bill } from '../services/openai';

interface ActivityItem {
  id: string;
  type: 'alert' | 'bill' | 'news';
  timestamp: Date;
  title: string;
  description: string;
  severity?: 'critical' | 'warning' | 'info';
  status?: string;
  source?: string;
  confidence?: number;
  actionRequired?: boolean;
  riskScore?: number;
  onClick?: () => void;
}

interface ActivityFeedProps {
  alerts?: Alert[];
  bills?: Bill[];
  maxItems?: number;
  onItemClick?: (item: ActivityItem) => void;
  onViewAll?: () => void;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ 
  alerts = [], 
  bills = [], 
  maxItems = 10,
  onItemClick,
  onViewAll
}) => {
  // Move getTimeOffset function before useMemo
  const getTimeOffset = (timeString: string): number => {
    const match = timeString.match(/(\d+)\s*(hour|day|minute)s?\s*ago/);
    if (!match) return 0;
    
    const value = parseInt(match[1]);
    const unit = match[2];
    
    switch (unit) {
      case 'minute': return value * 60 * 1000;
      case 'hour': return value * 60 * 60 * 1000;
      case 'day': return value * 24 * 60 * 60 * 1000;
      default: return 0;
    }
  };

  // Convert alerts and bills to unified activity items
  const activityItems: ActivityItem[] = React.useMemo(() => {
    const items: ActivityItem[] = [];

    // Add alerts
    alerts.forEach(alert => {
      items.push({
        id: `alert-${alert.id}`,
        type: 'alert',
        timestamp: new Date(Date.now() - getTimeOffset(alert.time)),
        title: alert.title,
        description: alert.description,
        severity: alert.type,
        source: alert.source,
        confidence: alert.confidence,
        actionRequired: alert.actionRequired,
        onClick: () => onItemClick?.({
          id: `alert-${alert.id}`,
          type: 'alert',
          timestamp: new Date(Date.now() - getTimeOffset(alert.time)),
          title: alert.title,
          description: alert.description,
          severity: alert.type,
          source: alert.source,
          confidence: alert.confidence,
          actionRequired: alert.actionRequired
        })
      });
    });

    // Add bills
    bills.forEach(bill => {
      items.push({
        id: `bill-${bill.id}`,
        type: 'bill',
        timestamp: new Date(bill.dateIntroduced),
        title: `${bill.id}: ${bill.title}`,
        description: bill.description,
        status: bill.stage,
        riskScore: bill.riskScore,
        onClick: () => onItemClick?.({
          id: `bill-${bill.id}`,
          type: 'bill',
          timestamp: new Date(bill.dateIntroduced),
          title: `${bill.id}: ${bill.title}`,
          description: bill.description,
          status: bill.stage,
          riskScore: bill.riskScore
        })
      });
    });

    // Sort by timestamp (newest first) and limit
    return items
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, maxItems);
  }, [alerts, bills, maxItems, getTimeOffset, onItemClick]);

  const getActivityIcon = (type: string, severity?: string) => {
    if (type === 'alert') {
      return severity === 'critical' ? AlertTriangle : Eye;
    }
    return FileText;
  };

  const getActivityColor = (type: string, severity?: string, riskScore?: number) => {
    if (type === 'alert') {
      switch (severity) {
        case 'critical': return 'red';
        case 'warning': return 'amber';
        default: return 'blue';
      }
    }
    if (type === 'bill' && riskScore) {
      if (riskScore > 70) return 'red';
      if (riskScore > 40) return 'amber';
      return 'green';
    }
    return 'slate';
  };

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    return 'Just now';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/60 rounded-xl border border-slate-700"
    >
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center space-x-2">
            <Clock className="h-5 w-5 text-blue-400" />
            <span>Live Activity Feed</span>
          </h2>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-slate-400">Live</span>
            </div>
            <div className="text-sm text-slate-400">{activityItems.length} updates</div>
          </div>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {activityItems.length === 0 ? (
          <div className="p-8 text-center">
            <Clock className="h-12 w-12 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-400">No recent activity</p>
          </div>
        ) : (
          <div className="space-y-1">
            {activityItems.map((item, index) => {
              const ActivityIcon = getActivityIcon(item.type, item.severity);
              const color = getActivityColor(item.type, item.severity, item.riskScore);
              
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={item.onClick}
                  className="p-4 hover:bg-slate-700/40 transition-colors cursor-pointer border-l-4 border-transparent hover:border-blue-500 group"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-1.5 rounded-lg mt-1 ${
                      color === 'red' ? 'bg-red-600/20' :
                      color === 'amber' ? 'bg-amber-600/20' :
                      color === 'green' ? 'bg-green-600/20' :
                      color === 'blue' ? 'bg-blue-600/20' : 'bg-slate-600/20'
                    }`}>
                      <ActivityIcon className={`h-4 w-4 ${
                        color === 'red' ? 'text-red-400' :
                        color === 'amber' ? 'text-amber-400' :
                        color === 'green' ? 'text-green-400' :
                        color === 'blue' ? 'text-blue-400' : 'text-slate-400'
                      }`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-medium text-white text-sm group-hover:text-blue-400 transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                        <div className="flex items-center space-x-2 ml-2">
                          {item.actionRequired && (
                            <div className="px-2 py-0.5 bg-red-600/20 text-red-400 rounded text-xs font-medium">
                              Action Required
                            </div>
                          )}
                          <span className="text-xs text-slate-400 whitespace-nowrap">
                            {formatTimestamp(item.timestamp)}
                          </span>
                        </div>
                      </div>
                      
                      <p className="text-slate-300 text-sm mb-2 line-clamp-2">
                        {item.description}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-xs text-slate-400">
                          {item.type === 'alert' && (
                            <>
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{item.confidence}% confidence</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <span className="capitalize">{item.source}</span>
                              </div>
                            </>
                          )}
                          {item.type === 'bill' && (
                            <>
                              <div className="flex items-center space-x-1">
                                <TrendingUp className="h-3 w-3" />
                                <span>Risk: {item.riskScore}/100</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Calendar className="h-3 w-3" />
                                <span>{item.status}</span>
                              </div>
                            </>
                          )}
                        </div>
                        
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            item.onClick?.();
                          }}
                          className="text-blue-400 hover:text-blue-300 text-xs flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Search className="h-3 w-3" />
                          <span>Deep Dive</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-700 bg-slate-800/40">
        <div className="flex items-center justify-between">
          <button 
            onClick={onViewAll}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors flex items-center space-x-1"
          >
            <span>View All Activity</span>
            <ExternalLink className="h-3 w-3" />
          </button>
          <div className="text-xs text-slate-500">
            Auto-refreshes every 5 minutes
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityFeed;