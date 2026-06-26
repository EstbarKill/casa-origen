
"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
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
    <div className="container mx-auto px-4 py-32">
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
            <div className="p-10 bg-card text-card-foreground rounded-[3rem] space-y-6 border border-primary/10 shadow-lg hover:shadow-xl transition-all">
              <div className="bg-primary/10 w-16 h-16 rounded-3xl flex items-center justify-center text-primary shadow-inner border border-primary/5">
                <MapPin size={32} />
              </div>
              <h3 className="text-2xl font-bold font-headline">Ubicación</h3>
              <p className="text-card-foreground/70 leading-relaxed">Troncal del Caribe km 45,<br />Ciénaga, Magdalena, Colombia</p>
            </div>
            
            <div className="p-10 bg-card text-card-foreground rounded-[3rem] space-y-6 border border-primary/10 shadow-lg hover:shadow-xl transition-all">
              <div className="bg-accent/10 w-16 h-16 rounded-3xl flex items-center justify-center text-accent shadow-inner border border-accent/5">
                <Clock size={32} />
              </div>
              <h3 className="text-2xl font-bold font-headline">Horarios</h3>
              <p className="text-card-foreground/70 leading-relaxed">Lun - Sáb: 11am - 10pm<br />Dom: 10am - 9pm</p>
            </div>

            <div className="p-10 bg-card text-card-foreground rounded-[3rem] space-y-6 border border-primary/10 shadow-lg hover:shadow-xl transition-all">
              <div className="bg-primary/10 w-16 h-16 rounded-3xl flex items-center justify-center text-primary border border-primary/5">
                <Phone size={32} />
              </div>
              <h3 className="text-2xl font-bold font-headline">Reservas</h3>
              <p className="text-card-foreground/70 leading-relaxed">+57 300 000 0000<br />+57 301 000 0000</p>
            </div>

            <div className="p-10 bg-card text-card-foreground rounded-[3rem] space-y-6 border border-primary/10 shadow-lg hover:shadow-xl transition-all">
              <div className="bg-accent/10 w-16 h-16 rounded-3xl flex items-center justify-center text-accent border border-accent/5">
                <Mail size={32} />
              </div>
              <h3 className="text-2xl font-bold font-headline">Email</h3>
              <p className="text-card-foreground/70 leading-relaxed">casa-origen@gmail.com<br />eventos@casaorigen.com</p>
            </div>
          </div>

          {/* Interactive Map Section */}
<div className="w-full h-[450px] rounded-[4rem] overflow-hidden shadow-2xl border-8 border-card">
  <iframe
    src="https://www.google.com/maps?q=Casa+Origen+Cienaga+Magdalena&output=embed"
    width="100%"
    height="100%"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>
        </div>

        {/* Contact Form */}
        <div className="bg-card text-card-foreground p-12 md:p-20 rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] space-y-12 border border-primary/10 sticky top-32 h-fit">
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary border-none">Contacto Directo</Badge>
            <h2 className="text-5xl font-bold font-headline tracking-tighter text-card-foreground">Escríbenos</h2>
            <p className="text-xl text-card-foreground/50 italic">Personaliza tu experiencia o solicita información sobre eventos.</p>
          </div>
          
          <form onSubmit={handleSendMessage} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <Label htmlFor="name" className="text-sm font-bold uppercase tracking-widest text-card-foreground/60">Nombre Completo</Label>
                <Input id="name" placeholder="Tu nombre" required className="h-14 border-primary/10 rounded-2xl bg-background/50 text-card-foreground" />
              </div>
              <div className="space-y-3">
                <Label htmlFor="email" className="text-sm font-bold uppercase tracking-widest text-card-foreground/60">Email</Label>
                <Input id="email" type="email" placeholder="email@ejemplo.com" required className="h-14 border-primary/10 rounded-2xl bg-background/50 text-card-foreground" />
              </div>
            </div>
            <div className="space-y-3">
              <Label htmlFor="subject" className="text-sm font-bold uppercase tracking-widest text-card-foreground/60">Asunto</Label>
              <Input id="subject" placeholder="Ej: Cotización Boda, Reserva Grupo" className="h-14 border-primary/10 rounded-2xl bg-background/50 text-card-foreground" />
            </div>
            <div className="space-y-3">
              <Label htmlFor="message" className="text-sm font-bold uppercase tracking-widest text-card-foreground/60">Mensaje</Label>
              <Textarea id="message" placeholder="Cuéntanos cómo podemos ayudarte..." className="min-h-[180px] border-primary/10 rounded-3xl bg-background/50 p-6 text-card-foreground" required />
            </div>
            <Button type="submit" className="w-full h-20 bg-primary text-white text-2xl rounded-3xl shadow-2xl hover:scale-[1.02] transition-all border-none">
              <Send size={24} className="mr-4" /> Enviar Mensaje
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
