"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useNavigate } from "react-router-dom";
const Login = () => {
  const containerRef = useRef(null);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isError, setIsError] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    // 1. Initial Curtain Reveal (The White Mask sliding up)
    tl.fromTo(".reveal-mask", 
      { height: "100%" }, 
      { height: "0%", duration: 1.5, ease: "expo.inOut" }
    )
    // 2. Animate "LOGIN" Characters with Skew & Stagger
    .fromTo(".login-char", 
      { y: 200, skewY: 15, opacity: 0 },
      { y: 0, skewY: 0, opacity: 1, duration: 1.2, stagger: 0.04, ease: "expo.out" },
      "-=0.5"
    )
    // 3. Fade in the UI (Inputs, Header, Footer)
    .fromTo(".login-ui-reveal", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power4.out" },
      "-=0.8"
    );
  }, []);
 const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setIsError(false);

    // Artificial Latency for "System Verification" feel
    setTimeout(() => {
      if (credentials.username === "amit1397singh@gmail.com" && credentials.password === "Theawesomeme@1") {
        gsap.to(containerRef.current, {
          opacity: 0,
          scale: 0.9,
          filter: "blur(20px)",
          duration: 1,
          onComplete: () => {
            localStorage.setItem("isAdmin", "true");
          
navigate("/admin");
          }
        });
      } else {
        setIsError(true);
        setIsProcessing(false);
        // Error Shake Animation
        gsap.to(".login-form-box", {
          x: [-10, 10, -10, 10, 0],
          duration: 0.4,
          ease: "power2.inOut"
        });
      }
    }, 1200);
  };

  return (
    <div ref={containerRef} className="relative min-h-screen w-full bg-[#0a0a0a] text-white overflow-hidden selection:bg-red-600">
      
      {/* 1. THE CURTAIN MASK */}
      <div className="reveal-mask absolute inset-0 bg-white z-[100] pointer-events-none" />
      
      {/* 2. BACKGROUND NOISE & OVERLAYS */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(220,38,38,0.05),transparent_70%)]" />

      <div className="relative z-10 h-screen w-full flex flex-col justify-between p-6 md:p-12">
        
        {/* TOP BRANDING */}
        <div className="login-ui-reveal flex justify-between items-start border-b border-white/10 pb-6 uppercase tracking-[0.4em] text-[9px] font-bold">
          <div className="flex flex-col">
            <span>Amit Gosai // AUTH</span>
            <span className="opacity-40 font-light italic text-red-500">System_Port: 9999</span>
          </div>
          <div className="text-right">
            <span>Secure Access</span>
            <span className="block opacity-40 font-light">Verified Session Only</span>
          </div>
        </div>

        {/* CENTER LOGIN SECTION */}
        <div className="flex flex-col items-center justify-center flex-grow">
          {/* Big Typography Header */}
          <h1 className="text-[14vw] font-black leading-[0.8] tracking-tighter mb-10 overflow-hidden select-none">
            <div className="flex">
              {"LOGIN".split("").map((char, index) => (
                <span key={index} className="login-char inline-block hover:italic hover:text-outline cursor-default transition-all duration-300">
                  {char}
                </span>
              ))}
            </div>
          </h1>

          {/* Form Container */}
          <form onSubmit={handleLogin} className="login-ui-reveal login-form-box w-full max-w-sm space-y-8">
            <div className="group space-y-2">
              <label className={`text-[9px] uppercase tracking-[0.3em] transition-colors ${isError ? 'text-red-500' : 'text-white/40 group-focus-within:text-white'}`}>
                Neural ID (Email)
              </label>
              <input 
                type="email" 
                placeholder="USER@SYSTEM.COM"
                className={`w-full bg-transparent border-b py-3 text-sm transition-all outline-none placeholder:text-white/5 font-bold italic
                  ${isError ? 'border-red-600 text-red-600' : 'border-white/10 focus:border-white text-white'}`}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
              />
            </div>

            <div className="group space-y-2">
              <label className={`text-[9px] uppercase tracking-[0.3em] transition-colors ${isError ? 'text-red-500' : 'text-white/40 group-focus-within:text-white'}`}>
                Passkey
              </label>
              <input 
                type="password" 
                placeholder="••••••••"
                className={`w-full bg-transparent border-b py-3 text-sm transition-all outline-none placeholder:text-white/5 font-bold tracking-[0.5em]
                  ${isError ? 'border-red-600 text-red-600' : 'border-white/10 focus:border-white text-white'}`}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              />
            </div>

            <button 
              disabled={isProcessing}
              className={`w-full mt-10 py-5 border border-white/20 transition-all duration-500 text-[10px] font-black uppercase tracking-[0.5em] relative overflow-hidden group/btn
                ${isProcessing ? 'opacity-50 cursor-wait' : 'hover:bg-white hover:text-black hover:scale-[1.02] active:scale-95'}`}
            >
              {isProcessing ? "Authenticating..." : "Establish Connection →"}
              {!isProcessing && <div className="absolute inset-0 bg-red-600/10 scale-x-0 group-hover/btn:scale-x-100 transition-transform origin-left duration-500" />}
            </button>
            
            {isError && (
              <p className="text-[9px] text-red-600 font-black uppercase text-center tracking-[0.2em] animate-pulse">
                ! Core Mismatch: Access Denied !
              </p>
            )}
          </form>
        </div>

        {/* FOOTER INFO */}
        <div className="login-ui-reveal flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-xs">
            <p className="text-white/30 text-[8px] uppercase leading-relaxed tracking-[0.2em]">
              Data encryption active. All neural signatures are logged for audit. 
              Unauthorized breach attempts will trigger a system-wide lockdown.
            </p>
          </div>

          <div className="flex items-center gap-4 group cursor-pointer overflow-hidden h-10">
            <span className="text-[9px] uppercase tracking-[0.6em] group-hover:text-red-600 transition-colors">Emergency Wipe</span>
            <div className="w-[1px] h-full bg-gradient-to-t from-white to-transparent" />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .text-outline { -webkit-text-stroke: 1px white; color: transparent !important; }
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: white;
          -webkit-box-shadow: 0 0 0px 1000px #0a0a0a inset;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}} />
    </div>
  );
};

export default Login;