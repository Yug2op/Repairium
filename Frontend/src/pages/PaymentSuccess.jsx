import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  CheckCircle, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Activity, 
  FileText 
} from "lucide-react";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen mt-16 bg-white flex items-center justify-center p-6 font-sans overflow-hidden">
      
      {/* --- SPATIAL BACKGROUND ACCENTS --- */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#4f46e5 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-slate-50 to-transparent" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "circOut" }}
        className="relative z-10 max-w-xl w-full text-center"
      >
        {/* --- SUCCESS ICON NODE --- */}
        <div className="relative mb-12">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-24 h-24 bg-slate-900 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-2xl shadow-indigo-200 relative z-10"
          >
            <CheckCircle size={48} className="text-emerald-500" />
          </motion.div>
          {/* Animated Glow Rings */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-indigo-100 rounded-full blur-2xl opacity-50 animate-pulse" />
        </div>

        {/* --- HEADLINE ENGINE --- */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.4em]">Transaction_Resolution_Verified</span>
          </div>
          <h1 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter italic leading-none uppercase">
            Payment <br /> 
            <span className="text-slate-200 font-light not-italic tracking-widest">Successful.</span>
          </h1>
        </div>

        {/* --- MISSION SUMMARY --- */}
        <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 mb-10 text-left space-y-6">
          <div className="flex justify-between items-start border-b border-slate-200/50 pb-6">
            <div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Node_Status</p>
              <p className="text-sm font-black text-slate-900 uppercase italic">Deployment_Confirmed</p>
            </div>
            <ShieldCheck size={20} className="text-indigo-600" />
          </div>
          
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400">
              <Activity size={18} />
            </div>
            <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase">
              Your service node has been reconciled. A verified technician is now being synced to your spatial coordinates.
            </p>
          </div>
        </div>

        {/* --- COMMAND ACTIONS --- */}
        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate("/user/dashboard")}
            className="group w-full py-6 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all hover:bg-indigo-600 hover:shadow-2xl hover:shadow-indigo-100 active:scale-95 flex items-center justify-center gap-4"
          >
            <Zap size={16} className="fill-amber-400 text-amber-400" />
            Return_to_Dashboard
            <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
          </button>
          
          <button
            onClick={() => navigate("/user/bookings")}
            className="w-full py-5 border-2 border-slate-100 text-slate-400 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-slate-900 hover:text-slate-900 transition-all flex items-center justify-center gap-3"
          >
            <FileText size={16} />
            View_Transaction_Receipt
          </button>
        </div>

        {/* --- SYSTEM TELEMETRY --- */}
        <div className="mt-12 flex items-center justify-center gap-8 opacity-20">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-slate-900 rounded-full" />
            <span className="text-[8px] font-black uppercase tracking-widest text-slate-900">Auth_ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-slate-900 rounded-full" />
            <span className="text-[8px] font-black uppercase tracking-widest text-slate-900">Reconciliation: Instant</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;