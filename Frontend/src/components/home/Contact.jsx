import React from "react";
import { motion } from "framer-motion";
import { Phone, Mail, ArrowRight, MessageSquare, Send } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Decorative Grid Trace */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[grid-slate-900_20px_20px]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
          <div className="space-y-4">
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em]">
              Comm_Channel
            </span>
            <h2 className="text-6xl lg:text-8xl font-black text-slate-900 tracking-tighter italic leading-none">
              Contact <span className="text-slate-200 font-light">Node</span>
            </h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-[10px] font-mono text-slate-300 uppercase tracking-widest leading-relaxed">
              Response Time: &lt; 2.4 Hours<br />
              Status: System_Optimal
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* --- LEFT: COMMUNICATIONS LOG --- */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter italic">
                Direct <span className="text-slate-300">Access</span>
              </h3>
              
              <div className="space-y-4">
                <ContactLink 
                  icon={<Phone size={18} />} 
                  label="Voice Link" 
                  value="+91 9876543210" 
                />
                <ContactLink 
                  icon={<Mail size={18} />} 
                  label="Data Packet" 
                  value="support@repairium.com" 
                />
                <ContactLink 
                  icon={<MessageSquare size={18} />} 
                  label="HQ Node" 
                  value="Varanasi, UP, India" 
                />
              </div>
            </div>

            {/* Aesthetic Detail: Terminal Text */}
            <div className="p-8 bg-slate-900 rounded-[2.5rem] shadow-2xl shadow-slate-200 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Send size={40} className="text-white" />
              </div>
              <p className="text-[10px] font-mono text-indigo-400 uppercase tracking-widest mb-4">System_Note</p>
              <p className="text-xs text-slate-400 font-medium leading-relaxed">
                Please hold while our team attends to your issue. We are working diligently to resolve it. <br/> Thank You for your patience.
              </p>
            </div>
          </div>

          {/* --- RIGHT: TRANSMISSION FORM --- */}
          <div className="lg:col-span-7 bg-slate-50/50 p-8 md:p-12 rounded-[3rem] border border-slate-100">
            <form className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <ContactInput label="Name" placeholder="IDENTIFY YOURSELF" />
                <ContactInput label="Email" placeholder="DATA_ROUTE@DOMAIN.COM" />
              </div>
              
              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Subject</label>
                <select className="w-full bg-transparent border-b border-slate-200 py-3 text-sm font-bold text-slate-800 focus:border-slate-900 outline-none transition-all appearance-none cursor-pointer">
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Technician Onboarding</option>
                  <option>Business Partnership</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Message</label>
                <textarea 
                  rows="4"
                  placeholder="ENCODE YOUR MESSAGE HERE..."
                  className="w-full bg-transparent border-b border-slate-200 py-3 text-sm font-bold text-slate-800 focus:border-slate-900 outline-none transition-all resize-none"
                />
              </div>

              <div className="flex justify-end">
                <button 
                  type="submit"
                  className="group flex items-center gap-6 px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:bg-indigo-600 active:scale-95 shadow-2xl shadow-slate-200"
                >
                  <span>Transmit</span>
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <ArrowRight size={16} />
                  </div>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- Helper Components ---

const ContactLink = ({ icon, label, value }) => (
  <div className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-indigo-600 shadow-sm border border-slate-100 transition-colors">
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-black text-slate-900 tracking-tight">{value}</p>
    </div>
  </div>
);

const ContactInput = ({ label, placeholder }) => (
  <div className="flex flex-col gap-1.5 group">
    <label className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] group-focus-within:text-indigo-500 transition-colors">
      {label}
    </label>
    <input 
      type="text"
      placeholder={placeholder}
      className="bg-transparent border-b border-slate-200 py-3 text-sm font-bold text-slate-800 focus:border-slate-900 outline-none transition-all placeholder:text-slate-200 placeholder:text-[10px] placeholder:tracking-widest" 
    />
  </div>
);

export default Contact;