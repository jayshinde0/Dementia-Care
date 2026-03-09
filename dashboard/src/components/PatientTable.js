import React from 'react';
import { MoreHorizontal } from 'lucide-react';

const PatientTable = ({ patients = [] }) => {
  const getStatusBadge = (status = 'active') => {
    switch (status.toLowerCase()) {
      case 'resting':
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]"></span>
            <span>Resting</span>
          </span>
        );
      case 'missed-meds':
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-semibold border border-amber-100">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shadow-[0_0_5px_rgba(245,158,11,0.5)] flex-shrink-0"></span>
            <span className="truncate max-w-[100px]" title="Missed Meds">Missed Meds</span>
          </span>
        );
      case 'active':
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]"></span>
            <span>Active</span>
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-[2rem] p-6 text-slate-900 shadow-sm border border-slate-100 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold tracking-tight">Patient Overview</h2>
        <div className="hidden sm:flex space-x-2">
            <input type="text" placeholder="Search patients..." className="text-sm px-4 py-2 border border-slate-200 rounded-full bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-64" />
        </div>
      </div>

      <div className="flex-1 overflow-x-auto min-w-0">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Patient Name</th>
              <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">ID / Age</th>
              <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Location</th>
              <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 ? (
               <tr>
                 <td colSpan="5" className="py-8 text-center text-slate-500">No patients found.</td>
               </tr>
            ) : patients.map((patient, index) => (
              <tr 
                key={patient._id || index} 
                className={`group border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer ${index === patients.length - 1 ? 'border-none' : ''}`}
                onClick={() => window.location.href = `/patient/${patient._id}`}
              >
                <td className="py-4 px-4 font-semibold text-slate-800 flex items-center space-x-3">
                   <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                     {patient.name?.split(' ').map(n => n?.[0]).join('') || '?'}
                   </div>
                   <span>{patient.name}</span>
                </td>
                <td className="py-4 px-4 text-sm text-slate-500 hidden sm:table-cell">#{patient._id?.slice(-4) || 'N/A'} • {patient.age}y</td>
                <td className="py-4 px-4 text-sm text-slate-500 hidden md:table-cell max-w-[150px] truncate">{patient.address || 'Unknown'}</td>
                <td className="py-4 px-4">{getStatusBadge(patient.status || 'active')}</td>
                <td className="py-4 px-4">
                  <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="pt-4 mt-auto border-t border-slate-100 flex justify-between items-center text-sm">
         <span className="text-slate-500">Showing {patients.length} patients</span>
         <div className="flex space-x-1">
            <button className="px-3 py-1 rounded-lg border border-slate-200 text-slate-400 cursor-not-allowed">Prev</button>
            <button className="px-3 py-1 rounded-lg bg-primary text-white shadow-sm font-medium">1</button>
            <button className="px-3 py-1 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 font-medium cursor-pointer">Next</button>
         </div>
      </div>
    </div>
  );
};

export default PatientTable;
