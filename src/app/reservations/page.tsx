
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Waves, User, Calendar as CalendarIcon, Clock, CheckCircle2, Info } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

const TABLES = [
  { id: 1, type: 'Beachfront', x: 20, y: 20, capacity: 4, desc: 'Vista directa al Caribe' },
  { id: 2, type: 'Beachfront', x: 20, y: 50, capacity: 2, desc: 'Perfecta para parejas' },
  { id: 3, type: 'Sunset', x: 50, y: 20, capacity: 6, desc: 'Mejor vista al atardecer' },
  { id: 4, type: 'VIP', x: 80, y: 30, capacity: 4, desc: 'Privacidad y lujo' },
  { id: 5, type: 'Family', x: 50, y: 80, capacity: 8, desc: 'Espacio para grandes momentos' },
  { id: 6, type: 'Romantic', x: 80, y: 70, capacity: 2, desc: 'Iluminación tenue' },
];

export default function ReservationsPage() {
  const [selectedTable, setSelectedTable] = useState<typeof TABLES[0] | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleConfirm = () => {
    if (!selectedTable) return;
    setIsSubmitted(true);
    toast({
      title: 'Reserva Confirmada',
      description: `Mesa ${selectedTable.type} asegurada para ti.`,
    });
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-32 text-center space-y-8">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-primary/20 w-32 h-32 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 size={64} className="text-primary" />
        </motion.div>
        <h1 className="text-6xl font-headline font-bold">¡Tu lugar te espera!</h1>
        <p className="text-2xl text-foreground/60 italic">"La brisa de Ciénaga ya está llamándote."</p>
        <Button onClick={() => window.location.href = '/'}>Volver al inicio</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-32">
      <div className="container mx-auto px-4">
        <div className="text-center mb-24 space-y-4">
          <Badge className="bg-primary/10 text-primary px-6 py-2 uppercase tracking-widest">Experiencia VIP</Badge>
          <h1 className="text-7xl font-headline font-bold">Elige tu lugar en el Paraíso</h1>
          <p className="text-xl text-foreground/50 max-w-2xl mx-auto italic">Selecciona tu mesa preferida en nuestro plano interactivo.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Plan Section */}
          <div className="lg:col-span-2 space-y-8">
            <div className="relative aspect-[16/10] bg-white rounded-[4rem] shadow-2xl overflow-hidden border-8 border-white p-12">
               {/* Sea Visual Side */}
               <div className="absolute top-0 left-0 bottom-0 w-24 bg-accent/10 flex flex-col items-center justify-center gap-4 text-accent">
                  <Waves size={32} className="animate-pulse" />
                  <span className="[writing-mode:vertical-lr] font-bold tracking-[0.5em] uppercase text-xs">Mar Caribe</span>
               </div>
               
               {/* Tables Layout */}
               <div className="relative w-full h-full">
                  {TABLES.map(table => (
                    <motion.button
                      key={table.id}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedTable(table)}
                      style={{ left: `${table.x}%`, top: `${table.y}%` }}
                      className={`absolute w-16 h-16 rounded-2xl flex items-center justify-center transition-all shadow-lg border-2 ${
                        selectedTable?.id === table.id 
                        ? 'bg-primary text-white border-primary ring-4 ring-primary/20' 
                        : 'bg-secondary/40 text-foreground/40 border-muted hover:bg-secondary hover:border-primary/20'
                      }`}
                    >
                      <User size={24} />
                      <span className="absolute -top-2 -right-2 bg-white text-primary text-[10px] font-bold px-1.5 rounded-full border">x{table.capacity}</span>
                    </motion.button>
                  ))}
               </div>
            </div>
            
            <div className="flex gap-4 items-center justify-center text-xs text-foreground/40 font-bold uppercase tracking-widest">
              <span className="flex items-center gap-2"><div className="w-3 h-3 bg-primary rounded-sm" /> Seleccionada</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 bg-secondary rounded-sm" /> Disponible</span>
            </div>
          </div>

          {/* Details & Form */}
          <div className="space-y-8">
            <Card className="rounded-[3rem] border-none shadow-xl overflow-hidden">
              <CardContent className="p-10 space-y-8">
                <AnimatePresence mode="wait">
                  {selectedTable ? (
                    <motion.div 
                      key={selectedTable.id}
                      initial={{ opacity: 0, x: 20 }} 
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <Badge className="bg-accent/10 text-accent">{selectedTable.type}</Badge>
                      <h3 className="text-3xl font-headline font-bold">Mesa para {selectedTable.capacity} personas</h3>
                      <p className="text-foreground/60 italic">"{selectedTable.desc}"</p>
                      
                      <div className="pt-6 border-t space-y-6">
                        <div className="space-y-2">
                           <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Fecha y Hora</label>
                           <div className="flex gap-4">
                              <Button variant="outline" className="flex-1 rounded-xl h-12"><CalendarIcon size={16} className="mr-2" /> Hoy</Button>
                              <Button variant="outline" className="flex-1 rounded-xl h-12"><Clock size={16} className="mr-2" /> 7:00 PM</Button>
                           </div>
                        </div>
                        <Button onClick={handleConfirm} className="w-full h-16 text-lg rounded-2xl bg-primary text-white shadow-xl hover:scale-105 transition-transform">
                          Confirmar mi Lugar
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="h-64 flex flex-col items-center justify-center text-center space-y-4 text-foreground/30">
                      <Info size={48} />
                      <p className="font-headline italic text-lg">Por favor, selecciona una mesa en el mapa para continuar.</p>
                    </div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            <div className="bg-accent/10 p-8 rounded-[3rem] border border-accent/20">
               <h4 className="font-headline font-bold text-xl mb-4 text-accent">Beneficio Exclusivo</h4>
               <p className="text-sm text-accent/80">Reservar en línea te otorga acceso prioritario y un cóctel de bienvenida artesanal inspirado en Tomasita.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
