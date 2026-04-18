import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Compass, ArrowRight, Activity, Map } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "CRITICAL_AUTH_ERROR: Spatial coordinate mismatch at ",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center mt-16  p-6 relative overflow-hidden font-sans">
      
      {/* Background Decor: The "Ghost" Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[grid-slate-900_40px_40px] [mask-image:radial-gradient(white,transparent)]" />
      
      {/* Floating Meta-text */}
      <div className="absolute top-10 left-10 hidden md:block">
        <p className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.4em]">Error_Log: 0x404</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 flex flex-col items-center text-center max-w-2xl"
      >
        {/* The "Glitched" Icon */}
        <div className="relative mb-12">
          <div className="w-32 h-32 bg-slate-900 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-slate-200">
            <Compass size={48} className="text-indigo-400 animate-pulse" />
          </div>
          {/* Diagnostic Badge */}
          <div className="absolute -bottom-2 -right-2 bg-rose-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
            Signal_Lost
          </div>
        </div>

        {/* Header Section */}
        <div className="space-y-4 mb-12">
          <h1 className="text-8xl md:text-9xl font-black text-slate-900 tracking-tighter italic leading-none">
            404 <span className="text-red-500 font-light">ERR</span>
          </h1>
          <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.5em] mt-4">
            Coordinate_Mismatch_Detected
          </p>
        </div>

        {/* Description & Technical Readout */}
        <div className="space-y-8 mb-16">
          <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-sm mx-auto">
            The spatial engine was unable to resolve the requested node: 
            <span className="text-slate-900 font-black block mt-1 tracking-tight">
              {location.pathname}
            </span>
          </p>

          {/* Mini-Terminal Block */}
          <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex items-center gap-6 text-left">
            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
              <Map size={18} className="text-slate-400" />
            </div>
            <div>
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Protocol</p>
              <p className="text-[11px] font-mono text-slate-600 uppercase tracking-tighter">Redirecting_to_home_node...</p>
            </div>
          </div>
        </div>

        {/* Navigation Action */}
        <Link to="/" className="group flex items-center gap-8 px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:bg-indigo-600 active:scale-95 shadow-2xl shadow-slate-200">
          <span>Return to Command</span>
          <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <ArrowRight size={16} />
          </div>
        </Link>
      </motion.div>

      {/* Footer Meta */}
      <div className="absolute bottom-10 flex items-center gap-4 text-slate-200">
         <Activity size={14} />
         <span className="text-[9px] font-mono uppercase tracking-[0.3em]">Repairium_V3 // Spatial_Engine_Failure</span>
      </div>
    </div>
  );
};

export default NotFound;