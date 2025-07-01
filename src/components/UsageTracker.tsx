import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, AlertCircle } from 'lucide-react';

interface UsageTrackerProps {
  deepDivesUsed: number;
  deepDivesLimit: number;
  alertsEnabled: boolean;
  planName: string;
  onUpgrade: () => void;
}

const UsageTracker: React.FC<UsageTrackerProps> = ({
  deepDivesUsed,
  deepDivesLimit,
  alertsEnabled,
  planName,
  onUpgrade
}) => {
  const usagePercentage = (deepDivesUsed / deepDivesLimit) * 100;
  const isNearLimit = usagePercentage > 80;
  const isAtLimit = deepDivesUsed >= deepDivesLimit;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-slate-800/60 rounded-xl p-4 border ${
        isAtLimit ? 'border-red-600/40' : isNearLimit ? 'border-amber-600/40' : 'border-slate-700'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-white">
          {planName} Plan
        </h3>
        {isAtLimit && (
          <AlertCircle className="h-4 w-4 text-red-400" />
        )}
      </div>

      {/* Deep Dives Usage */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-400">Deep Dives This Month</span>
          <span className={`text-xs font-medium ${
            isAtLimit ? 'text-red-400' : isNearLimit ? 'text-amber-400' : 'text-slate-300'
          }`}>
            {deepDivesUsed}/{deepDivesLimit === Infinity ? '∞' : deepDivesLimit}
          </span>
        </div>
        
        {deepDivesLimit !== Infinity && (
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                isAtLimit ? 'bg-red-500' : isNearLimit ? 'bg-amber-500' : 'bg-blue-500'
              }`}
              style={{ width: `${Math.min(usagePercentage, 100)}%` }}
            />
          </div>
        )}
      </div>

      {/* Features Status */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Real-time Alerts</span>
          <span className={alertsEnabled ? 'text-green-400' : 'text-slate-500'}>
            {alertsEnabled ? 'Enabled' : 'Disabled'}
          </span>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">Historical Analysis</span>
          <span className={planName !== 'Free' ? 'text-green-400' : 'text-slate-500'}>
            {planName !== 'Free' ? 'Available' : 'Limited'}
          </span>
        </div>
      </div>

      {/* Upgrade CTA */}
      {(isNearLimit || planName === 'Free') && (
        <button
          onClick={onUpgrade}
          className={`w-full py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
            isAtLimit 
              ? 'bg-red-600 hover:bg-red-700 text-white'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          <div className="flex items-center justify-center space-x-1">
            <Zap className="h-3 w-3" />
            <span>{isAtLimit ? 'Upgrade Required' : 'Upgrade Plan'}</span>
          </div>
        </button>
      )}
    </motion.div>
  );
};

export default UsageTracker;