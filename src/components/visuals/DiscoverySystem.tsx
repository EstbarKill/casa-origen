
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Landmark, Compass, Gift, Ticket, Utensils, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DISCOVERIES = [
  { 
    id: 'legend-caiman',
    title: "El Secreto del Caimán", 
    text: "Has descubierto el origen de nuestra danza. Tomasita no solo es una leyenda, es el corazón de nuestra resiliencia.", 
    reward: "15% de Descuento en tu próxima cena",
    code: "CAIMAN15",
    icon: Landmark,
    color: "bg-primary"
  },
  { 
    id: 'coconut-tradition',
    title: "Sabor de Origen", 
    text: "Nuestra leche de coco se extrae artesanalmente. Los pescadores dicen que el secreto está en el ritmo de la marea.", 
    reward: "Cóctel de Bienvenida Gratis",
    code: "COCO-FREE",
    icon: Compass,
    color: "bg-accent"
  },
  { 
    id: 'chef-secret',
    title: "Toque del Chef", 
    text: "El ají dulce que usamos viene directamente de la Sierra Nevada de Santa Marta.", 
    reward: "Postre 'Tomasita' de Cortesía",
    code: "CHEF-GIFT",
    icon: Utensils,
    color: "bg-orange-400"
  }
];

export function DiscoverySystem() {
  const [activeDiscovery, setActiveDiscovery] = useState<typeof DISCOVERIES[0] | null>(null);
  const [foundIds, setFoundIds] = useState<string[]>([]);
  const [showInventory, setShowInventory] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('casa-origen-discoveries');
    if (saved) setFoundIds(JSON.parse(saved));
  }, []);

  const handleDiscovery = (id: string) => {
    if (foundIds.includes(id)) {
      const discovery = DISCOVERIES.find(d => d.id === id);
      if (discovery) setActiveDiscovery(discovery);
      return;
    }

    const discovery = DISCOVERIES.find(d => d.id === id);
    if (!discovery) return;

    const newFound = [...foundIds, id];
    setFoundIds(newFound);
    localStorage.setItem('casa-origen-discoveries', JSON.stringify(newFound));
    setActiveDiscovery(discovery);

    toast({
      title: "¡Tesoro Encontrado!",
      description: `Has revelado: ${discovery.title}`,
    });
  };

  return (
    <>
      {/* Hidden Triggers across the site would call handleDiscovery */}
      {/* For demo, a floating "Hint" button that moves with the mascot logic */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowInventory(true)}
        className="fixed bottom-32 left-8 z-[60] bg-white/90 backdrop-blur p-4 rounded-full border border-primary/20 text-primary shadow-2xl flex items-center gap-3 group"
      >
        <div className="relative">
          <Star size={24} className={foundIds.length > 0 ? "text-orange-400 fill-orange-400 animate-pulse" : ""} />
          <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
            {foundIds.length}
          </span>
        </div>
        <span className="text-[10px] font-black uppercase tracking-widest hidden group-hover:block transition-all">Mis Tesoros</span>
      </motion.button>

      {/* Discovery Modal */}
      <AnimatePresence>
        {activeDiscovery && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-[4rem] p-12 max-w-xl w-full relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-t-8 border-primary"
            >
              <button 
                onClick={() => setActiveDiscovery(null)}
                className="absolute top-8 right-8 text-foreground/20 hover:text-primary transition-colors"
              >
                <X size={28} />
              </button>
              
              <div className="space-y-8 text-center">
                <div className={`${activeDiscovery.color}/10 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto text-primary`}>
                  <activeDiscovery.icon size={48} />
                </div>
                
                <div className="space-y-3">
                  <Badge className="bg-primary/10 text-primary border-none uppercase tracking-[0.3em] text-[10px] font-black">Secreto Revelado</Badge>
                  <h3 className="text-5xl font-headline font-bold">{activeDiscovery.title}</h3>
                </div>

                <p className="text-xl text-foreground/60 italic leading-relaxed">"{activeDiscovery.text}"</p>
                
                <div className="p-8 bg-secondary/10 rounded-[2.5rem] border border-primary/10 space-y-4">
                  <div className="flex items-center justify-center gap-3 text-primary">
                    <Gift size={24} />
                    <span className="font-bold text-lg uppercase tracking-tight">Tu Recompensa</span>
                  </div>
                  <p className="text-2xl font-headline font-bold text-foreground">{activeDiscovery.reward}</p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Ticket size={16} className="text-foreground/40" />
                    <code className="bg-white px-6 py-2 rounded-full border font-mono font-bold text-primary shadow-inner">
                      {activeDiscovery.code}
                    </code>
                  </div>
                </div>

                <p className="text-[10px] uppercase tracking-[0.4em] font-black text-foreground/30">Menciona este código al visitar Casa Origen</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Inventory Panel */}
      <AnimatePresence>
        {showInventory && (
          <div className="fixed inset-0 z-[105] flex items-end justify-center sm:items-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowInventory(false)}
              className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-white rounded-t-[3rem] sm:rounded-[3rem] w-full max-w-2xl p-10 relative shadow-2xl space-y-8"
            >
              <div className="flex items-center justify-between border-b pb-6">
                <div>
                  <h3 className="text-3xl font-headline font-bold">Tu Diario de Viaje</h3>
                  <p className="text-foreground/40 text-sm">Explora Ciénaga y desbloquea beneficios exclusivos.</p>
                </div>
                <button onClick={() => setShowInventory(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {DISCOVERIES.map(disc => {
                  const isFound = foundIds.includes(disc.id);
                  return (
                    <div 
                      key={disc.id}
                      onClick={() => isFound && handleDiscovery(disc.id)}
                      className={`p-6 rounded-[2rem] border-2 transition-all cursor-pointer flex items-center gap-4 ${
                        isFound 
                          ? 'border-primary/20 bg-primary/5 hover:bg-primary/10' 
                          : 'border-dashed border-muted bg-muted/20 opacity-60 grayscale cursor-not-allowed'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isFound ? 'bg-primary text-white' : 'bg-muted text-foreground/20'}`}>
                        {isFound ? <disc.icon size={20} /> : <X size={20} />}
                      </div>
                      <div className="flex-1">
                        <h4 className={`font-bold ${isFound ? 'text-foreground' : 'text-foreground/20'}`}>
                          {isFound ? disc.title : '???'}
                        </h4>
                        <p className="text-[10px] uppercase font-bold tracking-widest text-primary">
                          {isFound ? 'Reclamar Premio' : 'Sigue explorando'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {foundIds.length === DISCOVERIES.length && (
                <div className="p-8 bg-foreground text-white rounded-[2rem] text-center space-y-4">
                  <Star className="mx-auto text-orange-400 fill-orange-400" size={32} />
                  <h4 className="text-2xl font-headline font-bold">¡Maestro de Ciénaga!</h4>
                  <p className="text-white/60 italic text-sm">Has revelado todos los secretos. Tienes un regalo VIP esperándote en tu próxima reserva.</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hidden Triggers (Invisible floating nodes on Home) */}
      <div className="hidden">
        <div id="trigger-legend" onClick={() => handleDiscovery('legend-caiman')} />
        <div id="trigger-coconut" onClick={() => handleDiscovery('coconut-tradition')} />
        <div id="trigger-chef" onClick={() => handleDiscovery('chef-secret')} />
      </div>
    </>
  );
}
