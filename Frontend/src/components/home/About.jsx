import React from "react";
import { motion } from "framer-motion";
import { Shield, Zap, Target, Users, ArrowRight } from "lucide-react";

const About = () => {
  return (
    <section className="py-16 relative overflow-hidden bg-white">
      {/* Structural Background Elements */}
      <div className="absolute top-0 left-1/4 w-px h-full bg-slate-50" />
      <div className="absolute top-0 right-1/4 w-px h-full bg-slate-50" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* --- SECTION HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-32">
          <div className="space-y-4">
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em]">
              Protocol_Origin
            </span>
            <h2 className="text-6xl lg:text-8xl font-black text-slate-900 tracking-tighter italic leading-[0.8]">
              About <span className="text-slate-200 font-light">Repairium</span>
            </h2>
          </div>
          <div className="hidden md:block h-px flex-1 bg-slate-100 mx-10" />
          <div className="text-right">
             <p className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Est. 2026 // ADYPU_NODE</p>
          </div>
        </div>

        {/* --- MISSION STORY (BLUEPRINT STYLE) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-40">
          <div className="lg:col-span-5">
             <div className="sticky top-32 space-y-8">
                <div className="w-20 h-20 bg-slate-900 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-slate-200">
                  <Target className="text-indigo-400" size={32} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 leading-tight uppercase tracking-tighter">
                  Solving the <br /> 
                  <span className="text-indigo-600 underline underline-offset-8 decoration-1">Reliability Gap</span>
                </h3>
             </div>
          </div>
          
          <div className="lg:col-span-7 space-y-12">
            <motion.p 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-2xl font-bold text-slate-800 leading-snug tracking-tight"
            >
              Founded by ADYPU postgraduates, Repairium was engineered to neutralize 
              the friction of urban appliance maintenance. We transformed a 
              fragmented service into a structured digital protocol.
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                By integrating technician verification, real-time logistics, and 
                encrypted payments, we’ve created a trust-less environment where 
                quality is guaranteed by code and community.
              </p>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Scaling across 5 major Indian nodes, we now power over 50,000 
                households, connecting them to a vetted network of master technicians.
              </p>
            </div>
          </div>
        </div>

        {/* --- VALUE SPECIFICATIONS (GRID) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100 border border-slate-100 rounded-[3rem] overflow-hidden shadow-2xl shadow-slate-100">
          <ValueSpec 
            icon={<Shield />} 
            title="Validation" 
            desc="Every node on our network undergoes a multi-layer KYC and skill-assessment protocol."
          />
          <ValueSpec 
            icon={<Zap />} 
            title="Velocity" 
            desc="Intuitive scheduling engine designed to reduce service latency by 40% across all districts."
          />
          <ValueSpec 
            icon={<Target />} 
            title="Clarity" 
            desc="Full-stack transparency from fixed-rate pricing to live GPS service tracking."
          />
          <ValueSpec 
            icon={<Users />} 
            title="Agency" 
            desc="Empowering local professionals with a robust platform to manage their own digital storefront."
          />
        </div>
        
      </div>
    </section>
  );
};

const ValueSpec = ({ icon, title, desc }) => (
  <div className="bg-white p-10 group hover:bg-slate-50 transition-colors">
    <div className="w-12 h-12 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-sm">
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-[0.3em] mb-4">
      {title}
    </h4>
    <p className="text-xs text-slate-500 font-medium leading-relaxed">
      {desc}
    </p>
  </div>
);

export default About;