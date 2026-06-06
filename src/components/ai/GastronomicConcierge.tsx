
"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gastronomicConcierge, type GastronomicConciergeOutput } from '@/ai/flows/gastronomic-concierge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Sparkles, Utensils, GlassWater, Quote, Info, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function GastronomicConcierge() {
  const [preferences, setPreferences] = useState('');
  const [allergies, setAllergies] = useState('');
  const [occasion, setOccasion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GastronomicConciergeOutput | null>(null);
  const { toast } = useToast();

  const handleSuggest = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const output = await gastronomicConcierge({
        userPreferences: preferences,
        userAllergies: allergies,
        diningOccasion: occasion || undefined,
      });
      setResult(output);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error de Selección',
        description: 'No pudimos generar tus recomendaciones. Por favor intenta de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-2xl border-primary/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden rounded-[3rem]">
      <CardContent className="p-12 md:p-16">
        <div className="space-y-10">
          <div className="space-y-4">
            <h3 className="text-4xl font-headline font-bold tracking-tight text-primary">Personaliza tu Banquete</h3>
            <p className="text-foreground/40 italic">Dinos qué te apetece y nuestro concierge creará la armonía ideal.</p>
          </div>

          <form onSubmit={handleSuggest} className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <Label htmlFor="preferences" className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 ml-2">Preferencias</Label>
                <Input 
                  id="preferences" 
                  placeholder="Ej: Comida picante, mariscos, cítricos..." 
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  required
                  className="h-16 px-8 rounded-2xl bg-secondary/5 border-none focus:ring-primary shadow-inner"
                />
              </div>
              <div className="space-y-4">
                <Label htmlFor="occasion" className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 ml-2">Ocasión</Label>
                <Input 
                  id="occasion" 
                  placeholder="Ej: Aniversario, cena de negocios..." 
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="h-16 px-8 rounded-2xl bg-secondary/5 border-none focus:ring-primary shadow-inner"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <Label htmlFor="allergies" className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 ml-2">Alergias o Restricciones</Label>
              <Input 
                id="allergies" 
                placeholder="Ej: Frutos secos, gluten, lácteos (opcional)..." 
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="h-16 px-8 rounded-2xl bg-secondary/5 border-none focus:ring-primary shadow-inner"
              />
            </div>

            <Button 
              type="submit" 
              disabled={isLoading || !preferences}
              className="w-full bg-primary hover:bg-foreground text-white h-20 text-xl font-bold rounded-2xl transition-all shadow-xl group"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                  Orquestando sabores...
                </>
              ) : (
                <>
                  <Sparkles className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                  Descubrir mi Maridaje
                </>
              )}
            </Button>
          </form>

          <AnimatePresence mode="wait">
            {result && (
              <motion.div 
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="pt-12 border-t border-primary/10 space-y-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="bg-primary/5 p-10 rounded-[2.5rem] border border-primary/10 space-y-6 group hover:bg-primary/10 transition-colors">
                    <div className="flex items-center gap-4 text-primary">
                      <div className="bg-white p-3 rounded-xl shadow-md"><Utensils size={24} /></div>
                      <span className="font-black text-[10px] uppercase tracking-widest">Plato Recomendado</span>
                    </div>
                    <div className="space-y-3">
                       <h4 className="text-3xl font-headline font-bold">{result.foodSuggestion.name}</h4>
                       <p className="text-foreground/60 italic leading-relaxed">"{result.foodSuggestion.description}"</p>
                    </div>
                  </div>

                  <div className="bg-accent/5 p-10 rounded-[2.5rem] border border-accent/10 space-y-6 group hover:bg-accent/10 transition-colors">
                    <div className="flex items-center gap-4 text-accent">
                      <div className="bg-white p-3 rounded-xl shadow-md"><GlassWater size={24} /></div>
                      <span className="font-black text-[10px] uppercase tracking-widest">Bebida Ideal</span>
                    </div>
                    <div className="space-y-3">
                       <h4 className="text-3xl font-headline font-bold">{result.beverageSuggestion.name}</h4>
                       <p className="text-foreground/60 italic leading-relaxed">"{result.beverageSuggestion.description}"</p>
                    </div>
                  </div>
                </div>

                <div className="relative p-12 bg-[#F9F6F2] rounded-[3rem] border border-primary/5 shadow-inner">
                  <Quote className="absolute top-8 left-8 text-primary/10" size={64} />
                  <div className="relative z-10 space-y-6">
                    <h5 className="font-black text-[10px] uppercase tracking-[0.4em] text-primary/60 text-center">Relato de Maridaje</h5>
                    <p className="text-2xl text-foreground/70 italic leading-relaxed text-center font-headline px-8">
                      "{result.pairingRationale}"
                    </p>
                    <div className="flex justify-center pt-6">
                       <Button variant="outline" className="rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white transition-all px-10 h-14">
                          Ver en el Menú <ArrowRight className="ml-3" size={18} />
                       </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
