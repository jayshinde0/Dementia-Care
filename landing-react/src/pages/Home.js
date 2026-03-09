import React from 'react';
import HeroSection from '../components/HeroSection';
import BentoFeatures from '../components/BentoFeatures';
import { motion } from 'framer-motion';
import { ShieldAlert, Lightbulb, Users, Activity, BarChart, Clock } from 'lucide-react';

const Home = () => {
  const steps = [
    { number: 1, title: 'Setup Profile', description: 'Create patient profiles with medical history, preferences, and care requirements' },
    { number: 2, title: 'AI Analysis', description: 'Our AI continuously monitors activities, behaviors, and health patterns' },
    { number: 3, title: 'Smart Alerts', description: 'Receive real-time notifications for medications, anomalies, and emergencies' },
    { number: 4, title: 'Monitor & Care', description: 'Access comprehensive insights and analytics through the caregiver dashboard' }
  ];

  const impacts = [
    { number: '85%', label: 'Improved medication adherence', icon: <Activity className="w-8 h-8 text-primary" /> },
    { number: '70%', label: 'Reduced caregiver stress', icon: <Users className="w-8 h-8 text-primary" /> },
    { number: '90%', label: 'Faster emergency response', icon: <ShieldAlert className="w-8 h-8 text-primary" /> },
    { number: '24/7', label: 'Continuous monitoring', icon: <Clock className="w-8 h-8 text-primary" /> }
  ];

  return (
    <div className="min-h-screen bg-background text-slate-800 font-sans">
      
      {/* 1. Hero / Main CTA Section */}
      <HeroSection />

      {/* 2. Problem & Solution Section */}
      <section className="py-24 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass-dark rounded-3xl p-10 text-white">
              <div className="p-3 bg-white/10 rounded-2xl w-max mb-6">
                <ShieldAlert className="w-6 h-6 text-alert-light" />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight">The Challenge</h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Caring for dementia patients requires constant attention, medication management, and safety monitoring. Caregivers often feel overwhelmed managing multiple responsibilities.
              </p>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-alert-DEFAULT"></span>
                  <span>Medication adherence tracking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-alert-DEFAULT"></span>
                  <span>Safety and wandering concerns</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-alert-DEFAULT"></span>
                  <span>Behavioral pattern monitoring</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-alert-DEFAULT"></span>
                  <span>Caregiver stress and burnout</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass bg-primary-light/5 border-primary/20 rounded-3xl p-10">
              <div className="p-3 bg-primary/10 rounded-2xl w-max mb-6">
                <Lightbulb className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight text-slate-900">Our Solution</h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                An intelligent platform that combines AI-powered insights with user-friendly interfaces to provide comprehensive support.
              </p>
              <ul className="space-y-3 text-slate-700 font-medium">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                  <span>Automated smart reminders</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                  <span>Real-time location tracking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                  <span>AI behavior analysis</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
                  <span>Caregiver dashboard & alerts</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Main Features Bento Grid (Contains previous feature data conceptually) */}
      <BentoFeatures />

      {/* 4. Process / How It Works */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">How It Works</h2>
            <p className="text-lg text-slate-500">Simple, effective, and intelligent care in four steps</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="relative">
                <div className="text-6xl font-black text-slate-200 absolute -top-10 -left-4 -z-10">{step.number}</div>
                <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 h-full flex flex-col justify-center hover:shadow-xl transition-shadow duration-300">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Impact */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">Making a Difference</h2>
            <p className="text-lg text-slate-500">Real impact on patient care and caregiver wellbeing</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {impacts.map((impact, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-[2.5rem] text-center hover:bg-primary/5 transition-colors">
                <div className="mb-4 p-4 bg-white rounded-2xl shadow-sm">
                  {impact.icon}
                </div>
                <div className="text-4xl font-black text-slate-900 tracking-tighter mb-2">{impact.number}</div>
                <div className="text-sm font-semibold text-slate-500 px-2">{impact.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Simple CTA Bottom Section */}
      <section className="py-24 relative overflow-hidden bg-primary text-center pb-32">
         <div className="absolute top-0 right-0 w-96 h-96 bg-primary-light/20 blur-[100px] rounded-full mix-blend-overlay"></div>
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-dark/50 blur-[100px] rounded-full mix-blend-overlay"></div>
         
         <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Ready to Transform Care?
            </h2>
            <p className="text-xl text-primary-light mb-10 max-w-2xl">
              Join thousands of families utilizing intelligent support systems. Reduce cognitive load, improve safety, and restore peace of mind.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-white text-primary rounded-2xl font-bold shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
                Start Free Trial
              </button>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;
