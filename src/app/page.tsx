
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
  hidden: { opacity: 0, y: 30, filter: 'blur(10px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
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
    <div className="relative min-h-[300vh]">
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
            className="inline-flex items-center gap-3 mb-8 px-6 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-primary text-[10px] font-black tracking-[0.4em] uppercase"
          >
            <Sparkles size={14} />
            {atmosphere === 'morning' && 'Buenos Días en Ciénaga'}
            {atmosphere === 'sunset' && 'Atardecer Dorado Caribeño'}
            {atmosphere === 'night' && 'Noches Bajo la Luna de Ciénaga'}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-[10vw] md:text-[11rem] font-bold font-headline mb-4 tracking-tighter leading-[0.8]"
          >
            Casa Origen
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-xl md:text-4xl font-light mb-12 italic text-primary/80 tracking-tight font-headline max-w-3xl mx-auto leading-tight"
          >
            "Donde el Mar y la Tradición se encuentran bajo la brisa del Caribe."
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button asChild size="lg" className="bg-primary hover:bg-white hover:text-primary text-white px-12 h-16 text-xl rounded-full shadow-2xl transition-all hover:scale-105">
              <Link href="/reservations">Reservar Experiencia</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-foreground hover:bg-white/40 backdrop-blur-sm px-10 h-16 text-xl rounded-full border border-primary/20 transition-all">
              <Link href="/menu" className="flex items-center gap-2">Explorar Menú <ArrowRight size={20} /></Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* CULTURE SECTION */}
      <section className="relative min-h-screen py-32 flex flex-col items-center justify-center bg-secondary/5">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={itemVariants}
            className="order-2 lg:order-1 relative"
          >
            <TomasitaMonument />
            <motion.div 
              whileHover={{ scale: 1.1 }}
              onClick={() => triggerDiscovery('legend')}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 cursor-pointer z-50 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center group"
            >
              <Sparkles className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" size={32} />
            </motion.div>
            
            <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-[2rem] shadow-2xl space-y-2 border border-primary/10 hidden md:block">
               <span className="text-primary font-black uppercase tracking-widest text-[10px]">Patrimonio Cultural</span>
               <p className="text-2xl font-headline font-bold">Relatos de la Ciénaga</p>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-10 order-1 lg:order-2"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-none px-6 py-2 text-[10px] uppercase tracking-[0.4em] font-black">Identidad Viva</Badge>
              <h2 className="text-6xl md:text-8xl font-bold font-headline leading-tight tracking-tighter">
                El Espíritu <br /> de Ciénaga
              </h2>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-8 text-xl text-foreground/70 leading-relaxed font-light italic text-justify max-w-xl">
              <p>
                En Casa Origen, honramos el Festival del Caimán Cienaguero y la leyenda de la pequeña Tomasita. Cada rincón cuenta una historia de pesca, brisa y mar.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button asChild variant="link" className="text-primary p-0 text-2xl hover:no-underline flex items-center gap-6 group">
                <Link href="/our-story" className="flex items-center gap-4">
                  Descubrir la Historia 
                  <span className="bg-primary/10 p-6 rounded-full group-hover:bg-primary group-hover:text-white transition-all shadow-xl">
                    <Landmark size={32} />
                  </span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* GASTRONOMY PREVIEW */}
      <section className="relative min-h-screen py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="text-center mb-32 space-y-6"
          >
             <Badge className="bg-primary/10 text-primary border-none px-8 py-3 text-[10px] uppercase tracking-[0.5em] font-black">Storytelling Gastronómico</Badge>
             <h2 className="text-6xl md:text-[9rem] font-bold font-headline tracking-tighter leading-none">Platos con Alma</h2>
             <p className="text-2xl text-foreground/40 italic font-light max-w-3xl mx-auto leading-relaxed">
               Nuestra cocina narra la cultura caribeña a través de cada ingrediente recolectado bajo el sol de Ciénaga.
             </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-3 gap-16"
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
                 whileHover={{ y: -20, transition: { duration: 0.4 } }}
                 onClick={() => item.id !== 'none' && triggerDiscovery(item.id)}
                 className="p-12 rounded-[4rem] bg-secondary/10 border border-primary/5 space-y-8 text-center relative overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
               >
                 <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center text-primary mx-auto shadow-xl group-hover:scale-110 transition-transform">
                    <item.icon size={48} />
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-4xl font-bold font-headline">{item.title}</h3>
                    <p className="text-lg text-foreground/60 leading-relaxed italic">{item.desc}</p>
                 </div>
                 <div className="flex justify-center gap-1 opacity-20">
                    {[1,2,3,4,5].map(s => <Star key={s} size={12} className="text-primary fill-primary" />)}
                 </div>
               </motion.div>
             ))}
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative h-screen flex items-center justify-center bg-foreground overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent opacity-40" />
        <Image 
          src="https://picsum.photos/seed/casa-sunset-final/1920/1080" 
          alt="Sunset Final" 
          fill 
          className="object-cover brightness-50 opacity-40 scale-105" 
        />
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white space-y-16">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-7xl md:text-[12rem] font-bold font-headline tracking-tighter leading-[0.8]"
          >
            Tu viaje <br /> comienza aquí
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 0.8 }}
             transition={{ delay: 0.3, duration: 1 }}
             className="text-xl md:text-4xl mb-12 max-w-3xl mx-auto font-light italic leading-relaxed"
          >
            "Donde el cielo besa el mar y Tomasita baila al ritmo de la marea eterna."
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button asChild size="lg" className="bg-primary hover:bg-white hover:text-primary text-white px-16 h-20 text-3xl rounded-full shadow-2xl hover:scale-105 transition-all font-bold">
              <Link href="/reservations">Reservar Ahora</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

