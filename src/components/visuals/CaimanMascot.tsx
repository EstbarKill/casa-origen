
"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function CaimanMascot() {
  const [isSleeping, setIsSleeping] = useState(false);
  const [direction, setDirection] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isWaving, setIsWaving] = useState(false);
  const [foundDiscoveries, setFoundDiscoveries] = useState<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);

  const { scrollYProgress } = useScroll();
  
  const x = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [15, 80, 25, 75, 20]);
  const smoothX = useSpring(x, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const saved = localStorage.getItem('casa-origen-discoveries');
    if (saved) setFoundDiscoveries(JSON.parse(saved));

    const handleScroll = () => {
      setIsSleeping(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      const currentScrollY = window.scrollY;
      setDirection(currentScrollY > lastScrollY.current ? 1 : -1);
      lastScrollY.current = currentScrollY;

      timeoutRef.current = setTimeout(() => {
        setIsSleeping(false);
      }, 2000);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (isSleeping) setIsSleeping(true);
    };

    const handleWave = () => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(true), 2000);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mascot-wave', handleWave);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mascot-wave', handleWave);
    };
  }, [isSleeping]);

  const rotationToCursor = useMemo(() => {
    if (typeof window === 'undefined') return 0;
    const caimanElement = document.getElementById('caiman-mascot');
    if (!caimanElement) return 0;
    const rect = caimanElement.getBoundingClientRect();
    const caimanX = rect.left + rect.width / 2;
    const caimanY = rect.top + rect.height / 2;
    const angle = Math.atan2(mousePos.y - caimanY, mousePos.x - caimanX) * (180 / Math.PI);
    return direction === 1 ? angle : angle + 180;
  }, [mousePos, direction]);

  return (
    <motion.div
      id="caiman-mascot"
      style={{
        position: 'fixed',
        left: `${smoothX.get()}%`,
        bottom: '8%',
        zIndex: 100,
        pointerEvents: 'auto',
      }}
      animate={{
        scale: isSleeping ? 1 : .9,
        y: isSleeping ? 15 : [0, -4, 0],
      }}
      transition={{
        y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
      }}
      className="cursor-pointer group"
    >
      <div className="relative scale-85 md:scale-100">
        {/* Footprints */}
        <AnimatePresence>
          {!isSleeping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-7 left-2/4 -translate-x-1/2 flex flex-col-2 gap-11"
            >
              {[1, 2].map(i => (
                <motion.div 
                  key={i} 
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                  transition={{ delay: i * 0.3, repeat: Infinity, duration: 5 }}
                  className="w-4 h-2 bg-black rounded-full blur-[5px]" 
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* REALISTIC CAIMAN BODY */}
        <motion.div 
          animate={{ 
            rotateY: direction === 1 ? 0 : 180,
            rotate: isSleeping ? 0 : rotationToCursor / 12
          }}
          className="w-28 h-10 relative"
        >
          {/* Main Torso */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#3a522d] via-[#4a6741] to-[#2d3a1f] rounded-[40%_60%_60%_40%] shadow-2xl border-b-4 border-black/50 overflow-hidden">
             {/* Scales Texture Overlay */}
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay" />
             {/* Back Ridge (Realistic Spikes) */}
             <div className="absolute top-0 left-1 right-1 flex justify-around opacity-40">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="w-4 h-4 bg-black/40 rotate-45 -mt-2" />
                ))}
             </div>
          </div>
          
          {/* Head & Snout */}
          <motion.div 
            animate={{ rotate: isWaving ? -15 : 0 }}
            className="absolute -right-10 w-14 h-10 bg-gradient-to-r from-[#4a6741] to-[#3a522d] rounded-[30%_70%_20%_40%] border-r-2 border-black/10 origin-left"
          >
             {/* Mouth Line */}
             <div className="absolute bottom-2 right-2 w-7 h-[1.5px] bg-black/70 rounded-full" />
             
             {/* Realistic Eye */}
             <div className="absolute top-2 right-6 w-4 h-4 bg-[#d4e157] rounded-full flex items-center justify-center border border-black/20 shadow-inner">
                <motion.div 
                  animate={{ scaleY: isSleeping ? 1 : 0.1, scaleX: isSleeping ? 1 : 0.8 }}
                  className="w-full h-full bg-[#1a1d23] rounded-full origin-center transition-all duration-500"
                />
                <div className="absolute top-1 right-1 w-1 h-1 bg-white/60 rounded-full" />
             </div>

             {/* Nostril */}
             <div className="absolute bottom-5 right-2 w-1.5 h-1.5 bg-black/60 rounded-full" />
          </motion.div>

          {/* Tail (Segmented for realism) */}
          <div className="absolute -left-16 top-3 w-20 h-5 flex items-center">
             <motion.div 
                animate={{ rotate: [0, 20, -15, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-full h-full bg-gradient-to-r from-[#4a6741] to-transparent rounded-[0%_50%_100%_100%] origin-right relative"
             >
                <div className="absolute inset-0 rounded-[0%_10%_100%_100%] opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
             </motion.div>
          </div>

          {/* Legs (Front) */}
          <div className="absolute bottom-0 right-6 w-4 h-6 bg-[#3a522d] rounded-full -mb-4 border-b-4 border-black/50 shadow-lg" />
          <div className="absolute bottom-0 left-3 w-5 h-7 bg-[#3a522d] rounded-full -mb-4 border-b-4 border-black/50 shadow-lg" />
        </motion.div>

        {/* UI Overlay Elements */}
        <AnimatePresence>
          {foundDiscoveries.length < 3 && isSleeping && (
            <motion.div 
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-20 left-1/3 -translate-x-1/4 bg-card/90 backdrop-blur-xl px-2 py-2 rounded-2xl shadow-6xl border border-primary/90 whitespace-nowrap z-50"
            >
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-primary/100 animate-pulse" />
                <span className="text-[13px] font-black uppercase tracking-[0.2em] text-primary">Sigue el rastro de Ciénaga</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!isSleeping && (
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute top-[-60px] left-[-90px]  text-primary font-headline italic font-bold"
            >
              <span className="text-3xl animate-bounce tracking-widest">Zzz...</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute bottom-20  left-1/6 translate-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-card text-primary px-8 py-3 rounded-full text-[10px] uppercase tracking-[0.4em] font-black shadow-2xl whitespace-nowrap z-50">
          {!isSleeping ? "Despertar al Guardián" : "¿Buscas los tesoros de Ciénaga?"}
        </div>
      </div>
    </motion.div>
  );
}
