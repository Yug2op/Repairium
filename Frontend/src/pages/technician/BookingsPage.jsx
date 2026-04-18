import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, Calendar, Clock, MapPin, 
  AlertCircle, CheckCircle, DollarSign, ArrowRight,
  Activity, ShieldCheck, Zap, X, User
} from 'lucide-react';
import bookingService from '../../services/bookingService';
const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => { loadBookings(); }, []);

  useEffect(() => {
    const filtered = bookings.filter(booking => {
      const searchStr = searchTerm.toLowerCase();
      const matchesSearch = 
        booking.serviceType?.toLowerCase().includes(searchStr) ||
        booking.bookingId?.toLowerCase().includes(searchStr) ||
        booking.serviceAddress?.city?.toLowerCase().includes(searchStr) ||
        booking.appliance?.name?.toLowerCase().includes(searchStr);
      
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || booking.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
    setFilteredBookings(filtered);
  }, [bookings, statusFilter, priorityFilter, searchTerm]);

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookingService.getAvailableBookings();
      
      // JSON Mapping: response.data.bookings
      if (response.success && response.data?.bookings) {
        setBookings(response.data.bookings);
      } else {
        throw new Error("Invalid Engine Data Stream");
      }
    } catch (err) {
      console.error('Error loading bookings:', err);
      setError('Failed to synchronize with booking nodes.');
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptBooking = async (id) => {
    try {
      const response = await bookingService.acceptBooking(id);
      if (response.success) {
        alert('Booking Initialized Successfully');
        setSelectedBooking(null);
        loadBookings(); // Refresh list
      }
    } catch (err) {
      alert('Node Assignment Failed: ' + err.message);
    }
  };

  const getStatusStyle = (status) => {
    const styles = {
      pending: 'bg-amber-50 text-amber-600 border-amber-100',
      confirmed: 'bg-blue-50 text-blue-600 border-blue-100',
      in_progress: 'bg-indigo-50 text-indigo-600 border-indigo-100',
      completed: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    };
    return styles[status] || 'bg-slate-50 text-slate-600 border-slate-100';
  };

  const getPriorityStyle = (priority) => {
    const styles = {
      urgent: 'bg-rose-500 text-white shadow-rose-200',
      high: 'bg-orange-500 text-white shadow-orange-200',
      medium: 'bg-slate-900 text-white shadow-slate-200',
      low: 'bg-slate-400 text-white shadow-slate-100',
    };
    return styles[priority] || 'bg-slate-900 text-white';
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="w-12 h-12 border-4 border-slate-100 border-t-indigo-600 rounded-full animate-spin mb-4" />
      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Syncing_Nodes...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      {/* Header Engine */}
      <header className="pt-24 pb-12 px-6 lg:px-12 border-b border-slate-50 bg-slate-50/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em]">Service_Grid</span>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter italic leading-none">
              Open <span className="text-slate-200 font-light tracking-widest">Bookings</span>
            </h1>
          </div>
          
          <div className="flex gap-4">
            <button onClick={loadBookings} className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-indigo-500 transition-all active:scale-95 shadow-sm">
              Refresh_Feed
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Filters Panel */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <div className="flex-1 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="SEARCH_BY_ID_TYPE_OR_CITY..."
              className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <select 
              className="bg-slate-50 border-none rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">Status: All</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
            </select>
            
            <select 
              className="bg-slate-50 border-none rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-widest focus:ring-2 focus:ring-indigo-500/20 cursor-pointer"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="all" className=''>Priority: All</option>
              <option value="urgent">Urgent</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
            </select>
          </div>
        </div>

        {/* Grid Stream */}
        {filteredBookings.length === 0 ? (
          <div className="py-40 text-center border-2 border-dashed border-slate-50 rounded-[3rem]">
            <Activity className="mx-auto text-slate-100 mb-4" size={48} />
            <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">No_Active_Nodes_Found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredBookings.map((booking) => (
                <motion.div
                  layout
                  key={booking._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group bg-white border border-slate-100 rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-slate-200/50 transition-all cursor-pointer relative overflow-hidden"
                  onClick={() => setSelectedBooking(booking)}
                >
                  {/* Priority Badge */}
                  <div className={`absolute top-0 right-0 px-6 py-2 rounded-bl-3xl text-[9px] font-black uppercase tracking-widest shadow-sm ${getPriorityStyle(booking.priority)}`}>
                    {booking.priority}
                  </div>

                  <div className="mb-8">
                    <p className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.3em] mb-2">{booking.serviceType}</p>
                    <h3 className="text-xl font-black text-slate-900 tracking-tighter leading-tight">
                      {booking.appliance?.name || 'Unknown Unit'}
                    </h3>
                    <p className="text-[10px] font-mono text-slate-300 mt-1 uppercase">{booking.bookingId}</p>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-slate-500">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                        <MapPin size={14} />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-tight">{booking.serviceAddress?.street},{booking.serviceAddress?.city}, {booking.serviceAddress?.state}</span>
                    </div>
                    
                    <div className="flex items-center gap-3 text-slate-500">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                        <Calendar size={14} />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-tight">
                        {new Date(booking.preferredDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                        <Clock size={14} />
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-tight">
                        {booking.preferredTime}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-500">
                      <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                        <DollarSign size={14} />
                      </div>
                      <span className="text-[11px] font-black text-slate-900">EST. ₹{booking.estimatedCost?.total}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusStyle(booking.status)}`}>
                      {booking.status}
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center group-hover:bg-indigo-600 transition-colors shadow-lg">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* --- MODAL ENGINE --- */}
      <AnimatePresence>
        {selectedBooking && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => setSelectedBooking(null)}
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-[3rem] shadow-2xl overflow-hidden"
            >
              <div className="p-8 md:p-12">
                <div className="flex justify-between items-start mb-10">
                  <div>
                    <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em]">System_Report</span>
                    <h2 className="text-4xl font-black text-slate-900 italic tracking-tighter leading-none mt-2">
                      Booking <span className="text-slate-200">Details</span>
                    </h2>
                  </div>
                  <button onClick={() => setSelectedBooking(null)} className="p-4 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
                    <X size={20} className="text-slate-400" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                  <div className="space-y-6">
                    <DataPoint label="Client" value={selectedBooking.user?.fullName || 'Unknown'} icon={<User size={14}/>} />
                    <DataPoint label="Unit" value={selectedBooking.appliance?.name || 'Unknown'} icon={<Zap size={14}/>} />
                    <DataPoint label="Address" value={`${selectedBooking.serviceAddress?.street || 'Unknown'}, ${selectedBooking.serviceAddress?.city || 'Unknown'}`} icon={<MapPin size={14}/>} />
                  </div>
                  <div className="space-y-6 px-8 py-8 bg-slate-50 rounded-[2rem]">
                    <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Base_Fee</span>
                      <span className="text-xs font-mono font-bold text-slate-900">₹{selectedBooking.estimatedCost?.basePrice}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Service_Charge</span>
                      <span className="text-xs font-mono font-bold text-slate-900">₹{selectedBooking.estimatedCost?.serviceCharge}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em]">Total_Est</span>
                      <span className="text-xl font-black text-slate-900 italic">₹{selectedBooking.estimatedCost?.total}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 mb-12">
                  <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-2">Issue_Log</p>
                  <p className="text-sm font-bold text-slate-700 italic">"{selectedBooking.issueDescription}"</p>
                </div>

                {selectedBooking.status === 'pending' && (
                  <button 
                    onClick={() => handleAcceptBooking(selectedBooking._id)}
                    className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all hover:bg-indigo-600 active:scale-[0.98] flex items-center justify-center gap-4 shadow-xl shadow-slate-200"
                  >
                    <ShieldCheck size={18} />
                    Initialize_Acceptance_Protocol
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper Components
const DataPoint = ({ label, value, icon }) => (
  <div className="flex gap-4">
    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 flex-shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{label}</p>
      <p className="text-sm font-black text-slate-900 tracking-tight">{value || 'NOT_FOUND'}</p>
    </div>
  </div>
);

export default BookingsPage;