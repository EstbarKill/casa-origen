
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
import { GastronomicConcierge } from '@/components/ai/GastronomicConcierge';
import { ArrowRight, Sparkles, Waves, Anchor, Landmark, Utensils, Star, MapPin } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const { atmosphere } = useAtmosphere();

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const triggerDiscovery = (id: string) => {
    const el = document.getElementById(`trigger-${id}`);
    if (el) el.click();
  };

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
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-[10vw] md:text-[13rem] font-bold font-headline mb-4 tracking-tighter leading-[0.8]"
          >
            Casa Origen
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-2xl md:text-5xl font-light mb-20 italic text-primary/80 tracking-tight font-headline max-w-4xl mx-auto"
          >
            "Donde el Mar y la Tradición se encuentran bajo la brisa del Caribe."
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
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
      <section className="relative min-h-screen py-64 flex flex-col items-center justify-center bg-secondary/5">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-48 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
            className="order-2 lg:order-1 relative"
          >
            <TomasitaMonument />
            <motion.div 
              whileHover={{ scale: 1.2 }}
              onClick={() => triggerDiscovery('legend')}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 cursor-pointer z-50 rounded-full bg-primary/5 hover:bg-primary/20 flex items-center justify-center group"
            >
              <Sparkles className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" size={48} />
            </motion.div>
            
            <div className="absolute -bottom-16 -right-16 bg-white p-12 rounded-[3rem] shadow-2xl space-y-3 border border-primary/10 hidden md:block">
               <span className="text-primary font-black uppercase tracking-widest text-[10px]">Patrimonio Cultural</span>
               <p className="text-3xl font-headline font-bold">Relatos de la Ciénaga</p>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-16 order-1 lg:order-2"
          >
            <motion.div variants={itemVariants} className="space-y-8">
              <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-none px-8 py-3 text-xs uppercase tracking-[0.4em] font-black">Identidad Viva</Badge>
              <h2 className="text-7xl md:text-[10rem] font-bold font-headline leading-[0.85] tracking-tighter">
                El Espíritu <br /> de Ciénaga
              </h2>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-12 text-2xl text-foreground/70 leading-relaxed font-light italic text-justify max-w-2xl">
              <p>
                En Casa Origen, honramos el Festival del Caimán Cienaguero y la leyenda de la pequeña Tomasita. Cada rincón cuenta una historia de pesca, brisa y mar.
              </p>
              <p>
                Acompáñanos en este viaje donde la resiliencia de nuestro pueblo se transforma en sabores inigualables y hospitalidad de lujo.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button asChild variant="link" className="text-primary p-0 text-3xl hover:no-underline flex items-center gap-8 group">
                <Link href="/our-story" className="flex items-center gap-6">
                  Descubrir la Historia 
                  <span className="bg-primary/10 p-8 rounded-full group-hover:bg-primary group-hover:text-white transition-all shadow-xl">
                    <Landmark size={40} />
                  </span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* GASTRONOMY PREVIEW */}
      <section className="relative min-h-screen py-64 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="text-center mb-48 space-y-8"
          >
             <Badge className="bg-primary/10 text-primary border-none px-10 py-4 text-xs uppercase tracking-[0.5em] font-black">Storytelling Gastronómico</Badge>
             <h2 className="text-7xl md:text-[12rem] font-bold font-headline tracking-tighter leading-none">Platos con Alma</h2>
             <p className="text-3xl text-foreground/40 italic font-light max-w-4xl mx-auto leading-relaxed">
               No solo servimos comida, narramos la cultura caribeña a través de cada ingrediente recolectado bajo el sol de Ciénaga.
             </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-3 gap-24"
          >
             {[
               { 
                 title: 'Herencia', 
                 icon: Anchor, 
                 desc: 'Recetas que han viajado por el Magdalena hasta nuestra cocina artesanal.',
                 id: 'chef'
               },
               { 
                 title: 'Territorio', 
                 icon: Waves, 
                 desc: 'Apoyo directo a pescadores locales y agricultores de la Sierra Nevada.',
                 id: 'coconut'
               },
               { 
                 title: 'Maestría', 
                 icon: Sparkles, 
                 desc: 'La elegancia europea fusionada con la explosividad de la Ciénaga.',
                 id: 'none'
               }
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 variants={itemVariants}
                 whileHover={{ y: -40, transition: { duration: 0.6 } }}
                 onClick={() => item.id !== 'none' && triggerDiscovery(item.id)}
                 className="p-20 rounded-[5rem] bg-secondary/10 border border-primary/5 space-y-12 text-center relative overflow-hidden group shadow-sm hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 cursor-pointer"
               >
                 <div className="w-32 h-32 bg-white rounded-[2.5rem] flex items-center justify-center text-primary mx-auto shadow-2xl group-hover:scale-110 transition-transform duration-700">
                    <item.icon size={64} />
                 </div>
                 <div className="space-y-6">
                    <h3 className="text-5xl font-bold font-headline">{item.title}</h3>
                    <p className="text-2xl text-foreground/60 leading-relaxed italic">{item.desc}</p>
                 </div>
                 <div className="pt-10">
                    <div className="flex justify-center gap-2">
                       {[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-primary fill-primary opacity-20" />)}
                    </div>
                 </div>
               </motion.div>
             ))}
          </motion.div>
        </div>
      </section>

      {/* AI CONCIERGE HIGHLIGHT SECTION */}
      <section className="relative py-64 bg-secondary/10 overflow-hidden">
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 items-center">
            <div className="lg:col-span-5 space-y-12">
               <Badge className="bg-accent/10 text-accent border-none px-8 py-3 text-[10px] font-black tracking-widest uppercase">Concierge Digital</Badge>
               <h2 className="text-7xl font-bold font-headline tracking-tighter leading-[0.9]">Maridajes <br /> de Autor</h2>
               <p className="text-2xl text-foreground/50 italic leading-relaxed">
                 Permita que nuestra inteligencia gastronómica diseñe la combinación perfecta para su paladar, inspirada en los ingredientes de temporada.
               </p>
               <div className="flex gap-4">
                  <div className="p-6 bg-white rounded-3xl shadow-xl border border-primary/5 flex items-center gap-4">
                     <Utensils className="text-primary" size={24} />
                     <span className="font-bold text-sm">Personalizado</span>
                  </div>
                  <div className="p-6 bg-white rounded-3xl shadow-xl border border-primary/5 flex items-center gap-4">
                     <Sparkles className="text-accent" size={24} />
                     <span className="font-bold text-sm">Instántaneo</span>
                  </div>
               </div>
            </div>
            <div className="lg:col-span-7">
               <GastronomicConcierge />
            </div>
          </div>
        </div>
        
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-[50%] h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      </section>

      {/* FINAL CTA */}
      <section className="relative h-screen flex items-center justify-center bg-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-transparent opacity-40" />
        <Image 
          src="https://picsum.photos/seed/casa-sunset-final/1920/1080" 
          alt="Sunset Final" 
          fill 
          className="object-cover brightness-50 opacity-40 scale-110" 
        />
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white space-y-20">
          <motion.h2 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
            className="text-8xl md:text-[14rem] font-bold font-headline tracking-tighter leading-[0.8]"
          >
            Tu viaje <br /> comienza aquí
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 0.8 }}
             transition={{ delay: 0.5, duration: 1 }}
             className="text-2xl md:text-5xl mb-20 max-w-4xl mx-auto font-light italic leading-relaxed"
          >
            "Donde el cielo besa el mar y Tomasita baila al ritmo de la marea eterna."
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-12 justify-center items-center"
          >
            <Button asChild size="lg" className="bg-primary hover:bg-white hover:text-primary text-white px-24 h-24 text-4xl rounded-full shadow-2xl hover:scale-110 transition-all font-bold">
              <Link href="/reservations">Reservar Ahora</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
