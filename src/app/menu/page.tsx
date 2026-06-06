
"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, Plus, Minus, Send, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { MENU_ITEMS } from '@/lib/menu-data';

const CATEGORIES = ['All', 'Appetizers', 'Seafood', 'Grilled Meats', 'Desserts', 'Cocktails', 'Drinks'];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState<{ item: any; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  const filteredItems = activeCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(i => i.category === activeCategory);

  const addToCart = (e: React.MouseEvent, item: any) => {
    e.preventDefault();
    e.stopPropagation();
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1 }];
    });
    toast({
      title: 'Añadido al pedido',
      description: `${item.name} ha sido agregado a tu carrito.`,
    });
  };

  const removeFromCart = (itemId: number) => {
    setCart(prev => prev.filter(i => i.item.id !== itemId));
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
    const message = `¡Hola Casa Origen! Quisiera realizar el siguiente pedido:\n\n` +
      cart.map(i => `- ${i.item.name} x${i.quantity}`).join('\n') +
      `\n\nTotal: $${total.toLocaleString()}\n\n¡Muchas gracias!`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/573000000000?text=${encoded}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-12 pb-32">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold font-headline mb-4">Nuestro Menú Gastronómico</h1>
        <p className="text-foreground/70 max-w-2xl mx-auto">Descubre los sabores auténticos del Caribe. Preparados con pasión y tradición.</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-6 py-2 rounded-full border transition-all duration-300",
              activeCategory === cat 
                ? "bg-primary text-white border-primary shadow-lg" 
                : "bg-white text-foreground/70 border-muted hover:border-primary"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredItems.map(item => (
          <Link 
            key={item.id} 
            href={`/menu/${item.id}`}
            className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border group relative block"
          >
            <div className="relative aspect-square">
              <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
              <Badge className="absolute top-6 right-6 bg-white/90 backdrop-blur text-primary border-none shadow-sm px-4 py-1 font-bold">
                ${item.price.toLocaleString()}
              </Badge>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <div className="bg-white p-4 rounded-full shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <ArrowRight size={24} className="text-primary" />
                 </div>
              </div>
            </div>
            <div className="p-8 space-y-4">
              <div className="flex justify-between items-start">
                <h3 className="text-2xl font-bold font-headline leading-tight">{item.name}</h3>
                <div className="flex items-center text-yellow-500 text-[10px] bg-yellow-50 px-2 py-1 rounded-full">
                  <Star size={10} fill="currentColor" className="mr-1" />
                  {item.rating}.0
                </div>
              </div>
              <p className="text-sm text-foreground/60 line-clamp-2 italic">"{item.description}"</p>
              
              <div className="flex gap-2 mt-4 pt-4 border-t border-muted">
                <Button 
                  onClick={(e) => addToCart(e, item)}
                  className="flex-1 bg-secondary/50 hover:bg-primary hover:text-white text-primary rounded-xl transition-colors h-11"
                >
                  <Plus size={18} className="mr-2" /> Añadir
                </Button>
                <Button 
                  variant="outline"
                  className="rounded-xl h-11 border-muted hover:border-primary px-3"
                  asChild
                >
                  <Link href={`/menu/${item.id}`}>
                    <Info size={18} />
                  </Link>
                </Button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-8 right-8 z-40">
          <Button 
            onClick={() => setIsCartOpen(true)}
            className="h-16 w-16 rounded-full bg-primary text-white shadow-2xl hover:bg-primary/90 relative group"
          >
            <ShoppingCart size={28} />
            <span className="absolute -top-2 -right-2 bg-accent text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-background animate-pulse">
              {cart.reduce((s, e) => s + e.quantity, 0)}
            </span>
          </Button>
        </div>
      )}

      {/* Cart Sidebar / Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-background h-full shadow-2xl p-8 flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold font-headline">Tu Orden</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-muted rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              {cart.map(entry => (
                <div key={entry.item.id} className="flex gap-4 items-center">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                    <Image src={entry.item.image} alt={entry.item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold truncate">{entry.item.name}</h4>
                    <p className="text-primary text-sm font-bold">${(entry.item.price * entry.quantity).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-secondary/50 rounded-xl p-1">
                    <button onClick={() => updateQuantity(entry.item.id, -1)} className="p-2 hover:text-primary transition-colors"><Minus size={16} /></button>
                    <span className="font-bold w-4 text-center">{entry.quantity}</span>
                    <button onClick={() => updateQuantity(entry.item.id, 1)} className="p-2 hover:text-primary transition-colors"><Plus size={16} /></button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t space-y-6">
              <div className="flex justify-between text-2xl font-bold font-headline">
                <span>Total</span>
                <span className="text-primary">${total.toLocaleString()}</span>
              </div>
              <Button onClick={sendWhatsAppOrder} className="w-full h-16 text-lg bg-[#25D366] hover:bg-[#128C7E] text-white rounded-2xl shadow-lg">
                <Send size={20} className="mr-3" /> Enviar vía WhatsApp
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
