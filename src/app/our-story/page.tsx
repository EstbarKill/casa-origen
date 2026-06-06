
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Heart, Landmark, Waves, Anchor } from 'lucide-react';

export default function OurStory() {
  const images = PlaceHolderImages;

  const timeline = [
    { year: '2015', title: 'The Vision', desc: 'Inspired by the vibrant culture of the Ciénaga Caiman, our founders dreamed of a place where tradition met coastal elegance.' },
    { year: '2018', title: 'Breaking Ground', desc: 'Construction began on the shores of Ciénaga, using sustainable materials and local craftsmanship.' },
    { year: '2020', title: 'Opening Doors', desc: 'Casa Origen opened its doors to the community, becoming a beacon of Caribbean gastronomy.' },
    { year: 'Present', title: 'Continuing Legacy', desc: 'Today, we are proud to be the heart of Ciénaga dining, welcoming guests from around the globe.' }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center">
        <Image 
          src={images.find(i => i.id === 'restaurant-interior')?.imageUrl || ''} 
          alt="History" 
          fill 
          className="object-cover brightness-50" 
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-6xl md:text-8xl font-bold font-headline mb-4">Our Story</h1>
          <p className="text-2xl font-light italic">Born from the Sea, Rooted in Tradition</p>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-12">
          <div className="flex justify-center text-primary">
            <Anchor size={48} />
          </div>
          <h2 className="text-4xl font-bold font-headline leading-tight">
            A Gastronomic Sanctuary on the Magdalena Shores
          </h2>
          <div className="space-y-6 text-xl text-foreground/70 leading-relaxed text-justify">
            <p>
              In the heart of Ciénaga, where the Magdalena River meets the Caribbean Sea, lies Casa Origen. Our story is one of heritage, resilience, and a deep-seated love for the culinary treasures of our region.
            </p>
            <p>
              Ciénaga is more than a location; it is an inspiration. The Legend of the Caiman, the rhythmic movement of the palm trees, and the warm smiles of our local fishermen are the ingredients that season every dish we serve.
            </p>
            <p>
              Our architecture blends Mediterranean sophistication with the rustic charm of the Colombian Caribbean, creating an atmosphere that feels both world-class and intimately familiar.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold font-headline text-center mb-16">The Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {timeline.map((item, idx) => (
              <div key={idx} className="relative p-8 bg-white rounded-3xl shadow-sm border border-primary/10">
                <span className="text-5xl font-bold font-headline text-primary/20 absolute top-4 right-4">{item.year}</span>
                <div className="relative z-10 space-y-4">
                  <h3 className="text-2xl font-bold font-headline">{item.title}</h3>
                  <p className="text-foreground/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
             <div className="relative aspect-square rounded-full overflow-hidden border-8 border-secondary">
                <Image 
                  src={images.find(i => i.id === 'sunset')?.imageUrl || ''} 
                  alt="Value Image" 
                  fill 
                  className="object-cover" 
                />
             </div>
             <div className="space-y-12">
                <div className="flex gap-6">
                  <div className="bg-primary/10 p-4 rounded-2xl text-primary shrink-0 h-fit">
                    <Heart size={24} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-headline">Craftsmanship</h3>
                    <p className="text-foreground/70">We believe in the artisanal approach—everything from our sauces to our cocktails is handcrafted daily.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="bg-accent/10 p-4 rounded-2xl text-accent shrink-0 h-fit">
                    <Landmark size={24} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-headline">Community</h3>
                    <p className="text-foreground/70">Supporting local farmers and sustainable fishing practices is at the core of our operations.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="bg-secondary/20 p-4 rounded-2xl text-foreground shrink-0 h-fit">
                    <Waves size={24} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold font-headline">Excellence</h3>
                    <p className="text-foreground/70">Providing a world-class dining experience while maintaining the authenticity of our Caribbean roots.</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
