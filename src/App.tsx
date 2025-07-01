import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import StateDashboard from './components/StateDashboard';
import CityDashboard from './components/CityDashboard';
import CountryAnalysis from './components/CountryAnalysis';
import PricingPage from './components/PricingPage';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Header />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/dashboard/:country?" element={<Dashboard />} />
            <Route path="/dashboard/:country/:state" element={<StateDashboard />} />
            <Route path="/dashboard/:country/:state/:city" element={<CityDashboard />} />
            <Route path="/country/:countryCode" element={<CountryAnalysis />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;