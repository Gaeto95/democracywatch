import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const CountryAnalysis = () => {
  const { countryCode } = useParams();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <h1 className="text-3xl font-bold text-white">
        Country Analysis: {countryCode}
      </h1>
      <p className="text-slate-400 mt-2">
        Detailed country analysis will be implemented here.
      </p>
    </motion.div>
  );
};

export default CountryAnalysis;