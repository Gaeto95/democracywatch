import React from 'react';
import { motion } from 'framer-motion';
import { FileText, AlertTriangle, CheckCircle, Clock, DollarSign, Users, Calendar, Search, ExternalLink } from 'lucide-react';
import { Bill } from '../services/openai';

interface BillTrackerProps {
  bills?: Bill[];
  onBillClick?: (bill: Bill) => void;
  onViewAll?: () => void;
}

const BillTracker: React.FC<BillTrackerProps> = ({ bills = [], onBillClick, onViewAll }) => {
  // Fallback demo data if no bills provided
  const defaultBills: Bill[] = [
    {
      id: 'HR-2024-4829',
      title: 'Infrastructure Modernization Act',
      status: 'suspicious',
      stage: 'Committee Review',
      riskScore: 87,
      issues: ['Midnight introduction', 'Unusual contractor provisions', 'Limited review time'],
      description: 'Federal infrastructure spending bill with concerning procurement language',
      dateIntroduced: '2024-01-15',
      sponsor: 'Rep. Johnson',
      summary: 'Allocates $50B for infrastructure with questionable contractor selection criteria',
      redFlags: ['Introduced at 11:47 PM', 'Favors specific contractors', 'Bypasses normal bidding'],
      publicSupport: 34,
      lobbyingSpending: 2400000
    },
    {
      id: 'S-2024-2341',
      title: 'Clean Energy Investment Bill',
      status: 'monitoring',
      stage: 'Senate Floor',
      riskScore: 34,
      issues: ['Corporate tax breaks'],
      description: 'Renewable energy investment with some questionable incentive structures',
      dateIntroduced: '2024-02-03',
      sponsor: 'Sen. Williams',
      summary: 'Provides tax incentives for renewable energy with some corporate benefits',
      redFlags: ['Unusual tax break provisions'],
      publicSupport: 67,
      lobbyingSpending: 890000
    },
    {
      id: 'HR-2024-5672',
      title: 'Small Business Relief Act',
      status: 'clear',
      stage: 'House Vote',
      riskScore: 12,
      issues: [],
      description: 'Standard small business support legislation with transparent provisions',
      dateIntroduced: '2024-01-28',
      sponsor: 'Rep. Martinez',
      summary: 'Provides tax relief and grants for small businesses affected by economic downturn',
      redFlags: [],
      publicSupport: 78,
      lobbyingSpending: 150000
    }
  ];

  const displayBills = bills.length > 0 ? bills : defaultBills;
  const suspiciousCount = displayBills.filter(bill => bill.status === 'suspicious').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'suspicious': return 'red';
      case 'monitoring': return 'amber';
      case 'clear': return 'green';
      default: return 'slate';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'suspicious': return AlertTriangle;
      case 'monitoring': return Clock;
      case 'clear': return CheckCircle;
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Active Legislation</h2>
        <div className="flex items-center space-x-3">
          <div className="text-sm text-slate-400">{displayBills.length} bills tracked</div>
          {suspiciousCount > 0 && (
            <div className="px-2 py-1 bg-red-600/20 text-red-400 rounded-full text-xs font-medium">
              {suspiciousCount} suspicious
            </div>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {displayBills.map((bill, index) => {
          const StatusIcon = getStatusIcon(bill.status);
          const statusColor = getStatusColor(bill.status);
          
          return (
            <motion.div
              key={bill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-700/40 rounded-lg p-5 border border-slate-600 hover:border-slate-500 transition-all duration-200 group cursor-pointer"
              onClick={() => onBillClick?.(bill)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${
                    statusColor === 'red' ? 'bg-red-600/20' :
                    statusColor === 'amber' ? 'bg-amber-600/20' :
                    statusColor === 'green' ? 'bg-green-600/20' : 'bg-slate-600/20'
                  }`}>
                    <StatusIcon className={`h-5 w-5 ${
                      statusColor === 'red' ? 'text-red-400' :
                      statusColor === 'amber' ? 'text-amber-400' :
                      statusColor === 'green' ? 'text-green-400' : 'text-slate-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="font-semibold text-white text-lg group-hover:text-blue-400 transition-colors">
                        {bill.id}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        statusColor === 'red' ? 'bg-red-600/20 text-red-400' :
                        statusColor === 'amber' ? 'bg-amber-600/20 text-amber-400' :
                        statusColor === 'green' ? 'bg-green-600/20 text-green-400' : 'bg-slate-600/20 text-slate-400'
                      }`}>
                        {bill.stage}
                      </span>
                    </div>
                    <h4 className="text-slate-300 font-medium mb-2 text-lg">{bill.title}</h4>
                    <p className="text-slate-400 text-sm mb-3">{bill.description}</p>
                    
                    {/* Bill Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-slate-500" />
                        <div>
                          <div className="text-xs text-slate-500">Introduced</div>
                          <div className="text-sm text-slate-300">{formatDate(bill.dateIntroduced)}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-slate-500" />
                        <div>
                          <div className="text-xs text-slate-500">Public Support</div>
                          <div className="text-sm text-slate-300">{bill.publicSupport}%</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-slate-500" />
                        <div>
                          <div className="text-xs text-slate-500">Lobbying</div>
                          <div className="text-sm text-slate-300">{formatCurrency(bill.lobbyingSpending)}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-slate-500" />
                        <div>
                          <div className="text-xs text-slate-500">Sponsor</div>
                          <div className="text-sm text-slate-300">{bill.sponsor}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${
                      bill.riskScore > 70 ? 'text-red-400' :
                      bill.riskScore > 40 ? 'text-amber-400' : 'text-green-400'
                    }`}>
                      {bill.riskScore}
                    </div>
                    <div className="text-xs text-slate-400">Risk Score</div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBillClick?.(bill);
                    }}
                    className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Search className="h-4 w-4 text-blue-400" />
                  </button>
                </div>
              </div>

              {/* Red Flags */}
              {bill.redFlags.length > 0 && (
                <div className="mb-4">
                  <h5 className="text-red-400 text-sm font-medium mb-2">🚩 Red Flags:</h5>
                  <div className="space-y-1">
                    {bill.redFlags.map((flag, flagIndex) => (
                      <div key={flagIndex} className="text-sm text-red-300 bg-red-900/20 px-3 py-1 rounded">
                        {flag}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Issues */}
              {bill.issues.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  {bill.issues.map((issue, issueIndex) => (
                    <span
                      key={issueIndex}
                      className="px-3 py-1 bg-slate-600/40 text-slate-300 rounded-full text-xs"
                    >
                      {issue}
                    </span>
                  ))}
                </div>
              )}

              {/* Summary */}
              <div className="mt-4 p-3 bg-slate-600/20 rounded-lg">
                <h5 className="text-slate-300 text-sm font-medium mb-1">Summary:</h5>
                <p className="text-slate-400 text-sm">{bill.summary}</p>
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
          <span>View All Bills</span>
          <ExternalLink className="h-3 w-3" />
        </button>
        <div className="text-xs text-slate-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {!import.meta.env.VITE_OPENAI_API_KEY && bills.length === 0 && (
        <div className="mt-4 p-3 bg-amber-900/20 border border-amber-600/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
            <span className="text-amber-300 text-sm">
              Demo bills shown - Add OpenAI API key for real legislative tracking
            </span>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default BillTracker;