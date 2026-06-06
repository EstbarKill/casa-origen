
"use client";

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, MessageCircle, Mail, Instagram, Facebook } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { toast } = useToast();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Message Sent',
      description: "We've received your inquiry and will get back to you soon.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center mb-20 space-y-4">
        <h1 className="text-5xl font-bold font-headline">Get in Touch</h1>
        <p className="text-xl text-foreground/70 max-w-2xl mx-auto italic">
          "The Caribbean breeze is waiting for you. Reach out for reservations, events, or just to say hello."
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Contact Info */}
        <div className="space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="p-8 bg-secondary/30 rounded-3xl space-y-4">
              <div className="bg-primary/20 w-12 h-12 rounded-2xl flex items-center justify-center text-primary">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-bold font-headline">Visit Us</h3>
              <p className="text-foreground/70">Troncal del Caribe km 45, Ciénaga, Magdalena</p>
            </div>
            <div className="p-8 bg-secondary/30 rounded-3xl space-y-4">
              <div className="bg-accent/20 w-12 h-12 rounded-2xl flex items-center justify-center text-accent">
                <Phone size={24} />
              </div>
              <h3 className="text-xl font-bold font-headline">Call Us</h3>
              <p className="text-foreground/70">+57 300 000 0000<br />+57 301 000 0000</p>
            </div>
            <div className="p-8 bg-secondary/30 rounded-3xl space-y-4">
              <div className="bg-primary/20 w-12 h-12 rounded-2xl flex items-center justify-center text-primary">
                <MessageCircle size={24} />
              </div>
              <h3 className="text-xl font-bold font-headline">WhatsApp</h3>
              <p className="text-foreground/70">+57 300 000 0000</p>
            </div>
            <div className="p-8 bg-secondary/30 rounded-3xl space-y-4">
              <div className="bg-accent/20 w-12 h-12 rounded-2xl flex items-center justify-center text-accent">
                <Mail size={24} />
              </div>
              <h3 className="text-xl font-bold font-headline">Email</h3>
              <p className="text-foreground/70">hola@casaorigen.com<br />eventos@casaorigen.com</p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-bold font-headline">Follow Our Journey</h3>
            <div className="flex gap-6">
              <a href="#" className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors">
                <Instagram size={20} /> @casa_origen_rest
              </a>
              <a href="#" className="flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors">
                <Facebook size={20} /> Casa Origen Ciénaga
              </a>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="w-full h-80 bg-muted rounded-3xl overflow-hidden relative shadow-inner">
             <div className="absolute inset-0 flex items-center justify-center text-foreground/30 flex-col gap-4">
                <MapPin size={48} className="animate-bounce" />
                <span className="font-bold tracking-widest text-sm uppercase">Interactive Map Loading...</span>
             </div>
             {/* Map hint for AI */}
             <div className="hidden" data-ai-hint="map location" />
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-10 rounded-[3rem] shadow-2xl space-y-8 border border-muted">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline">Send a Message</h2>
            <p className="text-foreground/60">We'll respond to your inquiry within 24 hours.</p>
          </div>
          
          <form onSubmit={handleSendMessage} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Your name" required className="h-12 border-muted" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="email@example.com" required className="h-12 border-muted" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="General Inquiry, Event Quote, etc." className="h-12 border-muted" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="How can we help you today?" className="min-h-[150px] border-muted" required />
            </div>
            <Button type="submit" className="w-full h-14 bg-primary text-white text-lg rounded-2xl shadow-lg">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
