
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
    // Check for discoveries to show "excited" state
    const saved = localStorage.getItem('casa-origen-discoveries');
    if (saved) setFoundDiscoveries(JSON.parse(saved));

    const handleScroll = () => {
      setIsSleeping(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      const currentScrollY = window.scrollY;
      setDirection(currentScrollY > lastScrollY.current ? 1 : -1);
      lastScrollY.current = currentScrollY;

      timeoutRef.current = setTimeout(() => {
        setIsSleeping(true);
      }, 20000);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (isSleeping) setIsSleeping(false);
    };

    const handleWave = () => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 2000);
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
        scale: isSleeping ? 0.7 : 1,
        y: isSleeping ? 15 : [0, -4, 0],
      }}
      transition={{
        y: { repeat: Infinity, duration: 3, ease: "easeInOut" },
      }}
      className="cursor-pointer group"
    >
      <div className="relative">
        {/* Tiny Footprints Animation */}
        <AnimatePresence>
          {!isSleeping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.25 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex flex-col gap-2"
            >
              {[1, 2, 3].map(i => (
                <motion.div 
                  key={i} 
                  animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                  transition={{ delay: i * 0.2, repeat: Infinity, duration: 2 }}
                  className="w-3 h-2 bg-primary/20 rounded-full blur-[1px]" 
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mascot Body */}
        <motion.div 
          animate={{ 
            rotateY: direction === 1 ? 0 : 180,
            rotate: isSleeping ? 0 : rotationToCursor / 10
          }}
          className="w-24 h-12 relative"
        >
          <div className="absolute inset-0 bg-[#4A6741] rounded-full shadow-2xl border-b-4 border-black/20" />
          
          <motion.div 
            animate={{ rotate: isWaving ? -20 : 0 }}
            className="absolute -right-4 top-0 w-10 h-8 bg-[#4A6741] rounded-tr-[2rem] flex items-center justify-end pr-2 border-r-2 border-white/10"
          >
             <div className="w-3 h-3 bg-white rounded-full relative overflow-hidden">
                <motion.div 
                  animate={{ scaleY: isSleeping ? 1 : 0 }}
                  className="absolute inset-0 bg-black origin-top transition-transform duration-500"
                />
             </div>
          </motion.div>

          <AnimatePresence>
            {isWaving && (
              <motion.div
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: [0, 45, -45, 45, 0], opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -top-8 right-0 w-5 h-8 bg-[#4A6741] rounded-full origin-bottom border-2 border-white/5"
              />
            )}
          </AnimatePresence>

          <motion.div 
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="absolute -left-8 top-4 w-12 h-5 bg-[#4A6741]/90 rounded-full origin-right"
          />
        </motion.div>

        {/* Floating Discoveries Hint */}
        <AnimatePresence>
          {foundDiscoveries.length < 3 && !isSleeping && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-2xl shadow-xl border border-primary/20 whitespace-nowrap"
            >
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-primary animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-primary">Sigue el rastro</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isSleeping && (
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-14 -right-2 text-primary font-headline italic font-bold"
            >
              <span className="block text-sm animate-bounce">Zzz...</span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-foreground text-white px-6 py-2 rounded-full text-[10px] uppercase tracking-[0.3em] font-black shadow-2xl whitespace-nowrap z-50">
          {isSleeping ? "Despertar al guardián" : "¿Buscas secretos?"}
        </div>
      </div>
    </motion.div>
  );
}
