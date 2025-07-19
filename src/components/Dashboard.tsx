import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, TrendingUp, Users, FileText, Clock, Shield, Loader, Eye, DollarSign, Activity } from 'lucide-react';
import { openaiService, GovernmentStructure, Alert, Bill } from '../services/openai';
import { deepDiveService, DeepDiveResult } from '../services/deepDiveService';
import GovernmentSummary from './GovernmentSummary';
import ActivityFeed from './ActivityFeed';
import GovernmentAnalysis from './GovernmentAnalysis';
import AlertsList from './AlertsList';
import BillTracker from './BillTracker';
import CorruptionMap from './CorruptionMap';
import DeepDiveResults from './DeepDiveResults';
import DeepDivePrompts from './DeepDivePrompts';

const Dashboard = () => {
  const { country } = useParams();
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [governmentData, setGovernmentData] = useState<GovernmentStructure | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [analysisStage, setAnalysisStage] = useState('Initializing comprehensive analysis...');
  const [deepDiveResult, setDeepDiveResult] = useState<DeepDiveResult | null>(null);
  const [deepDiveLoading, setDeepDiveLoading] = useState(false);
  const [showDeepDive, setShowDeepDive] = useState(false);
  const [showAllActivity, setShowAllActivity] = useState(false);
  const [showAllAlerts, setShowAllAlerts] = useState(false);
  const [showAllBills, setShowAllBills] = useState(false);


  useEffect(() => {
    const analyzeGovernment = async () => {
      if (!country) return;

      const location = country.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      
      try {
        setAnalysisStage('Discovering government structure and officials...');
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setAnalysisStage('Analyzing recent legislation and bills...');
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setAnalysisStage('Investigating corruption patterns and risks...');
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setAnalysisStage('Researching political controversies and scandals...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setAnalysisStage('Mapping regional political dynamics...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setAnalysisStage('Generating intelligence report...');
        
        if (import.meta.env.VITE_OPENAI_API_KEY) {
          const analysis = await openaiService.analyzeGovernment(location);
          setGovernmentData(analysis);
        } else {
          // Enhanced demo data
          setGovernmentData({
            country: location,
            displayName: location,
            governmentType: 'Federal Democratic Republic',
            legislativeBodies: ['House of Representatives', 'Senate'],
            currentLeaders: {
              head_of_state: 'President (Demo Mode)',
              head_of_government: 'Prime Minister (Demo Mode)',
              legislature_leader: 'Speaker of the House (Demo Mode)'
            },
            recentActivity: [
              'Infrastructure Modernization Act - Under Committee Review',
              'Digital Privacy Protection Bill - Floor Vote Scheduled',
              'Environmental Protection Amendment - Passed House'
            ],
            corruptionRisk: 67,
            politicalContext: 'Current administration pushing major infrastructure spending while facing scrutiny over contractor selection processes. Opposition raising concerns about transparency in recent legislative procedures.',
            upcomingElections: 'Next general election scheduled for November 2025',
            keyIssues: ['Economic Recovery', 'Climate Policy', 'Digital Rights', 'Healthcare Reform', 'Infrastructure', 'Corporate Accountability'],
            activeBills: [
              {
                id: 'HR-2024-4829',
                title: 'Infrastructure Modernization Act',
                status: 'suspicious',
                stage: 'Committee Review',
                riskScore: 87,
                issues: ['Midnight introduction', 'Unusual contractor provisions', 'Limited review time'],
                description: 'Federal infrastructure spending bill with concerning procurement language',
                dateIntroduced: '2024-01-15',
                sponsor: 'Rep. Johnson (Demo)',
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
                sponsor: 'Sen. Williams (Demo)',
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
                sponsor: 'Rep. Martinez (Demo)',
                summary: 'Provides tax relief and grants for small businesses affected by economic downturn',
                redFlags: [],
                publicSupport: 78,
                lobbyingSpending: 150000
              }
            ],
            alerts: [
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
            ],
            corruptionPatterns: [
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
            ],
            regionalData: [
              {
                name: 'Federal',
                risk: 67,
                alerts: 3,
                trend: 'up',
                population: '330M',
                keyIssues: ['Infrastructure', 'Healthcare']
              },
              {
                name: 'California',
                risk: 45,
                alerts: 1,
                trend: 'stable',
                population: '39M',
                keyIssues: ['Housing', 'Climate']
              },
              {
                name: 'Texas',
                risk: 52,
                alerts: 2,
                trend: 'up',
                population: '30M',
                keyIssues: ['Energy', 'Immigration']
              }
            ]
          });
        }
        
        setAnalysisStage('Finalizing comprehensive report...');
        await new Promise(resolve => setTimeout(resolve, 800));
        
        setAnalysisComplete(true);
      } catch (err) {
        console.error('Analysis error:', err);
        setError('Failed to complete comprehensive analysis. Please try again.');
        setAnalysisComplete(true);
      }
    };

    analyzeGovernment();
  }, [country]);

  const handleDeepDive = async (topic: string) => {
    if (!governmentData) return;

    setDeepDiveLoading(true);
    try {
      if (import.meta.env.VITE_OPENAI_API_KEY) {
        const result = await deepDiveService.conductDeepDive(
          governmentData.displayName,
          topic,
          'country',
          deepDiveResult?.analysis
        );
        setDeepDiveResult(result);
      } else {
        // Demo deep dive result
        const demoResult = deepDiveService.generateDemoDeepDive(governmentData.displayName, topic);
        setDeepDiveResult(demoResult);
      }
      setShowDeepDive(true);
    } catch (err) {
      console.error('Deep dive error:', err);
    } finally {
      setDeepDiveLoading(false);
    }
  };

  const handleActivityClick = (item: any) => {
    const topic = item.type === 'alert' ? 
      `Alert investigation: ${item.title}` : 
      `Bill analysis: ${item.title}`;
    handleDeepDive(topic);
  };

  const handleAlertClick = (alert: Alert) => {
    handleDeepDive(`Alert investigation: ${alert.title}`);
  };

  const handleBillClick = (bill: Bill) => {
    handleDeepDive(`Bill analysis: ${bill.title}`);
  };

  if (!analysisComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center max-w-lg"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-20 h-20 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-8"
          />
          <h2 className="text-3xl font-bold text-white mb-4">
            Conducting Deep Government Analysis
          </h2>
          <motion.p 
            key={analysisStage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-slate-400 mb-6 text-lg"
          >
            {analysisStage}
          </motion.p>
          <div className="bg-slate-800/60 rounded-xl p-6 border border-slate-700">
            <h3 className="text-white font-semibold mb-3">AI Research Process:</h3>
            <div className="space-y-2 text-sm text-slate-300">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Government structure mapping</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Legislative activity analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Corruption pattern detection</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                <span>Regional risk assessment</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
                <span>Alert generation</span>
              </div>
            </div>
          </div>
          {!import.meta.env.VITE_OPENAI_API_KEY && (
            <div className="mt-6 p-4 bg-amber-900/20 border border-amber-600/20 rounded-lg text-left">
              <p className="text-amber-300 text-sm">
                <strong>Demo Mode:</strong> Add your OpenAI API key for real-time comprehensive government analysis.
                Currently showing enhanced sample data.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  if (error || !governmentData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center max-w-md"
        >
          <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Analysis Failed</h2>
          <p className="text-slate-400 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
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
            <span>← Back to {governmentData.displayName} Dashboard</span>
          </button>
        </div>

        <DeepDiveResults
          result={deepDiveResult}
          onNewDeepDive={handleDeepDive}
          onSourceClick={(source) => {
            console.log('Source clicked:', source);
          }}
        />
      </motion.div>
    );
  }

  const suspiciousBills = governmentData.activeBills?.filter(bill => bill.status === 'suspicious').length || 0;
  const totalLobbyingSpending = governmentData.activeBills?.reduce((sum, bill) => sum + bill.lobbyingSpending, 0) || 0;
  const criticalAlerts = governmentData.alerts?.filter(alert => alert.type === 'critical').length || 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      {/* Government Summary */}
      <GovernmentSummary governmentData={governmentData} />

      {/* Deep Dive Prompts */}
      <div className="mb-8">
        <DeepDivePrompts
          location={governmentData.displayName}
          governmentLevel="country"
          onPromptSelect={(prompt) => handleDeepDive(prompt.title)}
        />
      </div>

      {/* Main Dashboard Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Activity Feed (Primary) */}
        <div className="lg:col-span-2 space-y-8">
          <ActivityFeed 
            alerts={showAllActivity ? governmentData.alerts : governmentData.alerts?.slice(0, 5)}
            bills={showAllActivity ? governmentData.activeBills : governmentData.activeBills?.slice(0, 5)}
            maxItems={showAllActivity ? 50 : 10}
            onItemClick={handleActivityClick}
            onViewAll={() => setShowAllActivity(!showAllActivity)}
          />
          
          {/* Secondary content below feed */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <Activity className="h-5 w-5 text-green-400" />
                <span>Quick Stats</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Active Bills</span>
                  <span className="text-white font-semibold">{governmentData.activeBills?.length || 0}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Suspicious Bills</span>
                  <span className="text-red-400 font-semibold">{suspiciousBills}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Critical Alerts</span>
                  <span className="text-red-400 font-semibold">{criticalAlerts}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Lobbying Spending</span>
                  <span className="text-amber-400 font-semibold">
                    ${(totalLobbyingSpending / 1000000).toFixed(1)}M
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <Clock className="h-5 w-5 text-blue-400" />
                <span>Next Updates</span>
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-slate-300">Legislative session in 2 hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                  <span className="text-slate-300">Committee vote tomorrow</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-slate-300">Weekly report in 3 days</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Detailed Analysis */}
        <div className="space-y-8">
          <GovernmentAnalysis governmentData={governmentData} />
          
          {/* Compact Alerts */}
          <AlertsList
            alerts={showAllAlerts ? governmentData.alerts : governmentData.alerts?.slice(0, 3)}
            onAlertClick={handleAlertClick}
            onViewAll={() => setShowAllAlerts(!showAllAlerts)}
          />

          <CorruptionMap 
            regionalData={governmentData.regionalData} 
            corruptionPatterns={governmentData.corruptionPatterns}
          />
        </div>
      </div>

      {/* Full detailed sections below */}
      <div className="mt-12 space-y-8">
        <BillTracker 
          bills={showAllBills ? governmentData.activeBills : governmentData.activeBills?.slice(0, 3)}
          onBillClick={handleBillClick}
          onViewAll={() => setShowAllBills(!showAllBills)}
        />
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
    </motion.div>
  );
};

export default Dashboard;