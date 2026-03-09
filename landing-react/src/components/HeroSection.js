import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Activity, BellRing } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-32 pb-20 overflow-hidden flex items-center bg-background bg-gradient-mesh bg-fixed selection:bg-primary/20">
      
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px] -z-10 mix-blend-multiply" />
      <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-accent/30 rounded-full blur-[120px] -z-10 mix-blend-multiply" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col space-y-8"
          >
            <div className="inline-flex items-center space-x-2 glass rounded-full px-4 py-2 w-max text-sm font-medium text-primary shadow-sm border-primary/10">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>Project Anti-Gravity</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
              Dementia Care, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                Lifted by Intelligence.
              </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-600 max-w-lg leading-relaxed mix-blend-multiply">
              A comprehensive care platform designed with absolute empathy. 
              Reducing cognitive load for patients, and eliminating burnout for caregivers.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="px-8 py-4 bg-primary text-white rounded-2xl font-semibold shadow-widget hover:-translate-y-1 hover:shadow-lg transition-transform duration-300">
                Start Free Trial
              </button>
              <button className="px-8 py-4 glass text-slate-800 rounded-2xl font-semibold hover:bg-white/90 hover:-translate-y-1 transition-all duration-300">
                See How It Works
              </button>
            </div>
          </motion.div>

          {/* Right Column: Floating Overlapping UIs */}
          <div className="relative h-[600px] hidden md:block">
            {/* Main Dashboard Mockup */}
            <motion.div 
              initial={{ opacity: 0, x: 50, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute top-10 right-0 w-[450px] aspect-video glass rounded-3xl p-6 border-white/40 shadow-floating"
            >
              <div className="flex justify-between items-center mb-6">
                <div className="space-y-1">
                  <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Patient Status</h3>
                  <p className="text-2xl font-bold text-slate-900">Resting Safely</p>
                </div>
                <div className="p-3 bg-emerald-100/50 rounded-2xl">
                  <Activity className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
              
              {/* Fake Graph */}
              <div className="h-32 w-full mt-4 flex items-end space-x-2">
                {[40, 70, 45, 90, 60, 30, 80].map((h, i) => (
                  <div key={i} className="flex-1 bg-gradient-to-t from-primary/20 to-primary/5 rounded-t-sm mix-blend-multiply" style={{ height: `${h}%` }}></div>
                ))}
              </div>
            </motion.div>

            {/* Overlapping Mobile App Mockup */}
            <motion.div 
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute -bottom-10 -left-10 w-[280px] h-[550px] bg-slate-900 rounded-[2.5rem] p-2 shadow-2xl border-4 border-slate-800"
            >
              <div className="w-full h-full bg-slate-50 rounded-[2rem] overflow-hidden flex flex-col relative text-center items-center justify-center p-6 space-y-6">
                 {/* Dynamic Island fake */}
                 <div className="absolute top-3 w-1/3 h-5 bg-black rounded-full"></div>
                 
                 <div className="w-24 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <ShieldCheck className="w-12 h-12 text-white" />
                 </div>
                 <div className="space-y-2">
                    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Medicine<br/>Taken</h2>
                    <p className="text-slate-500 text-sm">Updated 2m ago</p>
                 </div>
              </div>
            </motion.div>

            {/* Floating Alert Widget */}
             <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute top-0 -left-5 glass rounded-2xl p-4 flex items-center space-x-4 shadow-floating"
            >
              <div className="p-3 bg-accent-light rounded-2xl">
                <BellRing className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Dr. Appointment</p>
                <p className="text-xs text-slate-500">In 2 Hours</p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
