import React from 'react';
import { motion } from 'framer-motion';
import { X, Zap, Users, Crown, Building, Check, Star } from 'lucide-react';

interface PaywallModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
  currentUsage?: {
    deepDives: number;
    limit: number;
  };
}

const PaywallModal: React.FC<PaywallModalProps> = ({ 
  isOpen, 
  onClose, 
  feature,
  currentUsage 
}) => {
  if (!isOpen) return null;

  const plans = [
    {
      name: 'Citizen Watchdog',
      price: 'Free',
      icon: Users,
      color: 'blue',
      features: [
        'Basic government analysis',
        '3 deep dives per month',
        'Standard alerts',
        'Public corruption patterns',
        'Community features'
      ],
      current: true
    },
    {
      name: 'Democracy Investigator',
      price: '$9.99/mo',
      icon: Zap,
      color: 'purple',
      popular: true,
      features: [
        'Unlimited deep dives',
        'Advanced AI analysis',
        'Real-time alerts',
        'Historical trends',
        'Export reports',
        'Priority support'
      ]
    },
    {
      name: 'Transparency Champion',
      price: '$24.99/mo',
      icon: Crown,
      color: 'amber',
      features: [
        'Everything in Pro',
        'Multi-location monitoring',
        'Custom alert keywords',
        'API access',
        'Collaboration tools',
        'Advanced analytics'
      ]
    },
    {
      name: 'Media & NGO',
      price: '$99/mo',
      icon: Building,
      color: 'green',
      features: [
        'Everything in Premium',
        'Bulk monitoring',
        'Team collaboration',
        'Custom integrations',
        'Dedicated support',
        'Press-ready reports'
      ]
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-slate-800 rounded-xl border border-slate-700 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Unlock Deeper Democracy Intelligence
              </h2>
              <p className="text-slate-400">
                You've reached the limit for: <span className="text-blue-400 font-medium">{feature}</span>
              </p>
              {currentUsage && (
                <div className="mt-2 text-sm text-slate-500">
                  Deep dives used this month: {currentUsage.deepDives}/{currentUsage.limit}
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan, index) => {
              const PlanIcon = plan.icon;
              
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative p-6 rounded-xl border-2 transition-all duration-200 ${
                    plan.current 
                      ? 'border-slate-600 bg-slate-700/40' 
                      : plan.popular
                      ? 'border-purple-500 bg-purple-900/20 hover:border-purple-400'
                      : 'border-slate-600 bg-slate-700/20 hover:border-slate-500'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                        <Star className="h-3 w-3" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-6">
                    <div className={`inline-flex p-3 rounded-xl mb-4 ${
                      plan.color === 'blue' ? 'bg-blue-600/20' :
                      plan.color === 'purple' ? 'bg-purple-600/20' :
                      plan.color === 'amber' ? 'bg-amber-600/20' : 'bg-green-600/20'
                    }`}>
                      <PlanIcon className={`h-6 w-6 ${
                        plan.color === 'blue' ? 'text-blue-400' :
                        plan.color === 'purple' ? 'text-purple-400' :
                        plan.color === 'amber' ? 'text-amber-400' : 'text-green-400'
                      }`} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
                    <div className="text-2xl font-bold text-white">{plan.price}</div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    disabled={plan.current}
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                      plan.current
                        ? 'bg-slate-600 text-slate-400 cursor-not-allowed'
                        : plan.popular
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {plan.current ? 'Current Plan' : 'Upgrade Now'}
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* Value Proposition */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-600/20 rounded-lg">
            <h3 className="text-lg font-bold text-white mb-3">Why Upgrade?</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-blue-400 mb-2">Unlimited Investigation</h4>
                <p className="text-slate-300">
                  Conduct unlimited deep dives into any government activity. No monthly limits.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-purple-400 mb-2">Real-time Alerts</h4>
                <p className="text-slate-300">
                  Get instant notifications when suspicious activity is detected in your area.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-amber-400 mb-2">Advanced Analytics</h4>
                <p className="text-slate-300">
                  Access historical trends, pattern analysis, and predictive insights.
                </p>
              </div>
            </div>
          </div>

          {/* Money Back Guarantee */}
          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">
              30-day money-back guarantee • Cancel anytime • Secure payment
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaywallModal;