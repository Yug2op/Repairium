import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Activity, ShieldCheck, Zap, Globe } from "lucide-react";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white font-sans">
      {/* 1. Spatial Grid Engine */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      
      {/* 2. Industrial Accents */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-50 to-transparent opacity-50" />
      <div className="absolute top-[20%] left-[-5%] w-96 h-96 bg-indigo-50 rounded-full blur-[120px] opacity-40 animate-pulse" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center pt-12">
        
        {/* --- SYSTEM STATUS BADGE --- */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-3 bg-slate-900 px-5 py-2 rounded-2xl mb-6 shadow-2xl shadow-indigo-100"
        >
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">
            Network_Status: <span className="text-emerald-400 uppercase">Operational</span>
          </span>
          <div className="w-px h-3 bg-slate-700 mx-1" />
          <div className="flex items-center gap-1">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">v3.0.4</span>
          </div>
        </motion.div> */}

        {/* --- MAIN ENGINE HEADLINE --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className="mb-8"
        >
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-black text-slate-900 tracking-tighter leading-[0.85] italic uppercase">
            Repair <br /> 
            <span className="text-slate-200 font-light not-italic tracking-widest">Protocol.</span>
          </h1>
        </motion.div>

        {/* --- CORE DESCRIPTION --- */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-slate-400 text-sm md:text-base font-bold uppercase tracking-[0.2em] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Automated deployment of certified technicians. <br />
          Instant matching for high-velocity hardware restoration.
        </motion.p>

        {/* --- COMMAND ACTIONS --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <button
            onClick={() => navigate("/services")}
            className="group relative px-12 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] transition-all hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-200 active:scale-95 flex items-center gap-4"
          >
            <Zap size={16} className="text-amber-400 fill-amber-400" />
            Initialize_Request
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="px-10 py-6 border-2 border-slate-100 bg-white text-slate-400 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] hover:border-slate-900 hover:text-slate-900 transition-all active:scale-95"
          >
            Access_Support
          </button>
        </motion.div>

        {/* --- SYSTEM TELEMETRY (Stats) --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto pt-8 border-t border-slate-50"
        >
          <TelemetryItem label="Resolved_Nodes" value="50K+" />
          <TelemetryItem label="Fleet_Size" value="200+" />
          <TelemetryItem label="Sync_Rate" value="99.9%" />
          <TelemetryItem label="Auth_Link" value="AES_256" />
        </motion.div>
      </div>

      {/* 3. Floating Geometric Detail */}
      <div className="absolute bottom-10 right-10 flex flex-col items-end gap-2 opacity-20">
         <Globe size={40} className="text-slate-200" />
         <p className="text-[8px] font-mono text-slate-400 uppercase tracking-widest">Global_Grid_Active</p>
      </div>
    </section>
  );
};

// --- Sub-Component for Clean Code ---
const TelemetryItem = ({ label, value }) => (
  <div className="text-left md:text-center space-y-1">
    <p className="text-2xl font-black text-slate-900 tracking-tighter italic italic">{value}</p>
    <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{label}</p>
  </div>
);

export default HeroSection;