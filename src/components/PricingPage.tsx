import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Users, Zap, Crown, Building, ArrowRight } from 'lucide-react';

const PricingPage = () => {
  const plans = [
    {
      name: 'Citizen Watchdog',
      subtitle: 'For concerned citizens',
      price: 'Free',
      period: 'forever',
      icon: Users,
      color: 'blue',
      features: [
        'Basic government analysis for any location',
        '3 deep dive investigations per month',
        'Standard alerts and bill tracking',
        'Access to public corruption patterns',
        'Community features and discussions',
        'Mobile app access'
      ],
      limitations: [
        'Limited deep dive investigations',
        'Daily alert summaries only',
        'Basic export options'
      ]
    },
    {
      name: 'Democracy Investigator',
      subtitle: 'For active citizens & journalists',
      price: '$9.99',
      period: 'per month',
      icon: Zap,
      color: 'purple',
      popular: true,
      features: [
        'Everything in Citizen Watchdog',
        'Unlimited deep dive investigations',
        'Advanced AI analysis with higher confidence',
        'Real-time alerts and notifications',
        'Historical trend analysis (5 years)',
        'Export reports and data',
        'Priority customer support',
        'Early access to new features'
      ],
      savings: 'Most popular choice'
    },
    {
      name: 'Transparency Champion',
      subtitle: 'For organizations & power users',
      price: '$24.99',
      period: 'per month',
      icon: Crown,
      color: 'amber',
      features: [
        'Everything in Democracy Investigator',
        'Multi-location monitoring dashboard',
        'Custom alert keywords and triggers',
        'API access for developers',
        'Collaboration tools for teams',
        'Advanced analytics and visualizations',
        'White-label reports',
        'Bulk data exports',
        'Custom integrations'
      ],
      savings: 'Best for organizations'
    },
    {
      name: 'Media & NGO',
      subtitle: 'For newsrooms & advocacy groups',
      price: '$99',
      period: 'per month',
      icon: Building,
      color: 'green',
      features: [
        'Everything in Transparency Champion',
        'Unlimited team members',
        'Bulk location monitoring',
        'Advanced team collaboration',
        'Custom data feeds',
        'Dedicated account manager',
        'Press-ready reports and graphics',
        'Custom branding options',
        'SLA guarantees'
      ],
      contact: true
    }
  ];

  const testimonials = [
    {
      quote: "Democracy Watch helped us expose a $50M corruption scheme in our city. The deep dive feature is incredible.",
      author: "Sarah Chen",
      role: "Investigative Journalist",
      outlet: "Metro Daily News"
    },
    {
      quote: "As a citizen activist, this platform gives me the tools to hold our representatives accountable.",
      author: "Marcus Rodriguez",
      role: "Community Organizer",
      outlet: "Citizens for Transparency"
    },
    {
      quote: "The API integration allows us to incorporate real-time corruption data into our advocacy campaigns.",
      author: "Dr. Amanda Foster",
      role: "Research Director",
      outlet: "Democracy Institute"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Choose Your
              <span className="block text-blue-400">Democracy Plan</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              From concerned citizens to investigative journalists - we have the right tools 
              for every level of government transparency work.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-slate-400">
              <span>✓ 30-day money-back guarantee</span>
              <span>✓ Cancel anytime</span>
              <span>✓ Secure payment</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {plans.map((plan, index) => {
              const PlanIcon = plan.icon;
              
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-slate-800/60 rounded-2xl border-2 p-8 ${
                    plan.popular 
                      ? 'border-purple-500 bg-purple-900/20' 
                      : 'border-slate-700'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Star className="h-4 w-4" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}

                  <div className="text-center mb-8">
                    <div className={`inline-flex p-4 rounded-2xl mb-4 ${
                      plan.color === 'blue' ? 'bg-blue-600/20' :
                      plan.color === 'purple' ? 'bg-purple-600/20' :
                      plan.color === 'amber' ? 'bg-amber-600/20' : 'bg-green-600/20'
                    }`}>
                      <PlanIcon className={`h-8 w-8 ${
                        plan.color === 'blue' ? 'text-blue-400' :
                        plan.color === 'purple' ? 'text-purple-400' :
                        plan.color === 'amber' ? 'text-amber-400' : 'text-green-400'
                      }`} />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-slate-400 text-sm mb-4">{plan.subtitle}</p>
                    
                    <div className="mb-2">
                      <span className="text-4xl font-bold text-white">{plan.price}</span>
                      {plan.period && (
                        <span className="text-slate-400 ml-2">/{plan.period}</span>
                      )}
                    </div>
                    
                    {plan.savings && (
                      <div className="text-sm text-green-400 font-medium">{plan.savings}</div>
                    )}
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.limitations && (
                      <div className="pt-4 border-t border-slate-700">
                        <p className="text-slate-500 text-xs mb-2">Limitations:</p>
                        {plan.limitations.map((limitation, limitIndex) => (
                          <div key={limitIndex} className="flex items-start space-x-3">
                            <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-1 h-1 bg-slate-500 rounded-full"></div>
                            </div>
                            <span className="text-slate-500 text-xs">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <button
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 ${
                      plan.contact
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : plan.popular
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : plan.price === 'Free'
                        ? 'bg-slate-700 hover:bg-slate-600 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    {plan.contact ? 'Contact Sales' : plan.price === 'Free' ? 'Get Started' : 'Start Free Trial'}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Trusted by Democracy Defenders
            </h2>
            <p className="text-xl text-slate-300">
              See how citizens, journalists, and organizations use Democracy Watch
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
              >
                <p className="text-slate-300 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm text-slate-400">{testimonial.role}</div>
                  <div className="text-sm text-blue-400">{testimonial.outlet}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                question: "What happens when I reach my deep dive limit?",
                answer: "On the free plan, you'll see a paywall modal when you've used all 3 monthly deep dives. You can upgrade anytime to get unlimited access."
              },
              {
                question: "Can I cancel my subscription anytime?",
                answer: "Yes, you can cancel your subscription at any time. You'll continue to have access to paid features until the end of your billing period."
              },
              {
                question: "Do you offer discounts for students or nonprofits?",
                answer: "Yes! We offer 50% discounts for verified students and qualifying nonprofit organizations. Contact us for details."
              },
              {
                question: "Is my payment information secure?",
                answer: "Absolutely. We use Stripe for payment processing, which is PCI DSS compliant and used by millions of businesses worldwide."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-slate-800/60 rounded-xl p-6 border border-slate-700"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                <p className="text-slate-300">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Expose Government Corruption?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join thousands of citizens, journalists, and organizations fighting for transparency.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2 mx-auto">
              <span>Start Your Free Trial</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;