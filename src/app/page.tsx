
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Waves, Heart, PartyPopper, Utensils, Sparkles, ArrowRight } from 'lucide-react';
import { GastronomicConcierge } from '@/components/ai/GastronomicConcierge';
import { BeachCanvas } from '@/components/visuals/BeachCanvas';

export default function Home() {
  const images = PlaceHolderImages;
  
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section con Canvas Interactivo */}
      <section className="relative h-[95vh] flex items-center justify-center overflow-hidden bg-[#F4EEE8]">
        <BeachCanvas />
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />
        
        <div className="relative z-10 text-center px-4 max-w-5xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full bg-white/30 backdrop-blur-md border border-white/20 text-primary text-sm font-medium tracking-[0.2em] uppercase">
            <Sparkles size={14} />
            Elegancia Costera en Ciénaga
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-bold font-headline mb-6 tracking-tighter leading-none text-foreground">
            CASA ORIGEN
          </h1>
          
          <p className="text-2xl md:text-4xl font-light mb-12 italic text-primary/80 tracking-tight font-headline">
            "Donde el Mar y la Tradición se Encuentran"
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-12 py-8 text-xl rounded-full shadow-2xl shadow-primary/20 transition-all hover:scale-105">
              <Link href="/reservations">Reservar Experiencia</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-foreground hover:bg-white/40 backdrop-blur-sm px-10 py-8 text-xl rounded-full border border-transparent hover:border-primary/20 transition-all">
              <Link href="/menu" className="flex items-center gap-2">Explorar Menú <ArrowRight size={20} /></Link>
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-primary/40">
          <span className="text-[10px] uppercase tracking-[0.5em] font-bold">Desliza</span>
          <Waves className="animate-bounce w-6 h-6" />
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-secondary rounded-[2.5rem] rotate-2 group-hover:rotate-0 transition-transform duration-700 -z-10 opacity-50" />
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
                <Image
                  src={images.find(i => i.id === 'tomasita-monument')?.imageUrl || ''}
                  alt="Tomasita Monument"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-[2s]"
                  data-ai-hint="monument alligator"
                />
              </div>
            </div>
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-accent">
                  <div className="h-px w-12 bg-accent" />
                  <span className="uppercase tracking-[0.4em] font-bold text-xs">Nuestra Esencia</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-bold font-headline leading-[1.1] text-foreground">
                  La Tradición Vive en Cada Rincón
                </h2>
              </div>
              <div className="space-y-6 text-lg text-foreground/70 leading-relaxed font-light">
                <p>
                  Inspirados por la Leyenda del Caimán Cienaguero, Casa Origen rinde homenaje a las raíces culturales de nuestra tierra y su conexión histórica con el mar.
                </p>
                <p>
                  Creemos en el poder de los ingredientes locales y la sabiduría de las tradiciones costeras. Cada plato es un tributo a los pescadores y agricultores del Magdalena.
                </p>
              </div>
              <Button asChild variant="link" className="text-primary p-0 text-xl hover:no-underline flex items-center gap-3 group">
                <Link href="/our-story" className="flex items-center gap-2">
                  Nuestra Historia 
                  <span className="bg-primary/10 p-2 rounded-full group-hover:bg-primary group-hover:text-white transition-all">
                    <ArrowRight size={20} />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* AI Concierge Section */}
      <section className="py-32 bg-secondary/10 relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/sandpaper.png')] opacity-10 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-none px-4 py-1">Inteligencia Gastronómica</Badge>
              <h2 className="text-5xl font-bold font-headline">Tu Maridaje Personalizado</h2>
              <p className="text-xl text-foreground/60 font-light max-w-2xl mx-auto italic">
                "Permite que nuestro Concierge IA diseñe el festín caribeño perfecto según tu paladar único."
              </p>
            </div>
            <GastronomicConcierge />
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-24 space-y-4">
             <h2 className="text-5xl md:text-6xl font-bold font-headline">La Experiencia Casa Origen</h2>
             <div className="h-1 w-24 bg-primary mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: 'Gastronomía', 
                desc: 'Mariscos frescos traídos diariamente desde la ciénaga y el mar abierto.', 
                icon: Utensils,
                image: images.find(i => i.id === 'seafood-dish')?.imageUrl
              },
              { 
                title: 'Mixología', 
                desc: 'Bebidas de autor inspiradas en frutas tropicales y destilados locales.', 
                icon: Sparkles,
                image: images.find(i => i.id === 'cocktail')?.imageUrl
              },
              { 
                title: 'Celebraciones', 
                desc: 'Un entorno idílico para momentos inolvidables frente al mar.', 
                icon: PartyPopper,
                image: images.find(i => i.id === 'sunset')?.imageUrl
              }
            ].map((exp, idx) => (
              <div key={idx} className="group flex flex-col items-center text-center space-y-8 p-4">
                <div className="relative w-full aspect-[4/5] rounded-[3rem] overflow-hidden shadow-xl transition-all duration-700 group-hover:-translate-y-4">
                  <Image src={exp.image || ''} alt={exp.title} fill className="object-cover group-hover:scale-110 transition-transform duration-[2s]" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-8 left-0 right-0 px-8">
                     <div className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white/20">
                        <h3 className="text-2xl font-bold font-headline mb-2">{exp.title}</h3>
                        <p className="text-sm text-foreground/70 leading-relaxed">{exp.desc}</p>
                     </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Final */}
      <section className="relative py-40 bg-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-5xl md:text-8xl font-bold font-headline mb-10 tracking-tight">
            ¿Listo para lo Inolvidable?
          </h2>
          <p className="text-xl md:text-2xl mb-16 max-w-3xl mx-auto opacity-70 font-light italic leading-relaxed">
            "Reserva tu mesa hoy y deja que la brisa de Ciénaga te transporte a un mundo de sabores caribeños exquisitos."
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-16 py-10 text-2xl rounded-full shadow-[0_20px_50px_rgba(183,157,132,0.3)] transition-all hover:scale-105">
              <Link href="/reservations">Reservar Ahora</Link>
            </Button>
            <Link href="/contact" className="text-white/60 hover:text-white transition-colors text-lg border-b border-white/20 pb-1">
              Ver Ubicación
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
