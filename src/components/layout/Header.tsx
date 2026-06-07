
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X, Anchor } from 'lucide-react';
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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoHover = () => {
    window.dispatchEvent(new CustomEvent('mascot-wave'));
  };

  return (
    <header className={cn(
      "fixed top-0 z-[100] w-full transition-all duration-700 ease-in-out",
      isScrolled 
        ? "bg-background/95 backdrop-blur-2xl border-b border-primary/10 shadow-lg h-20" 
        : "bg-background/10 backdrop-blur-sm h-24"
    )}>
      <div className="container mx-auto px-6 h-full">
        <div className="flex h-full items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link 
              href="/" 
              onMouseEnter={handleLogoHover}
              className="group flex items-center space-x-2 relative"
            >
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl font-bold tracking-[0.25em] text-foreground font-headline transition-transform duration-500 group-hover:text-primary">CASA ORIGEN</span>
                <div className="flex items-center gap-2 opacity-60">
                  <span className="h-[1px] w-4 bg-primary/40" />
                  <span className="text-[9px] tracking-[0.4em] text-primary uppercase font-black">Ciénaga • Colombia</span>
                  <span className="h-[1px] w-4 bg-primary/40" />
                </div>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-12">
            <ul className="flex items-center space-x-10">
              {navItems.map((item, idx) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-300 relative group py-2",
                      pathname === item.href ? "text-primary" : "text-foreground hover:text-primary"
                    )}
                  >
                    {item.name}
                    <span className={cn(
                      "absolute -bottom-1 left-1/2 -translate-x-1/2 h-[1.5px] bg-primary transition-all duration-500",
                      pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                    )} />
                  </Link>
                </motion.li>
              ))}
            </ul>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button asChild className="bg-primary hover:bg-foreground text-white px-10 rounded-full h-12 shadow-xl hover:shadow-primary/20 transition-all duration-500 font-bold uppercase tracking-widest text-[10px] border-none">
                <Link href="/reservations">Reservar</Link>
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="lg:hidden p-3 text-foreground bg-card/40 backdrop-blur-md rounded-2xl border border-primary/20 shadow-sm transition-colors hover:bg-card/60"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-background/98 backdrop-blur-3xl z-[101] lg:hidden flex flex-col items-center justify-center p-8 space-y-12"
          >
            <button 
              className="absolute top-10 right-10 p-4 bg-secondary/20 rounded-full hover:bg-secondary/40 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={32} className="text-primary" />
            </button>

            <div className="text-center space-y-2">
              <span className="text-4xl font-bold tracking-[0.2em] text-foreground font-headline">CASA ORIGEN</span>
              <p className="text-[10px] tracking-[0.5em] text-primary uppercase font-black">Patrimonio del Caribe</p>
            </div>

            <nav className="flex flex-col items-center space-y-8">
              {navItems.map((item, idx) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "text-3xl font-bold font-headline transition-all hover:text-primary",
                      pathname === item.href ? "text-primary scale-110" : "text-foreground/70"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Button asChild size="lg" className="w-72 h-16 text-xl rounded-full mt-8 shadow-2xl bg-primary border-none">
                  <Link href="/reservations" onClick={() => setIsMenuOpen(false)}>Reservar Ahora</Link>
                </Button>
              </motion.div>
            </nav>
            
            <div className="absolute bottom-12 flex items-center gap-2 text-primary/40">
              <Anchor size={16} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">Ciénaga Vive</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
