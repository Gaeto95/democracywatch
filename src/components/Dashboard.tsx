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
              'H.R. 2024-7832: Artificial Intelligence Safety and Innovation Act - Committee markup scheduled',
              'S. 2024-4156: Climate Resilience Infrastructure Investment Act ($847B) - Senate floor debate',
              'H.R. 2024-9234: Secure Border and Immigration Reform Act - Passed House 247-182',
              'S. 2024-3421: Medicare Drug Price Negotiation Expansion Act - Committee review',
              'H.R. 2024-6789: Small Business AI Tax Credit Act - Markup completed'
            ],
            corruptionRisk: 67,
            politicalContext: 'Current administration pushing major AI regulation and climate infrastructure spending while facing intense scrutiny over defense contractor relationships. Bipartisan concerns emerging over midnight amendments to spending bills. Recent lobbying disclosure gaps raising transparency questions.',
            upcomingElections: 'Presidential election November 2024, Congressional midterms November 2026',
            keyIssues: ['AI Regulation', 'Climate Infrastructure', 'Immigration Reform', 'Healthcare Costs', 'Defense Spending', 'Corporate Tax Policy'],
            activeBills: [
              {
                id: 'HR-2024-7832',
                title: 'Artificial Intelligence Safety and Innovation Act',
                status: 'suspicious',
                stage: 'Committee Markup',
                riskScore: 89,
                issues: ['Tech industry exemptions', 'Rushed timeline', 'Limited public input'],
                description: 'Comprehensive AI regulation framework with concerning industry carve-outs',
                dateIntroduced: '2024-02-14',
                sponsor: 'Rep. Sarah Chen (D-CA)',
                summary: 'Establishes AI safety standards but includes broad exemptions for major tech companies',
                redFlags: ['Major tech companies wrote key provisions', 'Exempts existing AI systems', 'Weak enforcement mechanisms'],
                publicSupport: 28,
                lobbyingSpending: 8700000
              },
              {
                id: 'S-2024-4156',
                title: 'Climate Resilience Infrastructure Investment Act',
                status: 'monitoring',
                stage: 'Senate Floor',
                riskScore: 42,
                issues: ['Regional favoritism', 'Contractor pre-selection'],
                description: '$847B climate infrastructure package with geographic allocation concerns',
                dateIntroduced: '2024-01-28',
                sponsor: 'Sen. Michael Torres (D-NM)',
                summary: 'Massive climate infrastructure investment with questionable regional distribution formulas',
                redFlags: ['Favors specific states', 'Pre-approved contractor lists'],
                publicSupport: 67,
                lobbyingSpending: 12400000
              },
              {
                id: 'HR-2024-9234',
                title: 'Secure Border and Immigration Reform Act',
                status: 'monitoring',
                stage: 'Senate Committee',
                riskScore: 56,
                issues: ['Enforcement contractor benefits', 'Technology vendor favoritism'],
                description: 'Border security enhancement with concerning contractor provisions',
                dateIntroduced: '2024-03-05',
                sponsor: 'Rep. James Rodriguez (R-TX)',
                summary: '$23B border security package with pre-selected technology vendors',
                redFlags: ['No-bid contracts for surveillance tech', 'Vendor lobbying connections'],
                publicSupport: 51,
                lobbyingSpending: 5600000
              },
              {
                id: 'S-2024-3421',
                title: 'Medicare Drug Price Negotiation Expansion Act',
                status: 'clear',
                stage: 'Committee Review',
                riskScore: 18,
                issues: [],
                description: 'Medicare drug price negotiation expansion with transparent provisions',
                dateIntroduced: '2024-02-22',
                sponsor: 'Sen. Elizabeth Warren (D-MA)',
                summary: 'Expands Medicare drug price negotiation to 50 additional medications',
                redFlags: [],
                publicSupport: 84,
                lobbyingSpending: 890000
              },
              {
                id: 'HR-2024-6789',
                title: 'Small Business AI Tax Credit Act',
                status: 'clear',
                stage: 'House Floor',
                riskScore: 22,
                issues: ['Definition ambiguity'],
                description: 'Tax credits for small businesses adopting AI technologies',
                dateIntroduced: '2024-03-12',
                sponsor: 'Rep. Lisa Park (R-OH)',
                summary: 'Provides 25% tax credit for small businesses implementing AI solutions under $100K',
                redFlags: ['Broad AI definition could be exploited'],
                publicSupport: 72,
                lobbyingSpending: 340000
              },
              {
                id: 'S-2024-5678',
                title: 'Defense Contractor Transparency Act',
                status: 'suspicious',
                stage: 'Committee Review',
                riskScore: 78,
                issues: ['Industry-written exemptions', 'Weak disclosure requirements'],
                description: 'Defense contractor oversight with concerning loopholes',
                dateIntroduced: '2024-02-08',
                sponsor: 'Sen. Robert Hayes (R-SC)',
                summary: 'Requires defense contractor transparency but includes major exemptions',
                redFlags: ['Defense industry wrote key sections', 'Exempts classified contracts', 'No penalty enforcement'],
                publicSupport: 39,
                lobbyingSpending: 15200000
              }
            ],
            alerts: [
              {
                id: 1,
                type: 'critical',
                title: 'AI Bill Industry Influence Alert',
                description: 'H.R. 7832 AI Safety Act contains provisions written directly by tech industry lobbyists',
                time: '4 hours ago',
                confidence: 94,
                source: 'Legislative tracking',
                actionRequired: true,
                relatedBills: ['HR-2024-7832']
              },
              {
                id: 2,
                type: 'warning',
                title: 'Defense Spending Irregularity',
                description: 'S. 5678 Defense Transparency Act weakened after $15M lobbying surge',
                time: '8 hours ago',
                confidence: 87,
                source: 'Pattern detection',
                actionRequired: true,
                relatedBills: ['S-2024-5678']
              },
              {
                id: 3,
                type: 'info',
                title: 'Climate Bill Regional Bias',
                description: 'S. 4156 Climate Infrastructure disproportionately benefits sponsor\'s home state',
                time: '1 day ago',
                confidence: 79,
                source: 'Geographic analysis',
                actionRequired: false,
                relatedBills: ['S-2024-4156']
              }
            ],
            corruptionPatterns: [
              {
                type: 'Industry-Written Legislation',
                description: 'Bills containing provisions written directly by industry lobbyists',
                severity: 'high',
                instances: 8,
                trend: 'increasing',
                examples: ['AI Safety Act tech exemptions', 'Defense transparency loopholes']
              },
              {
                type: 'Lobbying Surge Correlation',
                description: 'Bill modifications following major lobbying expenditure spikes',
                severity: 'medium',
                instances: 15,
                trend: 'increasing',
                examples: ['Defense bill weakened after $15M surge', 'Climate bill regional changes after state lobbying']
              }
            ],
            regionalData: [
              {
                name: 'Federal',
                risk: 67,
                alerts: 5,
                trend: 'up',
                population: '330M',
                keyIssues: ['AI Regulation', 'Defense Spending']
              },
              {
                name: 'California',
                risk: 52,
                alerts: 2,
                trend: 'stable',
                population: '39M',
                keyIssues: ['Tech Regulation', 'Climate Policy']
              },
              {
                name: 'Texas',
                risk: 58,
                alerts: 3,
                trend: 'up',
                population: '30M',
                keyIssues: ['Border Security', 'Energy Infrastructure']
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