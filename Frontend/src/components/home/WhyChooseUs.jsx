import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, CreditCard, Cpu, Globe, Activity } from "lucide-react";

const reasons = [
  { 
    icon: Zap, 
    title: "High-Velocity Dispatch", 
    desc: "Optimized routing protocols for same-day on-site restoration.",
    metric: "2HR_AVG"
  },
  { 
    icon: ShieldCheck, 
    title: "Certified Nodes", 
    desc: "Every technician undergoes rigorous biometric and certification verification.",
    metric: "100%_SECURE"
  },
  { 
    icon: CreditCard, 
    title: "Post-Resolution Billing", 
    desc: "Economic clearance is only initialized after system integrity is restored.",
    metric: "ESCROW_LOCK"
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden font-sans">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header Engine */}
        <div className="max-w-3xl mb-24 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-[1px] bg-indigo-600" />
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em]">
              System_Advantages
            </span>
          </div>
          <h2 className="text-6xl lg:text-8xl font-black text-slate-900 tracking-tighter italic leading-none">
            Why <span className="text-slate-200 font-light not-italic">Repairium?</span>
          </h2>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => {
            const Icon = r.icon;

            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative group bg-slate-50 border border-slate-100 rounded-[2.5rem] p-10 overflow-hidden hover:bg-white hover:border-indigo-100 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-slate-200/50"
              >
                {/* Background Decor */}
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                   <Icon size={120} />
                </div>

                {/* Card Content */}
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-12">
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-500 shadow-lg">
                      <Icon size={24} />
                    </div>
                    <span className="text-[9px] font-mono font-black text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest">
                      {r.metric}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic mb-4">
                    {r.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm font-medium leading-relaxed mb-12 flex-grow">
                    {r.desc}
                  </p>

                  {/* Technical Footer */}
                  <div className="pt-6 border-t border-slate-200/50 flex items-center justify-between">
                     <div className="flex items-center gap-2">
                        <Activity size={12} className="text-slate-300" />
                        <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Logic_Core_Active</span>
                     </div>
                     <div className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-indigo-600 transition-colors" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Botom Status Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 px-10 py-6 bg-slate-900 rounded-[2rem] text-white"
        >
          <div className="flex items-center gap-8">
            <div className="flex -space-x-3">
               {[1,2,3].map(i => (
                 <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center">
                    <Globe size={12} className="text-slate-500" />
                 </div>
               ))}
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Network_Reach: <span className="text-white">GLOBAL_NODES_ACTIVE</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden md:block">
               <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Encryption_Status</p>
               <p className="text-[10px] font-bold text-indigo-400 uppercase">AES_256_STABLE</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
               <Cpu size={18} className="text-indigo-400" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;