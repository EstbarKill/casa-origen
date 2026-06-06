
"use client";

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, Star, Plus, Minus, Send, X, 
  Info, Clock, Utensils, GlassWater, Heart, Sparkles, ChefHat, BookOpen
} from 'lucide-react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription 
} from '@/components/ui/dialog';
import { 
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose 
} from '@/components/ui/sheet';
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
      <section className="relative py-24 bg-secondary/20 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <Badge className="bg-primary/10 text-primary border-none px-6 py-2 text-xs uppercase tracking-widest font-bold">Experiencia Gastronómica</Badge>
            <h1 className="text-6xl md:text-8xl font-bold font-headline tracking-tighter">Sabores con Historia</h1>
            <p className="text-xl text-foreground/60 max-w-2xl mx-auto italic">
              "Cada bocado es un relato de nuestra tierra y nuestro mar."
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-8 relative z-20">
        {/* Category Filter */}
        <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar justify-center">
          <div className="flex bg-white/80 backdrop-blur-xl p-2 rounded-full border shadow-lg">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-8 py-3 rounded-full text-sm font-bold transition-all duration-500 whitespace-nowrap",
                  activeCategory === cat 
                    ? "bg-primary text-white shadow-xl" 
                    : "text-foreground/50 hover:text-primary hover:bg-primary/5"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-16">
          <AnimatePresence mode="popLayout">
            {filteredItems.map(item => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -12 }}
                onClick={() => setSelectedItem(item)}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-muted">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent flex items-end justify-center pb-8 opacity-0 group-hover:opacity-100 transition-opacity">
                       <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] bg-primary/40 backdrop-blur px-6 py-2 rounded-full border border-white/20">
                          Leer su Historia
                       </span>
                    </div>
                    <Badge className="absolute top-6 right-6 bg-white/95 text-primary border-none shadow-xl px-5 py-2 font-bold text-lg rounded-2xl">
                      ${item.price.toLocaleString()}
                    </Badge>
                  </div>
                  <div className="p-8 space-y-4">
                    <h3 className="text-2xl font-bold font-headline leading-tight group-hover:text-primary transition-colors">{item.name}</h3>
                    <p className="text-sm text-foreground/50 line-clamp-2 italic">"{item.description}"</p>
                    <div className="flex gap-3 pt-6 border-t border-muted">
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(item);
                        }}
                        className="w-full bg-secondary/30 hover:bg-primary hover:text-white text-primary rounded-2xl transition-all h-12 font-bold"
                      >
                        <Plus size={18} className="mr-2" /> Añadir a la Mesa
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Dish Experience Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden border-none rounded-[3rem] bg-background">
          {selectedItem && (
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative h-[400px] md:h-full">
                <Image src={selectedItem.image} alt={selectedItem.name} fill className="object-cover" />
              </div>
              <div className="p-12 space-y-8 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <div className="flex gap-2 mb-4">
                    {selectedItem.tags.map(tag => (
                      <Badge key={tag} className="bg-primary/10 text-primary border-none px-3 py-1 text-[9px] uppercase font-bold">{tag}</Badge>
                    ))}
                  </div>
                  <DialogTitle className="text-5xl font-bold font-headline tracking-tighter">{selectedItem.name}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4 p-6 bg-secondary/20 rounded-3xl border border-primary/10">
                  <h4 className="font-bold flex items-center gap-2 text-primary uppercase text-xs tracking-widest">
                    <BookOpen size={16} /> Relato Cultural
                  </h4>
                  <p className="text-foreground/70 leading-relaxed italic text-lg">"{selectedItem.culturalStory}"</p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-primary uppercase text-[10px] tracking-widest">Ingredientes</h4>
                    <ul className="text-sm text-foreground/60 space-y-1">
                      {selectedItem.ingredients.map(ing => <li key={ing}>• {ing}</li>)}
                    </ul>
                  </div>
                  <div className="space-y-4">
                     <h4 className="font-bold text-primary uppercase text-[10px] tracking-widest">Detalles</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-foreground/60"><ChefHat size={16} /> {selectedItem.preparation}</div>
                      <div className="flex items-center gap-2 text-sm text-foreground/60"><Clock size={16} /> {selectedItem.prepTime}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-8 border-t flex items-center justify-between gap-6">
                  <div className="text-3xl font-bold font-headline text-primary">${selectedItem.price.toLocaleString()}</div>
                  <Button onClick={() => { addToCart(selectedItem); setSelectedItem(null); }} className="flex-1 h-14 rounded-2xl bg-primary text-white text-lg font-bold shadow-xl">
                    Añadir al pedido
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
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="fixed bottom-10 right-10 z-50">
              <Button className="h-20 w-20 rounded-full bg-primary text-white shadow-2xl border-4 border-white hover:scale-110 transition-transform">
                <ShoppingCart size={32} />
                <span className="absolute -top-3 -right-3 bg-accent text-white w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shadow-lg ring-4 ring-background">
                  {cart.reduce((s, e) => s + e.quantity, 0)}
                </span>
              </Button>
            </motion.div>
          )}
        </SheetTrigger>
        <SheetContent className="w-full sm:max-w-md bg-background border-l shadow-2xl p-0">
          <div className="flex flex-col h-full">
            <SheetHeader className="p-10 border-b bg-white">
              <SheetTitle className="text-4xl font-bold font-headline tracking-tighter">Tu Banquete</SheetTitle>
              <p className="text-foreground/50 italic">Selección lista para ser degustada.</p>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-10 space-y-10">
              {cart.map(entry => (
                <div key={entry.item.id} className="flex gap-6 items-center">
                  <div className="relative w-24 h-24 rounded-3xl overflow-hidden shadow-sm shrink-0 border">
                    <Image src={entry.item.image} alt={entry.item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xl truncate font-headline">{entry.item.name}</h4>
                    <p className="text-primary font-bold">${(entry.item.price * entry.quantity).toLocaleString()}</p>
                    <div className="flex items-center bg-secondary/40 rounded-xl p-1 px-2 border w-fit mt-3">
                      <button onClick={() => updateQuantity(entry.item.id, -1)} className="p-1 text-foreground/40"><Minus size={14} /></button>
                      <span className="font-bold w-8 text-center text-sm">{entry.quantity}</span>
                      <button onClick={() => updateQuantity(entry.item.id, 1)} className="p-1 text-foreground/40"><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-10 bg-white border-t space-y-8">
              <div className="flex justify-between items-end">
                <span className="text-foreground/40 font-bold uppercase text-[10px] tracking-[0.3em]">Total</span>
                <span className="text-4xl font-bold font-headline text-primary">${total.toLocaleString()}</span>
              </div>
              <Button onClick={sendWhatsAppOrder} className="w-full h-16 text-xl bg-[#25D366] hover:bg-[#128C7E] text-white rounded-2xl shadow-xl">
                <Send size={20} className="mr-3" /> Pedir por WhatsApp
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
