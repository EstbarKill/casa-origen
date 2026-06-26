
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
import { ArrowRight, Sparkles, Waves, Anchor, Landmark, Star } from 'lucide-react';

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
    <div className="relative min-h-[100vh]">
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
            className="inline-flex items-center gap-5 mb-3 mt-20 px-8 py-3 rounded-full bg-card/60 backdrop-blur-xl border border-primary/20 text-blue-600 hover:text-cyan-600 text-[15px] font-black tracking-[0.4em] uppercase shadow-4xl"
          >
            <Sparkles size={20}/>
            {atmosphere === 'morning' && 'Buenos Días, brisas Cienagueras'}
            {atmosphere === 'sunset' && 'Un atardecer Dorado Caribeño'}
            {atmosphere === 'night' && 'Noches en el reflejo de la luna'}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: .2, ease: "easeOut" }}
            className="hover:text-cyan-600 text-[10vw] md:text-[11rem] font-bold font-headline mb-8 tracking-tighter leading-[0.8] text-foreground"
          >
            Casa Origen
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="text-xl md:text-4xl font-light mb-16 italic text-foreground/80 tracking-tight font-headline max-w-3xl mx-auto leading-tight"
          >
            "Donde el Mar y la Tradición se encuentran bajo la brisa del Caribe."
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col sm:flex-row gap-8 justify-center items-center"
          >
            <Button asChild size="lg" className="bg-primary hover:bg-primary/50 text-white px-16 h-20 text-2xl rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all hover:scale-105 font-black uppercase tracking-widest border-none">
              <Link href="/reservations">Reservar Mesa</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-foreground bg-card/70 hover:bg-card/40 backdrop-blur-md px-12 h-20 text-2xl rounded-full border-primary/20 transition-all font-black uppercase tracking-widest">
              <Link href="/menu" className="flex items-center gap-3 hover:text-white hover:bg-primary/70">Explorar Menú <ArrowRight size={24} /></Link>
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* CULTURE SECTION */}
      <section className="relative min-h-screen py-[3rem] flex flex-col items-center justify-center bg-secondary/20">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "200px" }}
            variants={itemVariants}
            className="order-2 lg:order-1 relative"
          >
            <TomasitaMonument />
            <motion.div 
              whileHover={{ scale: 1.5 }}
              onClick={() => triggerDiscovery('legend')}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[7rem] h-[7rem] cursor-pointer z-50 rounded-full bg-transparent hover:bg-primary/50 flex items-center justify-center group backdrop-blur-sm border border-white/30 shadow-4xl"
            >
              <Sparkles className="text-black hover:text-primary opacity-20 group-hover:opacity-100 transition-opacity" size={48} />
            </motion.div>
            
            <div className="absolute bottom-20 -right-20 bg-card/90 backdrop-blur-xl p-5 rounded-[4rem] shadow-2xl space-y-2 border border-primary/70 hidden md:block max-w-xs">
               <span className="text-primary font-black uppercase tracking-widest text-[1rem]">Patrimonio Vivo</span>
               <p className="text-xl font-headline font-bold text-card-foreground">Relatos de la Ciénaga Grande</p>
            </div>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="space-y-12 order-1 lg:order-2"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <Badge className="bg-accent/20 text-black hover:bg-accent/70 border-none px-8 py-2 text-[15px] uppercase tracking-[0.5em] font-black rounded-full">Identidad Cultural</Badge>
              <h2 className="hover:text-blue-300 text-7xl md:text-9xl font-bold font-headline leading-[0.5] tracking-tighter text-foreground">
                El Espíritu <br /> de Ciénaga
              </h2>
            </motion.div>
            <motion.div variants={itemVariants} className="space-y-5 text-xl text-foreground/80 leading-relaxed font-light italic text-justify max-w-2xl">
              <p className='text-2xl md:text-3xl text-foreground/50 italic font-light max-w-4xl mx-auto leading-relaxed'>
                En casa origen comienza lahistoria. Sabores que abrazan, momentos que quedan. <br /> Queremos escribirla contigo.En honor al Festival del Caimán Cienaguero y la leyenda de la pequeña Tomasita. Cada rincón de nuestra casa cuenta una historia de pesca, brisa eterna y mar.
              </p>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button asChild variant="link" className="text-primary p-0 text-3xl hover:no-underline flex items-center gap-8 group">
                <Link href="/our-story" className="flex items-center gap-6">
                  Descubrir la Historia 
                  <span className="bg-primary/20 p-8 rounded-full group-hover:bg-primary group-hover:text-white transition-all shadow-2xl border border-primary/10">
                    <Landmark size={40} />
                  </span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* GASTRONOMY PREVIEW */}
      <section className="relative min-h-screen py-20 border border-t-2 border-white/20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="text-center mb-20 space-y-8"
          >
             <Badge className="bg-primary/10 text-primary/100 border-none px-10 py-4 text-[11px] uppercase tracking-[0.6em] font-black rounded-full">Gastronomía Narrativa</Badge>
             <h2 className="text-7xl md:text-[10rem] font-bold font-headline tracking-tighter leading-none text-foreground">Platos con Alma</h2>
             <p className="text-2xl md:text-3xl text-foreground/50 italic font-light max-w-4xl mx-auto leading-relaxed">
               Nuestra cocina narra la cultura caribeña a través de ingredientes recolectados bajo el sol y la marea de Ciénaga.
             </p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-3 gap-20"
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
                 whileHover={{ y: -25, transition: { duration: 0.5 } }}
                 onClick={() => item.id !== 'none' && triggerDiscovery(item.id)}
                 className="p-16 rounded-[4rem] bg-card border border-primary/5 space-y-10 text-center relative overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-700 cursor-pointer"
               >
                 <div className="w-28 h-28 bg-background rounded-[2.5rem] flex items-center justify-center text-primary mx-auto shadow-2xl group-hover:scale-110 transition-transform border border-primary/5">
                    <item.icon size={56} />
                 </div>
                 <div className="space-y-6">
                    <h3 className="text-5xl font-bold font-headline text-card-foreground">{item.title}</h3>
                    <p className="text-xl text-card-foreground/60 leading-relaxed italic font-light">{item.desc}</p>
                 </div>
                 <div className="flex justify-center gap-1.5 opacity-20">
                    {[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-primary fill-primary" />)}
                 </div>
               </motion.div>
             ))}
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative h-auto flex items-center justify-center py-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-transparent opacity-60" />
        <Image 
          src="https://picsum.photos/seed/casa-sunset-final/1920/1080" 
          alt="Sunset Final" 
          fill 
          className="object-cover brightness-50 opacity-40 scale-105" 
        />
        <div className="container mx-auto px-4 relative z-10 text-center text-white space-y-20">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-8xl md:text-[13rem] font-bold font-headline tracking-tighter leading-[0.8] text-white"
          >
            Tu viaje <br /> comienza aquí
          </motion.h2>
          <motion.p 
             initial={{ opacity: 0 }}
             whileInView={{ opacity: 0.9 }}
             transition={{ delay: 0.3, duration: 1 }}
             className="text-2xl md:text-5xl mb-16 max-w-4xl mx-auto font-light italic leading-relaxed text-white/90"
          >
            "Donde el cielo besa el mar y Tomasita baila al ritmo de la marea eterna."
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Button asChild size="lg" className="bg-primary hover:bg-white hover:text-primary text-white px-20 h-24 text-4xl rounded-full shadow-[0_30px_100px_rgba(0,0,0,0.5)] hover:scale-105 transition-all font-black uppercase tracking-[0.1em] border-none">
              <Link href="/reservations">Reservar Ahora</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
