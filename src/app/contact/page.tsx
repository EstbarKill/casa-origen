
"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, MessageCircle, Mail, Instagram, Facebook, Clock, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Mensaje Enviado',
      description: "Hemos recibido tu consulta. Nos pondremos en contacto contigo pronto.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center mb-24 space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-bold font-headline tracking-tighter"
        >
          Contáctanos
        </motion.h1>
        <p className="text-2xl text-foreground/60 max-w-2xl mx-auto italic">
          "La brisa del Caribe te espera. Estamos aquí para hacer realidad tus momentos especiales."
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
        {/* Contact Info & Map */}
        <div className="space-y-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            <div className="p-10 bg-secondary/20 rounded-[3rem] space-y-6 border border-primary/5 hover:shadow-xl transition-all">
              <div className="bg-primary/10 w-16 h-16 rounded-3xl flex items-center justify-center text-primary shadow-inner">
                <MapPin size={32} />
              </div>
              <h3 className="text-2xl font-bold font-headline">Ubicación</h3>
              <p className="text-foreground/60 leading-relaxed">Troncal del Caribe km 45,<br />Ciénaga, Magdalena, Colombia</p>
            </div>
            
            <div className="p-10 bg-accent/5 rounded-[3rem] space-y-6 border border-accent/10 hover:shadow-xl transition-all">
              <div className="bg-accent/10 w-16 h-16 rounded-3xl flex items-center justify-center text-accent shadow-inner">
                <Clock size={32} />
              </div>
              <h3 className="text-2xl font-bold font-headline">Horarios</h3>
              <p className="text-foreground/60 leading-relaxed">Lun - Sáb: 11am - 10pm<br />Dom: 10am - 9pm</p>
            </div>

            <div className="p-10 bg-white rounded-[3rem] space-y-6 border shadow-sm hover:shadow-xl transition-all">
              <div className="bg-primary/10 w-16 h-16 rounded-3xl flex items-center justify-center text-primary">
                <Phone size={32} />
              </div>
              <h3 className="text-2xl font-bold font-headline">Reservas</h3>
              <p className="text-foreground/60 leading-relaxed">+57 300 000 0000<br />+57 301 000 0000</p>
            </div>

            <div className="p-10 bg-white rounded-[3rem] space-y-6 border shadow-sm hover:shadow-xl transition-all">
              <div className="bg-accent/10 w-16 h-16 rounded-3xl flex items-center justify-center text-accent">
                <Mail size={32} />
              </div>
              <h3 className="text-2xl font-bold font-headline">Email</h3>
              <p className="text-foreground/60 leading-relaxed">hola@casaorigen.com<br />eventos@casaorigen.com</p>
            </div>
          </div>

          {/* Interactive Map Section */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold font-headline">Cómo Llegar</h3>
            <div className="w-full h-[450px] bg-muted rounded-[4rem] overflow-hidden relative shadow-2xl border-8 border-white group">
               <div className="absolute inset-0 flex items-center justify-center text-foreground/20 flex-col gap-6">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <MapPin size={80} className="text-primary" />
                  </motion.div>
                  <span className="font-black tracking-[0.5em] text-xs uppercase text-primary">Mapa Interactivo Cargando</span>
               </div>
               {/* Map hint for AI - Placeholder indicating where the real map integration would go */}
               <div className="hidden" data-ai-hint="map location cienaga colombia" />
               <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur px-8 py-4 rounded-full shadow-2xl border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <p className="text-xs font-bold uppercase tracking-widest text-primary">Kilómetro 45 - Vía Santa Marta</p>
               </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-12 md:p-20 rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] space-y-12 border border-muted sticky top-32 h-fit">
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary border-none">Contacto Directo</Badge>
            <h2 className="text-5xl font-bold font-headline tracking-tighter">Escríbenos</h2>
            <p className="text-xl text-foreground/50 italic">Personaliza tu experiencia o solicita información sobre eventos.</p>
          </div>
          
          <form onSubmit={handleSendMessage} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm font-bold uppercase tracking-widest text-foreground/40">Nombre Completo</Label>
                <Input id="name" placeholder="Tu nombre" required className="h-14 border-muted rounded-2xl bg-muted/20" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-foreground/40">Email</Label>
                <Input id="email" type="email" placeholder="email@ejemplo.com" required className="h-14 border-muted rounded-2xl bg-muted/20" />
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="subject" className="text-sm font-bold uppercase tracking-widest text-foreground/40">Asunto</Label>
              <Input id="subject" placeholder="Ej: Cotización Boda, Reserva Grupo" className="h-14 border-muted rounded-2xl bg-muted/20" />
            </div>
            <div className="space-y-3">
              <Label htmlFor="message" className="text-sm font-bold uppercase tracking-widest text-foreground/40">Mensaje</Label>
              <Textarea id="message" placeholder="Cuéntanos cómo podemos ayudarte..." className="min-h-[180px] border-muted rounded-3xl bg-muted/20 p-6" required />
            </div>
            <Button type="submit" className="w-full h-20 bg-primary text-white text-2xl rounded-3xl shadow-2xl hover:scale-[1.02] transition-all">
              <Send size={24} className="mr-4" /> Enviar Mensaje
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
