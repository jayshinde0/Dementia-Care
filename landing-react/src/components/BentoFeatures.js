import React from 'react';
import { motion } from 'framer-motion';
import { Map, Clock, BrainCircuit, HeartPulse, Activity } from 'lucide-react';

const BentoFeatures = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -z-10 skew-x-12" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center md:text-left mb-16 max-w-2xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
            A New Dimension of Care.
          </h2>
          <p className="text-lg text-slate-500">
            Purpose-built tools designed to dramatically reduce caregiver cognitive load while maximizing patient safety.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]">
          
          {/* Card 1: Wandering Detection (Large/Wide) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-[2rem] bg-slate-900 p-8 shadow-xl flex flex-col justify-end border border-slate-800"
          >
            {/* Dark Mode Map Background Fake */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-black mix-blend-overlay"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 bg-emerald-500/10 rounded-full flex items-center justify-center animate-pulse">
                     <div className="w-32 h-32 bg-emerald-500/20 rounded-full flex items-center justify-center">
                         <div className="w-4 h-4 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.8)]"></div>
                     </div>
                </div>
            </div>

            <div className="relative z-10 transition-transform duration-500 group-hover:translate-y-[-10px]">
              <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl w-max mb-4">
                <Map className="w-6 h-6 text-emerald-300" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">Wandering Detection</h3>
              <p className="text-slate-400 max-w-sm">
                Set intelligent safe zones. If a patient leaves the boundary, you are instantly notified with live GPS tracking.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Smart Reminders (Tall) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-1 md:row-span-2 group relative overflow-hidden rounded-[2rem] bg-accent-light p-8 shadow-lg flex flex-col"
          >
             <div className="p-3 bg-white rounded-2xl w-max mb-6 shadow-sm">
               <Clock className="w-6 h-6 text-accent" />
             </div>
             
             <div className="flex-1 space-y-4 relative w-full">
                {/* Timeline Fake UI */}
                <div className="absolute left-[11px] top-2 bottom-0 w-px bg-white"></div>
                
                {[
                  { time: '08:00 AM', text: 'Morning Meds', done: true },
                  { time: '12:30 PM', text: 'Lunch', done: true },
                  { time: '04:00 PM', text: 'Hydration', done: false, active: true },
                ].map((item, i) => (
                  <div key={i} className="flex relative items-start space-x-4">
                     <div className={`w-6 h-6 z-10 rounded-full flex-shrink-0 border-4 border-accent-light ${item.done ? 'bg-primary' : item.active ? 'bg-white shadow-[0_0_0_2px_rgba(233,213,255,1)] animate-pulse' : 'bg-white'}`}></div>
                     <div>
                       <p className={`text-sm font-bold ${item.active ? 'text-slate-900' : 'text-slate-500'}`}>{item.text}</p>
                       <p className="text-xs text-slate-400 font-medium">{item.time}</p>
                     </div>
                  </div>
                ))}
             </div>

            <div className="mt-8 relative z-10 transition-transform duration-500 group-hover:translate-y-[-5px]">
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">Smart Timelines</h3>
            </div>
          </motion.div>

          {/* Card 3: AI Insights (Small Square) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-[2rem] bg-white border border-slate-100 p-6 shadow-lg flex flex-col justify-between"
          >
            <div className="p-3 bg-primary/10 rounded-2xl w-max">
               <BrainCircuit className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-1">AI Insights</h3>
              <p className="text-sm text-slate-500">Predictive behavior analysis.</p>
            </div>
            {/* Decorative Background */}
            <div className="absolute -bottom-8 -right-8 opacity-5">
              <BrainCircuit className="w-32 h-32 text-slate-900" />
            </div>
          </motion.div>

          {/* Card 4: Vitals (Small Square) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-1 md:row-span-1 group relative overflow-hidden rounded-[2rem] bg-alert-light p-6 shadow-lg flex flex-col justify-between"
          >
            <div className="flex justify-between items-start">
               <div className="p-3 bg-white rounded-2xl w-max shadow-sm">
                 <HeartPulse className="w-6 h-6 text-alert" />
               </div>
               <span className="inline-flex items-center px-2 py-1 bg-white/50 rounded-full text-xs font-semibold text-alert">
                 Live
               </span>
            </div>
            
            <div>
              <div className="flex items-baseline space-x-1 mb-1">
                 <span className="text-3xl font-bold text-slate-900 tracking-tighter">72</span>
                 <span className="text-sm font-semibold text-slate-500">bpm</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">Vitals Monitor</h3>
            </div>
          </motion.div>

          {/* Card 5: Caregiver Burnout Prevention (Wide) */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.6, delay: 0.4 }}
             className="md:col-span-4 md:row-span-1 group relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-dark to-primary p-8 shadow-xl flex flex-col md:flex-row items-center justify-between"
          >
             <div className="text-white max-w-md relative z-10 mb-6 md:mb-0">
                <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl w-max mb-4">
                  <Activity className="w-6 h-6 text-primary-light" />
                </div>
                <h3 className="text-2xl font-bold mb-2 tracking-tight">Burnout Prevention</h3>
                <p className="text-primary-light text-sm max-w-sm">
                  We track caregiver stress metrics and suggest optimized routines, so you can focus on caring without losing yourself.
                </p>
             </div>

             {/* Area Chart Fake */}
             <div className="w-full md:w-1/2 h-full flex items-end opacity-80 h-32 md:h-full pr-4 pt-4 relative">
                <div className="absolute bottom-4 left-0 right-0 h-px bg-white/20"></div>
                <div className="absolute left-0 top-0 bottom-4 w-px bg-white/20"></div>
                <div className="flex-1 h-[60%] bg-gradient-to-t from-white/30 to-transparent rounded-t-sm mx-1"></div>
                <div className="flex-1 h-[40%] bg-gradient-to-t from-white/30 to-transparent rounded-t-sm mx-1"></div>
                <div className="flex-1 h-[70%] bg-gradient-to-t from-white/30 to-transparent rounded-t-sm mx-1"></div>
                <div className="flex-1 h-[30%] bg-gradient-to-t from-primary-light/50 to-transparent rounded-t-sm mx-1"></div>
                <div className="flex-1 h-[20%] bg-gradient-to-t from-emerald-400/50 to-transparent rounded-t-sm mx-1 shadow-[0_0_15px_rgba(52,211,153,0.5)]"></div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default BentoFeatures;
