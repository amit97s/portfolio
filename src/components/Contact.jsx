import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";

const Contact = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-field", {
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "expo.out",
      });

      // Background Text Parallax
      gsap.to(".bg-text-contact", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: -200,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/amit97s" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/amit-manral/" },
    { name: "Instagram", url: "https://www.instagram.com/harrysingh9.9/?hl=en" },
    { name: "Email", url: "mailto:amit1397singh@gmail.com" },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full bg-[#050505] py-32 px-10 md:px-24 flex flex-col justify-between overflow-hidden">
      
      {/* HEADER */}
      <div className="relative z-10 mb-20">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-[1px] bg-[#722F37]" />
          <span className="text-[#E1AD01] text-[10px] font-mono tracking-[0.8em] uppercase">
            Connection // 04
          </span>
        </div>
        <h2 className="text-7xl md:text-[9vw] font-black text-white leading-none uppercase italic tracking-tighter">
          Ready to <span className="text-transparent border-b-2 border-white/10 pb-2">Build?</span>
        </h2>
      </div>

      {/* FORM */}
      <div ref={formRef} className="relative z-10 w-full max-w-5xl self-center bg-white/[0.01] border border-white/5 p-8 md:p-20 rounded-sm backdrop-blur-3xl shadow-[0_50px_100px_rgba(0,0,0,0.8)]">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12" onSubmit={(e) => e.preventDefault()}>
          
          <div className="contact-field group relative border-b border-white/10 focus-within:border-[#E1AD01] transition-colors duration-700">
            <input type="text" placeholder="ENTER NAME" className="w-full bg-transparent py-4 text-white text-xl font-bold outline-none placeholder:text-white/35 uppercase" />
          </div>

          <div className="contact-field group relative border-b border-white/10 focus-within:border-[#E1AD01] transition-colors duration-700">
            <input type="email" placeholder="ENTER@EMAIL.COM" className="w-full bg-transparent py-4 text-white text-xl font-bold outline-none placeholder:text-white/35 uppercase" />
          </div>

          <div className="contact-field group relative border-b border-white/10 focus-within:border-[#E1AD01] transition-colors duration-700 md:col-span-2">
            <textarea rows="3" placeholder="DESCRIBE YOUR PROJECT GOALS" className="w-full bg-transparent py-4 text-white text-xl font-bold outline-none placeholder:text-white/35 uppercase resize-none" />
          </div>

          <div className="contact-field md:col-span-2 flex flex-col md:flex-row justify-between items-center gap-8 mt-10">
            <button
              onClick={() => navigate("/login")}
              type="button"
              className="text-[#E1AD01]/40 font-mono text-[9px] tracking-[0.5em] uppercase hover:text-[#E1AD01] transition-all border border-white/5 px-6 py-2 rounded-full"
            >
              [ AUTH_GATEWAY ]
            </button>

            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#fff", color: "#000" }}
              whileTap={{ scale: 0.95 }}
              className="relative w-full md:w-auto px-20 py-6 bg-[#E1AD01] text-[#050505] font-black text-sm uppercase tracking-widest skew-x-[-10deg] transition-all"
            >
              Execute_Send
            </motion.button>
          </div>
        </form>
      </div>

      {/* FOOTER */}
      <div className="mt-32 border-t border-white/5 pt-12 flex flex-wrap justify-between items-end gap-10">
        <div className="flex flex-col gap-6">
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em]">Network</span>
          <div className="flex flex-wrap gap-8">
            {socialLinks.map((social) => (
              <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" 
                 className="group text-white/40 hover:text-white font-black uppercase text-xs tracking-tighter transition-all">
                <span className="text-[#E1AD01] mr-1 group-hover:mr-2 transition-all">/</span>{social.name}
              </a>
            ))}
          </div>
        </div>

        <div className="text-right">
          <p className="text-xl md:text-2xl text-white/30 font-serif italic max-w-sm ml-auto">
            "Precision is the only <span className="text-white font-bold underline decoration-[#722F37] underline-offset-8">luxury</span> that doesn't cost a fortune in code."
          </p>
        </div>
      </div>

      {/* BACKGROUND DECO */}
      <div className="bg-text-contact absolute top-1/2 left-0 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none z-0">
        <h4 className="text-[30vw] font-black uppercase text-white leading-none -rotate-90">CONNECT</h4>
      </div>
    </section>
  );
};

export default Contact;