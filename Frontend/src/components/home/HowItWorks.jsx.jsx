import React, { Activity } from "react";
import { motion } from "framer-motion";
import { Search, CalendarDays, CheckCircle2, Zap, ArrowRight, ShieldCheck } from "lucide-react";

const steps = [
  { 
    icon: Search, 
    step: "01", 
    title: "Node Selection", 
    desc: "Identify and select the hardware unit requiring maintenance.",
    tag: "SCANNING"
  },
  { 
    icon: CalendarDays, 
    step: "02", 
    title: "Deployment Sync", 
    desc: "Authorize a time-window for technician arrival and site access.",
    tag: "SCHEDULING"
  },
  { 
    icon: ShieldCheck, 
    step: "03", 
    title: "On-Site Resolution", 
    desc: "Verified technician restores system integrity and closes node.",
    tag: "REPAIRING"
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Header Engine */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em]">
                Standard_Operating_Protocol
              </span>
            </div>
            <h2 className="text-6xl lg:text-8xl font-black text-slate-900 tracking-tighter italic leading-none">
              How it <span className="text-slate-200 font-light not-italic">Syncs.</span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-slate-400 text-xs font-bold uppercase tracking-widest max-w-[280px] leading-relaxed border-l-2 border-slate-100 pl-6"
          >
            Our automated dispatch engine matches your node failure with the nearest verified technician in real-time.
          </motion.p>
        </div>

        {/* Steps Pipeline */}
        <div className="relative">
          {/* Background Connecting Line (Desktop) */}
          <div className="absolute top-1/2 left-0 w-full h-px bg-slate-100 hidden md:block -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            {steps.map((s, i) => {
              const Icon = s.icon;

              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  className="group relative"
                >
                  {/* Node Card */}
                  <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 hover:border-indigo-200 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 group-hover:-translate-y-2">
                    
                    {/* Visual Header */}
                    <div className="flex justify-between items-start mb-12">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xl group-hover:bg-indigo-600 transition-colors duration-500">
                          <Icon size={28} />
                        </div>
                        <span className="absolute -bottom-3 -right-3 w-8 h-8 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center text-[10px] font-black text-slate-900">
                          {s.step}
                        </span>
                      </div>
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] group-hover:text-indigo-400 transition-colors">
                        {s.tag}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">
                        {s.title}
                      </h3>
                      <p className="text-slate-400 text-sm font-medium leading-relaxed">
                        {s.desc}
                      </p>
                    </div>

                    {/* Industrial Footer Detail */}
                    <div className="mt-10 pt-6 border-t border-slate-50 flex items-center justify-between">
                       <div className="flex gap-1">
                          {[1,2,3].map(dot => (
                            <div key={dot} className={`w-1 h-1 rounded-full ${i >= dot-1 ? 'bg-indigo-600' : 'bg-slate-100'}`} />
                          ))}
                       </div>
                       <Zap size={14} className="text-slate-100 group-hover:text-amber-400 transition-colors" />
                    </div>
                  </div>

                  {/* Flow Arrow (Mobile Only) */}
                  {i !== 2 && (
                    <div className="flex md:hidden justify-center py-4">
                      <ArrowRight size={20} className="text-slate-200 rotate-90" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;