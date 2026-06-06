
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BeachCanvas } from '@/components/visuals/BeachCanvas';
import { TomasitaMonument } from '@/components/visuals/TomasitaMonument';
import { CaimanMascot } from '@/components/visuals/CaimanMascot';
import { DiscoverySystem } from '@/components/visuals/DiscoverySystem';
import { useAtmosphere } from '@/components/visuals/AtmosphereProvider';
import { ArrowRight, Sparkles, Waves, Anchor, Landmark, Utensils, Star } from 'lucide-react';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const { atmosphere } = useAtmosphere();

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div className="relative min-h-[400vh]">
      <BeachCanvas />
      <CaimanMascot />
      <DiscoverySystem />

      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 text-center px-4 max-w-6xl"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 mb-10 px-8 py-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-primary text-xs font-black tracking-[0.4em] uppercase"
          >
            <Sparkles size={16} />
            {atmosphere === 'morning' && 'Buenos Días en Ciénaga'}
            {atmosphere === 'sunset' && 'Atardecer Dorado Caribeño'}
            {atmosphere === 'night' && 'Noches Bajo la Luna de Ciénaga'}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1 }}
            className="text-[10vw] md:text-[13rem] font-bold font-headline mb-4 tracking-tighter leading-[0.8]"
          >
            Casa Origen
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-2xl md:text-5xl font-light mb-16 italic text-primary/80 tracking-tight font-headline max-w-4xl mx-auto"
          >
            "Donde el Mar y la Tradición se encuentran bajo la brisa del Caribe."
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <Button asChild size="lg" className="bg-primary hover:bg-white hover:text-primary text-white px-16 h-20 text-2xl rounded-full shadow-2xl transition-all hover:scale-110">
              <Link href="/reservations">Reservar Experiencia</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-foreground hover:bg-white/40 backdrop-blur-sm px-12 h-20 text-2xl rounded-full border border-primary/20 transition-all">
              <Link href="/menu" className="flex items-center gap-3">Explorar Menú <ArrowRight size={24} /></Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* CULTURE / TOMASITA SECTION */}
      <section className="relative min-h-screen py-40 flex flex-col items-center justify-center bg-secondary/5">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="order-2 lg:order-1 relative">
            <TomasitaMonument />
            <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2rem] shadow-2xl space-y-2 border border-primary/10 hidden md:block">
               <span className="text-primary font-black uppercase tracking-widest text-xs">Patrimonio Cultural</span>
               <p className="text-xl font-headline font-bold">Relatos de la Ciénaga</p>
            </div>
          </div>
          <div className="space-y-16 order-1 lg:order-2">
            <div className="space-y-6">
              <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-none px-6 py-2 text-xs uppercase tracking-[0.3em] font-black">Identidad Viva</Badge>
              <h2 className="text-7xl md:text-9xl font-bold font-headline leading-[0.9] tracking-tighter">
                El Espíritu <br /> de Ciénaga
              </h2>
            </div>
            <div className="space-y-10 text-2xl text-foreground/70 leading-relaxed font-light italic text-justify max-w-2xl">
              <p>
                En Casa Origen, honramos el Festival del Caimán Cienaguero y la leyenda de la pequeña Tomasita. Cada rincón cuenta una historia de pesca, brisa y mar.
              </p>
              <p>
                Acompáñanos en este viaje donde la resiliencia de nuestro pueblo se transforma en sabores inigualables y hospitalidad de lujo.
              </p>
            </div>
            <Button asChild variant="link" className="text-primary p-0 text-3xl hover:no-underline flex items-center gap-6 group">
              <Link href="/our-story" className="flex items-center gap-4">
                Descubrir la Historia 
                <span className="bg-primary/10 p-6 rounded-full group-hover:bg-primary group-hover:text-white transition-all shadow-xl">
                  <Landmark size={32} />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* GASTRONOMY PREVIEW */}
      <section className="relative min-h-screen py-40 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-32 space-y-6">
             <Badge className="bg-primary/10 text-primary border-none px-8 py-3 text-xs uppercase tracking-[0.4em] font-black">Storytelling Gastronómico</Badge>
             <h2 className="text-7xl md:text-[10rem] font-bold font-headline tracking-tighter leading-none">Platos con Alma</h2>
             <p className="text-2xl text-foreground/50 italic font-light max-w-3xl mx-auto">
               No solo servimos comida, narramos la cultura caribeña a través de cada ingrediente.
             </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
             {[
               { 
                 title: 'Herencia', 
                 icon: Anchor, 
                 desc: 'Recetas que han viajado por el Magdalena hasta nuestra cocina.',
                 color: 'primary' 
               },
               { 
                 title: 'Territorio', 
                 icon: Waves, 
                 desc: 'Apoyo directo a pescadores locales y agricultores de la Sierra Nevada.',
                 color: 'accent'
               },
               { 
                 title: 'Maestría', 
                 icon: Sparkles, 
                 desc: 'La elegancia europea fusionada con la explosividad de Ciénaga.',
                 color: 'primary'
               }
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 whileHover={{ y: -30 }}
                 className="p-16 rounded-[4rem] bg-secondary/10 border border-primary/5 space-y-10 text-center relative overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500"
               >
                 <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-primary mx-auto shadow-xl">
                    <item.icon size={48} />
                 </div>
                 <h3 className="text-4xl font-bold font-headline">{item.title}</h3>
                 <p className="text-xl text-foreground/60 leading-relaxed italic">{item.desc}</p>
                 <div className="pt-6">
                    <div className="flex justify-center gap-1">
                       {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-primary fill-primary opacity-20" />)}
                    </div>
                 </div>
               </motion.div>
             ))}
          </div>
          
          <div className="mt-32 text-center">
             <Button asChild size="lg" className="rounded-full px-20 h-24 text-3xl font-bold shadow-2xl hover:scale-105 transition-all">
               <Link href="/menu">Explorar el Banquete</Link>
             </Button>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative h-screen flex items-center justify-center bg-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-transparent opacity-40" />
        <Image 
          src="https://picsum.photos/seed/casa-sunset-2/1920/1080" 
          alt="Sunset Final" 
          fill 
          className="object-cover brightness-50 opacity-40 scale-110" 
        />
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white space-y-16">
          <motion.h2 
            whileInView={{ opacity: [0, 1], y: [60, 0] }}
            className="text-8xl md:text-[14rem] font-bold font-headline tracking-tighter leading-[0.8]"
          >
            Tu viaje <br /> comienza aquí
          </motion.h2>
          <p className="text-2xl md:text-4xl mb-16 max-w-4xl mx-auto opacity-80 font-light italic leading-relaxed">
            "Donde el cielo besa el mar y Tomasita baila al ritmo de la marea."
          </p>
          <div className="flex flex-col sm:flex-row gap-12 justify-center items-center">
            <Button asChild size="lg" className="bg-primary hover:bg-white hover:text-primary text-white px-24 h-24 text-4xl rounded-full shadow-2xl hover:scale-110 transition-all font-bold">
              <Link href="/reservations">Reservar Ahora</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
