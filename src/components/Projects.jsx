"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'framer-motion';
import axios from 'axios';

const ProjectTile = ({ project, mouseX, mouseY }) => {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const rotateX = useTransform(mouseY, [0, typeof window !== 'undefined' ? window.innerHeight : 1000], [10, -10]);
  const rotateY = useTransform(mouseX, [0, typeof window !== 'undefined' ? window.innerWidth : 1000], [-10, 10]);

  const springConfig = { damping: 20, stiffness: 100 };
  const rX = useSpring(rotateX, springConfig);
  const rY = useSpring(rotateY, springConfig);

  return (
    // 🔥 Wrapped in <a> for redirection
    <a 
      href={project.projectUrl || "#"} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block no-underline"
    >
      <motion.div
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ rotateX: rX, rotateY: rY, perspective: 1000 }}
        className="relative w-full border-b border-white/5 py-16 px-10 group cursor-none transition-colors hover:bg-white/[0.02]"
      >
        <div className="flex flex-col md:flex-row items-baseline justify-between z-10 relative">
          <div className="flex items-center gap-10">
            <span className="font-mono text-[#722F37] text-xl font-bold italic group-hover:text-[#E1AD01] transition-colors">
              {project.projectNumber || "00"}
            </span>
            <h2 className="text-[10vw] font-black leading-none uppercase tracking-tight text-white/5 group-hover:text-white transition-all duration-700 group-hover:tracking-tighter">
              {project.projectHeading}
            </h2>
          </div>
          
          <div className="mt-4 md:mt-0 overflow-hidden flex flex-col items-end">
            <p className="font-mono text-[#E1AD01] text-sm tracking-[0.4em] translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              {project.projectDescription?.substring(0, 30).toUpperCase() || "VIEW_LIVE_PROJECT"}
            </p>
            {/* Added a small 'click' hint */}
            <span className="text-[8px] text-white/20 mt-2 opacity-0 group-hover:opacity-100 transition-opacity tracking-[0.5em]">CLICK_TO_EXECUTE</span>
          </div>
        </div>

        {/* DYNAMIC IMAGE REVEAL */}
        <motion.div
          animate={{ 
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.1 : 0.8,
            x: isHovered ? 20 : 0
          }}
          className="absolute right-[15%] top-1/2 -translate-y-1/2 w-[30vw] h-[20vw] z-0 pointer-events-none overflow-hidden grayscale brightness-50 contrast-125 rounded-sm border border-white/10 shadow-2xl"
        >
          <img 
            src={project.projectPhotos || "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000"} 
            alt={project.projectHeading} 
            className="w-full h-full object-cover scale-125 group-hover:scale-100 transition-transform duration-1000" 
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#722F37]/40 to-transparent mix-blend-overlay" />
        </motion.div>
      </motion.div>
    </a>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHoveringLink, setIsHoveringLink] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:9998/api/v1/get-projects");
      const data = res?.data?.projects || res?.data?.data || res.data;
      setProjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <section className="bg-[#050505] min-h-screen w-full py-40 flex flex-col items-center overflow-hidden cursor-none">
      
      {/* HEADER */}
      <div className="w-full px-10 mb-32 mix-blend-difference">
        <div className="flex justify-between items-end border-b border-white/20 pb-10">
          <h1 className="text-white text-7xl font-black italic uppercase leading-[0.8]">
              Selected <br /> <span className="text-[#E1AD01]">Deployments</span>
          </h1>
          <div className="text-right font-mono text-[10px] text-white/40 tracking-widest leading-loose">
            01 — BUILD <br /> 02 — OPTIMIZE <br /> 03 — SCALE
          </div>
        </div>
      </div>

      {/* DYNAMIC ENGINE */}
      <div className="w-full" onMouseEnter={() => setIsHoveringLink(true)} onMouseLeave={() => setIsHoveringLink(false)}>
        {projects.length > 0 ? (
          projects.map((p, index) => (
            <ProjectTile 
                key={p._id || index} 
                project={p} 
                mouseX={mouseX} 
                mouseY={mouseY} 
            />
          ))
        ) : (
          <div className="text-white/10 text-center font-black italic text-4xl py-20 uppercase tracking-widest">
            Loading_Assets...
          </div>
        )}
      </div>

      {/* CURSOR WITH INTERACTION */}
      <motion.div
        style={{ 
            x: mouseX, 
            y: mouseY, 
            translateX: "-50%", 
            translateY: "-50%" 
        }}
        className="fixed top-0 left-0 w-12 h-12 rounded-full border border-white/40 bg-black/50 backdrop-blur-sm z-[100] pointer-events-none flex items-center justify-center transition-all duration-300"
      >
        {/* Glowing dot in center */}
        <div className="w-1 h-1 bg-[#E1AD01] rounded-full" />
        
        {/* Circular text or label would go here, but keeping it minimalist */}
        <motion.span 
          animate={{ opacity: isHoveringLink ? 1 : 0, scale: isHoveringLink ? 1 : 0.5 }}
          className="absolute -top-8 text-[8px] font-bold text-[#E1AD01] tracking-widest uppercase"
        >
          View_Live
        </motion.span>
      </motion.div>
    </section>
  );
};

export default Projects;