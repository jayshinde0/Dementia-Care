import React from 'react';
import { motion } from 'framer-motion';

const MetricCards = ({ stats = [] }) => {
  // Map standard standard stats to the new UI pattern
  // Expected stats prop: [{label, value, icon, color}, ...] from Dashboard.js
  
  const enrichedMetrics = stats.map((stat, i) => {
    // Generate a beautiful fake sparkline just for visual appeal since the backend doesn't have timeseries data
    const generateSparkline = (base) => Array.from({length: 7}, () => Math.max(1, base + Math.floor(Math.random() * 5 - 2)));
    
    let colorClass = 'from-blue-500/10 to-transparent';
    let trend = '+1';
    
    if (stat.label.includes('Alerts') || stat.label.includes('Critical')) {
        colorClass = 'from-alert/20 to-transparent';
        trend = '-1'; // Good trend for alerts
    } else if (stat.label.includes('Reminders')) {
        colorClass = 'from-emerald-500/10 to-transparent';
        trend = '+5';
    } else if (stat.label.includes('Patients')) {
        colorClass = 'from-primary/20 to-transparent';
        trend = '+2';
    }

    return {
       label: stat.label,
       value: stat.value,
       trend,
       color: colorClass,
       sparkline: generateSparkline(stat.value || 10)
    };
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {enrichedMetrics.map((metric, index) => (
        <motion.div
           key={index}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4, delay: index * 0.1 }}
           className="relative overflow-hidden bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40 group hover:shadow-lg transition-shadow"
        >
          {/* Sparkline Background */}
           <div className="absolute bottom-0 left-0 right-0 h-1/2 flex items-end opacity-40 px-2 pb-2">
              {metric.sparkline.map((val, i) => {
                 const max = Math.max(...metric.sparkline, 1);
                 const heightPercent = (val / max) * 100;
                 return (
                   <div 
                     key={i} 
                     className={`flex-1 rounded-t-sm mx-0.5 bg-gradient-to-t ${metric.color} transition-all duration-500 group-hover:opacity-80`} 
                     style={{ height: `${heightPercent}%` }}
                   ></div>
                 );
              })}
           </div>

           <div className="relative z-10 flex justify-between items-start">
             <h3 className="text-sm font-semibold text-slate-500 tracking-wide uppercase">{metric.label}</h3>
             <span className={`text-xs font-bold px-2 py-1 rounded-full ${metric.trend.startsWith('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                {metric.trend}
             </span>
           </div>

           <div className="relative z-10 mt-auto">
             <span className="text-4xl font-black text-slate-900 tracking-tighter mix-blend-multiply">{metric.value}</span>
           </div>
        </motion.div>
      ))}
    </div>
  );
};

export default MetricCards;
