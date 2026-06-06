
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Waves, User, Calendar as CalendarIcon, Clock, CheckCircle2, Send, Phone, MessageSquare } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const TABLES = [
  { id: 1, type: 'Beachfront', x: 15, y: 20, capacity: 4, desc: 'Vista directa al Caribe' },
  { id: 2, type: 'Beachfront', x: 15, y: 50, capacity: 2, desc: 'Perfecta para parejas' },
  { id: 3, type: 'Sunset Terrace', x: 45, y: 15, capacity: 6, desc: 'Mejor vista al atardecer' },
  { id: 4, type: 'VIP Lounge', x: 75, y: 25, capacity: 4, desc: 'Privacidad y lujo absoluto' },
  { id: 5, type: 'Family Garden', x: 45, y: 75, capacity: 8, desc: 'Espacio para grandes momentos' },
  { id: 6, type: 'Romantic Cove', x: 75, y: 65, capacity: 2, desc: 'Iluminación tenue y brisa' },
];

const TIME_SLOTS = [
  "12:00 PM", "1:00 PM", "2:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"
];

export default function ReservationsPage() {
  const [selectedTable, setSelectedTable] = useState<typeof TABLES[0] | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '',
    notes: ''
  });

  const handleTableSelect = (table: typeof TABLES[0]) => {
    setSelectedTable(table);
  };

  const handleOpenModal = () => {
    if (!selectedTable || !date || !selectedTime) {
      toast({
        variant: "destructive",
        title: "Selección incompleta",
        description: "Por favor elige una mesa, fecha y hora para continuar.",
      });
      return;
    }
    setIsModalOpen(true);
  };

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const message = `¡Hola Casa Origen! 🦎\n\nQuisiera confirmar una reserva:\n\n` +
      `👤 Cliente: ${formData.name}\n` +
      `📞 Teléfono: ${formData.phone}\n` +
      `🗓️ Fecha: ${format(date!, 'PPP', { locale: es })}\n` +
      `⏰ Hora: ${selectedTime}\n` +
      `🪑 Mesa: ${selectedTable?.type} (Mesa #${selectedTable?.id})\n` +
      `👥 Personas: ${formData.guests || selectedTable?.capacity}\n` +
      `📝 Notas: ${formData.notes || 'Ninguna'}\n\n` +
      `¡Nos vemos pronto bajo la brisa del Caribe! 🌊`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/573000000000?text=${encoded}`, '_blank');
    
    setIsModalOpen(false);
    setIsSubmitted(true);
    toast({
      title: 'Reserva Iniciada',
      description: 'Te hemos redirigido a WhatsApp para finalizar la confirmación.',
    });
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-40 text-center space-y-8">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-primary/20 w-32 h-32 rounded-full flex items-center justify-center mx-auto border-4 border-primary/10">
          <CheckCircle2 size={64} className="text-primary" />
        </motion.div>
        <div className="space-y-4">
          <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter">¡Tu lugar te espera!</h1>
          <p className="text-2xl text-foreground/60 italic max-w-2xl mx-auto">
            "La brisa de Ciénaga ya está llamándote. Hemos enviado los detalles a nuestro equipo."
          </p>
        </div>
        <Button onClick={() => window.location.href = '/'} className="h-16 px-12 rounded-full text-xl shadow-2xl hover:scale-105 transition-transform">
          Volver al Inicio
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-32 bg-[#F9F6F2]/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20 space-y-6">
          <Badge className="bg-primary/10 text-primary px-8 py-3 uppercase tracking-[0.4em] text-[10px] font-black border-none">Reserva Tu Momento</Badge>
          <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter">Elige tu ubicación</h1>
          <p className="text-xl text-foreground/40 max-w-2xl mx-auto italic font-light">
            Selecciona tu lugar privilegiado y permítenos preparar la mesa para tu llegada.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 items-start">
          {/* Calendar & Time Selection */}
          <div className="xl:col-span-4 space-y-8">
            <Card className="rounded-[3rem] border-none shadow-xl overflow-hidden bg-white">
              <CardContent className="p-10 space-y-10">
                <div className="space-y-6">
                  <h3 className="text-2xl font-headline font-bold flex items-center gap-3">
                    <CalendarIcon className="text-primary" /> 1. Fecha
                  </h3>
                  <div className="border rounded-[2rem] p-4 bg-secondary/5 flex justify-center">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="w-full max-w-full"
                      locale={es}
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="text-2xl font-headline font-bold flex items-center gap-3">
                    <Clock className="text-primary" /> 2. Horario
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {TIME_SLOTS.map(slot => (
                      <Button
                        key={slot}
                        variant={selectedTime === slot ? "default" : "outline"}
                        onClick={() => setSelectedTime(slot)}
                        className={`rounded-2xl h-14 text-sm font-bold transition-all ${selectedTime === slot ? 'bg-primary shadow-lg' : 'hover:border-primary/40'}`}
                      >
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Table Map Selection */}
          <div className="xl:col-span-8 space-y-8">
            <div className="relative aspect-[16/10] bg-white rounded-[4rem] shadow-2xl overflow-hidden border-[12px] border-white p-12 group">
               {/* Sea Visual Side */}
               <div className="absolute top-0 left-0 bottom-0 w-24 md:w-32 bg-accent/5 flex flex-col items-center justify-center gap-6 text-accent/40 overflow-hidden">
                  <motion.div animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
                    <Waves size={40} className="opacity-20" />
                  </motion.div>
                  <span className="[writing-mode:vertical-lr] font-black tracking-[0.8em] uppercase text-[10px] whitespace-nowrap">Océano Caribe</span>
               </div>
               
               {/* Tables Layout */}
               <div className="relative w-full h-full">
                  {TABLES.map(table => (
                    <motion.button
                      key={table.id}
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTableSelect(table)}
                      style={{ left: `${table.x}%`, top: `${table.y}%` }}
                      className={`absolute w-14 h-14 md:w-20 md:h-20 rounded-[1.5rem] flex flex-col items-center justify-center transition-all shadow-xl border-2 ${
                        selectedTable?.id === table.id 
                        ? 'bg-primary text-white border-primary ring-8 ring-primary/10' 
                        : 'bg-secondary/20 text-foreground/40 border-transparent hover:bg-white hover:border-primary/30 hover:text-primary'
                      }`}
                    >
                      <User size={selectedTable?.id === table.id ? 28 : 20} />
                      <span className="absolute -top-3 -right-3 bg-white text-primary text-[10px] font-black w-8 h-8 rounded-full flex items-center justify-center border-2 border-primary/10 shadow-lg">x{table.capacity}</span>
                      <span className="text-[8px] font-bold uppercase tracking-tighter mt-1 hidden md:block">{table.type}</span>
                    </motion.button>
                  ))}
               </div>

               {/* Map Key */}
               <div className="absolute bottom-8 right-8 flex gap-4 md:gap-6 bg-white/80 backdrop-blur px-6 py-3 rounded-full border shadow-sm">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><div className="w-3 h-3 bg-primary rounded-full" /> Seleccionada</div>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><div className="w-3 h-3 bg-secondary/40 rounded-full" /> Disponible</div>
               </div>
            </div>

            {/* Selection Summary CTA */}
            <AnimatePresence>
              {selectedTable && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-foreground text-white p-10 rounded-[3rem] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 border-t-8 border-primary"
                >
                  <div className="space-y-3 text-center md:text-left">
                    <div className="flex gap-2 justify-center md:justify-start">
                       <Badge className="bg-primary/20 text-primary border-none">{selectedTable.type}</Badge>
                       <Badge className="bg-white/10 text-white border-none">{selectedTime || 'Elige hora'}</Badge>
                    </div>
                    <h3 className="text-3xl font-headline font-bold">Mesa para {selectedTable.capacity} - Zona {selectedTable.type}</h3>
                    <p className="text-white/50 italic text-lg">"{selectedTable.desc}"</p>
                  </div>
                  <Button 
                    onClick={handleOpenModal}
                    className="w-full md:w-auto h-16 px-12 bg-primary hover:bg-white hover:text-primary text-white text-xl font-bold rounded-2xl shadow-2xl transition-all"
                  >
                    Confirmar Reserva <Send size={20} className="ml-3" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Reservation Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-none rounded-[3rem] bg-white">
          <div className="bg-primary h-28 flex items-center justify-center text-white text-center p-6">
            <div>
              <DialogTitle className="text-3xl font-headline font-bold">Check-in Gastronómico</DialogTitle>
              <DialogDescription className="text-white/70 italic text-sm">Casi listo para tu experiencia en Casa Origen</DialogDescription>
            </div>
          </div>
          
          <form onSubmit={handleConfirmReservation} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="res-name" className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Nombre Completo</Label>
                <Input 
                  id="res-name" 
                  placeholder="Tomasita García" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required 
                  className="h-12 rounded-xl bg-secondary/10 border-none focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="res-phone" className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">WhatsApp</Label>
                <Input 
                  id="res-phone" 
                  type="tel" 
                  placeholder="+57 300..." 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required 
                  className="h-12 rounded-xl bg-secondary/10 border-none focus-visible:ring-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Comensales</Label>
                <Select onValueChange={(val) => setFormData({...formData, guests: val})}>
                  <SelectTrigger className="h-12 rounded-xl bg-secondary/10 border-none">
                    <SelectValue placeholder={`Capacidad: ${selectedTable?.capacity}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {[1,2,3,4,5,6,7,8].map(n => (
                      <SelectItem key={n} value={n.toString()}>{n} personas</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Ocasión</Label>
                <Select>
                  <SelectTrigger className="h-12 rounded-xl bg-secondary/10 border-none">
                    <SelectValue placeholder="Cena casual" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casual">Cena Casual</SelectItem>
                    <SelectItem value="birthday">Cumpleaños</SelectItem>
                    <SelectItem value="anniversary">Aniversario</SelectItem>
                    <SelectItem value="business">Negocios</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="res-notes" className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Notas Especiales</Label>
              <Textarea 
                id="res-notes" 
                placeholder="Alergias o solicitudes específicas..." 
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="min-h-[100px] rounded-2xl bg-secondary/10 border-none p-4 text-sm"
              />
            </div>

            <div className="pt-2">
              <Button type="submit" className="w-full h-16 rounded-2xl bg-primary hover:bg-foreground text-white text-lg font-bold shadow-xl transition-all">
                 Finalizar y Enviar a WhatsApp
              </Button>
              <div className="flex items-center justify-center gap-2 mt-4 text-accent">
                <MessageSquare size={14} />
                <p className="text-[10px] font-bold uppercase tracking-widest">Resumen automático vía WhatsApp</p>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
