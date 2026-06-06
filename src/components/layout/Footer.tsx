
import Link from 'next/link';
import { Instagram, Facebook, MapPin, Phone, MessageCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex flex-col">
              <span className="text-3xl font-bold tracking-widest text-primary font-headline">CASA ORIGEN</span>
              <span className="text-xs tracking-[0.2em] text-accent uppercase font-medium">Coastal Heritage & Flavors</span>
            </div>
            <p className="max-w-md text-foreground/80 italic">
              "Inspired by the tradition of the Ciénaga Caiman and the beauty of the Colombian Caribbean. Where every flavor tells a story of the sea and land."
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                <Instagram size={20} className="text-primary" />
              </Link>
              <Link href="#" className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                <Facebook size={20} className="text-primary" />
              </Link>
              <Link href="#" className="p-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
                <MessageCircle size={20} className="text-primary" />
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-headline text-xl font-bold mb-4">Location</h4>
            <ul className="space-y-4 text-foreground/80">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-accent shrink-0 mt-1" />
                <span>Troncal del Caribe km 45,<br />Ciénaga, Magdalena, Colombia</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-accent shrink-0" />
                <span>+57 300 000 0000</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline text-xl font-bold mb-4">Hours</h4>
            <ul className="space-y-2 text-foreground/80">
              <li className="flex justify-between">
                <span>Mon - Thu</span>
                <span>11:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Fri - Sat</span>
                <span>11:00 AM - 12:00 AM</span>
              </li>
              <li className="flex justify-between font-semibold text-primary">
                <span>Sunday</span>
                <span>10:00 AM - 9:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-foreground/60">
          <p>© {new Date().getFullYear()} Casa Origen. All rights reserved. Ciénaga, Magdalena.</p>
        </div>
      </div>
    </footer>
  );
}
