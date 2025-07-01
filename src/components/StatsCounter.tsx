import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface StatsCounterProps {
  end: number;
  label: string;
  suffix?: string;
}

const StatsCounter: React.FC<StatsCounterProps> = ({ end, label, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center group"
    >
      <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-slate-300 text-sm font-medium">{label}</div>
    </motion.div>
  );
};

export default StatsCounter;