
"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export function CaimanMascot() {
  const [isSleeping, setIsSleeping] = useState(false);
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);

  const { scrollYProgress } = useScroll();
  
  // Create a curved horizontal path based on vertical scroll
  const x = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [10, 80, 20, 70, 15, 85], {
    clamp: false
  });
  
  const smoothX = useSpring(x, { stiffness: 50, damping: 20 });
  const rotate = useSpring(0, { stiffness: 100, damping: 10 });

  useEffect(() => {
    const handleScroll = () => {
      setIsSleeping(false);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current) {
        setDirection(1);
      } else {
        setDirection(-1);
      }
      lastScrollY.current = currentScrollY;

      timeoutRef.current = setTimeout(() => {
        setIsSleeping(true);
      }, 3000);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: `${smoothX.get()}%`,
        bottom: '10%',
        zIndex: 100,
        pointerEvents: 'auto',
      }}
      animate={{
        scale: isSleeping ? 0.8 : 1,
        y: isSleeping ? 10 : [0, -5, 0],
      }}
      transition={{
        y: { repeat: Infinity, duration: 2 },
      }}
      className="cursor-pointer group"
    >
      <div className="relative">
        {/* Footprints trail (abstract visualization) */}
        {!isSleeping && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex gap-1 opacity-20">
             {[1,2,3].map(i => <div key={i} className="w-1 h-1 bg-primary rounded-full animate-ping" />)}
          </div>
        )}

        {/* Artistic Minimal Caiman */}
        <motion.div 
          animate={{ rotateY: direction === 1 ? 0 : 180 }}
          className="w-16 h-8 relative"
        >
          {/* Body */}
          <div className="absolute inset-0 bg-accent rounded-full shadow-lg" />
          {/* Head */}
          <div className="absolute -right-2 top-0 w-6 h-5 bg-accent rounded-tr-xl" />
          {/* Eye */}
          <div className={`absolute right-1 top-1 w-1.5 h-1.5 bg-white rounded-full ${isSleeping ? 'scale-y-0' : 'scale-y-100'} transition-transform`} />
          {/* Tail */}
          <div className="absolute -left-4 top-2 w-6 h-4 bg-accent/80 rounded-full origin-right animate-pulse" />
          
          {/* Zzz... */}
          {isSleeping && (
            <div className="absolute -top-8 -right-4 font-headline text-primary text-sm font-bold flex flex-col items-center">
              <span className="animate-bounce delay-75">z</span>
              <span className="animate-bounce delay-150">z</span>
              <span className="animate-bounce">z</span>
            </div>
          )}
        </motion.div>

        {/* Peek / Interaction Hint */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold whitespace-nowrap shadow-sm border border-primary/20">
          ¿Buscamos una mesa?
        </div>
      </div>
    </motion.div>
  );
}
