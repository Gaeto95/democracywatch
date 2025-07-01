import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, FileText, Globe, Users, AlertTriangle, Clock } from 'lucide-react';

interface Source {
  id: string;
  title: string;
  url: string;
  type: 'news' | 'official' | 'analysis' | 'document' | 'social';
  credibility: number;
  date: string;
  summary: string;
  relevance: number;
}

interface SourceLinksProps {
  sources: Source[];
  topic: string;
  location: string;
  onSourceClick?: (source: Source) => void;
}

const SourceLinks: React.FC<SourceLinksProps> = ({ sources, topic, location, onSourceClick }) => {
  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'news': return Globe;
      case 'official': return FileText;
      case 'analysis': return Users;
      case 'document': return FileText;
      case 'social': return Users;
      default: return Globe;
    }
  };

  const getCredibilityColor = (credibility: number) => {
    if (credibility > 80) return 'text-green-400';
    if (credibility > 60) return 'text-amber-400';
    return 'text-red-400';
  };

  const sortedSources = sources.sort((a, b) => b.relevance - a.relevance);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">
          Follow-up Sources: {topic}
        </h3>
        <div className="text-sm text-slate-400">
          {sources.length} sources found
        </div>
      </div>

      <div className="space-y-4">
        {sortedSources.map((source, index) => {
          const SourceIcon = getSourceIcon(source.type);
          
          return (
            <motion.div
              key={source.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onSourceClick?.(source)}
                className="block p-4 bg-slate-700/40 rounded-lg hover:bg-slate-700/60 transition-all duration-200 border border-slate-600 hover:border-blue-500"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-600/20 rounded-lg">
                    <SourceIcon className="h-5 w-5 text-blue-400" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                        {source.title}
                      </h4>
                      <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-blue-400 transition-colors ml-2 flex-shrink-0" />
                    </div>
                    
                    <p className="text-slate-300 text-sm mb-3 line-clamp-2">
                      {source.summary}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 text-slate-500" />
                          <span className="text-slate-400">{source.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-slate-400">Credibility:</span>
                          <span className={`font-medium ${getCredibilityColor(source.credibility)}`}>
                            {source.credibility}%
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="text-slate-400">Relevance:</span>
                          <span className="text-blue-400 font-medium">{source.relevance}%</span>
                        </div>
                      </div>
                      
                      <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                        source.type === 'official' ? 'bg-green-600/20 text-green-400' :
                        source.type === 'news' ? 'bg-blue-600/20 text-blue-400' :
                        source.type === 'analysis' ? 'bg-purple-600/20 text-purple-400' :
                        'bg-slate-600/20 text-slate-400'
                      }`}>
                        {source.type}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6 p-4 bg-blue-900/20 border border-blue-600/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-blue-400 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-400 mb-1">Deep Dive Available</h4>
            <p className="text-slate-300 text-sm">
              Click any source to read the full article. Our AI will analyze new sources 
              and provide additional context as you explore deeper into {location}'s political landscape.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SourceLinks;