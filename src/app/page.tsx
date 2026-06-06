
"use client";

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BeachCanvas } from '@/components/visuals/BeachCanvas';
import { TomasitaMonument } from '@/components/visuals/TomasitaMonument';
import { CaimanMascot } from '@/components/visuals/CaimanMascot';
import { ArrowRight, Sparkles, Waves, Anchor, Landmark } from 'lucide-react';

export default function Home() {
  const { scrollYProgress } = useScroll();

  // Scroll-based parallax for text
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="relative min-h-[400vh]">
      <BeachCanvas />
      <CaimanMascot />

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-4 max-w-5xl"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-8 px-6 py-2 rounded-full glass text-primary text-xs font-bold tracking-[0.3em] uppercase"
          >
            <Sparkles size={14} />
            Destino de Lujo • Ciénaga, Magdalena
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="text-7xl md:text-[12rem] font-bold font-headline mb-4 tracking-tighter leading-none text-foreground"
          >
            Casa Origen
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl md:text-4xl font-light mb-12 italic text-primary/80 tracking-tight font-headline"
          >
            "Donde el Mar y la Tradición se Encuentran"
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:row gap-6 justify-center items-center"
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-12 py-8 text-xl rounded-full shadow-2xl transition-all hover:scale-105 active:scale-95">
              <Link href="/reservations">Reservar Experiencia</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-foreground hover:bg-white/40 backdrop-blur-sm px-10 py-8 text-xl rounded-full border border-primary/20 transition-all">
              <Link href="/menu" className="flex items-center gap-2">Explorar Menú <ArrowRight size={20} /></Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating Palm Trees (Parallax) */}
        <motion.div 
          style={{ x: -100, y: useTransform(scrollYProgress, [0, 0.2], [0, -100]) }}
          className="absolute bottom-0 -left-20 w-80 h-[120%] bg-[url('https://picsum.photos/seed/palm1/400/800')] bg-no-repeat bg-contain opacity-20 pointer-events-none"
          data-ai-hint="palm tree"
        />
        <motion.div 
          style={{ x: 100, y: useTransform(scrollYProgress, [0, 0.2], [0, -150]) }}
          className="absolute bottom-0 -right-20 w-80 h-[120%] bg-[url('https://picsum.photos/seed/palm2/400/800')] bg-no-repeat bg-contain opacity-20 pointer-events-none"
          data-ai-hint="palm tree"
        />
      </section>

      {/* CULTURE / TOMASITA SECTION */}
      <section className="relative min-h-screen py-32 flex flex-col items-center justify-center bg-secondary/10">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <TomasitaMonument />
          </div>
          <div className="space-y-12 order-1 lg:order-2">
            <div className="space-y-4">
              <motion.div 
                whileInView={{ width: [0, 80] }}
                className="h-1 bg-accent mb-6"
              />
              <h2 className="text-6xl md:text-8xl font-bold font-headline leading-none text-foreground">
                El Espíritu <br /> de Ciénaga
              </h2>
            </div>
            <div className="space-y-8 text-xl text-foreground/70 leading-relaxed font-light italic">
              <p>
                Inspirados por el Festival del Caimán Cienaguero y la leyenda de la pequeña Tomasita, Casa Origen celebra la resiliencia y la alegría de nuestro pueblo.
              </p>
              <p>
                Cada detalle de nuestro espacio, desde la arquitectura hasta el sabor de nuestros platos, es un tributo a la brisa que nos arrulla y a la historia que nos define.
              </p>
            </div>
            <Button asChild variant="link" className="text-primary p-0 text-2xl hover:no-underline flex items-center gap-4 group">
              <Link href="/our-story" className="flex items-center gap-3">
                Nuestra Historia 
                <span className="bg-primary/10 p-4 rounded-full group-hover:bg-primary group-hover:text-white transition-all">
                  <Landmark size={24} />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* GASTRONOMY / MENU PREVIEW */}
      <section className="relative min-h-screen py-32 flex flex-col items-center justify-center">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24 space-y-4">
             <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-none px-6 py-2 text-sm uppercase tracking-widest font-bold">Gastronomía Caribeña</Badge>
             <h2 className="text-6xl md:text-8xl font-bold font-headline">Sabores del Mar</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
             {[
               { title: 'Tradición', icon: Anchor, desc: 'Recetas heredadas de generaciones de pescadores cienagueros.' },
               { title: 'Frescura', icon: Waves, desc: 'Del mar a su mesa en menos de 24 horas. Calidad incomparable.' },
               { title: 'Innovación', icon: Sparkles, desc: 'Técnicas modernas aplicadas a los ingredientes más nobles de nuestra costa.' }
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 whileHover={{ y: -20 }}
                 className="p-12 glass rounded-[3rem] space-y-8 text-center"
               >
                 <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary mx-auto">
                    <item.icon size={40} />
                 </div>
                 <h3 className="text-3xl font-bold font-headline">{item.title}</h3>
                 <p className="text-foreground/60 leading-relaxed">{item.desc}</p>
               </motion.div>
             ))}
          </div>
          
          <div className="mt-20 text-center">
             <Button asChild size="lg" className="rounded-full px-12 h-16 text-xl">
               <Link href="/menu">Ver Menú Completo</Link>
             </Button>
          </div>
        </div>
      </section>

      {/* FINAL CTA / SUNSET SCENE */}
      <section className="relative h-screen flex items-center justify-center bg-foreground overflow-hidden">
        {/* Abstract Sunset Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <motion.h2 
            whileInView={{ opacity: [0, 1], y: [40, 0] }}
            className="text-7xl md:text-[10rem] font-bold font-headline mb-12 tracking-tight leading-none"
          >
            Celebra la <br /> Brisa Marina
          </motion.h2>
          <p className="text-2xl md:text-3xl mb-16 max-w-3xl mx-auto opacity-70 font-light italic leading-relaxed">
            "Donde el atardecer no es el final del día, sino el comienzo de una noche inolvidable en Casa Origen."
          </p>
          <div className="flex flex-col sm:row gap-10 justify-center items-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-20 py-10 text-3xl rounded-full shadow-2xl hover:scale-105 transition-all">
              <Link href="/reservations">Reservar Ahora</Link>
            </Button>
            <Link href="/contact" className="text-white/60 hover:text-white transition-colors text-xl border-b border-white/20 pb-2">
              Explorar Ubicación
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
