import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, 
  MapPin, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Activity, 
  Navigation,
  Search,
  Toolbox // If using a newer Lucide, otherwise use 'Briefcase'
} from 'lucide-react';
import technicianServices from '../../services/technicianService';

const MyBookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyAssignments();
  }, []);

  const fetchMyAssignments = async () => {
    try {
      setLoading(true);
      // Fetches bookings assigned to 'me' via the technician/bookings route
      const response = await technicianServices.getBookings();
      
      // Based on your JSON structure: response.data.data
      const myData = response?.data?.data || response?.data?.bookings || [];
      
      // Filter out 'pending' (those aren't accepted yet) and 'completed' (those are history)
      const activeNodes = myData.filter(b => 
        ['confirmed', 'in_progress'].includes(b.status)
      );
      
      setBookings(activeNodes);
    } catch (err) {
      console.error("Failed to sync local fleet data", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter(b => 
    b.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.appliance?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin mb-4" />
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Loading_Active_Fleet...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Engine Header */}
      <header className="pt-24 pb-12 px-6 lg:px-12 border-b border-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em]">Technician_Control</span>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter italic leading-none">
              Active <span className="text-slate-200 font-light">Fleet</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-2xl">
            <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-100">
               <p className="text-[9px] font-black text-slate-400 uppercase">Live_Nodes</p>
               <p className="text-xl font-black text-slate-900">{bookings.length}</p>
            </div>
            <button onClick={fetchMyAssignments} className="p-4 text-slate-400 hover:text-indigo-600 transition-colors">
              <Activity size={20} />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Search Bar */}
        <div className="relative mb-12 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-600 transition-colors" size={20} />
          <input 
            type="text"
            placeholder="FILTER_ACTIVE_ASSIGNMENTS..."
            className="w-full bg-slate-50 border-none rounded-3xl py-6 pl-16 pr-6 text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-indigo-500/20 placeholder:text-slate-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Assignments List */}
        <div className="space-y-6">
          <AnimatePresence>
            {filteredBookings.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-32 text-center border-2 border-dashed border-slate-50 rounded-[3rem]">
                <Navigation className="mx-auto text-slate-100 mb-4" size={48} />
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">No_Assigned_Nodes_In_Transit</p>
              </motion.div>
            ) : (
              filteredBookings.map((booking) => (
                <motion.div
                  key={booking._id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 10 }}
                  onClick={() => navigate(`/technician/bookings/${booking.bookingId}`)}
                  className="group bg-white border border-slate-100 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center gap-8 cursor-pointer hover:border-indigo-200 hover:shadow-2xl hover:shadow-slate-200/50 transition-all relative overflow-hidden"
                >
                  {/* Status Indicator Bar */}
                  <div className={`absolute left-0 top-0 bottom-0 w-2 ${booking.status === 'in_progress' ? 'bg-indigo-600' : 'bg-slate-900'}`} />

                  {/* Appliance Icon */}
                  <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <Box size={32} />
                  </div>

                  {/* Main Info */}
                  <div className="flex-1 space-y-2 text-center md:text-left">
                    <div className="flex flex-wrap justify-center md:justify-start items-center gap-3">
                      <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">{booking.serviceType}</span>
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter ${
                        booking.status === 'in_progress' ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-900 text-white'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-tight italic">
                      {booking.appliance?.name}
                    </h3>
                    <p className="text-[10px] font-mono text-slate-300 uppercase">{booking.bookingId}</p>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <div className="flex items-center gap-3">
                      <Calendar size={14} className="text-slate-300" />
                      <span className="text-[11px] font-bold text-slate-500 uppercase">
                        {new Date(booking.preferredDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock size={14} className="text-slate-300" />
                      <span className="text-[11px] font-bold text-slate-500 uppercase">{booking.preferredTime}</span>
                    </div>
                    <div className="flex items-center gap-3 col-span-2">
                      <MapPin size={14} className="text-slate-300" />
                      <span className="text-[11px] font-bold text-slate-500 uppercase truncate max-w-[150px]">
                        {booking.serviceAddress?.city}, {booking.serviceAddress?.pincode}
                      </span>
                    </div>
                  </div>

                  {/* Navigate Arrow */}
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all shadow-sm">
                    <ChevronRight size={24} />
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default MyBookingsPage;