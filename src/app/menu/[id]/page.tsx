
"use client";

import { use, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MENU_ITEMS, MenuItem } from '@/lib/menu-data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, ArrowLeft, Star, Info, ChefHat, MapPin, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function DishDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const dishId = parseInt(id);
  const dish = MENU_ITEMS.find(item => item.id === dishId);
  const { toast } = useToast();

  // Mouse move for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (!dish) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Plato no encontrado</h1>
        <Button asChild>
          <Link href="/menu">Volver al Menú</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/10 pb-20">
      <div className="container mx-auto px-4 pt-10">
        <Button asChild variant="ghost" className="mb-8 hover:text-primary transition-colors group">
          <Link href="/menu" className="flex items-center gap-2">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Volver al Menú
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* 3D Interactive Image Section */}
          <div className="relative group perspective-1000">
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative aspect-square w-full max-w-[600px] mx-auto rounded-[3rem] overflow-hidden shadow-2xl bg-white border-8 border-white cursor-pointer"
            >
              <div 
                className="absolute inset-0 z-10 bg-gradient-to-tr from-black/20 via-transparent to-white/10" 
                style={{ transform: "translateZ(20px)" }}
              />
              <Image
                src={dish.image}
                alt={dish.name}
                fill
                className="object-cover transition-transform duration-500"
                style={{ transform: "translateZ(0px)" }}
                priority
              />
              
              {/* Floating Badge in 3D */}
              <motion.div 
                className="absolute top-10 right-10 z-20"
                style={{ transform: "translateZ(60px)" }}
              >
                <Badge className="bg-primary/90 backdrop-blur-md text-white border-none px-6 py-2 text-xl shadow-xl">
                  ${dish.price.toLocaleString()}
                </Badge>
              </motion.div>

              {/* Decorative elements */}
              <div 
                className="absolute bottom-10 left-10 z-20 text-white"
                style={{ transform: "translateZ(40px)" }}
              >
                <div className="flex gap-1 mb-2">
                   {Array.from({ length: dish.rating }).map((_, i) => (
                     <Star key={i} size={16} fill="currentColor" className="text-yellow-400" />
                   ))}
                </div>
              </div>
            </motion.div>
            
            {/* Interactive hint */}
            <div className="mt-6 text-center text-foreground/40 text-sm flex items-center justify-center gap-2">
              <Sparkles size={14} />
              Mueve el mouse sobre la imagen para explorar en 3D
            </div>
          </div>

          {/* Dish Details Section */}
          <div className="space-y-10">
            <div className="space-y-4">
              <Badge variant="secondary" className="uppercase tracking-[0.2em] font-bold text-[10px] px-3 py-1">
                {dish.category}
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold font-headline leading-none">{dish.name}</h1>
              <p className="text-xl text-foreground/70 font-light leading-relaxed italic">
                "{dish.description}"
              </p>
            </div>

            <div className="prose prose-stone max-w-none">
              <h3 className="text-2xl font-bold font-headline flex items-center gap-2">
                <Info size={22} className="text-primary" />
                Historia de Origen
              </h3>
              <p className="text-foreground/80 leading-relaxed text-lg">
                {dish.longDescription}
              </p>
            </div>

            <div className="bg-secondary/30 p-8 rounded-[2rem] border border-primary/10 relative overflow-hidden">
               <ChefHat size={80} className="absolute -bottom-4 -right-4 text-primary/5 opacity-10 rotate-12" />
               <h3 className="text-xl font-bold font-headline flex items-center gap-2 mb-4">
                 <ChefHat size={20} className="text-primary" />
                 Nota del Chef
               </h3>
               <p className="text-foreground/70 italic relative z-10">
                 "{dish.chefNote}"
               </p>
            </div>

            {/* Interactive Anatomy Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-headline flex items-center gap-2">
                <Sparkles size={22} className="text-accent" />
                Anatomía del Plato
              </h3>
              <div className="grid grid-cols-1 gap-4">
                {dish.ingredients.map((ing, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ x: 10 }}
                    className="p-5 bg-white rounded-2xl border border-muted shadow-sm hover:border-primary/30 transition-all flex items-start gap-4"
                  >
                    <div className="bg-primary/10 p-3 rounded-xl text-primary">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{ing.name}</h4>
                      <p className="text-sm text-foreground/60 mb-1">{ing.description}</p>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-accent">Origen: {ing.origin}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <Button 
              size="lg"
              onClick={() => {
                toast({
                  title: 'Añadido a la orden',
                  description: `${dish.name} se ha sumado a tu pedido.`,
                });
              }}
              className="w-full h-16 text-xl bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]"
            >
              <ShoppingCart size={22} className="mr-3" /> Añadir al Pedido - ${dish.price.toLocaleString()}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
