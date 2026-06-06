
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X, Waves, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Inicio', href: '/' },
  { name: 'Nuestra Historia', href: '/our-story' },
  { name: 'Menú', href: '/menu' },
  { name: 'Reservas', href: '/reservations' },
  { name: 'Eventos', href: '/events' },
  { name: 'Contacto', href: '/contact' },
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoHover = () => {
    // Disparar evento personalizado para que el caimán salude
    window.dispatchEvent(new CustomEvent('mascot-wave'));
  };

  return (
    <header className={cn(
      "sticky top-0 z-[100] w-full transition-all duration-500",
      isScrolled ? "bg-background/95 backdrop-blur-xl border-b shadow-md h-20" : "bg-transparent h-28"
    )}>
      <div className="container mx-auto px-4 h-full">
        <div className="flex h-full items-center justify-between">
          <Link 
            href="/" 
            onMouseEnter={handleLogoHover}
            className="group flex items-center space-x-2 relative"
          >
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold tracking-[0.2em] text-primary font-headline group-hover:scale-105 transition-transform">CASA ORIGEN</span>
              <div className="flex items-center gap-1">
                <span className="text-[10px] tracking-[0.4em] text-accent uppercase font-bold">Ciénaga • Colombia</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-xs font-bold uppercase tracking-widest transition-all hover:text-primary relative group",
                  pathname === item.href ? "text-primary" : "text-foreground/60"
                )}
              >
                {item.name}
                <span className={cn(
                  "absolute -bottom-2 left-0 h-[2px] bg-primary transition-all duration-500",
                  pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            ))}
            <Button asChild className="bg-primary text-white px-8 rounded-full h-12 shadow-xl hover:shadow-primary/20 hover:scale-105 transition-all">
              <Link href="/reservations">Reservar</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-3 text-foreground bg-white/50 backdrop-blur rounded-full border shadow-sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-background z-[101] lg:hidden flex flex-col items-center justify-center p-8 space-y-10"
          >
            <button 
              className="absolute top-10 right-10 p-3 bg-muted rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={32} />
            </button>
            <nav className="flex flex-col items-center space-y-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-3xl font-bold font-headline transition-all",
                    pathname === item.href ? "text-primary scale-110" : "text-foreground/40"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild size="lg" className="w-64 h-16 text-xl rounded-full mt-8">
                <Link href="/reservations" onClick={() => setIsMenuOpen(false)}>Reservar Ahora</Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
