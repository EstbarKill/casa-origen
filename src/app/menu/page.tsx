
"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, Plus, Minus, Send, 
  Clock, ChefHat, BookOpen
} from 'lucide-react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle 
} from '@/components/ui/dialog';
import { 
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger 
} from '@/components/ui/sheet';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { MENU_ITEMS, type MenuItem } from '@/lib/menu-data';

const CATEGORIES = ['All', 'Seafood', 'Grill', 'Cocktails', 'Drinks', 'Desserts'];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const { toast } = useToast();

  const filteredItems = useMemo(() => 
    activeCategory === 'All' 
      ? MENU_ITEMS 
      : MENU_ITEMS.filter(i => i.category === activeCategory)
  , [activeCategory]);

  const addToCart = (item: MenuItem, qty: number = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + qty } : i);
      }
      return [...prev, { item, quantity: qty }];
    });
    toast({
      title: 'Añadido al pedido',
      description: `${item.name} se ha sumado a tu mesa.`,
    });
  };

  const updateQuantity = (itemId: number, delta: number) => {
    setCart(prev => prev.map(i => {
      if (i.item.id === itemId) {
        const newQty = Math.max(0, i.quantity + delta);
        return { ...i, quantity: newQty };
      }
      return i;
    }).filter(i => i.quantity > 0));
  };

  const total = cart.reduce((sum, entry) => sum + (entry.item.price * entry.quantity), 0);

  const sendWhatsAppOrder = () => {
    const message = `¡Hola Casa Origen! 🦎\nQuisiera realizar el siguiente pedido:\n\n` +
      cart.map(i => `• ${i.item.name} (x${i.quantity})`).join('\n') +
      `\n\n💰 Total: $${total.toLocaleString()}\n\n¡Muchas gracias! 🌊`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/573000000000?text=${encoded}`, '_blank');
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Hero Section */}
      <section className="relative py-32 bg-secondary/10 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <Badge className="bg-primary/20 text-primary border-none px-6 py-2 text-xs uppercase tracking-widest font-black">Gastronomía de Autor</Badge>
            <h1 className="text-6xl md:text-9xl font-bold font-headline tracking-tighter text-foreground">Sabores del Magdalena</h1>
            <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto italic font-light">
              "Una travesía culinaria donde cada ingrediente rinde tributo a nuestra tierra y nuestro mar."
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-12 relative z-20">
        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-8 gap-3 no-scrollbar justify-center">
          <div className="flex bg-card/90 backdrop-blur-2xl p-3 rounded-full border border-primary/10 shadow-2xl">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-10 py-4 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-500 whitespace-nowrap",
                  activeCategory === cat 
                    ? "bg-primary text-white shadow-xl scale-105" 
                    : "text-foreground/40 hover:text-primary hover:bg-primary/5"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Modern Carousel Menu */}
        <div className="mt-20">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full max-w-7xl mx-auto"
          >
            <CarouselContent className="-ml-6">
              {filteredItems.map(item => (
                <CarouselItem key={item.id} className="pl-6 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ y: -15 }}
                    onClick={() => setSelectedItem(item)}
                    className="group cursor-pointer h-full"
                  >
                    <div className="bg-card text-card-foreground rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 border border-primary/10 h-full flex flex-col">
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent flex items-end justify-center pb-10 opacity-0 group-hover:opacity-100 transition-all duration-500">
                           <span className="text-white text-[10px] font-black uppercase tracking-[0.3em] bg-primary/60 backdrop-blur-md px-8 py-3 rounded-full border border-white/20 shadow-2xl">
                              Descubrir Relato
                           </span>
                        </div>
                        <Badge className="absolute top-8 right-8 bg-card/95 text-primary border-none shadow-2xl px-6 py-3 font-black text-xl rounded-[1.5rem]">
                          ${item.price.toLocaleString()}
                        </Badge>
                      </div>
                      <div className="p-10 space-y-4 flex-1 flex flex-col justify-between">
                        <div className="space-y-4">
                          <h3 className="text-3xl font-bold font-headline leading-tight text-foreground group-hover:text-primary transition-colors">{item.name}</h3>
                          <p className="text-base text-foreground/50 line-clamp-2 italic">"{item.description}"</p>
                        </div>
                        <div className="pt-8 border-t border-primary/10">
                          <Button 
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(item);
                            }}
                            className="w-full bg-secondary/50 hover:bg-primary hover:text-white text-primary rounded-[2rem] transition-all h-14 font-black text-[10px] uppercase tracking-widest shadow-inner border border-primary/10"
                          >
                            <Plus size={18} className="mr-2" /> Añadir a la Mesa
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:flex justify-center gap-6 mt-16">
              <CarouselPrevious className="relative h-16 w-16 bg-card border-primary/20 text-primary hover:bg-primary hover:text-white transition-all shadow-xl rounded-full" />
              <CarouselNext className="relative h-16 w-16 bg-card border-primary/20 text-primary hover:bg-primary hover:text-white transition-all shadow-xl rounded-full" />
            </div>
          </Carousel>
        </div>
      </div>

      {/* Dish Experience Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden border-none rounded-[4rem] bg-card text-card-foreground">
          {selectedItem && (
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-[500px] lg:h-full">
                <Image src={selectedItem.image} alt={selectedItem.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-12 lg:p-20 space-y-10 max-h-[90vh] overflow-y-auto">
                <div className="space-y-6">
                  <div className="flex gap-2">
                    {selectedItem.tags.map(tag => (
                      <Badge key={tag} className="bg-primary/10 text-primary border-none px-4 py-1.5 text-[10px] uppercase font-black tracking-widest rounded-full">{tag}</Badge>
                    ))}
                  </div>
                  <DialogHeader>
                    <DialogTitle className="text-6xl font-bold font-headline tracking-tighter text-foreground leading-none">{selectedItem.name}</DialogTitle>
                  </DialogHeader>
                </div>

                <div className="space-y-4 p-8 bg-secondary/20 rounded-[2.5rem] border border-primary/10 shadow-inner text-foreground">
                  <h4 className="font-black flex items-center gap-3 text-primary uppercase text-[10px] tracking-[0.3em]">
                    <BookOpen size={18} /> Relato Cultural
                  </h4>
                  <p className="leading-relaxed italic text-xl font-light">"{selectedItem.culturalStory}"</p>
                </div>

                <div className="grid grid-cols-2 gap-12 text-foreground">
                  <div className="space-y-6">
                    <h4 className="font-black text-primary uppercase text-[10px] tracking-[0.3em] border-b border-primary/10 pb-2">Ingredientes</h4>
                    <ul className="text-base text-foreground/70 space-y-2 font-light">
                      {selectedItem.ingredients.map(ing => <li key={ing} className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-primary/40 rounded-full" /> {ing}</li>)}
                    </ul>
                  </div>
                  <div className="space-y-6">
                     <h4 className="font-black text-primary uppercase text-[10px] tracking-[0.3em] border-b border-primary/10 pb-2">Detalles</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 text-base text-foreground/70"><ChefHat size={20} className="text-primary" /> {selectedItem.preparation}</div>
                      <div className="flex items-center gap-3 text-base text-foreground/70"><Clock size={20} className="text-primary" /> {selectedItem.prepTime}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-primary/10 flex flex-col sm:flex-row items-center justify-between gap-10">
                  <div className="text-5xl font-bold font-headline text-primary">${selectedItem.price.toLocaleString()}</div>
                  <Button onClick={() => { addToCart(selectedItem); setSelectedItem(null); }} className="w-full sm:w-auto h-20 px-12 rounded-[2rem] bg-primary text-white text-xl font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
                    Añadir al banquete
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Floating Cart System */}
      <Sheet>
        <SheetTrigger asChild>
          {cart.length > 0 && (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-12 right-12 z-50">
              <Button className="h-24 w-24 rounded-full bg-primary text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-4 border-card hover:scale-110 transition-all group">
                <ShoppingCart size={40} className="group-hover:rotate-12 transition-transform" />
                <span className="absolute -top-4 -right-4 bg-accent text-white w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shadow-2xl ring-4 ring-card animate-bounce">
                  {cart.reduce((s, e) => s + e.quantity, 0)}
                </span>
              </Button>
            </motion.div>
          )}
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-lg bg-card text-card-foreground border-l border-primary/10 shadow-2xl p-0 rounded-l-[4rem]">
          <div className="flex flex-col h-full">
            <SheetHeader className="p-12 border-b border-primary/10 bg-background/50 backdrop-blur-xl">
              <SheetTitle className="text-5xl font-bold font-headline tracking-tighter text-foreground">Tu Banquete</SheetTitle>
              <p className="text-foreground/50 italic text-lg font-light">Selección lista para ser degustada bajo la brisa.</p>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-12 space-y-12">
              {cart.map(entry => (
                <div key={entry.item.id} className="flex gap-8 items-center group">
                  <div className="relative w-28 h-28 rounded-[2rem] overflow-hidden shadow-xl shrink-0 border border-primary/10">
                    <Image src={entry.item.image} alt={entry.item.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 min-w-0 space-y-2">
                    <h4 className="font-bold text-2xl truncate font-headline text-foreground">{entry.item.name}</h4>
                    <p className="text-primary font-black text-lg">${(entry.item.price * entry.quantity).toLocaleString()}</p>
                    <div className="flex items-center bg-secondary/30 rounded-2xl p-1.5 px-3 border border-primary/10 w-fit mt-4">
                      <button onClick={() => updateQuantity(entry.item.id, -1)} className="p-2 text-foreground/40 hover:text-primary transition-colors"><Minus size={16} /></button>
                      <span className="font-black w-10 text-center text-base text-foreground">{entry.quantity}</span>
                      <button onClick={() => updateQuantity(entry.item.id, 1)} className="p-2 text-foreground/40 hover:text-primary transition-colors"><Plus size={16} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-12 bg-background/80 backdrop-blur-2xl border-t border-primary/10 space-y-10 shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
              <div className="flex justify-between items-end">
                <span className="text-foreground/40 font-black uppercase text-[10px] tracking-[0.4em]">Total a Pagar</span>
                <span className="text-5xl font-bold font-headline text-primary">${total.toLocaleString()}</span>
              </div>
              <Button onClick={sendWhatsAppOrder} className="w-full h-20 text-xl font-black uppercase tracking-widest bg-[#25D366] hover:bg-[#128C7E] text-white rounded-[2rem] shadow-2xl transition-all border-none">
                <Send size={24} className="mr-4" /> Enviar a WhatsApp
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
