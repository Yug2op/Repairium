import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Zap,
  MapPin,
  Calendar,
  Clock,
  Activity,
  ArrowLeft,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import API from "../services/api";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [appliance, setAppliance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState("");
  const [form, setForm] = useState({
    serviceType: "regular",
    issueDescription: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    preferredDate: "",
    preferredTime: ""
  });

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 4000);
  };

  useEffect(() => {
    const fetchAppliance = async () => {
      try {
        const res = await API.get(`/appliances/${id}`);
        setAppliance(res.data.data.appliance);
      } catch (err) {
        console.error("NODE_FETCH_ERROR:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppliance();
  }, [id]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setForm((prev) => ({
        ...prev,
        street: user?.address?.street || "",
        city: user?.address?.city || "",
        state: user?.address?.state || "",
        pincode: user?.address?.pincode || ""
      }));
    }
  }, []);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (!form.issueDescription || form.issueDescription.length < 10) {
        return showToast("LOG_ERROR: Describe issue (min 10 chars) ❌");
      }
      if (!form.street || !form.city || !form.state || !form.pincode) {
        return showToast("LOG_ERROR: Incomplete address matrix ❌");
      }
      if (!form.preferredDate || !form.preferredTime) {
        return showToast("LOG_ERROR: Missing timestamp ❌");
      }

      const [hours] = form.preferredTime.split(":").map(Number);
      if (hours < 8 || hours > 20) {
        return showToast("LOG_ERROR: Outside operational window (8AM-8PM) ❌");
      }

      const coords = [72.8777, 19.0760]; // Spatial anchor

      const payload = {
        applianceId: id,
        serviceType: form.serviceType,
        issueDescription: form.issueDescription,
        serviceAddress: {
          street: form.street,
          city: form.city,
          state: form.state,
          pincode: form.pincode,
          coordinates: { type: "Point", coordinates: coords }
        },
        preferredDate: form.preferredDate,
        preferredTime: form.preferredTime
      };

      const res = await API.post("/bookings/user/bookings", payload);
      showToast("DEPLOYMENT_INITIALIZED: Sequence Started 🎉");

      setTimeout(() => {
        navigate(`/payment/${res.data.data._id}`);
      }, 1500);

    } catch (err) {
      showToast(err.response?.data?.message || "DEPLOYMENT_FAILED ❌");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <Activity className="animate-spin text-indigo-600 mb-4" size={32} />
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Syncing_Node...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pb-20">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[100] bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-2xl text-[10px] font-black uppercase tracking-[0.3em] animate-in fade-in zoom-in duration-300">
          {toast}
        </div>
      )}

      {/* Header */}
      <header className="pt-24 pb-12 border-b border-slate-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors mb-4">
              <ArrowLeft size={14} /> Back_to_Registry
            </button>
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter italic leading-none">
              Deploy <span className="text-slate-200 font-light not-italic italic">Technician.</span>
            </h1>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em]">Node_Identifier</span>
            <span className="text-xs font-mono font-bold text-slate-400">{id.slice(-12).toUpperCase()}</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">

        {/* LEFT: NODE PREVIEW */}
        <div className="lg:col-span-4 space-y-10">
          <div className="bg-slate-900 rounded-[2.5rem] p-18 text-white shadow-2xl shadow-indigo-100">
            <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-8 text-center">Appliance_Manifest</h3>
            <div className="space-y-16">
              <div>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Model_Identity</p>
                <p className="text-xl font-black tracking-tight">{appliance.brand} {appliance.name}</p>
                <p className="text-[10px] font-mono text-slate-400 mt-1 uppercase italic">{appliance.model}</p>
              </div>
              <div className="pt-6 border-t border-white/10">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Base_Cost</p>
                <p className="text-3xl font-black italic tracking-tighter">₹{appliance.totalPrice}</p>
              </div>
            </div>
          </div>
          <div className="p-6 bg-indigo-50 rounded-3xl border border-indigo-100 flex items-start gap-4">
            <AlertCircle size={20} className="text-indigo-600 shrink-0 mt-1" />
            <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase">
              Assignment is pending real-time fleet availability. Priority protocols applied for Emergency Service.
            </p>
          </div>
        </div>

        {/* RIGHT: CONFIGURATION FORM */}
        <div className="lg:col-span-8 space-y-12">

          {/* Section 1: Service Mode */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Zap size={18} className="text-indigo-600" />
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Operational_Mode</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <ModeCard
                active={form.serviceType === 'regular'}
                onClick={() => handleChange('serviceType', 'regular')}
                label="Regular_Sync"
                desc="Standard maintenance sequence."
              />
              <ModeCard
                active={form.serviceType === 'emergency'}
                onClick={() => handleChange('serviceType', 'emergency')}
                label="Emergency_Override"
                desc="Priority deployment protocol."
              />
            </div>
            <textarea
              placeholder="LOG_ISSUE_DESCRIPTION_HERE..."
              value={form.issueDescription}
              onChange={(e) => handleChange("issueDescription", e.target.value)}
              className="w-full bg-slate-50 border-none rounded-2xl p-6 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-indigo-500/20 transition-all min-h-[120px] placeholder:text-slate-300"
            />
          </section>

          {/* Section 2: Spatial Data */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-indigo-600" />
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Deployment_Matrix (Address)</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputBlock placeholder="Street" val={form.street} onChange={(v) => handleChange("street", v)} />
              <InputBlock placeholder="City" val={form.city} onChange={(v) => handleChange("city", v)} />
              <InputBlock placeholder="State" val={form.state} onChange={(v) => handleChange("state", v)} />
              <InputBlock placeholder="Pincode" val={form.pincode} onChange={(v) => handleChange("pincode", v)} />
            </div>
          </section>

          {/* Section 3: Scheduling */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-indigo-600" />
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Temporal_Window</h4>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">Sync_Date</p>
                <input
                  type="date"
                  value={form.preferredDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => handleChange("preferredDate", e.target.value)}
                  className="w-full bg-slate-50 border-none rounded-xl p-4 text-xs font-bold uppercase tracking-widest focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <div className="flex-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-3">
                  Temporal_Window (8AM-8PM)
                </p>

                <div className="relative group">
                  <select
                    value={form.preferredTime}
                    onChange={(e) => handleChange("preferredTime", e.target.value)}
                    className="w-full appearance-none bg-slate-50 border-2 border-slate-50 rounded-xl px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 transition-all cursor-pointer text-slate-900"
                  >
                    <option value="" disabled>SELECT_TIME_SLOT</option>
                    {Array.from({ length: 13 }, (_, i) => {
                      const hour = 8 + i;
                      const suffix = hour >= 12 ? "PM" : "AM";
                      const display = hour > 12 ? hour - 12 : hour;
                      const timeValue = `${hour.toString().padStart(2, "0")}:00`;

                      return (
                        <option key={timeValue} value={timeValue} className="font-mono bg-white">
                          {display}:00_{suffix}
                        </option>
                      );
                    })}
                  </select>

                  {/* Custom Dropdown Arrow */}
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-indigo-600 transition-colors">
                    <Clock size={14} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SUBMIT BUTTON */}
          <button
            onClick={handleSubmit}
            className="group w-full py-8 bg-slate-900 text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.4em] transition-all hover:bg-indigo-600 active:scale-95 flex items-center justify-center gap-4 shadow-2xl shadow-indigo-100"
          >
            <CheckCircle size={20} className="group-hover:animate-pulse" />
            Initialize_Deployment_Sequence
          </button>
        </div>
      </main>
    </div>
  );
};

// --- HELPER COMPONENTS ---

const ModeCard = ({ active, onClick, label, desc }) => (
  <div
    onClick={onClick}
    className={`p-6 rounded-[2rem] border-2 cursor-pointer transition-all ${active ? 'bg-indigo-50 border-indigo-600' : 'bg-white border-slate-50 hover:border-indigo-100'
      }`}
  >
    <p className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-indigo-600' : 'text-slate-900'}`}>{label}</p>
    <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase">{desc}</p>
  </div>
);

const InputBlock = ({ placeholder, val, onChange }) => (
  <input
    value={val}
    onChange={(e) => onChange(e.target.value)}
    placeholder={placeholder.toUpperCase() + "_DATA..."}
    className="bg-slate-50 border-none rounded-xl p-4 text-[10px] font-bold uppercase tracking-widest focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-200"
  />
);

export default BookingPage;