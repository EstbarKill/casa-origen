
"use client";

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle2, Waves, Users, Clock, CalendarIcon, Heart } from 'lucide-react';

const TIMES = ["12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];
const OCCASIONS = ["Just Dining", "Birthday", "Anniversary", "Romantic Dinner", "Corporate Event", "Other"];

export default function ReservationsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: 'Reservation Confirmed',
        description: 'Check your email and WhatsApp for details.',
      });
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center text-center">
        <div className="bg-primary/20 p-8 rounded-full mb-8 animate-bounce">
          <CheckCircle2 size={64} className="text-primary" />
        </div>
        <h1 className="text-5xl font-bold font-headline mb-4">Reservation Confirmed!</h1>
        <p className="text-xl text-foreground/70 max-w-md mx-auto mb-12">
          Thank you for choosing Casa Origen. We've sent a confirmation to your email and WhatsApp. We look forward to seeing you soon.
        </p>
        <Button onClick={() => window.location.href = '/'} variant="outline" className="border-primary text-primary">
          Return to Home
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-24">
        <div className="text-center mb-16 space-y-4">
          <h1 className="text-5xl font-bold font-headline">Reserve a Table</h1>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Experience the coastal elegance of Ciénaga. Secure your spot at Casa Origen for an unforgettable gastronomic journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-xl overflow-hidden rounded-3xl">
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-2xl text-primary">
                    <CalendarIcon size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Select Date</h3>
                    <p className="text-sm text-foreground/50">Pick your preferred dining day</p>
                  </div>
                </div>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border mx-auto bg-white"
                />
              </CardContent>
            </Card>

            <div className="bg-primary text-white p-8 rounded-3xl space-y-4 shadow-lg">
              <Heart size={32} />
              <h3 className="text-2xl font-bold font-headline">Special Requests?</h3>
              <p className="opacity-90 leading-relaxed">
                Celebrating something special? Let us know! From customized menus to decoration, we make your moments unique.
              </p>
            </div>
          </div>

          <Card className="lg:col-span-3 border-none shadow-2xl rounded-3xl overflow-hidden bg-white">
            <CardContent className="p-10">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-md font-semibold">Full Name</Label>
                    <Input placeholder="John Doe" required className="h-12 text-lg border-muted" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-md font-semibold">Phone Number</Label>
                    <Input placeholder="+57 ..." required className="h-12 text-lg border-muted" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-md font-semibold">Email Address</Label>
                  <Input type="email" placeholder="john@example.com" required className="h-12 text-lg border-muted" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-3">
                    <Label className="text-md font-semibold flex items-center gap-2">
                      <Users size={16} /> Guests
                    </Label>
                    <Select defaultValue="2">
                      <SelectTrigger className="h-12 text-lg border-muted">
                        <SelectValue placeholder="2 People" />
                      </SelectTrigger>
                      <SelectContent>
                        {[1,2,3,4,5,6,7,8,10].map(n => (
                          <SelectItem key={n} value={n.toString()}>{n} People</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-md font-semibold flex items-center gap-2">
                      <Clock size={16} /> Time
                    </Label>
                    <Select required>
                      <SelectTrigger className="h-12 text-lg border-muted">
                        <SelectValue placeholder="Select Time" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIMES.map(t => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-md font-semibold flex items-center gap-2">
                      <Heart size={16} /> Occasion
                    </Label>
                    <Select defaultValue="Just Dining">
                      <SelectTrigger className="h-12 text-lg border-muted">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {OCCASIONS.map(o => (
                          <SelectItem key={o} value={o}>{o}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-md font-semibold">Special Instructions</Label>
                  <Input placeholder="Allergies, high chair, window seat..." className="h-12 text-lg border-muted" />
                </div>

                <Button type="submit" className="w-full h-16 text-xl bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99]">
                  Confirm Reservation
                </Button>
                
                <p className="text-center text-sm text-foreground/50">
                  By booking, you agree to our terms of service and reservation policy.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
