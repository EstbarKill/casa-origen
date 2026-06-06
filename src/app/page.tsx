
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BeachCanvas } from '@/components/visuals/BeachCanvas';
import { TomasitaMonument } from '@/components/visuals/TomasitaMonument';
import { CaimanMascot } from '@/components/visuals/CaimanMascot';
import { ArrowRight, Sparkles, Waves, Anchor, Landmark, Utensils, Star } from 'lucide-react';

export default function Home() {
  const { scrollYProgress } = useScroll();

  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <div className="relative min-h-[400vh]">
      <BeachCanvas />
      <CaimanMascot />

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
            Destino de Lujo • Ciénaga, Magdalena
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1 }}
            className="text-[10vw] md:text-[13rem] font-bold font-headline mb-4 tracking-tighter leading-[0.8] text-foreground"
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
            <Button asChild size="lg" className="bg-primary hover:bg-white hover:text-primary text-white px-16 h-20 text-2xl rounded-full shadow-[0_25px_60px_-15px_rgba(183,157,132,0.6)] transition-all hover:scale-110 active:scale-95">
              <Link href="/reservations">Reservar Experiencia</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-foreground hover:bg-white/40 backdrop-blur-sm px-12 h-20 text-2xl rounded-full border border-primary/20 transition-all">
              <Link href="/menu" className="flex items-center gap-3">Explorar Menú <ArrowRight size={24} /></Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Abstract Sea Elements */}
        <motion.div 
          animate={{ y: [0, 20, 0] }}
          transition={{ repeat: Infinity, duration: 8 }}
          className="absolute bottom-10 left-10 text-primary/10 opacity-20 hidden lg:block"
        >
          <Waves size={200} />
        </motion.div>
      </section>

      {/* CULTURE / TOMASITA SECTION */}
      <section className="relative min-h-screen py-40 flex flex-col items-center justify-center bg-secondary/5">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
          <div className="order-2 lg:order-1 relative">
            <TomasitaMonument />
            <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2rem] shadow-2xl space-y-2 border border-primary/10 hidden md:block">
               <span className="text-primary font-black uppercase tracking-widest text-xs">Cultura Local</span>
               <p className="text-xl font-headline font-bold">Leyenda del Caimán</p>
            </div>
          </div>
          <div className="space-y-16 order-1 lg:order-2">
            <div className="space-y-6">
              <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-none px-6 py-2 text-xs uppercase tracking-[0.3em] font-black">Patrimonio Vivo</Badge>
              <h2 className="text-7xl md:text-9xl font-bold font-headline leading-[0.9] text-foreground tracking-tighter">
                El Espíritu <br /> de Ciénaga
              </h2>
            </div>
            <div className="space-y-10 text-2xl text-foreground/70 leading-relaxed font-light italic text-justify max-w-2xl">
              <p>
                En Casa Origen, honramos el Festival del Caimán Cienaguero y la leyenda de la pequeña Tomasita. Aquí, la resiliencia se convierte en sabor y la alegría en hospitalidad.
              </p>
              <p>
                Cada plato es un homenaje a los pescadores que cada mañana desafían las olas para traer el tesoro del Mar Caribe a nuestra cocina.
              </p>
            </div>
            <Button asChild variant="link" className="text-primary p-0 text-3xl hover:no-underline flex items-center gap-6 group">
              <Link href="/our-story" className="flex items-center gap-4">
                Nuestra Historia 
                <span className="bg-primary/10 p-6 rounded-full group-hover:bg-primary group-hover:text-white transition-all shadow-xl">
                  <Landmark size={32} />
                </span>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* GASTRONOMY / MENU PREVIEW */}
      <section className="relative min-h-screen py-40 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-32 space-y-6">
             <Badge className="bg-primary/10 text-primary border-none px-8 py-3 text-xs uppercase tracking-[0.4em] font-black">Alta Gastronomía Caribeña</Badge>
             <h2 className="text-7xl md:text-[10rem] font-bold font-headline tracking-tighter leading-none">Sabores del Mar</h2>
             <p className="text-2xl text-foreground/50 italic font-light max-w-3xl mx-auto">
               Un viaje sensorial a través de los ingredientes más frescos de la costa de Magdalena.
             </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
             {[
               { 
                 title: 'Tradición', 
                 icon: Anchor, 
                 desc: 'Recetas secretas heredadas de generaciones, reinterpretadas con técnicas modernas.',
                 color: 'primary' 
               },
               { 
                 title: 'Origen', 
                 icon: Waves, 
                 desc: 'Apoyamos la pesca artesanal y sostenible, garantizando frescura y sabor real.',
                 color: 'accent'
               },
               { 
                 title: 'Innovación', 
                 icon: Sparkles, 
                 desc: 'La elegancia del Mediterráneo se fusiona con la explosividad del Caribe.',
                 color: 'primary'
               }
             ].map((item, i) => (
               <motion.div 
                 key={i}
                 whileHover={{ y: -30, rotate: i === 1 ? -1 : 1 }}
                 className="p-16 rounded-[4rem] bg-secondary/10 border border-primary/5 space-y-10 text-center relative overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500"
               >
                 <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[4rem]" />
                 <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center text-primary mx-auto shadow-xl group-hover:scale-110 transition-transform">
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

      {/* FINAL CTA / SUNSET SCENE */}
      <section className="relative h-screen flex items-center justify-center bg-foreground overflow-hidden">
        {/* Abstract Sunset Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-transparent opacity-40" />
        <Image 
          src="https://picsum.photos/seed/casa-sunset/1920/1080" 
          alt="Sunset" 
          fill 
          className="object-cover brightness-50 opacity-40 scale-110" 
        />
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white space-y-16">
          <motion.h2 
            whileInView={{ opacity: [0, 1], y: [60, 0] }}
            className="text-8xl md:text-[14rem] font-bold font-headline mb-12 tracking-tighter leading-[0.8]"
          >
            Donde Termina <br /> el Horizonte
          </motion.h2>
          <p className="text-2xl md:text-4xl mb-16 max-w-4xl mx-auto opacity-80 font-light italic leading-relaxed">
            "En Casa Origen, cada atardecer es una obra maestra y cada cena una celebración de la vida caribeña."
          </p>
          <div className="flex flex-col sm:flex-row gap-12 justify-center items-center">
            <Button asChild size="lg" className="bg-primary hover:bg-white hover:text-primary text-white px-24 h-24 text-4xl rounded-full shadow-[0_30px_70px_-15px_rgba(183,157,132,0.8)] hover:scale-110 transition-all font-bold">
              <Link href="/reservations">Reservar Ahora</Link>
            </Button>
            <Link href="/contact" className="text-white/60 hover:text-white transition-all text-2xl border-b-2 border-white/20 pb-2 font-headline italic">
              Nuestra Ubicación
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
