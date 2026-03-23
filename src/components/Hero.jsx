  import React, { useEffect, useRef } from 'react';
  import { motion } from 'framer-motion';
  import gsap from 'gsap';
  import { ScrollTrigger } from 'gsap/ScrollTrigger';

  gsap.registerPlugin(ScrollTrigger);

  const Hero = () => {
    const containerRef = useRef(null);
    const nameSectionRef = useRef(null);

    useEffect(() => {
      const tl = gsap.timeline();

      // 1. Initial Animation (Curtain reveal)
      tl.fromTo(".reveal-mask", 
        { height: "100%" }, 
        { height: "0%", duration: 1.5, ease: "expo.inOut" }
      )
      .fromTo(".char", 
        { y: 200, skewY: 15, opacity: 0 },
        { y: 0, skewY: 0, opacity: 1, duration: 1.2, stagger: 0.04, ease: "expo.out" },
        "-=0.5"
      );

      // 2. Scroll Animation (Parallax/Scale on scroll)
      gsap.to(nameSectionRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true, // Ties the animation to the Lenis scroll
        },
        scale: 0.8,
        opacity: 0,
        y: -100
      });

    }, []);

    const name = "AMIT GOSAI";

    return (
      <div ref={containerRef} className="relative h-[110vh] w-full bg-[#0a0a0a] text-white overflow-hidden">
        <div className="reveal-mask absolute inset-0 bg-white z-50 pointer-events-none" />
        
        {/* Background Noise Layer */}
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="relative z-10 h-screen w-full flex flex-col justify-between p-6 md:p-12">
          {/* Top Branding */}
          <div className="flex justify-between items-start border-b border-white/10 pb-6 uppercase tracking-[0.4em] text-[9px] font-bold">
            <div className="flex flex-col">
              <span>Amit Gosai</span>
              <span className="opacity-40 font-light">Dev // 2026</span>
            </div>
            <div className="text-right">
              <span>MERN Expert</span>
              <span className="block opacity-40 font-light italic">2 Years Hands-On</span>
            </div>
          </div>

          {/* The Massive Typographic Centerpiece */}
          <div ref={nameSectionRef} className="relative w-full flex flex-col items-center py-20">
            <h1 className="text-[16vw] font-black leading-[0.8] tracking-tighter overflow-hidden">
              <div className="flex flex-wrap justify-center">
                {name.split("").map((char, index) => (
                  <span key={index} className="char inline-block whitespace-pre hover:italic hover:text-outline cursor-default transition-all duration-300">
                    {char}
                  </span>
                ))}
              </div>
            </h1>
          </div>

          {/* Footer Info */}
          <div className="flex flex-col md:flex-row justify-between items-end gap-10">
            <div className="max-w-xs">
              <p className="text-white/40 text-[9px] uppercase leading-relaxed tracking-[0.2em]">
                Full Stack Architecture using React, Next.js, and Node.js. 
                Focused on minimalist aesthetics and high-performance logic.
              </p>
            </div>

            <div className="flex items-center gap-4 cursor-pointer group">
              <span className="text-[9px] uppercase tracking-[0.6em]">Scroll</span>
              <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent" />
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .text-outline { -webkit-text-stroke: 1px white; color: transparent !important; }
        `}} />
      </div>
    );
  };

  export default Hero;