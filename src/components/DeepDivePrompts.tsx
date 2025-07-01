import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Search, Zap, Target, TrendingUp, Users, Building } from 'lucide-react';

interface DeepDivePrompt {
  id: string;
  title: string;
  description: string;
  category: 'investigation' | 'analysis' | 'tracking' | 'comparison';
  complexity: 'basic' | 'intermediate' | 'advanced';
  estimatedTime: string;
  icon: React.ComponentType<any>;
}

interface DeepDivePromptsProps {
  location: string;
  governmentLevel: 'country' | 'state' | 'city';
  currentTopic?: string;
  onPromptSelect: (prompt: DeepDivePrompt) => void;
}

const DeepDivePrompts: React.FC<DeepDivePromptsProps> = ({ 
  location, 
  governmentLevel, 
  currentTopic,
  onPromptSelect 
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const generatePrompts = (): DeepDivePrompt[] => {
    const basePrompts: DeepDivePrompt[] = [
      {
        id: 'follow-money',
        title: 'Follow the Money Trail',
        description: `Trace financial flows and lobbying spending in ${location}. Who's funding what?`,
        category: 'investigation',
        complexity: 'advanced',
        estimatedTime: '5-10 min',
        icon: TrendingUp
      },
      {
        id: 'voting-patterns',
        title: 'Analyze Voting Patterns',
        description: `Deep dive into how officials in ${location} vote and what influences their decisions.`,
        category: 'analysis',
        complexity: 'intermediate',
        estimatedTime: '3-5 min',
        icon: Target
      },
      {
        id: 'compare-regions',
        title: 'Compare with Similar Regions',
        description: `How does ${location} compare to similar ${governmentLevel}s in corruption and governance?`,
        category: 'comparison',
        complexity: 'basic',
        estimatedTime: '2-3 min',
        icon: Users
      },
      {
        id: 'track-legislation',
        title: 'Track Active Legislation',
        description: `Monitor all current bills and policies moving through ${location}'s government.`,
        category: 'tracking',
        complexity: 'intermediate',
        estimatedTime: '4-6 min',
        icon: Building
      }
    ];

    // Add level-specific prompts
    if (governmentLevel === 'city') {
      basePrompts.push(
        {
          id: 'development-projects',
          title: 'Development & Zoning Deep Dive',
          description: `Investigate development projects, zoning changes, and real estate interests in ${location}.`,
          category: 'investigation',
          complexity: 'advanced',
          estimatedTime: '6-8 min',
          icon: Building
        },
        {
          id: 'local-contracts',
          title: 'Municipal Contracts Analysis',
          description: `Examine city contracts, vendor relationships, and procurement processes.`,
          category: 'investigation',
          complexity: 'intermediate',
          estimatedTime: '4-6 min',
          icon: Search
        }
      );
    } else if (governmentLevel === 'state') {
      basePrompts.push(
        {
          id: 'state-federal-alignment',
          title: 'State vs Federal Policy Alignment',
          description: `Analyze how ${location} state policies align or conflict with federal initiatives.`,
          category: 'analysis',
          complexity: 'intermediate',
          estimatedTime: '4-5 min',
          icon: Target
        },
        {
          id: 'interstate-influence',
          title: 'Interstate Political Influence',
          description: `Investigate cross-state political coordination and influence networks.`,
          category: 'investigation',
          complexity: 'advanced',
          estimatedTime: '7-10 min',
          icon: Users
        }
      );
    } else {
      basePrompts.push(
        {
          id: 'international-influence',
          title: 'Foreign Influence Investigation',
          description: `Examine foreign lobbying, international agreements, and external political influence.`,
          category: 'investigation',
          complexity: 'advanced',
          estimatedTime: '8-12 min',
          icon: Search
        },
        {
          id: 'democratic-health',
          title: 'Democratic Health Assessment',
          description: `Comprehensive analysis of democratic institutions and their effectiveness.`,
          category: 'analysis',
          complexity: 'advanced',
          estimatedTime: '10-15 min',
          icon: Zap
        }
      );
    }

    return basePrompts;
  };

  const prompts = generatePrompts();
  const filteredPrompts = selectedCategory === 'all' 
    ? prompts 
    : prompts.filter(p => p.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'investigation': return 'text-red-400';
      case 'analysis': return 'text-blue-400';
      case 'tracking': return 'text-green-400';
      case 'comparison': return 'text-purple-400';
      default: return 'text-slate-400';
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'basic': return 'text-green-400';
      case 'intermediate': return 'text-amber-400';
      case 'advanced': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">
          Deep Dive Options for {location}
        </h3>
        <div className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-yellow-400" />
          <span className="text-sm text-slate-400">AI-Powered Investigation</span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {['all', 'investigation', 'analysis', 'tracking', 'comparison'].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Prompts Grid */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredPrompts.map((prompt, index) => {
            const PromptIcon = prompt.icon;
            
            return (
              <motion.button
                key={prompt.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onPromptSelect(prompt)}
                className="w-full p-4 bg-slate-700/40 rounded-lg hover:bg-slate-700/60 transition-all duration-200 border border-slate-600 hover:border-blue-500 group text-left"
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${
                    prompt.category === 'investigation' ? 'bg-red-600/20' :
                    prompt.category === 'analysis' ? 'bg-blue-600/20' :
                    prompt.category === 'tracking' ? 'bg-green-600/20' :
                    'bg-purple-600/20'
                  }`}>
                    <PromptIcon className={`h-5 w-5 ${getCategoryColor(prompt.category)}`} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                        {prompt.title}
                      </h4>
                      <ChevronRight className="h-5 w-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                    
                    <p className="text-slate-300 text-sm mb-3">
                      {prompt.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-4">
                        <span className={`font-medium ${getCategoryColor(prompt.category)}`}>
                          {prompt.category.toUpperCase()}
                        </span>
                        <span className={`font-medium ${getComplexityColor(prompt.complexity)}`}>
                          {prompt.complexity.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-slate-400">
                        Est. {prompt.estimatedTime}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-600/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Target className="h-5 w-5 text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-400 mb-1">Continuous Investigation</h4>
            <p className="text-slate-300 text-sm">
              Each deep dive generates new leads and follow-up questions. The deeper you go, 
              the more our AI uncovers about {location}'s political landscape.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DeepDivePrompts;