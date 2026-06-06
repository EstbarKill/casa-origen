
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Landmark, Compass } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DISCOVERIES = [
  { title: "El Secreto del Pescador", text: "Sabías que el festival del Caimán nace de una leyenda sobre la resiliencia y el amor familiar en las orillas del Magdalena.", icon: Landmark },
  { title: "Sabor de Origen", text: "Nuestra leche de coco se extrae artesanalmente cada mañana para garantizar ese aroma que solo el Caribe tiene.", icon: Compass },
];

export function DiscoverySystem() {
  const [activeDiscovery, setActiveDiscovery] = useState<typeof DISCOVERIES[0] | null>(null);
  const { toast } = useToast();

  const handleDiscovery = () => {
    const random = DISCOVERIES[Math.floor(Math.random() * DISCOVERIES.length)];
    setActiveDiscovery(random);
    toast({
      title: "¡Descubrimiento encontrado!",
      description: "Has revelado un secreto de Ciénaga.",
    });
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.2, rotate: 15 }}
        onClick={handleDiscovery}
        className="fixed bottom-32 left-8 z-[60] bg-accent/20 backdrop-blur p-4 rounded-full border border-accent/40 text-accent shadow-xl shadow-accent/10"
      >
        <Sparkles size={24} className="animate-pulse" />
      </motion.button>

      <AnimatePresence>
        {activeDiscovery && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[3rem] p-12 max-w-lg w-full relative shadow-2xl border-t-8 border-accent"
            >
              <button 
                onClick={() => setActiveDiscovery(null)}
                className="absolute top-6 right-6 text-foreground/20 hover:text-primary transition-colors"
              >
                <X size={24} />
              </button>
              
              <div className="space-y-6 text-center">
                <div className="bg-accent/10 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto text-accent">
                  <activeDiscovery.icon size={40} />
                </div>
                <h3 className="text-4xl font-headline font-bold">{activeDiscovery.title}</h3>
                <p className="text-xl text-foreground/60 italic leading-relaxed">"{activeDiscovery.text}"</p>
                <div className="pt-4">
                  <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent">Tesoro de Ciénaga Revelado</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
