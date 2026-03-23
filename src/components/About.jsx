import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const textContainerRef = useRef(null);
  const scrollTextRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Smoother Reveal (Y-axis only, no skew to keep it "clean")
      const lines = textContainerRef.current.querySelectorAll('.reveal-line');
      gsap.fromTo(lines, 
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textContainerRef.current,
            start: "top 80%",
          }
        }
      );

      // 2. Subtle, Slow Background Drift
      gsap.to(scrollTextRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
        x: "-10%",
        ease: "none"
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[120vh] w-full bg-[#050505] text-white py-40 px-8 md:px-32 flex flex-col justify-center overflow-hidden"
    >
      {/* BACKGROUND TEXT - Very Subtle, High Contrast Border */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 pointer-events-none select-none z-0 whitespace-nowrap opacity-[0.03]">
        <h3 
          ref={scrollTextRef}
          className="text-[22vw] font-black uppercase tracking-tighter text-transparent"
          style={{ WebkitTextStroke: "1px #ffffff" }}
        >
          ARCHITECTURE — PRECISION — AMIT GOSAI
        </h3>
      </div>

      <div className="relative z-10 max-w-[1600px] w-full">
        {/* Minimalist Top Label */}
        <div className="flex items-center gap-4 mb-32 opacity-40">
          <span className="text-[10px] uppercase tracking-[1em] font-medium text-[#E1AD01]">
            Introduction // 01
          </span>
        </div>

        <div ref={textContainerRef} className="space-y-4">
          {/* Main Heading - Clean, Bold, Minimalist */}
          <h2 className="text-[9vw] md:text-[7vw] font-black leading-[0.9] tracking-[-0.04em] uppercase">
            <div className="overflow-hidden py-1">
               <span className="reveal-line inline-block">Engineering</span>
            </div>
            <div className="overflow-hidden py-1">
              <span className="reveal-line inline-block text-[#722F37]">Digital</span>
            </div>
            <div className="overflow-hidden py-1">
              <span className="reveal-line inline-block text-transparent" style={{ WebkitTextStroke: "1.5px white" }}>
                Elegance
              </span>
            </div>
          </h2>

          {/* Body Narrative - The "Luxury Comfort" fix */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mt-24">
            <div className="lg:col-span-8">
              <p className="reveal-line text-2xl md:text-5xl leading-[1.15] font-light tracking-tight text-white/90">
                I build high-performance web systems using the 
                <span className="text-[#E1AD01] font-bold"> MERN Stack</span>. 
                My focus is on <span className="italic font-serif serif-accent text-white">refined logic</span> and 
                premium aesthetics that feel as good as they look.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-end space-y-12">
              <div className="reveal-line flex flex-col gap-4 border-t border-white/10 pt-8">
                <span className="text-[9px] uppercase tracking-[0.5em] text-[#E1AD01] font-bold">Location</span>
                <p className="text-sm uppercase tracking-widest opacity-50">  Ghaziabad || uttrakhand</p>
              </div>

              <div className="reveal-line flex flex-col gap-4 border-t border-white/10 pt-8">
                <span className="text-[9px] uppercase tracking-[0.5em] text-[#722F37] font-bold">Status</span>
                <p className="text-sm uppercase tracking-widest opacity-50">Available for 2026 Projects</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;900&family=Playfair+Display:ital@1&display=swap');
        
        section { font-family: 'Inter', sans-serif; }
        .serif-accent { font-family: 'Playfair Display', serif; }
        
        /* Smooth selection color to match brand */
        ::selection { background: #E1AD01; color: #000; }
      `}} />
    </section>
  );
};

export default About;