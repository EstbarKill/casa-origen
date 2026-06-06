
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, X, Landmark, Compass, Gift, Ticket, Utensils, Star, Trophy } from 'lucide-react';
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
  const [lastFound, setLastFound] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const saved = localStorage.getItem('casa-origen-discoveries');
    if (saved) setFoundIds(JSON.parse(saved));
  }, []);

  const handleDiscovery = (id: string) => {
    const discovery = DISCOVERIES.find(d => d.id === id);
    if (!discovery) return;

    if (foundIds.includes(id)) {
      setActiveDiscovery(discovery);
      return;
    }

    const newFound = [...foundIds, id];
    setFoundIds(newFound);
    setLastFound(id);
    localStorage.setItem('casa-origen-discoveries', JSON.stringify(newFound));
    setActiveDiscovery(discovery);

    toast({
      title: "¡TESORO ENCONTRADO! 🏆",
      description: `Has revelado: ${discovery.title}. Revisa tu inventario.`,
    });
  };

  return (
    <>
      {/* Floating Trophy Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setShowInventory(true)}
        className="fixed bottom-32 left-8 z-[60] bg-white/95 backdrop-blur px-5 py-5 rounded-full border-2 border-primary/20 text-primary shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex items-center gap-3 group overflow-hidden"
      >
        <div className="relative z-10 flex items-center gap-3">
          <div className="relative">
            <Trophy size={28} className={foundIds.length > 0 ? "text-orange-400 fill-orange-400 animate-bounce" : "text-foreground/20"} />
            {foundIds.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-6 h-6 rounded-full flex items-center justify-center font-bold shadow-lg ring-2 ring-white">
                {foundIds.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden group-hover:block transition-all pr-2">Inventario Cultural</span>
        </div>
        <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors" />
      </motion.button>

      {/* Discovery Modal with Dynamic Background */}
      <AnimatePresence>
        {activeDiscovery && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: -90 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-white rounded-[4rem] p-12 max-w-xl w-full relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] border-t-[12px] border-primary overflow-hidden"
            >
              {/* Decorative Aura */}
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

              <button 
                onClick={() => setActiveDiscovery(null)}
                className="absolute top-10 right-10 text-foreground/20 hover:text-primary transition-colors z-20"
              >
                <X size={32} />
              </button>
              
              <div className="space-y-10 text-center relative z-10">
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 4 }}
                  className={`${activeDiscovery.color}/20 w-32 h-32 rounded-[2.5rem] flex items-center justify-center mx-auto text-primary shadow-inner border border-white/50`}
                >
                  <activeDiscovery.icon size={64} />
                </motion.div>
                
                <div className="space-y-4">
                  <Badge className="bg-primary text-white border-none uppercase tracking-[0.5em] text-[10px] font-black px-6 py-2 shadow-lg">Secreto Revelado</Badge>
                  <h3 className="text-5xl font-headline font-bold leading-none">{activeDiscovery.title}</h3>
                </div>

                <p className="text-xl text-foreground/60 italic leading-relaxed font-light">"{activeDiscovery.text}"</p>
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="p-10 bg-secondary/10 rounded-[3rem] border-2 border-primary/20 space-y-6 shadow-2xl relative"
                >
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-4 py-1 rounded-full border border-primary/20 text-[8px] font-black uppercase tracking-widest text-primary">Beneficio VIP</div>
                  <div className="flex items-center justify-center gap-4 text-primary">
                    <Gift size={32} className="animate-pulse" />
                    <span className="font-bold text-2xl uppercase tracking-tighter">Recompensa</span>
                  </div>
                  <p className="text-3xl font-headline font-bold text-foreground leading-tight">{activeDiscovery.reward}</p>
                  <div className="flex flex-col items-center gap-3 pt-4 border-t border-primary/10">
                    <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">Tu Código Único</span>
                    <code className="bg-white px-10 py-4 rounded-2xl border-2 border-dashed border-primary/40 font-mono font-black text-3xl text-primary shadow-inner tracking-widest select-all">
                      {activeDiscovery.code}
                    </code>
                  </div>
                </motion.div>

                <p className="text-[10px] uppercase tracking-[0.4em] font-black text-foreground/30">Válido al presentar este código en Casa Origen</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Inventory Panel - Styled like a Journal */}
      <AnimatePresence>
        {showInventory && (
          <div className="fixed inset-0 z-[105] flex items-end justify-center sm:items-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowInventory(false)}
              className="absolute inset-0 bg-foreground/40 backdrop-blur-md"
            />
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              className="bg-white rounded-t-[4rem] sm:rounded-[4rem] w-full max-w-3xl p-12 relative shadow-2xl space-y-10 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between border-b border-primary/10 pb-8">
                <div>
                  <h3 className="text-4xl font-headline font-bold">Diario de Tesoros</h3>
                  <p className="text-foreground/40 text-lg italic">Explora la cultura de Ciénaga para desbloquear privilegios.</p>
                </div>
                <button onClick={() => setShowInventory(false)} className="p-4 hover:bg-secondary rounded-full transition-all">
                  <X size={32} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {DISCOVERIES.map(disc => {
                  const isFound = foundIds.includes(disc.id);
                  return (
                    <motion.div 
                      key={disc.id}
                      whileHover={isFound ? { scale: 1.02 } : {}}
                      onClick={() => isFound && handleDiscovery(disc.id)}
                      className={`p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer flex items-center gap-6 relative overflow-hidden ${
                        isFound 
                          ? 'border-primary/20 bg-primary/5 hover:bg-primary/10' 
                          : 'border-dashed border-muted bg-muted/20 opacity-60 grayscale'
                      }`}
                    >
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 ${isFound ? 'bg-primary text-white shadow-lg' : 'bg-muted text-foreground/20'}`}>
                        {isFound ? <disc.icon size={28} /> : <Star size={28} />}
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-xl font-bold font-headline ${isFound ? 'text-foreground' : 'text-foreground/20'}`}>
                          {isFound ? disc.title : 'Secreto Bloqueado'}
                        </h4>
                        <p className="text-[10px] uppercase font-black tracking-widest text-primary mt-1">
                          {isFound ? 'Ver Recompensa' : 'Sigue explorando Ciénaga'}
                        </p>
                      </div>
                      {!isFound && <div className="absolute top-4 right-4 text-[8px] font-black text-foreground/10 uppercase tracking-widest">???</div>}
                    </motion.div>
                  );
                })}
              </div>

              {foundIds.length === DISCOVERIES.length && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="p-10 bg-foreground text-white rounded-[3rem] text-center space-y-6 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-primary/10 opacity-30 animate-pulse" />
                  <Star className="mx-auto text-orange-400 fill-orange-400" size={48} />
                  <div className="space-y-2">
                    <h4 className="text-3xl font-headline font-bold">¡Maestro del Caimán! 🐊</h4>
                    <p className="text-white/60 italic text-lg max-w-md mx-auto leading-relaxed">Has revelado todos los secretos. Tienes un regalo VIP esperándote en tu próxima reserva.</p>
                  </div>
                  <Badge className="bg-white/10 text-white border-white/20 px-8 py-2 uppercase tracking-widest font-black text-[10px]">Estatus: Embajador Casa Origen</Badge>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Hidden Triggers (Linked to UI Elements) */}
      <div className="hidden">
        <div id="trigger-legend" onClick={() => handleDiscovery('legend-caiman')} />
        <div id="trigger-coconut" onClick={() => handleDiscovery('coconut-tradition')} />
        <div id="trigger-chef" onClick={() => handleDiscovery('chef-secret')} />
      </div>
    </>
  );
}
