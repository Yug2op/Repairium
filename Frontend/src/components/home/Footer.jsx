import React from "react";
import { Link } from "react-router-dom";
import { Activity, ArrowUpRight, Wrench } from "lucide-react";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";

const Footer = () => {

  // Manual Color Definitions (since no Tailwind config is defined)
  const colors = {
    primary: "#4f46e5", // Indigo 600
    primaryHover: "#4338ca", // Indigo 700
    dark: "#0f172a", // Slate 900
    textMain: "#1e293b", // Slate 800
    textMuted: "#556274", // Slate 500
    border: "#e2e8f0", // Slate 200
  };
  
  return (
    <footer className="relative bg-white border-t border-slate-100 overflow-hidden">
      {/* Decorative Spatial Grid Background (Optional) */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[grid-slate-900_1px_1px] [mask-image:linear-gradient(to_bottom,white,transparent)]" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 relative z-10">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-6">
          
          {/* Brand Engine Block */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center shadow-xl shadow-slate-200">
                <Wrench size={24} className="text-indigo-400" />
              </div>
              <span className="text-3xl font-black italic tracking-tighter text-slate-900">
                Repair<span className="text-slate-200 font-light">ium</span>
              </span>
            </div>
            <p className="text-sm font-medium text-slate-400 leading-relaxed max-w-sm">
              The next-generation protocol for technician logistics and repair management. 
              Built for precision, scalability, and performance.
            </p>
            
            {/* Social Node Links */}
            <div className="flex gap-4">
              <SocialIcon icon={<FiTwitter size={16} />} />
              <SocialIcon icon={<FiGithub size={16} />} />
              <SocialIcon icon={<FiLinkedin size={16} />} />
            </div>
          </div>

          {/* Navigation Matrix */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <FooterColumn title="Protocol">
              <FooterLink to="/services">Services</FooterLink>
              <FooterLink to="/pricing">Economics</FooterLink>
              <FooterLink to="/nodes">Live Nodes</FooterLink>
            </FooterColumn>
            
            <FooterColumn title="Organization">
              <FooterLink to="/about">Our Story</FooterLink>
              <FooterLink to="/careers">Careers</FooterLink>
              <FooterLink to="/press">Dispatch</FooterLink>
            </FooterColumn>

            <FooterColumn title="Support">
              <FooterLink to="/docs">Documentation</FooterLink>
              <FooterLink to="/contact">System Help</FooterLink>
              <FooterLink to="/status">Network Status</FooterLink>
            </FooterColumn>
          </div>
        </div>

        {/* Bottom Metadata Bar */}
        <div className="pt-4 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
              © {new Date().getFullYear()} REPAIRIUM_SYS
            </span>
            <div className="h-4 w-px bg-slate-100 hidden md:block" />
            <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">
              v3.0.48 // Varanasi_Node
            </span>
          </div>

          <div className="flex gap-8">
            <button className="text-[10px] font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
              Privacy_Policy
            </button>
            <button className="text-[10px] font-black text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">
              Terms_Of_Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Helper Components ---

const FooterColumn = ({ title, children }) => (
  <div className="space-y-6">
    <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-[0.3em]">{title}</h4>
    <nav className="flex flex-col gap-4">
      {children}
    </nav>
  </div>
);

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="group flex items-center gap-2 text-[11px] font-bold text-slate-400 hover:text-indigo-600 transition-all uppercase tracking-tighter"
  >
    {children}
    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
  </Link>
);

const SocialIcon = ({ icon }) => (
  <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all active:scale-90 border border-slate-100 shadow-sm">
    {icon}
  </button>
);

export default Footer;