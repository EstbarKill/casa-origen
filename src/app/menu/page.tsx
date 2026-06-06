
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Star, Plus, Minus, Send, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

const CATEGORIES = ['All', 'Appetizers', 'Seafood', 'Grilled Meats', 'Desserts', 'Cocktails', 'Drinks'];

const MENU_ITEMS = [
  { id: 1, name: 'Seafood Casserole', price: 38000, category: 'Seafood', image: 'https://picsum.photos/seed/casa-10/400/400', rating: 5, description: 'Traditional coastal casserole with fresh fish, shrimp, and coconut milk.' },
  { id: 2, name: 'Fried Mojarra', price: 28000, category: 'Seafood', image: 'https://picsum.photos/seed/casa-11/400/400', rating: 5, description: 'Whole fried mojarra served with coconut rice and plantains.' },
  { id: 3, name: 'Caiman Wings', price: 22000, category: 'Appetizers', image: 'https://picsum.photos/seed/casa-12/400/400', rating: 4, description: 'Spicy glazed chicken wings with a secret Ciénaga herb rub.' },
  { id: 4, name: 'Coconut Lemonade', price: 12000, category: 'Drinks', image: 'https://picsum.photos/seed/casa-13/400/400', rating: 5, description: 'Refreshing blend of lime and creamy coconut milk.' },
  { id: 5, name: 'T-Bone Steak', price: 45000, category: 'Grilled Meats', image: 'https://picsum.photos/seed/casa-14/400/400', rating: 4, description: 'Premium grilled steak with chimichurri and baby potatoes.' },
  { id: 6, name: 'Coastal Flan', price: 10000, category: 'Desserts', image: 'https://picsum.photos/seed/casa-15/400/400', rating: 5, description: 'Creamy homemade caramel custard with a hint of local vanilla.' },
  { id: 7, name: 'Caribbean Breeze', price: 24000, category: 'Cocktails', image: 'https://picsum.photos/seed/casa-16/400/400', rating: 5, description: 'Gin based cocktail with passion fruit and mint.' },
  { id: 8, name: 'Caiman Punch', price: 26000, category: 'Cocktails', image: 'https://picsum.photos/seed/casa-17/400/400', rating: 5, description: 'A bold mix of rum, local juices, and a spicy kick.' },
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState<{ item: any; quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  const filteredItems = activeCategory === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(i => i.category === activeCategory);

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(i => i.item.id === item.id);
      if (existing) {
        return prev.map(i => i.item.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { item, quantity: 1 }];
    });
    toast({
      title: 'Added to order',
      description: `${item.name} has been added to your cart.`,
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
    const message = `Hello Casa Origen! I would like to place the following order:\n\n` +
      cart.map(i => `- ${i.item.name} x${i.quantity}`).join('\n') +
      `\n\nTotal: $${total.toLocaleString()}\n\nThank you!`;
    
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/573000000000?text=${encoded}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-12 pb-32">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold font-headline mb-4">Our Gastronomic Menu</h1>
        <p className="text-foreground/70 max-w-2xl mx-auto">Discover the authentic flavors of the Caribbean. Freshly prepared with passion and tradition.</p>
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
          <div key={item.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border group">
            <div className="relative aspect-square">
              <Image src={item.image} alt={item.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              <Badge className="absolute top-4 right-4 bg-white/90 backdrop-blur text-primary border-none shadow-sm">
                ${item.price.toLocaleString()}
              </Badge>
            </div>
            <div className="p-6 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold font-headline">{item.name}</h3>
                <div className="flex items-center text-yellow-500 text-xs">
                  {Array.from({ length: item.rating }).map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                </div>
              </div>
              <p className="text-sm text-foreground/60 line-clamp-2">{item.description}</p>
              <Button 
                onClick={() => addToCart(item)}
                className="w-full bg-secondary/50 hover:bg-primary hover:text-white text-primary rounded-xl transition-colors mt-2"
              >
                <Plus size={18} className="mr-2" /> Add to Order
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-8 right-8 z-40">
          <Button 
            onClick={() => setIsCartOpen(true)}
            className="h-16 w-16 rounded-full bg-primary text-white shadow-2xl hover:bg-primary/90 relative"
          >
            <ShoppingCart size={28} />
            <span className="absolute -top-2 -right-2 bg-accent text-white w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ring-4 ring-background">
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
              <h2 className="text-3xl font-bold font-headline">Your Order</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-2 hover:bg-muted rounded-full">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              {cart.map(entry => (
                <div key={entry.item.id} className="flex gap-4 items-center">
                  <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                    <Image src={entry.item.image} alt={entry.item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold truncate">{entry.item.name}</h4>
                    <p className="text-primary text-sm">${(entry.item.price * entry.quantity).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-secondary/50 rounded-lg p-1">
                    <button onClick={() => updateQuantity(entry.item.id, -1)} className="p-1 hover:text-primary"><Minus size={16} /></button>
                    <span className="font-bold w-4 text-center">{entry.quantity}</span>
                    <button onClick={() => updateQuantity(entry.item.id, 1)} className="p-1 hover:text-primary"><Plus size={16} /></button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t space-y-6">
              <div className="flex justify-between text-2xl font-bold font-headline">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
              <Button onClick={sendWhatsAppOrder} className="w-full h-14 text-lg bg-[#25D366] hover:bg-[#128C7E] text-white rounded-2xl">
                <Send size={20} className="mr-3" /> Send via WhatsApp
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
