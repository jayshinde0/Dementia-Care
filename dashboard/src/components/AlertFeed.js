import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Clock, Navigation } from 'lucide-react';

const AlertFeed = ({ alerts = [] }) => {
  // Translate time to relative (Just now, 10m ago) realistically:
  const getRelativeTime = (dateString) => {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const diff = (new Date(dateString) - new Date()) / 1000;
    if (Math.abs(diff) < 60) return 'Just now';
    if (Math.abs(diff) < 3600) return rtf.format(Math.round(diff/60), 'minute');
    return rtf.format(Math.round(diff/3600), 'hour');
  };

  const getIcon = (type) => {
    if(type === 'critical') return <AlertCircle size={18} />;
    if(type === 'high' || type === 'warning') return <Clock size={18} />;
    return <Navigation size={18} />;
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100 h-full flex flex-col sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900 tracking-tight">Live Alerts</h2>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-alert-DEFAULT opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-alert-DEFAULT"></span>
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {alerts.length === 0 ? (
          <p className="text-sm text-slate-500 text-center mt-4">No active alerts.</p>
        ) : (
          <AnimatePresence>
            {alerts.slice(0, 10).map((alert, index) => (
              <motion.div
                key={alert._id || index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-2xl border flex items-start space-x-3 relative overflow-hidden ${
                  alert.severity === 'critical' 
                    ? 'bg-alert-light/30 border-alert-light shadow-[0_4px_15px_-3px_rgba(251,146,60,0.3)]' 
                    : alert.severity === 'high'
                      ? 'bg-amber-50 border-amber-100'
                      : 'bg-slate-50 border-slate-100'
                }`}
              >
                {/* Critical Pulse Glow */}
                {alert.severity === 'critical' && (
                  <div className="absolute inset-0 bg-alert-DEFAULT/5 animate-pulse mix-blend-multiply pointer-events-none"></div>
                )}

                <div className={`p-2 rounded-xl shrink-0 relative z-10 ${
                  alert.severity === 'critical' ? 'bg-alert-DEFAULT text-white' : 
                  alert.severity === 'high' ? 'bg-amber-200 text-amber-800' : 
                  'bg-slate-200 text-slate-600'
                }`}>
                  {getIcon(alert.severity)}
                </div>

                <div className="relative z-10">
                  <p className={`text-sm font-semibold mb-1 leading-tight ${
                    alert.severity === 'critical' ? 'text-slate-900' : 'text-slate-800'
                  }`}>
                    {alert.title}
                  </p>
                  <p className="text-xs text-slate-500 font-medium">{getRelativeTime(alert.created_at)}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
      
      <div className="pt-4 mt-auto border-t border-slate-100">
         <button className="w-full py-3 text-sm font-semibold text-primary/80 hover:text-primary transition-colors hover:bg-slate-50 rounded-xl">
           View All History
         </button>
      </div>
    </div>
  );
};

export default AlertFeed;
