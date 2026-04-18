import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Snowflake,
  Tv,
  WashingMachine,
  Refrigerator,
  Microwave,
  Fan,
  ArrowRight,
  Zap,
  Cpu
} from "lucide-react";

const services = [
  { title: "AC Repair", icon: Snowflake, desc: "Thermal regulation, gas compression & seasonal tuning.", code: "HVAC_01" },
  { title: "Washing Machine", icon: WashingMachine, desc: "Mechanical drum alignment & motor torque optimization.", code: "WASH_02" },
  { title: "Refrigerator", icon: Refrigerator, desc: "Compressor diagnostics & cryogenic integrity checks.", code: "COLD_03" },
  { title: "TV Repair", icon: Tv, iconColor: "text-amber-400", desc: "Optic panel restoration & circuit board soldering.", code: "DISP_04" },
  { title: "Microwave", icon: Microwave, desc: "Magnetron testing & high-frequency wiring repair.", code: "HEAT_05" },
  { title: "Fan Repair", icon: Fan, desc: "Kinetic motor overhaul & rotation speed calibration.", code: "ROTO_06" }
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-white relative font-sans overflow-hidden">
      {/* Decorative System Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-px bg-gradient-to-l from-indigo-100 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header Engine */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-indigo-600 rounded-full" />
              <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em]">
                Hardware_Registry
              </span>
            </div>
            <h2 className="text-6xl lg:text-8xl font-black text-slate-900 tracking-tighter italic leading-none">
              Service <span className="text-slate-200 font-light not-italic">Nodes.</span>
            </h2>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/services")}
            className="group flex items-center gap-4 bg-slate-900 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl shadow-slate-200 transition-all hover:bg-indigo-600"
          >
            View_Full_Catalog
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => {
            const Icon = s.icon;

            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => navigate("/services")}
                className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-10 cursor-pointer transition-all duration-500 hover:border-indigo-100 hover:shadow-2xl hover:shadow-slate-200/50"
              >
                {/* Internal Node Header */}
                <div className="flex justify-between items-start mb-10">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-500 shadow-lg">
                    <Icon size={24} />
                  </div>
                  <span className="font-mono text-[9px] font-black text-slate-200 group-hover:text-indigo-200 transition-colors uppercase tracking-widest">
                    {s.code}
                  </span>
                </div>

                {/* Content Area */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic">
                    {s.title}
                  </h3>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                {/* Technical Bottom Bar */}
                <div className="mt-10 pt-6 border-t border-slate-50 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <div className="flex items-center gap-2">
                    <Cpu size={12} className="text-indigo-600" />
                    <span className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">Initialize_Request</span>
                  </div>
                  <Zap size={14} className="text-amber-400 fill-amber-400" />
                </div>
                
                {/* Ambient Hover Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50/0 group-hover:bg-indigo-50/50 rounded-bl-[5rem] transition-all duration-500 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>

        {/* System Alert Bar */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 py-8 border-y border-slate-50">
           <SystemDetail label="Uptime" val="99.9%" />
           <SystemDetail label="Nodes" val="24/7_Active" />
           <SystemDetail label="Response" val="Instant_Sync" />
        </div>
      </div>
    </section>
  );
};

// Helper component
const SystemDetail = ({ label, val }) => (
  <div className="flex items-center gap-3">
    <div className="w-1 h-1 rounded-full bg-indigo-600" />
    <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{label}:</span>
    <span className="text-[10px] font-bold text-slate-900 uppercase">{val}</span>
  </div>
);

export default Services;