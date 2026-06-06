
"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

export function CaimanMascot() {
  const [isSleeping, setIsSleeping] = useState(false);
  const [direction, setDirection] = useState(1);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isWaving, setIsWaving] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);

  const { scrollYProgress } = useScroll();
  
  // Path curvo suave
  const x = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [15, 80, 25, 75, 20]);
  const smoothX = useSpring(x, { stiffness: 40, damping: 25 });

  useEffect(() => {
    const handleScroll = () => {
      setIsSleeping(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      const currentScrollY = window.scrollY;
      setDirection(currentScrollY > lastScrollY.current ? 1 : -1);
      lastScrollY.current = currentScrollY;

      timeoutRef.current = setTimeout(() => {
        setIsSleeping(true);
      }, 20000); // 20 segundos de inactividad
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (isSleeping) setIsSleeping(false);
    };

    // Escuchar evento de saludo global (disparado desde el Header)
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

  // Rotación para mirar al cursor
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
        {/* Huellas (Partículas) */}
        <AnimatePresence>
          {!isSleeping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-4"
            >
              {[1, 2].map(i => (
                <div key={i} className="w-2 h-1 bg-primary/40 rounded-full blur-[1px]" />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Caimán SVG / Estilizado */}
        <motion.div 
          animate={{ 
            rotateY: direction === 1 ? 0 : 180,
            rotate: isSleeping ? 0 : rotationToCursor / 10 // Mirada sutil
          }}
          className="w-20 h-10 relative"
        >
          {/* Cuerpo principal */}
          <div className="absolute inset-0 bg-[#4A6741] rounded-full shadow-2xl border-b-2 border-black/20" />
          
          {/* Cabeza */}
          <motion.div 
            animate={{ rotate: isWaving ? -20 : 0 }}
            className="absolute -right-3 top-0 w-8 h-6 bg-[#4A6741] rounded-tr-2xl flex items-center justify-end pr-1"
          >
             {/* Ojo */}
             <div className="w-2 h-2 bg-white rounded-full relative overflow-hidden">
                <motion.div 
                  animate={{ scaleY: isSleeping ? 1 : 0 }}
                  className="absolute inset-0 bg-black origin-top transition-transform duration-500"
                />
             </div>
          </motion.div>

          {/* Mano que saluda */}
          <AnimatePresence>
            {isWaving && (
              <motion.div
                initial={{ rotate: 0, opacity: 0 }}
                animate={{ rotate: [0, 30, -30, 30, 0], opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -top-6 right-0 w-4 h-6 bg-[#4A6741] rounded-full origin-bottom"
              />
            )}
          </AnimatePresence>

          {/* Cola animada */}
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -left-6 top-3 w-10 h-4 bg-[#4A6741]/90 rounded-full origin-right"
          />
          
          {/* Escamas sutiles */}
          <div className="absolute top-1 left-4 flex gap-1">
             {[1,2,3].map(i => <div key={i} className="w-2 h-1 bg-black/10 rounded-full" />)}
          </div>
        </motion.div>

        {/* Burbuja de Sueño */}
        <AnimatePresence>
          {isSleeping && (
            <motion.div 
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-12 -right-2 text-primary font-headline italic font-bold"
            >
              <span className="block text-xs animate-bounce">zzz</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hint de interacción */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/95 px-4 py-1.5 rounded-full text-[9px] uppercase tracking-[0.2em] font-bold shadow-xl border border-primary/20 whitespace-nowrap">
          {isSleeping ? "Despertar al guardián" : "¿Exploramos juntos?"}
        </div>
      </div>
    </motion.div>
  );
}
