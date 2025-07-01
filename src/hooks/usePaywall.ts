import { useState, useEffect } from 'react';

interface UsageData {
  deepDivesUsed: number;
  deepDivesLimit: number;
  planName: string;
  planTier: 'free' | 'pro' | 'premium' | 'enterprise';
  alertsEnabled: boolean;
  resetDate: string;
}

export const usePaywall = () => {
  const [usage, setUsage] = useState<UsageData>({
    deepDivesUsed: 2, // Demo: user has used 2 out of 3
    deepDivesLimit: 3,
    planName: 'Citizen Watchdog',
    planTier: 'free',
    alertsEnabled: false,
    resetDate: '2024-02-01'
  });

  const [showPaywall, setShowPaywall] = useState(false);
  const [paywallFeature, setPaywallFeature] = useState('');

  const checkFeatureAccess = (feature: string): boolean => {
    switch (feature) {
      case 'deep-dive':
        if (usage.planTier === 'free' && usage.deepDivesUsed >= usage.deepDivesLimit) {
          setPaywallFeature('Deep Dive Investigation');
          setShowPaywall(true);
          return false;
        }
        return true;
      
      case 'real-time-alerts':
        if (usage.planTier === 'free') {
          setPaywallFeature('Real-time Alerts');
          setShowPaywall(true);
          return false;
        }
        return true;
      
      case 'historical-analysis':
        if (usage.planTier === 'free') {
          setPaywallFeature('Historical Analysis');
          setShowPaywall(true);
          return false;
        }
        return true;
      
      case 'api-access':
        if (!['premium', 'enterprise'].includes(usage.planTier)) {
          setPaywallFeature('API Access');
          setShowPaywall(true);
          return false;
        }
        return true;
      
      default:
        return true;
    }
  };

  const incrementUsage = (feature: string) => {
    if (feature === 'deep-dive' && usage.planTier === 'free') {
      setUsage(prev => ({
        ...prev,
        deepDivesUsed: prev.deepDivesUsed + 1
      }));
    }
  };

  const closePaywall = () => {
    setShowPaywall(false);
    setPaywallFeature('');
  };

  const upgradePlan = (newTier: 'pro' | 'premium' | 'enterprise') => {
    const planData = {
      pro: {
        planName: 'Democracy Investigator',
        deepDivesLimit: Infinity,
        alertsEnabled: true
      },
      premium: {
        planName: 'Transparency Champion',
        deepDivesLimit: Infinity,
        alertsEnabled: true
      },
      enterprise: {
        planName: 'Media & NGO',
        deepDivesLimit: Infinity,
        alertsEnabled: true
      }
    };

    setUsage(prev => ({
      ...prev,
      planTier: newTier,
      ...planData[newTier]
    }));
    
    closePaywall();
  };

  return {
    usage,
    showPaywall,
    paywallFeature,
    checkFeatureAccess,
    incrementUsage,
    closePaywall,
    upgradePlan
  };
};