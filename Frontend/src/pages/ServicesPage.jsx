import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  Filter, 
  Cpu, 
  Settings2, 
  Search, 
  ArrowRight, 
  Zap, 
  Activity,
  Box
} from "lucide-react";
import API from "../services/api";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
const [hasNext, setHasNext] = useState(false);

  const navigate = useNavigate();

  const fetchAppliances = async (pageNum = 1, append = false) => {
  try {
    setLoading(true);

    const res = await API.get(`/appliances?page=${pageNum}`);

    const data = res.data.data.data;
    const pagination = res.data.data.pagination;

    if (append) {
      setServices((prev) => [...prev, ...data]);
      setFiltered((prev) => [...prev, ...data]);
    } else {
      setServices(data);
      setFiltered(data);
    }

    setHasNext(pagination.hasNext);

    const uniqueBrands = [...new Set(data.map((item) => item.brand))];
    const uniqueCategories = [...new Set(data.map((item) => item.category))];

    setBrands(uniqueBrands);
    setCategories(uniqueCategories);

  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchAppliances();
  }, []);

  useEffect(() => {
    let temp = [...services];
    if (selectedBrand) temp = temp.filter((item) => item.brand === selectedBrand);
    if (selectedCategory) temp = temp.filter((item) => item.category === selectedCategory);
    setFiltered(temp);
  }, [selectedBrand, selectedCategory, services]);

  if (loading) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin mb-4" />
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Accessing_Master_Registry...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
      
      {/* --- HERO SECTION --- */}
      <header className="pt-32 pb-8 px-20 border-b border-slate-50 bg-slate-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em]">
                  Asset_Database_v3.0
                </span>
              </div>
              <h1 className="text-6xl lg:text-8xl font-black tracking-tighter italic leading-none uppercase">
                Hardware <span className="text-slate-200 font-light not-italic">Registry.</span>
              </h1>
            </div>
            
            <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
               <div className="px-6 py-2">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active_Nodes</p>
                  <p className="text-2xl font-black tracking-tighter text-slate-900 italic">{filtered.length}</p>
               </div>
               <div className="w-px h-10 bg-slate-100" />
               <div className="p-4 text-indigo-600">
                  <Activity size={20} />
               </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- FILTERS PROTOCOL --- */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 py-2 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-6 items-center">
          <div className="flex items-center gap-3 text-slate-400 mr-4">
            <Settings2 size={18} />
            <span className="text-[10px] font-black uppercase tracking-widest">Filters</span>
          </div>

          <div className="flex flex-1 flex-wrap gap-4">
            {/* Brand Filter */}
            <div className="relative flex-1 min-w-[200px]">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full appearance-none bg-slate-50 border-none rounded-xl px-6 py-4 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
              >
                <option value="">All_Brands</option>
                {brands.map((b) => <option key={b} value={b}>{b.toUpperCase()}</option>)}
              </select>
            </div>

            {/* Category Filter */}
            <div className="relative flex-1 min-w-[200px]">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none bg-slate-50 border-none rounded-xl px-6 py-4 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
              >
                <option value="">All_Categories</option>
                {categories.map((c) => <option key={c} value={c}>{c.toUpperCase()}</option>)}
              </select>
            </div>
          </div>

          <button 
            onClick={() => { setSelectedBrand(""); setSelectedCategory(""); }}
            className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-rose-500 transition-colors"
          >
            Reset_Params
          </button>
        </div>
      </div>

      {/* --- GRID TERMINAL --- */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((s, i) => (
              <motion.div
                key={s._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                onClick={() => navigate(`/book/${s._id}`)}
                className="group relative bg-white border border-slate-100 rounded-[2.5rem] p-8 cursor-pointer hover:border-indigo-200 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
              >
                {/* Node Status Indicator */}
                <div className="absolute top-8 right-8 flex gap-1">
                   {[1,2].map(dot => <div key={dot} className="w-1 h-1 rounded-full bg-slate-200 group-hover:bg-indigo-600 transition-colors" />)}
                </div>

                <div className="mb-8">
                  <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:bg-indigo-600 transition-colors duration-500">
                    <Box size={20} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase italic leading-tight">
                    {s.name}
                  </h3>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[9px] font-mono font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded uppercase">
                      {s.brand}
                    </span>
                    <span className="text-[9px] font-mono font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded uppercase">
                      {s.category}
                    </span>
                  </div>
                </div>

                <p className="text-slate-400 text-xs font-medium leading-relaxed mb-8 line-clamp-2">
                  {s.description}
                </p>

                <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                  <div>
                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Base_Fee</p>
                    <p className="text-xl font-black text-slate-900 italic tracking-tighter">₹{s.totalPrice}</p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <ArrowRight size={18} />
                  </div>
                </div>
                
                {/* Tech Metadata Footer */}
                <div className="mt-4 flex items-center gap-2">
                   <Zap size={10} className="text-amber-400 fill-amber-400" />
                   <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">
                     Est_Time: {s.estimatedServiceTime}_MINS
                   </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State Node */}
        {filtered.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-40 text-center border-2 border-dashed border-slate-50 rounded-[4rem]"
          >
            <Cpu size={48} className="mx-auto text-slate-100 mb-6" />
            <h3 className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
              Zero_Matching_Nodes_Found
            </h3>
            <button 
              onClick={() => { setSelectedBrand(""); setSelectedCategory(""); }}
              className="mt-6 text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline"
            >
              Reinitialize_Filter_Protocol
            </button>
          </motion.div>
        )}
        {hasNext && (
  <div className="flex justify-center mt-12">
    <button
      onClick={() => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchAppliances(nextPage, true);
      }}
      className="px-8 py-4 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-600 transition-all"
    >
      Load_More
    </button>
  </div>
)}
      </main>
    </div>
  );
};

export default ServicesPage;