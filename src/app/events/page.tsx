
"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Heart, Waves, Music, GlassWater, Camera, Utensils, Calendar } from 'lucide-react';
import Link from 'next/link';

export default function EventsPage() {
  const images = PlaceHolderImages;

  const eventTypes = [
    {
      title: "Bodas de Ensueño",
      desc: "Intercambia votos con el atardecer de Ciénaga como testigo. Diseño floral y banquetes personalizados.",
      icon: Heart,
      image: "https://picsum.photos/seed/wedding-1/800/600",
      hint: "beach wedding"
    },
    {
      title: "Eventos Corporativos",
      desc: "Inspira a tu equipo en un entorno de lujo. Equipamiento audiovisual y catering de alta gama.",
      icon: Waves,
      image: "https://picsum.photos/seed/corporate-1/800/600",
      hint: "corporate dinner"
    },
    {
      title: "Celebraciones Privadas",
      desc: "Cumpleaños, aniversarios o cenas exclusivas bajo las estrellas y la brisa marina.",
      icon: GlassWater,
      image: "https://picsum.photos/seed/private-1/800/600",
      hint: "luxury dinner"
    }
  ];

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative h-[110vh] flex items-center justify-center overflow-hidden">
        <Image 
          src="https://picsum.photos/seed/casa-origen-events/1920/1080" 
          alt="Events at Casa Origen" 
          fill 
          className="object-cover brightness-100 scale-15" 
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background" />
        <div className="relative z-10 text-center text-white px-4 max-w-5xl space-y-8">
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-7"
          >
             <Badge className="bg-white/20 backdrop-blur text-white border-white/40 px-6 py-2 uppercase tracking-[0.3em]">Momentos Inolvidables</Badge>
             <h1 className="text-7xl md:text-9xl font-bold font-headline tracking-tighter leading-none">Celebra la Vida</h1>
             <p className="text-2xl md:text-3xl font-light italic max-w-2xl mx-auto opacity-90">
                Tu evento soñado, diseñado por la brisa y perfeccionado por nosotros.
             </p>
          </motion.div>
          <Button asChild size="lg" className="bg-primary hover:bg-white hover:text-primary h-16 px-12 text-xl rounded-full shadow-2xl transition-all">
            <Link href="/contact">Solicitar Cotización</Link>
          </Button>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-24 space-y-4">
          <h2 className="text-5xl md:text-7xl font-bold font-headline">Nuestras Experiencias</h2>
          <div className="w-[30rem] h-[.02rem] bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {eventTypes.map((event, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -20 }}
              className="bg-accent/70 rounded-[3rem] overflow-hidden shadow-xl hover:shadow-3xl transition-all border group"
            >
              <div className="relative h-60">
                <Image src={event.image} alt={event.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" data-ai-hint={event.hint} />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                <div className="absolute top-8 left-8 bg-white/90 p-4 rounded-2xl text-primary shadow-xl">
                   <event.icon size={20} />
                </div>
              </div>
              <div className="p-7 space-y-4">
                <h3 className="text-3xl font-bold font-headline">{event.title}</h3>
                <p className="text-foreground/60 leading-relaxed text-lg italic">"{event.desc}"</p>
                <Button variant="link" className="p-0 text-primary font-bold flex items-center gap-2 group-hover:gap-4 transition-all">
                   Saber más <Waves size={16} />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Checklist */}
      <section className="py-32 bg-secondary/10">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="space-y-12">
              <h2 className="text-5xl md:text-6xl font-bold font-headline">Cada detalle cuenta</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 {[
                   { icon: Utensils, title: "Alta Cocina", desc: "Menús diseñados por nuestro chef ejecutivo." },
                   { icon: Music, title: "Sonido y DJ", desc: "Ambiente musical de primer nivel." },
                   { icon: Camera, title: "Fotografía", desc: "Capturamos cada ángulo de tu felicidad." },
                   { icon: Calendar, title: "Coordinación", desc: "Planeación integral de principio a fin." }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-4">
                      <div className="bg-primary/10 p-3 rounded-xl text-primary h-fit">
                         <item.icon size={20} />
                      </div>
                      <div className="space-y-2">
                         <h4 className="font-bold">{item.title}</h4>
                         <p className="text-sm text-foreground/60">{item.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
              <Button size="lg" className="rounded-full px-10 h-14">Contactar Planner</Button>
           </div>
           <div className="relative aspect-square rounded-[4rem] overflow-hidden border-8 border-white shadow-2xl">
              <Image src="https://picsum.photos/seed/event-decor/1000/1000" alt="Decor" fill className="object-cover" />
           </div>
        </div>
      </section>

      {/* Testimonial CTA */}
      <section className="py-10 bg-foreground/70 text-blue-800 text-center relative overflow-hidden">
         <div className="absolute inset-0 bg-primary/10" />
         <div className="container mx-auto px-4 relative z-10 space-y-12">
            <h2 className="text-4xl md:text-6xl font-headline italic max-w-4xl mx-auto leading-tight">
               "Nuestra boda en Casa Origen fue como vivir dentro de una leyenda caribeña. El servicio y la comida fueron insuperables."
            </h2>
            <div className="space-y-2">
               <p className="text-2xl font-bold text-primary">María y Juan 2026</p>
               <p className="text-black uppercase tracking-[0.2em] text-xs">Novios 2024</p>
            </div>
         </div>
      </section>
    </div>
  );
}
