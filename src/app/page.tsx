
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Waves, Heart, PartyPopper, Utensils, Sparkles } from 'lucide-react';
import { GastronomicConcierge } from '@/components/ai/GastronomicConcierge';

export default function Home() {
  const images = PlaceHolderImages;
  
  return (
    <div className="flex flex-col overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <Image
          src={images.find(i => i.id === 'hero-beach')?.imageUrl || ''}
          alt="Ciénaga Beach"
          fill
          className="object-cover brightness-[0.7]"
          priority
          data-ai-hint="beach ocean"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
        <div className="relative z-10 text-center text-white px-4 max-w-4xl animate-in fade-in zoom-in duration-1000">
          <h1 className="text-5xl md:text-8xl font-bold font-headline mb-4 tracking-tight">CASA ORIGEN</h1>
          <p className="text-xl md:text-3xl font-light mb-8 italic text-secondary tracking-wide">
            "Flavors Born from the Caribbean"
          </p>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto opacity-90 font-light">
            An elegant restaurant - bar by the sea in Ciénaga, Magdalena. Experience the soul of the Colombian Caribbean.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-10 py-7 text-lg rounded-full">
              <Link href="/reservations">Reserve a Table</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white text-white hover:bg-white/20 px-10 py-7 text-lg rounded-full">
              <Link href="/menu">View Menu</Link>
            </Button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <Waves className="text-white/50 w-8 h-8" />
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={images.find(i => i.id === 'tomasita-monument')?.imageUrl || ''}
                alt="Tomasita Monument"
                fill
                className="object-cover"
                data-ai-hint="monument alligator"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl" />
            </div>
            <div className="space-y-8">
              <div className="flex items-center gap-2 text-accent">
                <Sparkles size={20} />
                <span className="uppercase tracking-[0.3em] font-medium text-sm">Our Roots</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-headline leading-tight">
                Tradition Lives in Every Corner
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Inspired by the Alligator Festival (Leyenda de la Caiman), Casa Origen pays homage to the cultural roots of Ciénaga and its historical connection to the sea.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                We believe in the power of local ingredients and the wisdom of coastal traditions. Every dish is a tribute to the fishermen and farmers of Magdalena.
              </p>
              <Button asChild variant="link" className="text-primary p-0 text-lg hover:no-underline flex items-center gap-2 group">
                <Link href="/our-story">Discover our story <span className="group-hover:translate-x-1 transition-transform">→</span></Link>
              </Button>
            </div>
          </div>
        </div>
        {/* Abstract pattern decoration */}
        <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none">
          <Utensils size={400} />
        </div>
      </section>

      {/* AI Concierge Component */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold font-headline mb-4">Your Personalized Pairing</h2>
              <p className="text-foreground/70">Let our AI Concierge suggest the perfect Caribbean feast for you based on your unique palate.</p>
            </div>
            <GastronomicConcierge />
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold font-headline mb-16">The Casa Origen Experience</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                title: 'Gastronomy', 
                desc: 'Fresh seafood sourced daily from the Ciénaga lagoon and the open Caribbean sea.', 
                icon: Utensils,
                image: images.find(i => i.id === 'seafood-dish')?.imageUrl
              },
              { 
                title: 'Mixology', 
                desc: 'Craft drinks inspired by tropical fruits and local spirits for a refreshing coastal vibe.', 
                icon: Sparkles,
                image: images.find(i => i.id === 'cocktail')?.imageUrl
              },
              { 
                title: 'Celebrations', 
                desc: 'An idyllic setting for birthdays, anniversaries, and unforgettable beach weddings.', 
                icon: PartyPopper,
                image: images.find(i => i.id === 'sunset')?.imageUrl
              }
            ].map((exp, idx) => (
              <div key={idx} className="group flex flex-col items-center p-8 rounded-3xl bg-secondary/30 hover:bg-white hover:shadow-xl transition-all duration-500">
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-8">
                  <Image src={exp.image || ''} alt={exp.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="bg-primary/10 p-4 rounded-full mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <exp.icon size={24} />
                </div>
                <h3 className="text-2xl font-bold font-headline mb-4">{exp.title}</h3>
                <p className="text-foreground/70">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-32 bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/sandpaper.png')]" />
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <h2 className="text-4xl md:text-6xl font-bold font-headline mb-8">Ready for a Unique Experience?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto opacity-90">
            Book your table today and let the breeze of Ciénaga carry you into a world of exquisite Caribbean flavors.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-secondary px-12 py-8 text-xl rounded-full">
              <Link href="/reservations">Book Now</Link>
            </Button>
            <Link href="/contact" className="text-white hover:underline text-lg underline-offset-8">
              Find our location
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
