"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

// Separate Clock Component
const StudioClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  const getRomanHour = (hour) => {
    const roman = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];
    return roman[hour % 12];
  };
  return (
    <div className="relative flex flex-col gap-1 group">
      <div className="flex items-baseline gap-6">
        <motion.span 
          key={time.getHours()}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-9xl font-black italic tracking-tighter text-white leading-none selection:bg-red-600">
          {getRomanHour(time.getHours())}
        </motion.span>
        <div className="h-16 w-[2px] bg-red-600 shadow-[0_0_15px_#dc2626]" />
        <div className="flex flex-col">
          <div className="text-4xl font-light tracking-[0.1em] text-white/90 tabular-nums leading-none">
            {time.getMinutes().toString().padStart(2, '0')}
            <span className="text-red-600 animate-[pulse_1s_infinite] mx-1">:</span>
            <span className="text-white/30 text-2xl font-black italic">
              {time.getSeconds().toString().padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 mt-6">
        <div className="text-[8px] font-bold uppercase tracking-[0.4em] text-red-600/60 italic">
           {time.getHours() >= 18 || time.getHours() < 6 ? "NOCTURNAL_PHASE" : "DIURNAL_PHASE"}
        </div>
      </div>
    </div>
  );
};

const AdminDash = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [projects, setProjects] = useState([]); // 🔥 State for fetched data

  const [projectData, setProjectData] = useState({
    projectNumber: "",
    projectHeading: "",
    projectUrl: "",
    projectDescription: "",
    projectPhotos: "",
  });

  // 🔥 1. FETCH DATA (GET REQUEST)
  const fetchProjects = async () => {
    try {
      const res = await axios.get("https://portfoliobackend-3-09hi.onrender.com/api/v1/get-projects");
      setProjects(res?.data?.data || res.data); 
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    const auth = localStorage.getItem("isAdmin");
    if (!auth) window.location.href = "/login";
    fetchProjects(); // Initial fetch
  }, []);



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectData({ ...projectData, projectPhotos: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const submitData = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://portfoliobackend-3-09hi.onrender.com/api/v1/project", projectData);
      alert("Project added successfully ✅");
      setProjectData({ projectNumber: "", projectHeading: "", projectUrl: "", projectDescription: "", projectPhotos: "" });
      setSelectedImage(null);
      setIsFormOpen(false);
      fetchProjects(); // 🔥 Refresh list after adding
    } catch (error) {
      alert("Error adding project ❌");
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-red-600 overflow-x-hidden relative">
      <motion.div initial={{ y: 0 }} animate={{ y: "-100%" }} transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.5 }} className="fixed inset-0 bg-white z-[100] pointer-events-none" />
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-0" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)] pointer-events-none z-0" />

      {/* Sidebar */}
      <nav className="fixed left-0 top-0 h-full w-20 border-r border-white/5 flex flex-col items-center py-12 z-50 bg-[#050505]/50 backdrop-blur-xl">
        <div className="text-xl font-black italic tracking-tighter mb-20 text-red-600">M.A</div>
        <div className="flex flex-col gap-12 text-[9px] font-bold uppercase tracking-[0.5em] [writing-mode:vertical-rl] text-white/20">
          <span className="cursor-pointer hover:text-white transition-colors">STRUCTURE</span>
          <span className="cursor-pointer hover:text-white transition-colors">ARCHIVES</span>
        </div>
        <button onClick={() => { localStorage.clear(); window.location.href="/login"; }} className="mt-auto text-[9px] font-black uppercase tracking-widest text-red-600/50 hover:text-red-600">EXIT</button>
      </nav>

      {/* Main */}
      <main className="pl-32 pr-12 py-20 relative z-10">
        <header className="flex justify-between items-end mb-24 border-b border-white/5 pb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 }}>
            <p className="text-[10px] font-bold tracking-[0.6em] text-red-600 uppercase mb-4">Core Management // 2026</p>
            <h1 className="text-8xl font-black tracking-tighter italic uppercase leading-none">Studio_Inventory</h1>
          </motion.div>
          <motion.button onClick={() => setIsFormOpen(true)} className="group px-10 py-5 bg-white text-black font-black uppercase text-[10px] tracking-[0.4em] hover:bg-red-600 hover:text-white transition-all shadow-2xl shadow-white/5">+ ADD NEW PROJECT</motion.button>
        </header>

        <div className="grid grid-cols-12 gap-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }} className="col-span-6 p-12 border border-white/5 bg-white/[0.01] rounded-sm relative overflow-hidden backdrop-blur-3xl">
            <span className="text-[9px] font-bold text-white/10 uppercase tracking-[0.8em] mb-12 block">System Chronos Engine</span>
            <StudioClock />
            <div className="mt-16 h-[1px] w-full bg-white/5 overflow-hidden">
               <motion.div initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="w-1/3 h-full bg-gradient-to-r from-transparent via-red-600 to-transparent" />
            </div>
          </motion.div>

          {/* 🔥 3. DYNAMIC MAPPING FROM API */}
          <div className="col-span-6 space-y-2 overflow-y-auto max-h-[60vh] custom-scrollbar pr-4">
            {projects.length > 0 ? projects.map((project, i) => (
              <motion.div 
                key={project._id || i} 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: 0.1 * i }}
                className="flex items-center justify-between p-8 border-b border-white/5 hover:bg-white/[0.01] transition-all group cursor-crosshair"
              >
                <div className="flex items-center gap-10">
                  <span className="text-xs font-bold text-white/10 uppercase tracking-widest italic">#{project.projectNumber || i}</span>
                  <h3 className="text-2xl font-light uppercase tracking-tighter group-hover:italic group-hover:text-red-600 transition-all">
                    {project.projectHeading || "Unnamed_Entry"}
                  </h3>
                </div>
                <div className="flex gap-6 opacity-0 group-hover:opacity-100 transition-all uppercase text-[9px] font-black tracking-widest">
                  <button className="hover:text-red-600">Edit</button>
                  <button 
                    className="text-red-600/40 hover:text-red-600"
                  >Wipe</button>
                </div>
              </motion.div>
            )) : (
              <div className="p-8 text-white/10 font-black uppercase tracking-[0.5em] italic">No_Assets_Found_In_Core</div>
            )}
          </div>
        </div>
      </main>

      {/* Form Modal remains same as integrated previously */}
      <AnimatePresence>
        {isFormOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsFormOpen(false)} className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[60]" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 35, stiffness: 250 }} className="fixed right-0 top-0 h-full w-full max-w-2xl bg-[#080808] border-l border-white/5 z-[70] flex flex-col shadow-[-50px_0_100px_rgba(0,0,0,0.8)]">
              <div className="p-12 border-b border-white/5 flex justify-between items-center bg-[#080808]">
                <h2 className="text-xs font-black uppercase tracking-[0.6em] italic text-red-600">Database_Entry</h2>
                <button onClick={() => setIsFormOpen(false)} className="text-[10px] font-bold text-white/20 hover:text-white uppercase tracking-widest transition-colors">Close [ESC]</button>
              </div>
              <form className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar" onSubmit={submitData}>
                <div className="space-y-4">
                  <label className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">Visual_Reference_Upload</label>
                  <div className="relative group h-48 w-full border border-dashed border-white/10 hover:border-red-600/50 transition-all flex items-center justify-center bg-white/[0.01] overflow-hidden">
                    {selectedImage ? <img src={selectedImage} alt="Preview" className="w-full h-full object-cover opacity-50" /> : <p className="text-[10px] font-black uppercase tracking-widest text-white/10">Mount_Asset</p>}
                    <input type="file" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-12">
                  <div className="flex flex-col gap-4 border-b border-white/10 pb-4 focus-within:border-red-600">
                    <label className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">Project_ID</label>
                    <input type="text" value={projectData.projectNumber} onChange={(e) => setProjectData({...projectData, projectNumber: e.target.value})} placeholder="P-001" className="bg-transparent outline-none text-2xl font-black italic text-white uppercase" />
                  </div>
                  <div className="flex flex-col gap-4 border-b border-white/10 pb-4 focus-within:border-red-600">
                    <label className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">Title_Label</label>
                    <input type="text" value={projectData.projectHeading} onChange={(e) => setProjectData({...projectData, projectHeading: e.target.value})} placeholder="HEADING" className="bg-transparent outline-none text-2xl font-black italic text-white uppercase" />
                  </div>
                </div>
                <div className="flex flex-col gap-4 border-b border-white/10 pb-4 focus-within:border-red-600">
                  <label className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">Asset_Source_URL</label>
                  <input type="text" value={projectData.projectUrl} onChange={(e) => setProjectData({...projectData, projectUrl: e.target.value})} placeholder="https://..." className="bg-transparent outline-none text-sm font-medium italic text-white/60" />
                </div>
                <div className="flex flex-col gap-4 border-b border-white/10 pb-8 focus-within:border-red-600">
                  <label className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">Brief_Summary</label>
                  <textarea rows="4" value={projectData.projectDescription} onChange={(e) => setProjectData({...projectData, projectDescription: e.target.value})} placeholder="Description..." className="bg-transparent outline-none text-sm font-medium text-white/60 resize-none" />
                </div>
                <button type="submit" className="w-full py-8 bg-white text-black font-black uppercase text-[11px] tracking-[0.8em] hover:bg-red-600 hover:text-white transition-all">Execute_Commit_System</button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style dangerouslySetInnerHTML={{ __html: `
        body { margin: 0; background: #050505; color-scheme: dark; }
        ::-webkit-scrollbar { display: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(220, 38, 38, 0.2); }
      `}} />
    </div>
  );
};

export default AdminDash;