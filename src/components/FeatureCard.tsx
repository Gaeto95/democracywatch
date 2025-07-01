import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, color, index }) => {
  const colorMap = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    amber: 'from-amber-500 to-amber-600',
    purple: 'from-purple-500 to-purple-600',
    red: 'from-red-500 to-red-600'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="bg-slate-800/60 backdrop-blur-md rounded-2xl p-8 border border-slate-700 hover:border-slate-600 transition-all duration-300 group"
    >
      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${colorMap[color]} mb-6 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      
      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      
      <p className="text-slate-300 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;