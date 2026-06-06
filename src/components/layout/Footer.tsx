
import Link from 'next/link';
import { Instagram, Facebook, MapPin, Phone, MessageCircle, Waves, Anchor, Ship } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function Footer() {
  return (
    <footer className="relative bg-[#0F172A] text-white pt-32 pb-12 overflow-hidden">
      {/* Decorative Waves Overlay */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-accent to-primary opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
          {/* Brand Identity */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <Link href="/" className="flex flex-col">
                <span className="text-5xl font-bold tracking-[0.2em] text-white font-headline">CASA ORIGEN</span>
                <span className="text-[10px] tracking-[0.5em] text-primary uppercase font-black">Patrimonio del Caribe</span>
              </Link>
            </div>
            
            <p className="max-w-md text-white/50 text-xl italic font-light leading-relaxed">
              "Inspirados por la resiliencia del Caimán y la brisa eterna de Ciénaga. Donde cada sabor es un relato de nuestra tierra y nuestro mar."
            </p>

            <div className="flex space-x-6">
              {[
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: MessageCircle, href: '#', label: 'WhatsApp' }
              ].map((social, i) => (
                <Link 
                  key={i} 
                  href={social.href} 
                  className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 border border-white/10 group"
                  aria-label={social.label}
                >
                  <social.icon size={24} className="group-hover:scale-110 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 space-y-10">
            <h4 className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Navegación</h4>
            <ul className="space-y-6">
              {[
                { name: 'Nuestra Historia', href: '/our-story' },
                { name: 'Menú Gastronómico', href: '/menu' },
                { name: 'Experiencias VIP', href: '/reservations' },
                { name: 'Eventos Privados', href: '/events' },
                { name: 'Portal Admin', href: '/dashboard' }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-white/60 hover:text-white transition-colors text-lg font-headline flex items-center group">
                    <span className="w-0 group-hover:w-4 transition-all overflow-hidden text-primary"><Anchor size={12} className="mr-2" /></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-4 space-y-12">
            <div className="space-y-6">
              <h4 className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Ubicación</h4>
              <div className="flex items-start gap-4">
                <div className="bg-primary/20 p-3 rounded-xl text-primary"><MapPin size={20} /></div>
                <p className="text-white/60 leading-relaxed italic">
                  Troncal del Caribe km 45,<br />
                  Ciénaga, Magdalena, Colombia
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-primary font-black uppercase tracking-[0.3em] text-[10px]">Atención</h4>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-white/40">Lun - Jue</span>
                    <span className="font-bold">11:00 AM - 10:00 PM</span>
                 </div>
                 <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                    <span className="text-white/40">Vie - Sáb</span>
                    <span className="font-bold text-primary">11:00 AM - 12:00 AM</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-white/40">Domingo</span>
                    <span className="font-bold">10:00 AM - 9:00 PM</span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:row justify-between items-center gap-8">
          <p className="text-white/30 text-xs font-bold tracking-widest uppercase">
            © {new Date().getFullYear()} Casa Origen. Desarrollado bajo la brisa del Magdalena.
          </p>
          <div className="flex items-center gap-10">
             <Link href="#" className="text-[10px] text-white/30 hover:text-white transition-colors uppercase font-bold tracking-widest">Privacidad</Link>
             <Link href="#" className="text-[10px] text-white/30 hover:text-white transition-colors uppercase font-bold tracking-widest">Términos</Link>
             <div className="flex items-center gap-2 text-primary">
                <Ship size={16} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Ciénaga Vive</span>
             </div>
          </div>
        </div>
      </div>

      {/* Background Graphic Element */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
    </footer>
  );
}
