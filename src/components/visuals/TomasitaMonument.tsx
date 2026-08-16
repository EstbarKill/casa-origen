
"use client";

import { motion, useScroll, useTransform } from 'framer-motion';
import { Fullscreen } from 'lucide-react';

export function TomasitaMonument() {
  const { scrollYProgress } = useScroll();

  // Parallax effects
  const yTomasita = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const yCaiman = useTransform(scrollYProgress, [0, 0.3, 0.5], [100, 0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [0, 5]);

  return (
    <motion.div 
      style={{ scale, rotate }}
      className="relative w-full max-w-2xl aspect-[3/4] mx-auto flex items-center justify-center pointer-events-none"
    >
      {/* Abstract Sun / Aura */}
      <div className="absolute w-[120%] h-[120%] bg-gradient-to-tr from-primary/5 via-accent/10 to-transparent rounded-full blur-[80px]" />

      {/* Decorative Floral / Seaweed Elements */}
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 border-[1px] border-dashed border-primary/20 rounded-full"
      />

      {/* Tomasita Layer */}
      <motion.div 
        style={{ y: yTomasita}}
        className="relative z-20 flex flex-col items-center"
      >
        <div className="w-48 h-80 bg-gradient-to-b from-sun to-ocean/40 rounded-t-full relative overflow-visible shadow-2xl border-4 border-white/20">
          <img
            src="/images/tomasita.png"
            alt="tomasita"
            className="absolute left-0 -top-[90px] right-0 w-cover h-[calc(100%+100px)] object-cover"
          />
        </div>
        <div className="mt-2 bg-white/90 px-4 py-2 rounded-full shadow-lg border border-primary/10">
           <span className="text-label font-headline text-2xl font-black">Tomasita</span>
        </div>
      </motion.div>

      {/* Caimán Layer */}
      <motion.div 
        style={{ y: yCaiman }}
        className="absolute bottom-20 z-30"
      >
        <div className="w-80 h-24 bg-foreground/90 rounded-[3rem] relative overflow-hidden shadow-2xl border-t-4 border-accent/30">
          {/* Eyes */}
          <div className="absolute top-4 left-20 w-4 h-4 bg-accent rounded-full animate-pulse" />
          <div className="absolute top-4 right-20 w-4 h-4 bg-accent rounded-full animate-pulse" />
          {/* Scales pattern */}
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
        <div className="absolute justify-content-center -bottom-6 left-1/3 -translate-x-1/4 bg-secondary text-center text-foreground px-8 py-2 rounded-full font-headline font-bold text-xl tracking-widest shadow-xl">
           LEYENDA DEL CAIMÁN
        </div>
      </motion.div>

      {/* Floating Particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            delay: i * 0.5
          }}
          className="absolute w-5 h-5 bg-accent rounded-full blur-[20px]"
        />
      ))}
    </motion.div>
  );
}
