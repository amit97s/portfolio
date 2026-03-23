import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Skills = () => {
  const skillRefs = useRef([]);
  const orbitRefs = useRef([]);
  const [activeSkill, setActiveSkill] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Tighter Orbits for a better "Logo" feel
  const orbits = [
    { 
      radius: 80, speed: 0.012,
      skills: [
        { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/white", info: "Structure & Semantics" },
        { name: "CSS3", icon: "https://cdn.simpleicons.org/css3/white", info: "Styling & Layouts" },
        { name: "JS", icon: "https://cdn.simpleicons.org/javascript/white", info: "Interactivity & Logic" }
      ]
    },
    { 
      radius: 160, speed: -0.008,
      skills: [
        { name: "React", icon: "https://cdn.simpleicons.org/react/white", info: "UI Components" },
        { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/white", info: "Framework & SSR" },
        { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/white", info: "Utility-first CSS" }
      ]
    },
    { 
      radius: 240, speed: 0.005,
      skills: [
        { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/white", info: "Server-side Dev" },
        { name: "Express", icon: "https://cdn.simpleicons.org/express/white", info: "API Framework" },
        { name: "MongoDB", icon: "https://cdn.simpleicons.org/mongodb/white", info: "NoSQL Database" }
      ]
    }
  ];

  const allSkills = orbits.flatMap((orbit) => 
    orbit.skills.map((skill, sIdx) => ({
      ...skill,
      r: orbit.radius,
      s: orbit.speed,
      initialAngle: (sIdx * (Math.PI * 2)) / orbit.skills.length
    }))
  );

  useEffect(() => {
    const centerX = window.innerWidth * 0.75; 
    const centerY = window.innerHeight * 0.5;
    const angles = allSkills.map(s => s.initialAngle);

    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const tick = () => {
      skillRefs.current.forEach((el, i) => {
        if (!el) return;
        if (!isPaused) {
          angles[i] += allSkills[i].s;
        }
        const x = centerX + Math.cos(angles[i]) * allSkills[i].r;
        const y = centerY + Math.sin(angles[i]) * allSkills[i].r;
        gsap.set(el, { x, y, xPercent: -50, yPercent: -50 });
      });
      requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", handleMouseMove);
    const frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, [isPaused]);

  return (
    <div className="relative h-screen w-full bg-[#050505] overflow-hidden flex items-center justify-center font-sans cursor-none">
      
      {/* 1. LEFT INFO PANEL (Premium Typography) */}
      <div className="absolute left-20 z-40 max-w-sm pointer-events-none">
        <div className={`transition-all duration-700 ease-out transform ${activeSkill ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-x-10'}`}>
          <h3 className="text-7xl font-black text-[#E1AD01] mb-2 uppercase italic tracking-tighter">
            {activeSkill?.name}
          </h3>
          <p className="text-xs text-white/30 leading-relaxed font-mono tracking-[0.3em] uppercase">
            {activeSkill?.info}
          </p>
          <div className="mt-8 w-24 h-[1px] bg-black shadow-[0_0_15px_#722F37]" />
        </div>
      </div>

      {/* 2. THE ORBITAL ENGINE (Right Side Grouping) */}
      <div className="absolute right-[25%] top-1/2 -translate-y-1/2">
        
        {/* THE STATIONARY SUN (Center of Orbits) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="w-16 h-16 bg-black rounded-full border border-white/40 shadow-[0_0_40px_rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 " />
                <div className="w-8 h-8 rounded-full border-2 border-dashed border-white/10 animate-[spin_10s_linear_infinite]" />
            </div>
            {/* Solar Flare Glitch around central sun */}
            <div className="absolute -inset-4 border border-white/5 rounded-full animate-pulse" />
        </div>

        {/* ORBITAL LINES */}
        {orbits.map((orbit, i) => (
          <div 
            key={i}
            className="absolute rounded-full border border-white/5 pointer-events-none"
            style={{ 
              width: orbit.radius * 2, 
              height: orbit.radius * 2, 
              top: '50%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)' 
            }}
          />
        ))}
      </div>

      {/* 3. SKILL PLANETS */}
      {allSkills.map((skill, i) => (
        <div
          key={skill.name}
          ref={el => skillRefs.current[i] = el}
          className="absolute top-0 left-0 z-30 pointer-events-auto"
          onMouseEnter={() => { setActiveSkill(skill); setIsPaused(true); }}
          onMouseLeave={() => { setActiveSkill(null); setIsPaused(false); }}
        >
          <div className="p-6 cursor-pointer group">
             <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black border border-white/10 group-hover:border-[#E1AD01] group-hover:border-opacity-100 transition-all duration-500 shadow-2xl relative">
                <img src={skill.icon} alt={skill.name} className="w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                {/* Orbital Trail Effect */}
                <div className="absolute -inset-2 rounded-full border border-white/0 group-hover:border-white/10 transition-all duration-700" />
             </div>
          </div>
        </div>
      ))}

      {/* 4. MOUSE CURSOR (Independent Eclipse) */}
      <div 
        className="fixed top-0 left-0 w-8 h-8 bg-black rounded-full pointer-events-none z-50 border border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.2)]" 
        style={{ 
          transform: `translate3d(${mousePos.x - 16}px, ${mousePos.y - 16}px, 0)`,
        }}
      >
        <div className="absolute inset-[-4px] border-t border-[#E1AD01]/50 rounded-full animate-spin [animation-duration:2s]" />
      </div>

      {/* Background Decorative Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.12] pointer-events-none select-none">
        <h2 className="text-[20vw] font-black text-white uppercase italic tracking-widest">Stack</h2>
      </div>
    </div>
  );
};

export default Skills;