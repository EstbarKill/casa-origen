
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
import { cn } from '@/lib/utils';

const TABLES = [
  {
    id: 1,
    zone: 'interior',
    type: 'Beachfront',
    x: 15,
    y: 0,
    capacity: 2,
    desc: 'Vista directa al Caribe',
  },
  {
    id: 2,
    zone: 'interior',
    type: 'Beachfront',
    x: 15,
    y: 35,
    capacity: 2,
    desc: 'Perfecta para parejas',
  },
  {
    id: 3,
    zone: 'interior',
    type: 'Beachfront',
    x: 15,
    y: 75,
    capacity: 4,
    desc: 'Espacio junto al mar',
  },
  {
    id: 4,
    zone: 'interior',
    type: 'Sunset',
    x: 45,
    y: 10,
    capacity: 6,
    desc: 'Mejor vista al atardecer',
  },
  {
    id: 5,
    zone: 'exterior',
    type: 'VIP Lounge',
    x: 75,
    y: 0,
    capacity: 4,
    desc: 'Privacidad y lujo absoluto',
  },
  {
    id: 6,
    zone: 'interior',
    type: 'Family Garden',
    x: 45,
    y: 65,
    capacity: 8,
    desc: 'Espacio para grandes momentos',
  },
  {
    id: 7,
    zone: 'exterior',
    type: 'Garden',
    x: 75,
    y: 65,
    capacity: 3,
    desc: 'Grandes momentos',
  },
  {
    id: 8,
    zone: 'exterior',
    type: 'Romantic',
    x: 75,
    y: 35,
    capacity: 2,
    desc: 'Iluminación tenue y ambiente íntimo',
  },
];

const TIME_SLOTS = [
  "12:00 PM", "1:00 PM", "2:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"
];

export default function ReservationsPage() {
  const [selectedTable, setSelectedTable] = useState<typeof TABLES[0] | null>(null);
  const [selectedZone, setSelectedZone] = useState<'interior' | 'exterior'>(
  'exterior'
);
const filteredTables = TABLES.filter(
  (table) => table.zone === selectedZone
);
const handleZoneSelect = (zone: 'interior' | 'exterior') => {
  setSelectedZone(zone);
  setSelectedTable(null);
};
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    guests: '',
    occasion: '',
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
        description:
  "Por favor elige una fecha, hora, zona y mesa para continuar.",
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
      `📍 Zona: ${selectedZone === 'interior' ? 'Interior' : 'Exterior'}\n` +
      `🪑 Mesa: ${selectedTable?.type} (Mesa #${selectedTable?.id})\n` +
      `👥 Personas: ${formData.guests || selectedTable?.capacity}\n` +
      `🎉 Ocasión: ${formData.occasion || 'Cena casual'}\n` +
      `💬 Solicitud especial: ${formData.notes || 'Ninguna'}\n\n` +
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
    <div className="min-h-screen pt-40 pb-28 bg-foreground/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 space-y-6">
          <Badge className="bg-card/20 text-primary hover:text-white px-8 py-3 uppercase tracking-[0.4em] text-[15px] font-black border-none">Reserva Tu Momento</Badge>
          <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter">Elige tu ubicación</h1>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto italic font-light">
            Selecciona tu lugar privilegiado y permítenos preparar la mesa para tu llegada.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-7 items-start">
          {/* Calendar & Time Selection */}
          <div className="xl:col-span-6 space-y-4 overflow-auto">
            <Card className="rounded-[3rem] border-none shadow-xl overflow-hidden bg-foreground/20">
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
                        className={`bg-white text-primary hover:text-muted rounded-2xl h-14 text-sm font-bold transition-all ${selectedTime === slot ? 'bg-primary/20 shadow-lg' : 'hover:border-primary/80'}`}
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
          <div className="xl:col-span-6 space-y-5 ">

  {/* Zone Selection */}
  <Card className="rounded-[2rem] border-none shadow-xl bg-foreground/10 overflow-hidden">
    <CardContent className="p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40">
            3. Ubicación
          </p>

          <h3 className="text-xl sm:text-2xl font-headline font-bold mt-1">
            ¿Dónde quieres disfrutar?
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2 w-full sm:w-auto">
          <Button
            type="button"
            onClick={() => handleZoneSelect('interior')}
            variant="outline"
            className={cn(
              `
                h-12
                px-5
                rounded-2xl
                font-black
                uppercase
                tracking-wider
                text-xs
                transition-all
              `,
              selectedZone === 'interior'
                ? 'bg-primary text-white border-primary shadow-lg'
                : 'bg-white/70 text-foreground/60 hover:border-primary'
            )}
          >
            Interior
          </Button>

          <Button
            type="button"
            onClick={() => handleZoneSelect('exterior')}
            variant="outline"
            className={cn(
              `
                h-12
                px-5
                rounded-2xl
                font-black
                uppercase
                tracking-wider
                text-xs
                transition-all
              `,
              selectedZone === 'exterior'
                ? 'bg-primary text-white border-primary shadow-lg'
                : 'bg-white/70 text-foreground/60 hover:border-primary'
            )}
          >
            Exterior
          </Button>
        </div>

      </div>
    </CardContent>
  </Card>
            <div
  className="
    relative
    aspect-[4/5]
    sm:aspect-[16/12]
    bg-foreground/50
    rounded-[2rem]
    sm:rounded-[3rem]
    lg:rounded-[4rem]
    shadow-2xl
    overflow-hidden
    border-[2px]
    border-primary/60
    p-3
    sm:p-5
    group
  "
>
               {/* Sea Visual Side */}
               <div className="absolute top-0 left-0 bottom-0 w-20 md:w-24 bg-accent/40 flex flex-col items-center justify-center gap-6 text-blue-200 overflow-hidden">
                  <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
                    <Waves size={50} className="opacity-60" />
                  </motion.div>
                  <span className="[writing-mode:vertical-lr] font-black tracking-[0.3em] uppercase text-[15px] whitespace-nowrap">Océano Caribe</span>
                    <motion.div animate={{ y: [0, -20, 0] }} transition={{ repeat: Infinity, duration: 4 }}>
                    <Waves size={50} className="opacity-60" />
                  </motion.div>
               </div>
               
               {/* Tables Layout */}
               <div className="relative w-full h-full">
                  {filteredTables.map((table) => (
                    <motion.button
                      key={table.id}
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTableSelect(table)}
                      style={{ left: `${table.x}%`, top: `${table.y}%` }}
                      className={`
  absolute
  w-12 h-12
  sm:w-16 sm:h-16
  md:w-20 md:h-20
  rounded-2xl
  sm:rounded-[1.5rem]
  flex flex-col
  items-center
  justify-center
  transition-all
  shadow-xl
  border-2
  ${
    selectedTable?.id === table.id
      ? 'bg-primary text-white border-primary ring-4 sm:ring-8 ring-primary/10'
      : 'bg-foreground/90 text-muted/80 border-transparent hover:bg-white hover:border-primary/30 hover:text-primary'
  }
`}
                    >
                      <User size={selectedTable?.id === table.id ? 22 : 17} />
<span
  className="
    absolute
    -top-2
    -right-2
    sm:-top-3
    sm:-right-3
    bg-white
    text-muted
    text-[10px]
    sm:text-[15px]
    font-black
    w-6 h-6
    sm:w-8 sm:h-8
    rounded-full
    flex items-center justify-center
    border-2
    border-primary/10
    shadow-lg
  "
>
  x{table.capacity}
</span>
                      <span className="text-[8px] font-bold uppercase tracking-tighter mt-1 hidden md:block">{table.type}</span>
                    
                    </motion.button>
                  ))}
               </div>

               {/* Map Key */}
               <div className="absolute text-primary bottom-5 right-8 flex gap-2 md:gap-6 bg-white/80 backdrop-blur px-6 py-3 rounded-full border shadow-sm">
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><div className="w-3 h-3 bg-label rounded-full" /> Seleccionada</div>
                  <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest"><div className="w-3 h-3 bg-label rounded-full" /> Disponible</div>
               </div>
            </div>

            {/* Selection Summary CTA */}
            <AnimatePresence>
              {selectedTable && (
                <motion.div 
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="bg-foreground/10 p-10 rounded-[4rem] shadow-4xl justify-between border-t-8 border-primary"
                >
                  <div className="flex-col text-center md:text-left">
                    <div className="flex min-w-fit text-15 gap-3 md:justify-start">
<Badge
  className="
    bg-accent/60
    hover:bg-accent
    text-bacground
    hover:text-label
    border-none
  "
>
  {selectedZone === 'interior' ? 'Interior' : 'Exterior'}
</Badge>

<Badge
  className="
    bg-accent/60
    hover:bg-accent
    text-bacground
    hover:text-label
    border-none
  "
>
  {selectedTable.type}
</Badge>
                       <Badge className="bg-accent/60 text-bacground hover:bg-accent hover:text-label border-none">{selectedTime || 'Elige hora'}</Badge>
                       <Badge className="bg-accent/60 *:border-none hover:bg-accent hover:text-label">{` ${format(date!, 'PP', { locale: es })}\n` || "Elige una fecha"}</Badge>
                    </div>
                    <h3 className="flex my-4 text-bacground hover:text-label text-2xl sm:text-4xl font-headline font-bold">
  Mesa para {selectedTable.capacity} · {selectedZone === 'interior' ? 'Interior' : 'Exterior'}
</h3>
                    <p className="my-4 text-primary hover:text-label italic text-xl">"{selectedTable.desc}"</p>
                    </div>
                  <Button 
                    onClick={handleOpenModal}
                    className="flex relative justify-self-end w-full md:w-auto h-16 bg-primary hover:bg-accent hover:text-primary text-white text-xl font-bold rounded-3xl shadow-2xl transition-all"

                  >
                    Confirmar Reserva <Send size={50} className="" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

{/* Reservation Details Modal */}
<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
  <DialogContent
    className="
      w-[calc(100%-1rem)]
      sm:w-full
      sm:max-w-[620px]
      max-h-[92vh]
      p-0
      overflow-hidden
      border-none
      rounded-[2rem]
      sm:rounded-[2.5rem]
      bg-background
      shadow-2xl
    "
  >
    {/* =========================
        HEADER
    ========================== */}
    <div className="relative overflow-hidden bg-primary text-white">
      
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -right-20 w-56 h-56 rounded-full border-[30px] border-white" />
        <div className="absolute -bottom-24 -left-20 w-64 h-64 rounded-full border-[25px] border-white" />
      </div>

      <div className="relative px-6 sm:px-8 pt-7 pb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="
            w-11 h-11
            rounded-2xl
            bg-white/15
            backdrop-blur-md
            flex items-center justify-center
            border border-white/20
          ">
            <MessageSquare size={20} />
          </div>

          <div>
            <p className="
              text-[9px]
              font-black
              uppercase
              tracking-[0.3em]
              text-white/60
            ">
              Casa Origen
            </p>

            <p className="
              text-xs
              font-medium
              text-white/80
            ">
              Ciénaga · Caribe
            </p>
          </div>
        </div>

        <DialogTitle
          className="
            text-2xl
            sm:text-3xl
            font-headline
            font-bold
            tracking-tight
          "
        >
          Confirma tu experiencia
        </DialogTitle>

        <DialogDescription
          className="
            mt-1
            text-sm
            sm:text-base
            text-white/70
            italic
          "
        >
          Completa tus datos y envía tu solicitud a nuestro equipo.
        </DialogDescription>
      </div>
    </div>

    {/* =========================
        CONTENT
    ========================== */}
    <div className="overflow-y-auto max-h-[calc(92vh-170px)]">
      <form
        onSubmit={handleConfirmReservation}
        className="p-5 sm:p-8 space-y-7"
      >

        {/* =========================
            RESERVATION SUMMARY
        ========================== */}
        <div
          className="
            rounded-2xl
            sm:rounded-[1.75rem]
            bg-secondary/10
            border border-primary/10
            p-4
            sm:p-5
          "
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="
                text-[9px]
                font-black
                uppercase
                tracking-[0.25em]
                text-foreground/40
              ">
                Tu reserva
              </p>

              <p className="
                text-lg
                font-headline
                font-bold
                text-foreground
              ">
                {selectedTable?.type}
              </p>
            </div>

            <Badge
              className="
                bg-primary
                text-white
                border-none
                rounded-full
                px-3
                py-1
                text-[10px]
                font-black
              "
            >
              Mesa #{selectedTable?.id}
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-2">
            
            {/* Date */}
            <div className="
              rounded-xl
              bg-background
              border
              border-primary/5
              p-3
            ">
              <CalendarIcon
                size={15}
                className="text-primary mb-2"
              />

              <p className="
                text-[8px]
                uppercase
                tracking-widest
                font-black
                text-foreground/30
              ">
                Fecha
              </p>

              <p className="
                text-xs
                font-bold
                text-foreground
                mt-1
                truncate
              ">
                {date
                  ? format(date, "dd MMM", { locale: es })
                  : "—"}
              </p>
            </div>

            {/* Time */}
            <div className="
              rounded-xl
              bg-background
              border
              border-primary/5
              p-3
            ">
              <Clock
                size={15}
                className="text-primary mb-2"
              />

              <p className="
                text-[8px]
                uppercase
                tracking-widest
                font-black
                text-foreground/30
              ">
                Hora
              </p>

              <p className="
                text-xs
                font-bold
                text-foreground
                mt-1
                truncate
              ">
                {selectedTime || "—"}
              </p>
            </div>

            {/* Capacity */}
            <div className="
              rounded-xl
              bg-background
              border
              border-primary/5
              p-3
            ">
              <User
                size={15}
                className="text-primary mb-2"
              />

              <p className="
                text-[8px]
                uppercase
                tracking-widest
                font-black
                text-foreground/30
              ">
                Capacidad
              </p>

              <p className="
                text-xs
                font-bold
                text-foreground
                mt-1
                truncate
              ">
                {selectedTable?.capacity} personas
              </p>
            </div>
          </div>
        </div>

        {/* =========================
            PERSONAL INFORMATION
        ========================== */}
        <div className="space-y-4">
          <div>
            <p className="
              text-[10px]
              font-black
              uppercase
              tracking-[0.25em]
              text-primary
            ">
              Tus datos
            </p>

            <p className="
              text-sm
              text-foreground/50
              mt-1
            ">
              Necesitamos esta información para contactarte.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Name */}
            <div className="space-y-2">
              <Label
                htmlFor="res-name"
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-widest
                  text-foreground/50
                  ml-1
                "
              >
                Nombre completo
              </Label>

              <Input
                id="res-name"
                placeholder="Tomasita García"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                required
                className="
                  h-12
                  rounded-xl
                  bg-secondary/10
                  border
                  border-primary/5
                  px-4
                  text-sm
                  shadow-none
                  transition-all
                  focus-visible:ring-2
                  focus-visible:ring-primary/30
                  focus-visible:border-primary/30
                "
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label
                htmlFor="res-phone"
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-widest
                  text-foreground/50
                  ml-1
                "
              >
                WhatsApp
              </Label>

              <Input
                id="res-phone"
                type="tel"
                placeholder="+57 300..."
                value={formData.phone}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    phone: e.target.value,
                  })
                }
                required
                className="
                  h-12
                  rounded-xl
                  bg-secondary/10
                  border
                  border-primary/5
                  px-4
                  text-sm
                  shadow-none
                  transition-all
                  focus-visible:ring-2
                  focus-visible:ring-primary/30
                  focus-visible:border-primary/30
                "
              />
            </div>
          </div>
        </div>

        {/* =========================
            RESERVATION DETAILS
        ========================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Guests */}
          <div className="space-y-2">
            <Label
              className="
                text-[9px]
                font-black
                uppercase
                tracking-widest
                text-foreground/50
                ml-1
              "
            >
              Comensales
            </Label>

            <Select
              onValueChange={(val) =>
                setFormData({
                  ...formData,
                  guests: val,
                })
              }
            >
              <SelectTrigger
                className="
                  h-12
                  rounded-xl
                  bg-secondary/10
                  border
                  border-primary/5
                  shadow-none
                  text-sm
                  focus:ring-primary/30
                "
              >
                <SelectValue
                  placeholder={`Capacidad: ${selectedTable?.capacity}`}
                />
              </SelectTrigger>

              <SelectContent>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <SelectItem
                    key={n}
                    value={n.toString()}
                  >
                    {n} {n === 1 ? "persona" : "personas"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Occasion */}
          <div className="space-y-2">
            <Label
              className="
                text-[9px]
                font-black
                uppercase
                tracking-widest
                text-foreground/50
                ml-1
              "
            >
              Ocasión
            </Label>

            <Select
  value={formData.occasion}
  onValueChange={(val) =>
    setFormData({
      ...formData,
      occasion: val,
    })
  }
>
              <SelectTrigger
                className="
                  h-12
                  rounded-xl
                  bg-secondary/10
                  border
                  border-primary/5
                  shadow-none
                  text-sm
                  focus:ring-primary/30
                "
              >
                <SelectValue placeholder="Cena casual" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="casual">
                  Cena casual
                </SelectItem>

                <SelectItem value="birthday">
                  Cumpleaños
                </SelectItem>

                <SelectItem value="anniversary">
                  Aniversario
                </SelectItem>

                <SelectItem value="business">
                  Negocios
                </SelectItem>

                <SelectItem value="special">
                  Ocasión especial
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* =========================
            SPECIAL REQUEST
        ========================== */}
        <div className="space-y-3">

          <div className="flex items-end justify-between gap-3">
            <div>
              <Label
                htmlFor="res-notes"
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-widest
                  text-foreground/50
                "
              >
                Solicitud especial
              </Label>

              <p className="
                text-[11px]
                text-foreground/35
                mt-1
              ">
                Cuéntanos cómo podemos preparar tu experiencia.
              </p>
            </div>

            <span className="
              shrink-0
              text-[9px]
              font-medium
              uppercase
              tracking-wider
              text-foreground/30
            ">
              Opcional
            </span>
          </div>

          <div className="
            relative
            rounded-2xl
            bg-secondary/10
            border
            border-primary/5
            transition-all
            focus-within:border-primary/30
            focus-within:ring-2
            focus-within:ring-primary/10
          ">
            <Textarea
              id="res-notes"
              placeholder="
                Ej: decoración para cumpleaños,
                mesa especial, silla para bebé,
                alergias o cualquier solicitud...
              "
              value={formData.notes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  notes: e.target.value,
                })
              }
              maxLength={500}
              className="
                min-h-[120px]
                rounded-2xl
                bg-transparent
                border-none
                p-4
                pb-8
                text-sm
                leading-relaxed
                resize-none
                shadow-none
                focus-visible:ring-0
              "
            />

            <span className="
              absolute
              bottom-3
              right-4
              text-[9px]
              font-medium
              text-foreground/25
            ">
              {formData.notes.length}/500
            </span>
          </div>
        </div>

        {/* =========================
            CTA
        ========================== */}
        <div className="pt-1 space-y-4">

          <Button
            type="submit"
            className="
              group
              w-full
              h-14
              sm:h-16
              rounded-2xl
              bg-primary
              hover:bg-foreground
              text-white
              text-sm
              sm:text-base
              font-bold
              shadow-xl
              hover:shadow-2xl
              transition-all
              duration-300
            "
          >
            <MessageSquare
              size={20}
              className="
                mr-3
                transition-transform
                group-hover:scale-110
              "
            />

            Finalizar y enviar a WhatsApp
          </Button>

          <div className="
            flex
            items-center
            justify-center
            gap-2
            text-foreground/30
          ">
            <CheckCircle2 size={13} />

            <p className="
              text-[9px]
              font-bold
              uppercase
              tracking-[0.18em]
            ">
              Podrás confirmar directamente con nuestro equipo
            </p>
          </div>
        </div>

      </form>
    </div>
  </DialogContent>
</Dialog>
    </div>
  );
}
